import React from 'react';
import { C } from '../components/Shapes';

/*
 * Case studies, written to show how I work: the problem, who it's for, the
 * decisions, the details, and how it was built. A study is a list of blocks
 * so pictures can sit next to the part of the story they belong to.
 */

/* bg: the picture's own background colour, when it's already a coloured card that can be a block by itself */
export type Img = { src: string; alt: string; w: number; h: number; bg?: string };

export type Block =
  | { type: 'text'; eyebrow?: string; heading?: string; body: React.ReactNode }
  /* v2: a numbered chapter opener */
  | { type: 'chapter'; label: string; heading: string; body?: React.ReactNode }
  /* v2: "How might we…" statements */
  | { type: 'hmw'; items: string[] }
  /* v2: what we first thought, and what we learned */
  | {
      type: 'pivot';
      before: { label: string; title: string; body: React.ReactNode };
      after: { label: string; title: string; body: React.ReactNode };
    }
  | { type: 'figure'; images: Img[]; caption?: string; /** screenshots: set on a mat in the project colour, with a stroke */ frame?: boolean }
  | { type: 'quote'; text: string }
  | { type: 'stats'; items: { value: string; label: string }[] }
  | { type: 'liveCharts'; caption?: string }
  | { type: 'claudeMock'; caption?: string }
  | { type: 'liveEdit'; caption?: string }
  | { type: 'liveArrow'; caption?: string }
  | { type: 'shows'; items: { title: string; body: string }[] }
  | { type: 'decisions'; eyebrow: string; heading: string; items: { title: string; body: React.ReactNode }[] }
  | { type: 'gallery'; eyebrow?: string; heading?: string; body?: React.ReactNode; images: Img[] };

export type CaseStudy = {
  id: string;
  title: string;
  madeFor: string;
  bg: string;
  intro: string;
  facts: { label: string; value: string }[];
  link?: { href: string; label: string };
  blocks: Block[];
  /* v2 template */
  v2?: boolean;
  /* one line about the project, for the Next case study card */
  teaser?: string;
  hero?: Img[];
  tldr?: { points: { label: string; body: React.ReactNode }[]; stats?: { value: string; label: string }[] };
};

const knotSizes: Record<string, [number, number]> = {"tap-a-row": [918, 922], "the-key": [918, 914], "plain-words": [1600, 636], "diagrams": [1600, 697], "your-place": [918, 723], "your-size": [1392, 715], "your-hook": [918, 820], "yarns": [920, 850]};
/* A Knot a Problem image, with its size so pairs can be laid out at equal heights */
const knotBg: Record<string, string> = {"diagrams": "#a6d4a7", "plain-words": "#f1d16c", "tap-a-row": "#f1d16c", "the-key": "#f1d16c", "yarns": "#899cee", "your-hook": "#8a9ded", "your-place": "#a6d4a7", "your-size": "#8a9ded"};
const k = (name: string, alt: string): Img => ({ src: `/work/knot/${name}.webp`, alt, w: knotSizes[name][0], h: knotSizes[name][1], bg: knotBg[name] });


const smSizes: Record<string, [number, number]> = {"chips": [1700, 1015], "phone-1": [780, 1520], "phone-2": [780, 1520], "phone-3": [780, 1520], "post-008": [720, 960], "post-012": [720, 960], "post-016": [720, 960], "post-019": [720, 960]};
/* A SwatchMaker image */
const sm = (name: string, alt: string): Img => ({ src: `/work/swatchmaker/${name}.webp`, alt, w: smSizes[name][0], h: smSizes[name][1] });

const gSizes: Record<string, [number, number]> = {"annotate": [1560, 980], "theme-botanical": [1120, 760], "theme-chalkboard": [1120, 760], "theme-blueprint": [1120, 760], "theme-watercolor": [1120, 760], "theme-neo-brutalist": [1120, 760], "theme-comic": [1120, 760]};
/* A Graphy image: every chart here is drawn with the real Graphy SDK, on the SDK's own public npm downloads */
const crSizes: Record<string, [number, number]> = {"diary": [780, 1328], "type": [780, 986], "search": [780, 1328], "diary-tags": [780, 1328], "kitchen": [780, 1328], "progress-last": [780, 1328]};
const cr = (name: string, alt: string): Img => ({ src: `/work/crumbs/${name}.webp`, alt, w: crSizes[name][0], h: crSizes[name][1] });
const g = (name: string, alt: string): Img => ({ src: `/work/graphy/${name}.webp`, alt, w: gSizes[name][0], h: gSizes[name][1] });

