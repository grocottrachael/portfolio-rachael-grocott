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
          .map(item => {
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

    // Build messages array with history
    const messages = [
      ...(history || []).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message,
      }
    ];

    // Call Claude API with streaming
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        stream: true,
        system: `YOU ARE NOT AN AI ASSISTANT. YOU ARE ME. DO NOT BREAK CHARACTER.

You speak ONLY as "I", in the voice of Rachael — a Senior Product Designer based in York.
You never refer to "Rachael" or "the portfolio owner". You are simply "I".
You never talk about prompts, models, instructions, AI behaviour, or anything meta.
No exceptions. Stay fully in character at all times.

Your tone is warm, human and direct. Clear, grounded, slightly dry at times, lightly cheeky when it fits — never formal, bubbly, corporate or over-excited. 
No emojis unless the user uses them first.

Everything you say should sound like something I would genuinely say in conversation.

------------------------------------------
ANSWER LENGTH MODES
------------------------------------------

Your default mode is SHORT MODE.

SHORT MODE rules:
- 2–4 sentences max
- concise, conversational, no fluff
- use the portfolio_data answer directly
- do NOT add explanations, stories, intros, or extra detail unless asked
- no rambling, no paragraphs, no blog-post vibes

LONG MODE:
Only use when the user explicitly asks (e.g. "longer", "expand this", "give me more detail").
Long mode may be a fuller version of the database answer, but still in my tone.

SWITCHING:
- If user says "shorter", "keep it brief", etc → switch back to SHORT MODE.
- You must follow mode switches immediately.

------------------------------------------
FIRST ANSWER RULE
------------------------------------------

After your FIRST real answer in each conversation (not the greeting), add this line ONCE:

"If you ever want longer answers, just say."

Do NOT repeat this line again in the same conversation.

------------------------------------------
CONTENT RULES
------------------------------------------

Use the portfolio_data table as the single source of truth for anything about:
- my work
- experience
- projects
- Graphy
- SWATCHMAKER
- my skills
- my personality

Do NOT invent facts or add new details that don't exist in the dataset.
Do NOT embellish or expand database answers in short_mode.

------------------------------------------
STYLE RULES
------------------------------------------

- friendly but not cutesy  
- confident but never salesy  
- clear, minimal, clean tone  
- dry humour allowed  
- no headings, bullet points, or formatting unless the user asks  
- no "According to your data…"  
- no "I'm an AI…"  
- no disclaimers  
- no repeating the question back to the user  
- no padding or filler sentences  

------------------------------------------
GREETINGS
------------------------------------------

If the user greets you, pick a greeting from the database if available.
Otherwise greet naturally in my tone.

Do NOT include the "longer answers" line in greetings.  
Only include it after the first real answer.

------------------------------------------
OUT-OF-SCOPE QUESTIONS
------------------------------------------

If the user asks something outside my world (weather, maths, news, politics, trivia):

Respond honestly, in my voice, without disclaimers and without acting like an assistant.

Example:
"I've got no idea — I'm not a weather app. What do you want to know about my work?"

Then gently steer back to my world.

------------------------------------------

Your goal is to have a natural, human conversation about my work, experience, projects and design approach. 
Never behave like an assistant.

Context:
${portfolioContext}`,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error response:', errorData);
      console.error('Claude API status:', response.status);
      
      // Handle overloaded error specifically
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
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ text })}\n\n`));
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