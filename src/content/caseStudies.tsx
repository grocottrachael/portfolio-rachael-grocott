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
  | { type: 'liveEdit'; caption?: string }
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

const knotSizes: Record<string, [number, number]> = {"tap-a-row": [918, 922], "the-key": [918, 914], "plain-words": [1600, 636], "diagrams": [1600, 809], "your-place": [918, 646], "your-size": [1392, 694], "your-hook": [918, 798], "yarns": [920, 830]};
/* A Knot a Problem image, with its size so pairs can be laid out at equal heights */
const knotBg: Record<string, string> = {"diagrams": "#a6d4a7", "plain-words": "#f1d16c", "tap-a-row": "#f1d16c", "the-key": "#f1d16c", "yarns": "#899cee", "your-hook": "#8a9ded", "your-place": "#a6d4a7", "your-size": "#8a9ded"};
const k = (name: string, alt: string): Img => ({ src: `/work/knot/${name}.webp`, alt, w: knotSizes[name][0], h: knotSizes[name][1], bg: knotBg[name] });


const smSizes: Record<string, [number, number]> = {"chips": [1700, 1015], "phone-1": [780, 1520], "phone-2": [780, 1520], "phone-3": [780, 1520], "post-008": [720, 960], "post-012": [720, 960], "post-016": [720, 960], "post-019": [720, 960]};
/* A SwatchMaker image */
const sm = (name: string, alt: string): Img => ({ src: `/work/swatchmaker/${name}.webp`, alt, w: smSizes[name][0], h: smSizes[name][1] });

const gSizes: Record<string, [number, number]> = {"annotate": [1560, 980], "theme-botanical": [1120, 760], "theme-chalkboard": [1120, 760], "theme-blueprint": [1120, 760], "theme-watercolor": [1120, 760], "theme-neo-brutalist": [1120, 760], "theme-comic": [1120, 760]};
/* A Graphy image: every chart here is drawn with the real Graphy SDK, on the SDK's own public npm downloads */
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
      'Editable, AI-native charts that developers and their AI agents put into their own products. I’ve been at Graphy since 2021, through every pivot to get here. I design the SDK’s developer experience, and I own the design of graphy.dev.',
    facts: [
      { label: 'Role', value: 'Senior Product Designer' },
      { label: 'At Graphy', value: 'Since April 2021' },
      { label: 'I design', value: 'The SDK’s DX, and graphy.dev' },
      { label: 'I work in', value: 'Claude, on the real SDK' },
    ],
    link: { href: 'https://graphy.dev/', label: 'Visit graphy.dev' },
    tldr: {
      points: [
        { label: 'The context', body: 'Nearly six years at Graphy, through every pivot. AI changed the landscape, and an SDK became the right fit: charts for developers and their AI agents.' },
        { label: 'What I did', body: 'I design the SDK’s developer experience and own graphy.dev. Most proud of point and edit: click any part of a chart and change that thing.' },
        { label: 'How I work', body: 'I design on the real SDK in Claude, and hand over pull requests or a spec with every edge case, pairing with engineers all the way.' },
        { label: 'The result', body: 'The React SDK hit 9.8k npm downloads in one week, up 67% on the week before.' },
      ],
      stats: [
        { value: '9.8k', label: 'npm downloads in one week' },
        { value: '+67%', label: 'on the week before' },
        { value: '58.8k', label: 'downloads, 16 Aug to 1 Nov' },
        { value: '2021', label: 'at Graphy since' },
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
              I’ve been at Graphy since 2021, and I’ve been through all sorts of pivots with them on the way to product-market fit. I designed our web app, then AI changed everything and an SDK became the right fit: charts that developers, and the AI agents they build, can drop into their own products.
            </p>
            <p>
              That meant designing for a whole new audience on a new platform. The people choosing Graphy now read code and docs first, so the developer experience basically is the product, from the API and docs to the defaults and the editing their own users get for free.
            </p>
          </>
        ),
      },
      {
        type: 'chapter',
        label: 'The work I’m proudest of',
        heading: 'Point and edit',
        body: (
          <>
            <p>
              Editing a chart used to mean digging through side panels, and everything was really hard to find. You had to know where a setting lived before you could change it.
            </p>
            <p>
              Now you can click on any part of a chart, like a bar, an axis or the legend, and change that thing right where it is. Working with AI let us move fast enough to make a change that big.
            </p>
          </>
        ),
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
          body: 'Click a bar, an axis or the legend and its controls open right there. Working with AI let us move fast enough to make it.',
        },
      },
      {
        type: 'liveEdit',
        caption:
          'This is the real Graphy editor, running right here. Click a bar, an axis or the background and change it. Drawn on the SDK’s own public weekly downloads from npm.',
      },
      {
        type: 'chapter',
        label: 'Just shipped',
        heading: 'Annotating, made freeform',
        body: (
          <>
            <p>
              Annotations are how a chart tells its story: the arrow that says &ldquo;up 67% on last week&rdquo;, the
              note pinned to a spike. I&rsquo;ve just redesigned annotating to be freeform, so they sit wherever the
              story needs them.
            </p>
          </>
        ),
      },
      {
        type: 'figure',
        images: [g('annotate', 'The same chart with a difference arrow from 25 Oct to 1 Nov, labelled +67.15%')],
        caption: 'A difference arrow works out the change between two bars for you.',
        frame: true,
      },
      {
        type: 'chapter',
        label: 'Going beyond a colour scheme',
        heading: 'Themes',
        body: (
          <>
            <p>
              A theme in Graphy isn’t just a palette. It decides the whole look, from the paper, type and colours to the actual shapes the bars are drawn in, like leaf blades in Botanical, chalk on a board or a blueprint’s hatching. The chart itself doesn’t name a theme, so the same chart can be drawn in any of them.
            </p>
            <p>I designed and built the themes myself as pull requests, and handed them to engineering ready to go.</p>
          </>
        ),
      },
      {
        type: 'figure',
        images: [
          g('theme-botanical', 'The downloads chart in the Botanical theme: bars drawn as leaf blades on grained paper'),
          g('theme-chalkboard', 'The same chart on a chalkboard, drawn in chalk'),
          g('theme-blueprint', 'The same chart as a blueprint, with hatched bars on a blue drafting grid'),

          g('theme-watercolor', 'The same chart in watercolour washes'),
          g('theme-neo-brutalist', 'The same chart in Neo Brutalist: loud pink blocks with a hard black shadow'),
          g('theme-comic', 'The same chart as a comic panel, with halftone dots and black outlines'),
        ],
        caption: 'One chart, six themes. Nothing changed but the theme.',
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
];
