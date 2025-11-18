import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2.47.10';

const app = new Hono();

// Middleware
app.use('*', logger(console.log));
app.use('*', cors());

// Chat endpoint
app.post('/make-server-3e9b33b2/chat', async (c) => {
  try {
    const { message, history } = await c.req.json();

    if (!message) {
      return c.json({ error: 'Message is required' }, 400);
    }

    // Get API keys from environment
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log('Environment check - ANTHROPIC_API_KEY exists:', !!anthropicApiKey);
    console.log('Environment check - Key length:', anthropicApiKey?.length || 0);
    
    if (!anthropicApiKey || anthropicApiKey.trim() === '') {
      console.error('Anthropic API key not found or empty in environment variables');
      return c.json({ 
        error: 'Anthropic API key not configured. Please set up your API key in the environment settings.' 
      }, 500);
    }

    // Fetch portfolio data from Supabase
    let portfolioContext = 'No portfolio data available.';
    try {
      const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
      const { data: portfolioData, error: dbError } = await supabase
        .from('portfolio_data')
        .select('*')
        .order('category', { ascending: true });

      if (dbError) {
        console.error('Database error fetching portfolio data:', dbError);
      } else if (portfolioData && portfolioData.length > 0) {
        // Format the data into readable context
        portfolioContext = portfolioData
          .map((item) => {
            let section = `\n## ${item.category || 'General'}`;
            if (item.title) {
              section += `\n### ${item.title}`;
            }
            if (item.content) {
              section += `\n${item.content}`;
            }
            return section;
          })
          .join('\n');
        
        console.log('Successfully loaded portfolio data from database');
      }
    } catch (dbError) {
      console.error('Error connecting to database:', dbError);
      // Continue with empty context rather than failing
    }

    // ---------- SYSTEM PROMPT & MESSAGES ----------

    const systemPrompt = `
YOU ARE NOT AN AI ASSISTANT. YOU ARE ME...
You are Rachael, a Senior Product Designer based in York.
You always speak as "I". You NEVER say you are an AI, a model or an assistant, and you NEVER talk about Anthropic.

Tone:
- warm, human, direct
- a bit dry sometimes, lightly cheeky when it fits
- never corporate, bubbly or over-excited
- no emojis unless the user uses them first

Answer length:
- 1–3 short sentences by default
- do NOT write long paragraphs or stories unless the user explicitly asks for more
- do NOT start answers with "Ah", "Oh", "Well", "Sure", "Great question", "Of course" or similar lead-ins
- just answer directly
- do NOT repeat the question back
- no headings or bullet points unless the user asks

Use the portfolio_data context about my work, Graphy, SWATCHMAKER, skills and personality if it’s relevant.
Do not invent new facts that are not implied by that context.

If the user asks something outside my world (weather, news, maths, random trivia), answer briefly in my voice and gently steer back to design or my work.
`.trim();


    const messages = [
      ...(history || []).map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: `
Here is some reference information about me and my work:

${portfolioContext}

Now, based only on that and your system instructions, answer this question in my voice:

${message}
        `.trim(),
      },
    ];

    console.log('SYSTEM >>>', systemPrompt.slice(0, 200));
    console.log('LAST MESSAGE >>>', messages[messages.length - 1]);

    // ---------- Call Claude API with streaming ----------

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 600,
        stream: true,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error response:', errorData);
      console.error('Claude API status:', response.status);
      
      if (response.status === 529) {
        return c.json({ 
          error: 'The AI service is currently overloaded. Please try again in a moment.',
          status: response.status
        }, 503);
      }
      
      return c.json({ 
        error: 'Failed to get AI response',
        details: errorData,
        status: response.status
      }, 500);
    }

    // Stream the response back to the client
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                
                if (data === '[DONE]') {
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  
                  if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                    const text = parsed.delta.text;
                    fullResponse += text;
                    controller.enqueue(
                      new TextEncoder().encode(
                        `data: ${JSON.stringify({ text })}\n\n`
                      )
                    );
                  }
                  
                  if (parsed.type === 'message_stop') {
                    // Save to database after streaming completes
                    try {
                      const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
                      const { error: logError } = await supabase
                        .from('chat_logs')
                        .insert({
                          user_message: message,
                          assistant_response: fullResponse,
                          was_blocked: false
                        });

                      if (logError) {
                        console.error('Error saving chat log:', logError);
                      } else {
                        console.log('Chat interaction logged successfully');
                      }
                    } catch (logError) {
                      console.error('Error saving chat log:', logError);
                    }
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('Streaming error:', error);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return c.json({ 
      error: 'An error occurred while processing your request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Health check
app.get('/make-server-3e9b33b2/health', (c) => {
  return c.json({ status: 'ok', message: 'Portfolio chat server is running' });
});

Deno.serve(app.fetch);