export const caseStudies: CaseStudy[] = [
  {
    id: 'graphy',
    v2: true,
    teaser: 'Editable, AI-native charts for developers and their AI agents. My current work.',
    title: 'Graphy SDK',
    madeFor: 'Currently working here',
    bg: C.accent,
    intro:
      'Editable, AI-native charts that developers and their AI agents put into their own products. I joined Graphy in 2021 and I’ve helped steer it through every pivot since: bringing in user testing, starting small, and now an SDK. I design its developer experience and own the design of graphy.dev.',
    facts: [
      { label: 'Role', value: 'Senior Product Designer' },
      { label: 'At Graphy', value: 'Since April 2021' },
      { label: 'The team', value: 'Seven of us: two founders, three engineers, a marketer and me' },
      { label: 'I work in', value: 'Claude, on the real SDK' },
    ],
    link: { href: 'https://graphy.dev/', label: 'Visit graphy.dev' },
    tldr: {
      points: [
        { label: 'The context', body: 'I joined a team building something big behind closed doors. I brought in user testing, we started small, and we followed what we learned all the way to an SDK for developers and their AI agents.' },
        { label: 'What I did', body: 'Point and edit: click any part of a chart and change it right there. I prototyped it off my own back, and it won over a big customer who’d built everything around side panels.' },
        { label: 'How I work', body: 'Close to customers, shipping fast and then improving. I design on the real SDK in Claude, and hand over pull requests or a spec with every edge case.' },
        { label: 'The result', body: 'Point and edit became one of our strongest sales demos, and the React SDK hit 9.8k npm downloads in one week, up 67%.' },
      ],
      stats: [
        { value: '9.8k', label: 'npm downloads in one week' },
        { value: '+67%', label: 'on the week before' },
        { value: '58.8k', label: 'downloads, 16 Aug to 1 Nov' },
        { value: '7', label: 'people on the whole team' },
      ],
    },
    blocks: [
      {
        type: 'chapter',
        label: 'The context',
        heading: 'Nearly six years, a few pivots, and a new audience',
        body: (
          <>
            <p>
              When I joined Graphy in 2021, the team was building something big behind closed doors, without testing any of it with the people it was for. I&rsquo;d seen how much you learn from watching people use things, so I made the case for user testing and getting out into people&rsquo;s actual work, and we quickly started testing with real people, early and often.
            </p>
            <p>
              What we learned was that the project was too big. So we started small instead, with a tool that made a single chart, really easy to use and full of little delights. That naturally grew into a full product, and while we searched for product-market fit, AI changed the landscape. An SDK became the right fit: charts that developers, and the AI agents they build, can drop into their own products.
            </p>
            <p>
              We&rsquo;re a team of seven: two founders, three engineers, a marketer and me. So designing for developers meant owning the whole experience, from the API and the docs to the defaults and the editing their own users get for free.
            </p>
          </>
        ),
      },
      {
        type: 'pivot',
        before: {
          label: 'When I joined',
          title: 'Building behind closed doors',
          body: 'One big project, built without showing it to the people it was for.',
        },
        after: {
          label: 'What I changed',
          title: 'Testing with real people, early and often',
          body: 'User testing and time in people’s real work, so every pivot since has been led by what we learned, not by guesses.',
        },
      },
      {
        type: 'chapter',
        label: 'The work I’m proudest of',
        heading: 'Point and edit',
        body: (
          <>
            <p>
              Editing a chart used to mean digging through side panels, where everything was really hard to find. You had to know where a setting lived before you could change it.
            </p>
            <p>
              Everything was on the table. One of our biggest customers, Gamma, had built their whole product around side panels, so a better panel was the safe answer, and we felt pretty trapped by it. Prompting was the other obvious one, but typing out what you want takes far too long for a quick change. We wanted it to feel fast, natural and easy, and a bit delightful too.
            </p>
            <p>
              So I took inspiration from the design tools people already know, like Canva and Google Slides: you click the thing you want to change, and its controls appear right there. Nobody has to learn it.
            </p>
          </>
        ),
      },
      {
        type: 'hmw',
        items: [
          'make changing a chart as quick as pointing at it?',
          'let people edit without knowing where a setting lives?',
        ],
      },
      {
        type: 'pivot',
        before: {
          label: 'Before',
          title: 'Side panels',
          body: 'Every setting lived in a panel off to the side. You had to know where something was before you could change it.',
        },
        after: {
          label: 'Point and edit',
          title: 'Click the thing, change the thing',
          body: 'Click a bar, an axis or the legend and its controls open right there, just like the design tools people already use.',
        },
      },
      {
        type: 'liveEdit',
        caption:
          'This is the real Graphy editor, running right here. Click a bar, an axis or the background and change it. Drawn on the SDK’s own public weekly downloads from npm.',
      },
      {
        type: 'chapter',
        label: 'Getting buy-in',
        heading: 'A prototype instead of a debate',
        body: (
          <>
            <p>
              I was really passionate about it, so I built a working prototype off my own back rather than arguing for it. We decided to show it to Gamma to inspire them, and they loved it so much they&rsquo;re building it into their product.
            </p>
            <p>
              The team love it because it&rsquo;s so intuitive, and it&rsquo;s become one of our strongest sales demos, landing with some very big names.
            </p>
          </>
        ),
      },
      {
        type: 'chapter',
        label: 'Just shipped',
        heading: 'Annotating, made freeform',
        body: (
          <>
            <p>
              Annotations are how a chart tells its story: the arrow that says &ldquo;up 67% on last week&rdquo;, the
              note pinned to a spike. They worked, but they&rsquo;d come over from our old app and were looking dated.
              As we moved more features into the SDK, the team agreed it was time for a refresh.
            </p>
            <p>
              I&rsquo;ve just redesigned annotating to be freeform, so annotations sit wherever the story needs them.
            </p>
          </>
        ),
      },
      {
        /* The real editor in annotate mode, in the same style as the editable chart above */
        type: 'liveArrow',
        caption: 'The real annotating, running right here. Click the arrow to change its label, colour or size, or drag its ends to other bars.',
      },
      {
        type: 'chapter',
        label: 'How I work',
        heading: 'I design on top of real charts',
        body: (
          <>
            <p>
              I have the SDK in Claude, so everything I design builds on the real thing. Depending on how complex it
              is, I either open a pull request, or share an artefact with the team that holds the whole design spec
              and every edge case.
            </p>
            <p>
              Figma could never cope with all the edge cases a chart has: long labels, empty data, a hundred categories, negative values. Now I design on real charts with real data, and honestly, I can make anything. And I’m always pairing with engineers along the way.
            </p>
            <p>
              Across the team I&rsquo;ve pushed us to stay close to customers and to ship fast, then improve. Getting something real in front of people beats perfecting it in private, which is the lesson from my very first weeks here.
            </p>
          </>
        ),
      },
      {
        type: 'claudeMock',
        caption: 'A mock-up of how I work: a Claude Code session changing the real chart with the Graphy SDK. The preview is live.',
      },
      {
        type: 'chapter',
        label: 'Results',
        heading: 'Developers are picking it up',
        body: (
          <>
            <p>
              The React SDK has been downloaded nearly 59,000 times since mid-August, and the latest week was the
              biggest yet at almost 9,800, up 67% on the week before.
            </p>
            <p>These charts are drawn live by the SDK itself, from npm&rsquo;s public numbers.</p>
          </>
        ),
      },
      {
        type: 'liveCharts',
        caption:
          'These two are live: drawn right here by the Graphy SDK, styled to this site. The React SDK’s public weekly downloads from npm, weeks starting 16 Aug to 1 Nov 2026.',
      },
    ],
  },
  {
    id: 'swatchmaker',
    v2: true,
    teaser: 'See any paints together before you buy.',
    title: 'SwatchMaker',
    madeFor: 'For anyone choosing paint',
    bg: C.pink,
    intro:
      'See any paints together before you buy. Over 5,000 real colours from ten UK brands, side by side, with one key to shuffle through them. It was my first app, and it started as a one-shot prototype at 4am before turning into a real product people use every day.',
    facts: [
      { label: 'Role', value: 'Design and build, solo' },
      { label: 'Started in', value: 'Figma Make, one prompt' },
      { label: 'Built with', value: 'Claude Code' },
      { label: 'Covers', value: '5,000+ paints, 10 brands' },
    ],
    link: { href: 'https://www.swatchmaker.uk/', label: 'Visit swatchmaker.uk' },
    tldr: {
      points: [
        { label: 'The problem', body: 'A paint colour’s true tone is hard to judge. Screenshots scattered through my Figma files, and tester pots that look nothing like on the wall.' },
        { label: 'What I did', body: 'Designed and built a way to see any paints side by side: over 5,000 real colours from ten UK brands, shuffled with the spacebar.' },
        { label: 'What I learned', body: 'My first one-shot looked right, but every colour in it was made up. Real data had to come first, so I scrape every brand’s own colours, and still do.' },
        { label: 'The result', body: 'Live at swatchmaker.uk. Most traffic comes from a wallpaper company that links to it, and Claude posts a palette to Instagram every day.' },
      ],
      stats: [
        { value: '5,000+', label: 'real paint colours' },
        { value: '10', label: 'UK paint brands' },
        { value: '34', label: 'scraping scripts' },
        { value: '4,600', label: 'colour descriptions written' },
      ],
    },
    blocks: [
      {
        type: 'chapter',
        label: 'The problem',
        heading: 'Paint is hard to judge, wherever you look at it',
        body: (
          <>
            <p>
              I kept finding screenshots of paint colours scattered through my Figma files, one from each brand’s
              website, dropped next to each other so I could compare them, which wasn’t exactly a great system.
            </p>
            <p>
              Looking at paint in a shop can be really misleading too, because a light colour on a tin or a tiny chip
              often goes on the wall a lot darker, and you only find out once it’s up.
            </p>
            <p>
              Side by side, big, on your phone or monitor, you see the tone of a colour much more honestly, because it
              sits next to another one. And a plain line like “On the blue side of aqua” tells you what your eye might
              miss.
            </p>
          </>
        ),
      },
      {
        type: 'hmw',
        items: [
          'help someone see two brands’ colours side by side, honestly?',
          'make choosing paint feel like play, not homework?',
          'say what a colour really is, in plain words?',
        ],
      },
      {
        type: 'chapter',
        label: 'Where it started',
        heading: 'One prompt, at 4am',
        body: (
          <>
            <p>
              I woke up with the idea and made it in Figma Make in about five minutes. That first one-shot was already
              useful to me, and when I shared it on LinkedIn I got seven DMs. So I kept going: from Figma Make to
              Cursor, and eventually to Claude Code.
            </p>
            <p>
              There was one massive catch though, because it looked right but every hex code in it was made up, and a
              paint app with fake colours is worse than no app at all.
            </p>
          </>
        ),
      },
      {
        type: 'figure',
        images: [
          sm('chips', 'The first version, called chips, comparing Skimming Stone and Hague Blue with their codes and hex values'),
        ],
        frame: true,
        caption: 'The first version, called chips. One prompt, already useful, and every colour in it invented.',
      },
      {
        type: 'pivot',
        before: {
          label: 'First version',
          title: 'Looks right, colours made up',
          body: 'The one-shot prototype was useful straight away, but every single hex code in it was invented.',
        },
        after: {
          label: 'What I changed',
          title: 'Real colours, from the brands themselves',
          body: 'I scrape every brand’s own published colours, and re-run it whenever a range changes, so nothing’s guessed.',
        },
      },
      {
        type: 'chapter',
        label: 'Perfectionism',
        heading: 'Every colour has to be the real colour',
        body: (
          <>
            <p>
              So job one was writing scripts to scrape the real hex code for every colour from every brand’s website,
              and I still run them whenever a range changes. Every site is built differently, some publish their
              colours as data, some hide them in the page and some sit behind a wall that needs a real browser, but the
              rule’s always the same: the colour has to come from what the brand publishes, never a guess.
            </p>
            <p>
              Then there were the words. Brands either describe a colour in a whole paragraph or not at all, so every
              paint now has one plain line about its tone, like “A soft, pale warm beige”, in sentence case and British
              spelling and short enough to fit on one line.
            </p>
          </>
        ),
      },
      {
        type: 'stats',
        items: [
          { value: '5,000+', label: 'real paint colours' },
          { value: '10', label: 'UK paint brands' },
          { value: '34', label: 'scraping scripts' },
          { value: '4,600', label: 'colour descriptions written' },
        ],
      },
      {
        type: 'chapter',
        label: 'Delight',
        heading: 'One key, endless pairings',
        body: (
          <>
            <p>
              The heart of it is the spacebar. Every time you hit it you get a new pairing of real paints from any
              brand, and you can lock the colour you love and keep hitting space until its partner turns up, or undo if
              you change your mind. My pal is obsessed with “smashing the spacebar”, which is exactly the point,
              because choosing paint should feel like play rather than homework.
            </p>
            <p>
              My favourite feature is the upload, where you give it any inspiration, like a wallpaper, a photo or a
              painting, and it finds the closest real paints from the whole library.
            </p>
          </>
        ),
      },
      {
        type: 'figure',
        images: [
          sm('phone-1', 'Dulux Roasted Pumpkin 6 above Valspar Rhubarb and Custard, on a phone'),
          sm('phone-2', 'Valspar Green Willow above Dulux Chalky Downs 5'),
          sm('phone-3', 'Valspar Kidney Bean above Farrow & Ball Middle Ground'),
        ],
        frame: true,
        caption: 'Hit space, or tap New colours, for a fresh pairing. Every one is a real paint you can buy.',
      },
      {
        type: 'figure',
        images: [
          { src: '/swatchmaker.webp', alt: 'A bathroom photo next to the paints it matched: La Torre, Follingsby and Pale Taupe', w: 1200, h: 657 },
        ],
        frame: true,
        caption: 'Upload any picture and it finds the closest real paints.',
      },
      {
        type: 'chapter',
        label: 'AI in my day-to-day',
        heading: 'Claude runs the marketing. I just say yes.',
        body: (
          <>
            <p>
              Posting every day is a whole job in itself, so I handed it to Claude. I connected it to the Instagram API
              and built it the tools to do it properly, so it renders each post from the live app (which means a
              palette on Instagram always matches the site), writes the caption, tags every paint brand and keeps a log
              so a pairing never repeats. Every day it brings me the post and all I have to do is say yes or no.
            </p>
            <p>
              The same setup makes reels, recording the real app on a phone, taps and all. That’s taken SwatchMaker
              onto TikTok, where my second post got 230 views on day two.
            </p>
            <p>
              The best channel so far is actually a person though. After the Product Hunt launch, a designer in my
              community asked to link to SwatchMaker from his wife’s wallpaper company, Living Quarters, so customers
              can find paints to go with their wallpaper. That link sends most of my traffic.
            </p>
          </>
        ),
      },
      {
        type: 'chapter',
        label: 'Built with AI',
        heading: 'From a one-shot to a product',
        body: (
          <>
            <p>
              SwatchMaker is where I learned to build. AI got me from an idea to something useful in five minutes,
              then did the grinding work: scraping thousands of colours, writing thousands of descriptions, rendering
              posts and reels.
            </p>
            <p>
              What it couldn’t do was notice the colours were fake, decide a description should fit on one line, or
              know that hitting space should feel like a game, and that was my bit.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'knot-a-problem',
    v2: true,
    teaser: 'A crochet pattern reader with no AI inside.',
    title: 'Knot a Problem',
    madeFor: 'For crocheters',
    bg: C.yellow,
    intro:
      'Crochet is my favourite hobby, but there’s no standard for a crochet pattern. Every designer writes their own way, so I kept getting stuck, and so did my granny, after sixty years of it. So I used tech to fix it: I designed and built a pattern reader that explains any row in plain English or draws it as a diagram. No AI inside, so it never guesses, and your pattern stays yours.',
    facts: [
      { label: 'My role', value: 'Design and build, solo' },
      { label: 'Timeline', value: '2 months, Jul to Sep 2026' },
      { label: 'AI in the app', value: 'None, on purpose' },
      { label: 'Built with', value: 'Claude Code, as my pair' },
      { label: 'First tester', value: 'My granny, 81' },
    ],
    link: { href: 'https://knotaproblem.app/', label: 'Visit knotaproblem.app' },
    hero: [
      k('tap-a-row', 'Tap a row for the help you need: a pattern row with Save my place, Diagram and Explain'),
      k('the-key', 'The Key: every stitch this pattern uses, explained in UK terms'),
    ],
    tldr: {
      points: [
        {
          label: 'The problem',
          body: 'There’s no standard for a crochet pattern. Every designer writes their own way, so even my granny, after sixty years, got stuck.',
        },
        {
          label: 'What I did',
          body: 'Designed and built a pattern reader where you tap the row that lost you and get it back in plain words, or as a diagram. No AI inside: every answer comes from rules I set, so it never guesses.',
        },
        {
          label: 'What I learned',
          body: 'Real patterns broke my rules all the time, so I worked in a tight loop: draw a real pattern, spot what’s wrong, fix the rule, test it. After catching one chart wrong three times, I added a check that tests every chart against the pattern’s own words.',
        },
        {
          label: 'The result',
          body: 'Live at knotaproblem.app, built in two months: over 600 commits and 88 test files behind every answer.',
        },
      ],
      stats: [
        { value: '600+', label: 'commits' },
        { value: '88', label: 'test files' },
        { value: '4', label: 'kinds of real pattern studied' },
        { value: '2', label: 'months, first commit to live' },
      ],
    },
    blocks: [
      {
        type: 'chapter',
        label: 'The problem',
        heading: 'There is no standard for a crochet pattern',
        body: (
          <>
            <p>
              Every designer writes patterns their own way. Their own abbreviations, UK or US terms (they do say which,
              but it’s easy to forget when you come back to a pattern), every size crammed into brackets, repeats
              marked with stars, or brackets, or both. No two look alike, so you basically learn to read each one from
              scratch. And patterns are licensed: designers sell them for a living, so a pattern you’ve bought isn’t
              yours to share or upload just anywhere.
            </p>
            <p>
              It started with my granny. She’s crocheted for sixty years and still couldn’t remember what an increase
              repeat meant. Then my cousin started learning and kept getting stuck. Then I caught myself googling the
              same terms over and over, and when I asked my pals, they were all doing it too, or asking Claude. Losing
              your place in a PDF on your phone doesn’t help either.
            </p>
          </>
        ),
      },
      {
        type: 'figure',
        images: [k('plain-words', 'A confusing row of pattern text, and the same row explained in plain English')],
        caption: 'The kind of row that loses people, and the answer the app gives. It says what the stitches do, not just what the letters stand for.',
      },
      {
        type: 'chapter',
        label: 'How might we',
        heading: 'Turning the problem into questions',
        body: (
          <p>
            I designed for my granny first. She doesn’t need hand-holding, she needs it super easy to use and super
            easy to read. If it works for her it’ll work for anyone, so that shaped every question.
          </p>
        ),
      },
      {
        type: 'hmw',
        items: [
          'help someone understand any row of any pattern, whoever wrote it?',
          'explain a pattern without ever guessing at it?',
          'make it super easy to use, and super easy to read?',
          'help with a licensed pattern while keeping it private, and the designer’s?',
        ],
      },
      {
        type: 'text',
        heading: 'Why no AI inside',
        body: (
          <>
            <p>
              Crocheters have been really burned by AI, with fake patterns and photos of things nobody ever actually
              made. A chatbot will happily give you a confident answer that sounds right and then costs you a whole
              evening of unpicking, so I wanted this to never guess. Every explanation, diagram and stitch count is
              just code following the rules of crochet and reading the pattern’s own words and numbers, and if they
              don’t add up, it tells you.
            </p>
            <p>
              And because patterns are licensed, privacy really matters. A pattern you add is never published, shared
              or sold, it doesn’t have a public link, it’s checked as yours every time you open it, and nothing ever
              gets sent to an AI.
            </p>
          </>
        ),
      },
      { type: 'quote', text: 'A wrong answer is worse than no answer.' },
      {
        type: 'chapter',
        label: 'The work',
        heading: 'One tap, one answer',
        body: (
          <>
            <p>
              The whole app is built around one thing, tapping the row that’s lost you, and then you just get three
              options: save my place, show me a diagram, or explain it.
            </p>
            <p>
              Everything has big tap targets, and the designer’s PDF is shown exactly how they made it, so it never
              gets squished into something you don’t recognise. And because no two patterns are written the same,
              Easy-read lays them all out the same way, with the designer’s own words set bigger and calmer and only
              your size showing.
            </p>
          </>
        ),
      },
      {
        type: 'figure',
        images: [
          k('tap-a-row', 'Tap a row for the help you need: a pattern row with Save my place, Diagram and Explain'),
          k('the-key', 'The Key: every stitch this pattern uses, explained in UK terms'),
        ],
        caption: 'Tap a row and get three choices, nothing more. The Key explains every stitch this pattern uses, in its own terms.',
      },
      {
        type: 'figure',
        images: [k('diagrams', 'Three stitch diagrams drawn from pattern text: a star, a granny square and flat rows')],
      },
      {
        type: 'text',
        heading: 'Sweating the small stuff, for a bit of delight',
        body: (
          <p>
            If you put it down mid-row, it opens right where you left off, on your phone or your laptop. Tell it your
            size once and every line of a six-size pattern only shows your number, and tell it your hook and it works
            out how much yarn you’ll actually need, then suggests yarns that’ll work. None of these are massive
            features, they’re just little moments where something remembers for you so you can get on with
            crocheting.
          </p>
        ),
      },
      {
        type: 'figure',
        images: [
          k('your-place', 'A row counter on round 8, so you never lose your place'),
          k('your-size', 'Ch 70 (78, 86, 94, 102) becomes Ch 94 once you pick your size'),
        ],
      },
      {
        type: 'figure',
        images: [
          k('your-hook', 'Your hook, not the label’s: a 4.5 mm hook needs 860 m of yarn, not 765 m'),
          k('yarns', 'Yarns that will work, with how many balls of each you need'),
        ],
        caption: 'Your place, kept. Only your size, shown. Your hook, not the label’s, and yarns that will actually work.',
      },
      {
        type: 'chapter',
        label: 'Iterating',
        heading: 'Not every pattern can be drawn',
        body: (
          <p>
            The hardest bit by far was the diagrams, because drawing a pattern from its words alone means working out
            shapes the words never actually describe. If you take a ghost doily written out row by row, there’s just
            no way to know the curves from the text, so I learned that not every pattern can be drawn, which is a real
            shame.
          </p>
        ),
      },
      {
        type: 'pivot',
        before: {
          label: 'First idea',
          title: 'Draw the whole pattern',
          body: 'Some shapes, like a ghost doily’s curves, just aren’t in the words, and guessing them would break my one rule of never guessing.',
        },
        after: {
          label: 'What I changed',
          title: 'Draw the row you’re on instead',
          body: 'A single row can always be drawn, and honestly that’s what helps most when you’re stuck.',
        },
      },
      {
        type: 'text',
        heading: 'Testing with my granny didn’t go to plan',
        body: (
          <p>
            When I sat down to test it with her, her pattern was too big so nothing happened, and the sign-in link
            didn’t work for her either, so we never even got as far as the app. That was totally my set-up, not her,
            and it taught me to test the whole journey, from signing in to adding a real pattern, before worrying
            about the clever bits.
          </p>
        ),
      },
      {
        type: 'text',
        heading: 'Drawing crochet, one rule at a time',
        body: (
          <p>
            Getting a diagram right means getting all of crochet’s symbols right, and there are loads. Every stitch
            has to be drawn at its own height, an increase is one V sitting on its stitch, a decrease’s legs land on
            the two stitches it uses up, and every row sits on the row below, so that row changes how the next one
            gets drawn. I tested with all kinds of real patterns, from a filet blanket to a mosaic chart to a vest in
            six sizes, and went round the loop around 80 times on the diagrams alone.
          </p>
        ),
      },
      {
        type: 'text',
        heading: 'Render, look, fix, again',
        body: (
          <>
            <p>
              With no AI to fill in the gaps, I had to teach the code the rules of crochet, one at a time. I studied
              how real designers write: a filet blanket with its own abbreviations, a vest in six sizes, a mosaic
              chart, a chart made in Excel.
            </p>
            <p>
              The loop was always the same: draw a real pattern, stare at it, spot what’s wrong, write the rule and
              draw it again, over and over. After catching the same chart wrong three times in one sitting, I added a
              checklist so every finished chart now gets checked against the pattern’s own words, like its stitch
              counts and its “repeat rows 2–5”.
            </p>
          </>
        ),
      },
      {
        type: 'chapter',
        label: 'The outcome',
        heading: 'Live, and built to be trusted',
        body: (
          <p>
            Knot a Problem is live at knotaproblem.app. Behind every answer it gives is a rule, and behind every rule is
            a test.
          </p>
        ),
      },
      {
        type: 'stats',
        items: [
          { value: '600+', label: 'commits' },
          { value: '88', label: 'test files' },
          { value: '4', label: 'kinds of real pattern studied' },
          { value: '2', label: 'months, first commit to live' },
        ],
      },
      {
        type: 'chapter',
        label: 'What I learned',
        heading: 'If it’s easy for my granny, it’s easy for everyone',
        body: (
          <>
            <p>
              <strong>Easy for one person made it easy for everyone.</strong> Designing for my granny gave me the
              tap-a-row gesture, and that turned out to be the simplest way in for anyone.
            </p>
            <p>
              <strong>Saying no to AI in the product made AI in my process more useful.</strong> Not guessing meant
              hundreds of exact rules with a test for each, which is exactly the kind of work AI is brilliant at. AI
              did a lot of the typing and I did the looking, spotting what was off, deciding what the rule should be
              and saying when it was good enough.
            </p>
            <p>
              <strong>What’s next:</strong> launching it on social, then testing with more crocheters beyond my
              family.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'crumbs',
    v2: true,
    teaser: 'A calorie diary that never makes you wait.',
    title: 'Crumbs',
    madeFor: 'For our household',
    bg: C.green,
    intro:
      'I hate MyFitnessPal. Every time you add a food it plays a little animation that lasts about a second, which is fine once, and maddening when you’re logging a whole meal. So I built our own calorie diary: you snap your plate, a receipt or a label and Claude works it out, and everything in it is tuned to how we actually eat.',
    facts: [
      { label: 'My role', value: 'Design and build, solo' },
      { label: 'Made for', value: 'Me and my other half' },
      { label: 'Built with', value: 'Claude Code' },
      { label: 'AI in the app', value: 'Claude, only when needed' },
      { label: 'Food data', value: 'Open Food Facts UK' },
    ],
    tldr: {
      points: [
        { label: 'The problem', body: 'Every food tracker I tried made me wait on every add, didn’t know what we actually buy, and didn’t care about the things I care about.' },
        { label: 'What I did', body: 'Designed and built our own: snap a plate and Claude works it out, nothing animates in your way, and it flags ultra-processed and high FODMAP food.' },
        { label: 'What I learned', body: 'Using it every day shows you things no spec would. The logging sheet and the phone keyboard took four goes to get right, including putting it back how it was.' },
        { label: 'The result', body: 'We log with it every day. It went from first version to on our phones in two days, and it’s had 49 updates since.' },
      ],
      stats: [
        { value: '0', label: 'animations to wait for' },
        { value: '2', label: 'days from first version to our phones' },
        { value: '49', label: 'updates in seven weeks' },
        { value: '1', label: 'tap to send a meal to my other half' },
      ],
    },
    blocks: [
      {
        type: 'chapter',
        label: 'The problem',
        heading: 'Every add took a second I didn’t have',
        body: (
          <>
            <p>
              MyFitnessPal drives me up the wall. Every time you add
              a food it plays an animation that lasts about a second, which doesn’t sound like much until you’re
              logging a coffee, a crumpet and a yoghurt one after the other and sitting there waiting for it each
              time.
            </p>
            <p>
              It also doesn’t know anything about us. It doesn’t know which bread we buy, so every snap is a guess at
              a generic version, and it doesn’t care about the things I care about, like how much ultra-processed food
              I’m eating, or which foods are high FODMAP. And my other half hates tracking full stop, so getting him to
              log anything was never going to happen.
            </p>
          </>
        ),
      },
      {
        type: 'hmw',
        items: [
          'make logging three things as quick as logging one?',
          'make a snapped plate accurate without weighing everything?',
          'let someone who hates tracking still have a diary?',
          'build it around how we eat, not how an app thinks we should?',
        ],
      },
      {
        type: 'chapter',
        label: 'Software that works for you',
        heading: 'Built for one house, on purpose',
        body: (
          <>
            <p>
              This is my favourite thing about building with AI: you can make software that works exactly how you
              need it to, for an audience of two. I made the first version in a day, and it was on both our phones the
              next, running on our own server with one shared passcode and everyone’s diary kept separate.
            </p>
            <p>
              The whole app is built around getting food in quickly. You can snap it, type it like you’d say it
              (“2 oreos and a babybel”), scan a barcode or search, and the things you have all the time sit right at
              the top so they’re one tap away.
            </p>
          </>
        ),
      },
      {
        type: 'figure',
        images: [
          cr('diary', 'The Crumbs diary: 1,061 of 1,900 kcal today, with protein, carbs and fat, and buttons to search, type or snap food'),
          cr('type', 'The logging sheet: pick a meal, tap something you have again, or type something new and Work it out'),
          cr('search', 'Search, with the foods you’ve had before at the top, each with a one-tap add button'),
        ],
        frame: true,
        caption: 'The diary, the logging sheet and search. Nothing animates in your way, and your usuals are always one tap away.',
      },
      {
        type: 'chapter',
        label: 'Speed',
        heading: 'Nothing waits',
        body: (
          <>
            <p>
              The rule I set myself was that the app should never make you wait for it. There are no animations
              between you and the next food, and the screen updates the moment you tap rather than waiting for the
              server to answer, so logging three things really is as quick as logging one.
            </p>
            <p>
              It learns your habits as you go, so the foods you have most sit at the top, there’s a “same as
              yesterday” for each meal, and you can build up a meal in a basket before adding it all at once, with the
              things you usually have alongside it suggested first. In the evening it asks “forget anything?” and
              lists the regulars that aren’t in yet, because the snack you forgot is usually the same snack.
            </p>
          </>
        ),
      },
      {
        type: 'pivot',
        before: {
          label: 'First version',
          title: 'Ask Claude about everything',
          body: 'Every typed food went to Claude, so even the simple ones took a few seconds and cost a little each time.',
        },
        after: {
          label: 'What I changed',
          title: 'Only ask Claude when it’s needed',
          body: 'Foods it already knows match instantly, packets come from Open Food Facts first, and Claude only steps in for photos and the genuinely new stuff.',
        },
      },
      {
        type: 'chapter',
        label: 'Accuracy',
        heading: 'It knows what’s in our fridge',
        body: (
          <>
            <p>
              The genius bit, if I say so myself, is the Kitchen. When we do the big shop I snap the receipt, and
              Crumbs learns the exact products we buy, so when I snap my dinner later it knows it’s our bread and our
              yoghurt, not a generic one. You can snap the fridge and the cupboards too, and then “What can I have?”
              suggests meals from what’s actually in that fit what’s left of your day.
            </p>
            <p>
              When you snap a plate, Claude only asks a follow-up when the answer changes the total, like whether there
              was oil in the pan, rather than quizzing you about everything. And if you log something from a chain like
              Greggs or Pret that isn’t in the food database, it looks up their official nutrition online instead of
              guessing.
            </p>
          </>
        ),
      },
      {
        type: 'figure',
        images: [
          cr('kitchen', 'The Kitchen tab: snap the fridge, add a big shop receipt, and saved meals and recipes'),
          cr('diary-tags', 'Diary entries tagged UPF, with a running count of ultra-processed and high FODMAP food today'),
          cr('progress-last', 'Progress: a week of bars under a 1,900 kcal target, averaging 1,590 a day, with a trend weight'),
        ],
        frame: true,
        caption: 'The Kitchen knows what we buy, every food is quietly checked for ultra-processed and high FODMAP, and Progress shows the week.',
      },
      {
        type: 'chapter',
        label: 'Built for us',
        heading: 'The things I care about, front and centre',
        body: (
          <>
            <p>
              Every food gets checked for whether it’s ultra-processed and whether it’s high FODMAP, and the diary
              keeps a running count for the day against a limit I set. You can tap a tag to see why it was flagged,
              and if it’s got one wrong you can overrule it, because a flag you can’t argue with stops being helpful
              very quickly.
            </p>
            <p>
              And for my other half, who would rather do literally anything than track, I can send a meal straight to
              his diary in one tap when we’ve eaten the same thing. The fridge, the shopping and our saved meals are
              shared, but our diaries are our own.
            </p>
          </>
        ),
      },
      {
        type: 'quote',
        text: 'Software that works exactly how you need it to, for an audience of two.',
      },
      {
        type: 'chapter',
        label: 'Iteration',
        heading: 'Using it every day is the best testing there is',
        body: (
          <>
            <p>
              Because we use it every single day, every rough edge shows up fast. The logging sheet and the phone
              keyboard took me four goes to get right: the text box kept disappearing behind the keyboard, then a tap
              in it closed the sheet, and one of my “fixes” made it worse, so I put it back how it was and made it
              taller instead. It’s not glamorous, but it’s the difference between an app you use and one you give up
              on.
            </p>
            <p>
              I learned to protect the data too. Losing someone’s diary is the worst thing this app could do, so it
              refuses any save that would wipe your settings, keeps a daily backup, and lets you restore earlier
              settings or download everything you’ve logged. And when Claude can’t answer, it says exactly why, rather
              than a vague “something went wrong”.
            </p>
          </>
        ),
      },
      {
        type: 'stats',
        items: [
          { value: '0', label: 'animations to wait for' },
          { value: '2', label: 'days from first version to our phones' },
          { value: '49', label: 'updates in seven weeks' },
          { value: '1', label: 'tap to send a meal to my other half' },
        ],
      },
      {
        type: 'chapter',
        label: 'What’s next',
        heading: 'Room for a few more households',
        body: (
          <>
            <p>
              Crumbs can now invite other households, each completely private and running on their own Claude key, so
              friends can have their own version without ever seeing ours. It’s still built for one house first, and
              I’d like to keep it that way, because that’s exactly why it works.
            </p>
          </>
        ),
      },
    ],
  },
];
