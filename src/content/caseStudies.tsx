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
  hero?: Img[];
  tldr?: { points: { label: string; body: React.ReactNode }[]; stats?: { value: string; label: string }[] };
};

const knotSizes: Record<string, [number, number]> = {"tap-a-row": [918, 922], "the-key": [918, 914], "plain-words": [1600, 636], "diagrams": [1600, 809], "your-place": [918, 646], "your-size": [1392, 694], "your-hook": [918, 798], "yarns": [920, 830]};
/* A Knot a Problem image, with its size so pairs can be laid out at equal heights */
const knotBg: Record<string, string> = {"diagrams": "#a6d4a7", "plain-words": "#f1d16c", "tap-a-row": "#f1d16c", "the-key": "#f1d16c", "yarns": "#899cee", "your-hook": "#8a9ded", "your-place": "#a6d4a7", "your-size": "#8a9ded"};
const k = (name: string, alt: string): Img => ({ src: `/work/knot/${name}.webp`, alt, w: knotSizes[name][0], h: knotSizes[name][1], bg: knotBg[name] });


const smSizes: Record<string, [number, number]> = {"chips": [1700, 1015], "phone-1": [780, 1520], "phone-2": [780, 1520], "phone-3": [780, 1520], "post-008": [720, 960], "post-012": [720, 960], "post-016": [720, 960], "post-019": [720, 960]};
/* A SWATCHMAKER image */
const sm = (name: string, alt: string): Img => ({ src: `/work/swatchmaker/${name}.webp`, alt, w: smSizes[name][0], h: smSizes[name][1] });

const gSizes: Record<string, [number, number]> = {"point-and-edit": [1600, 980], "annotate": [1560, 980], "theme-botanical": [1120, 760], "theme-chalkboard": [1120, 760], "theme-blueprint": [1120, 760], "theme-watercolor": [1120, 760], "theme-neo-brutalist": [1120, 760], "theme-comic": [1120, 760]};
/* A Graphy image: every chart here is drawn with the real Graphy SDK, on the SDK's own public npm downloads */
const g = (name: string, alt: string): Img => ({ src: `/work/graphy/${name}.webp`, alt, w: gSizes[name][0], h: gSizes[name][1] });

export const caseStudies: CaseStudy[] = [
  {
    id: 'graphy',
    title: 'Graphy SDK',
    madeFor: 'Currently working here',
    bg: C.accent,
    intro:
      'Editable, AI-native charts that developers and their AI agents put into their own products. I’ve been at Graphy for six years, through every pivot to get here. I design the SDK’s developer experience, and I own the design of graphy.dev.',
    facts: [
      { label: 'Role', value: 'Senior Product Designer' },
      { label: 'At Graphy', value: 'Six years' },
      { label: 'I design', value: 'The SDK’s DX, and graphy.dev' },
      { label: 'I work in', value: 'Claude, on the real SDK' },
    ],
    link: { href: 'https://graphy.dev/', label: 'Visit graphy.dev' },
    blocks: [
      {
        type: 'shows',
        items: [
          { title: 'Point and edit', body: 'Click any part of a chart and change that thing.' },
          { title: 'Freeform annotation', body: 'Notes and arrows that sit where the story needs them.' },
          { title: 'Themes', body: 'Whole looks, well beyond a colour scheme.' },
          { title: 'Designed in code', body: 'Specs and PRs built on top of the real SDK.' },
        ],
      },
      {
        type: 'figure',
        images: [g('point-and-edit', 'A bar chart in edit mode: the bars are selected and a menu offers fill colour and bar thickness')],
        caption: 'Point and edit: click the bars and their controls open right there. Every chart on this page is drawn with the real SDK, on its own public weekly downloads from npm.',
        frame: true,
      },
      {
        type: 'text',
        eyebrow: 'The context',
        heading: 'Six years, a few pivots, and a new audience',
        body: (
          <>
            <p>
              I&rsquo;ve been at Graphy for six years, and I&rsquo;ve seen the company through all sorts of pivots on
              the way to product-market fit. I designed our web app. Then AI changed the landscape, and an SDK was the
              right fit: charts that developers, and the AI agents they build, can drop into their own products.
            </p>
            <p>
              That meant designing for a new audience on a new platform. The people choosing Graphy now read code
              and docs first, so the developer experience is the product: the API, the docs, the defaults, and the
              editing their own users get for free.
            </p>
          </>
        ),
      },
      {
        type: 'text',
        eyebrow: 'The work I’m proudest of',
        heading: 'Point and edit',
        body: (
          <>
            <p>
              Editing a chart used to mean side panels, and everything was really hard to find. You had to know where
              a setting lived before you could change it.
            </p>
            <p>
              Now you click on any part of a chart, a bar, an axis, the legend, and change that thing, right where it
              is. Working with AI let us move fast enough to make a change this big possible.
            </p>
          </>
        ),
      },
      {
        type: 'text',
        eyebrow: 'Just shipped',
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
        type: 'text',
        eyebrow: 'Going beyond a colour scheme',
        heading: 'Themes',
        body: (
          <>
            <p>
              A theme in Graphy isn&rsquo;t a palette. It decides the whole look: the paper, the type, the colours,
              even the shapes the bars are drawn in. Leaf blades in Botanical, chalk on a board, a blueprint&rsquo;s
              hatching. The chart itself names no theme, so the same chart draws in any of them.
            </p>
            <p>I designed and built themes as pull requests, and handed them to engineering ready to go.</p>
          </>
        ),
      },
      {
        type: 'figure',
        images: [
          g('theme-botanical', 'The downloads chart in the Botanical theme: bars drawn as leaf blades on grained paper'),
          g('theme-chalkboard', 'The same chart on a chalkboard, drawn in chalk'),
          g('theme-blueprint', 'The same chart as a blueprint, with hatched bars on a blue drafting grid'),
        ],
      },
      {
        type: 'figure',
        images: [
          g('theme-watercolor', 'The same chart in watercolour washes'),
          g('theme-neo-brutalist', 'The same chart in Neo Brutalist: loud pink blocks with a hard black shadow'),
          g('theme-comic', 'The same chart as a comic panel, with halftone dots and black outlines'),
        ],
        caption: 'One chart, six themes. Nothing changed but the theme.',
      },
      {
        type: 'text',
        eyebrow: 'How I work',
        heading: 'I design on top of real charts',
        body: (
          <>
            <p>
              I have the SDK in Claude, so everything I design builds on the real thing. Depending on how complex it
              is, I either open a pull request, or share an artefact with the team that holds the whole design spec
              and every edge case.
            </p>
            <p>
              Figma could never hold all the edge cases a chart has: long labels, empty data, a hundred categories,
              negative values. Now I design on real charts with real data, and I can make anything. And I&rsquo;m
              always pairing with engineers along the way.
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
    title: 'SwatchMaker',
    madeFor: 'For anyone choosing paint',
    bg: C.pink,
    intro:
      'See any paints together before you buy. Over 5,000 real colours from ten UK brands, side by side, with one key to shuffle through them. My first app: it began as a one-shot prototype and became a product people use every day.',
    facts: [
      { label: 'Role', value: 'Design and build, solo' },
      { label: 'Started in', value: 'Figma Make, one prompt' },
      { label: 'Built with', value: 'Claude Code' },
      { label: 'Covers', value: '5,000+ paints, 10 brands' },
    ],
    link: { href: 'https://www.swatchmaker.uk/', label: 'Visit swatchmaker.uk' },
    blocks: [
      {
        type: 'shows',
        items: [
          { title: 'Hit space', body: 'Shuffle real paint pairings. Lock the ones you love.' },
          { title: 'Upload anything', body: 'A wallpaper, a photo, a painting, matched to real paints.' },
          { title: 'Real colours', body: 'Every hex taken from the brand’s own published values.' },
          { title: 'Posts itself', body: 'A daily palette on Instagram, after a yes from me.' },
        ],
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
        type: 'text',
        eyebrow: 'The problem',
        heading: 'Paint is hard to judge, wherever you look at it',
        body: (
          <>
            <p>
              I kept finding screenshots of paint colours scattered through my Figma files, one from each brand&rsquo;s
              website, dropped next to each other so I could compare them. That was my system.
            </p>
            <p>
              The shop doesn&rsquo;t help much either. A colour on a tin or a tiny chip can be really misleading: a
              light colour looks light in your hand, then goes on the wall a lot darker. You only find out once
              it&rsquo;s up.
            </p>
            <p>
              Side by side, big, on your phone, you see the tone of a colour much more honestly, because it sits next
              to another one. And a plain line like And a plain line like &ldquo;a warm grey with a hint of pink&rdquo; tells you what yourldquo;On the blue side of aquaAnd a plain line like &ldquo;a warm grey with a hint of pink&rdquo; tells you what yourrdquo; tells you what your
              eye might miss.
            </p>
          </>
        ),
      },
      {
        type: 'text',
        eyebrow: 'Where it started',
        heading: 'One prompt, at 4am',
        body: (
          <>
            <p>
              I woke up with the idea and made it in Figma Make in about five minutes. That first one-shot was already
              useful to me, and when I shared it on LinkedIn I got seven DMs. So I kept going: from Figma Make to
              Cursor, and eventually to Claude Code.
            </p>
            <p>
              There was one big catch. It looked right, but every hex code in it was made up. A paint app with fake
              colours is worse than no app at all.
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
        type: 'text',
        eyebrow: 'Perfectionism',
        heading: 'Every colour has to be the real colour',
        body: (
          <>
            <p>
              So the very first job was a script to scrape every correct hex code from every brand&rsquo;s website,
              and I still run them today whenever a range changes. Every site is built differently: some publish
              their colours as data, some hide them in the page, some sit behind a wall that needs a real browser.
              The rule never changes: the colour comes from what the brand itself publishes, never guessed.
            </p>
            <p>
              Then the words. Brands describe a colour in a paragraph, or not at all. Every paint now has one plain
              line about its tone, like &ldquo;A soft, pale warm beige&rdquo;, in sentence case and British spelling,
              short enough to fit on one line.
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
        type: 'text',
        eyebrow: 'Delight',
        heading: 'One key, endless pairings',
        body: (
          <>
            <p>
              The heart of it is the spacebar. Hit it and you get a new pairing of real paints, from any brand. Lock
              the colour you love and keep hitting space until its partner turns up. Change your mind and undo. A
              friend of mine is obsessed with smashing the spacebar, which is exactly the point: choosing paint should
              feel like play, not homework.
            </p>
            <p>
              My favourite feature is the upload. Give it any inspiration, a wallpaper, a photo, a painting, and it
              finds the closest real paints from the whole library.
            </p>
          </>
        ),
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
        type: 'text',
        eyebrow: 'AI in my day-to-day',
        heading: 'Claude runs the marketing. I just say yes.',
        body: (
          <>
            <p>
              Posting every day is a job in itself, so I gave it to Claude. I connected it to the Instagram API and
              built it the tools to do the work properly: it renders each post from the live app, so a palette on
              Instagram always matches the site; writes the caption and tags every paint brand; and keeps a log so a
              pairing never repeats. Each day it brings me the post, and my whole job is a yes or a no.
            </p>
            <p>
              The same setup makes reels, recording the real app on a phone, taps and all. That&rsquo;s taken
              SWATCHMAKER onto TikTok, where my second post got 230 views on day two.
            </p>
            <p>
              The best channel so far is still a person, though. After the Product Hunt launch, a designer in my
              community asked to link to SWATCHMAKER from his wife&rsquo;s wallpaper company, Living Quarters, so
              customers can find paints to go with their wallpaper. That link sends most of my traffic.
            </p>
          </>
        ),
      },
      {
        type: 'gallery',
        eyebrow: 'Telling people about it',
        heading: 'A palette a day',
        body: <>A numbered series of real-paint palettes for Instagram, made by code from the app itself.</>,
        images: [
          sm('post-008', 'Palette 008: Charlotte’s Locks and Hague Blue, both Farrow & Ball'),
          sm('post-012', 'Palette 012: Royal Navy by Little Greene and Fine White by Edward Bulmer'),
          sm('post-016', 'Palette 016: Setting Plaster and Brinjal, both Farrow & Ball'),
          sm('post-019', 'Palette 019: Joanna, Ochre Glow and Preference Red, with paint tins'),
        ],
      },
      {
        type: 'text',
        eyebrow: 'Built with AI',
        heading: 'From a one-shot to a product',
        body: (
          <>
            <p>
              SWATCHMAKER is where I learned to build. AI got me from an idea to something useful in five minutes,
              then did the grinding work: scraping thousands of colours, writing thousands of descriptions, rendering
              posts and reels.
            </p>
            <p>
              What it couldn&rsquo;t do was notice the colours were fake, decide a description should fit on one
              line, or know that hitting space should feel like a game. That part was mine.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'knot-a-problem',
    v2: true,
    title: 'Knot a Problem',
    madeFor: 'For crocheters',
    bg: C.yellow,
    intro:
      'A crochet pattern reader with no AI inside. Tap any row and it explains it in plain words or draws it as a diagram, using only what the pattern itself says. Your pattern stays yours.',
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
          body: 'Designed and built a reader where you tap the row that lost you and get it back in plain words, or as a diagram. No AI inside: every answer comes from rules, so it never guesses.',
        },
        {
          label: 'What I learned',
          body: 'My first idea, highlighting the confusing words, was the hardest gesture there is for the people I was designing for. Tapping a whole row became the heart of the app.',
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
              Every designer writes their own way. Their own abbreviations, UK or US terms (often without saying
              which), every size crammed into brackets, repeats marked with stars, or brackets, or both. No two
              patterns look alike, so you learn to read each one from scratch.
            </p>
            <p>
              My granny has crocheted for sixty years and couldn&rsquo;t remember what an increase repeat meant. Then my
              cousin started learning and got stuck on the stitches. Then I caught myself googling the same terms.
              And most people read all this as a PDF on a phone, losing their place the moment they put it down.
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
            I designed for my granny first, which means for people nobody else serves: arthritis, low vision,
            dyslexia, tremor, brain fog. That shaped every question.
          </p>
        ),
      },
      {
        type: 'hmw',
        items: [
          'help someone understand any row of any pattern, whoever wrote it?',
          'explain a pattern without ever guessing at it?',
          'make it work for hands that shake and eyes that tire?',
          'keep a designer’s pattern private, and theirs?',
        ],
      },
      {
        type: 'text',
        heading: 'Why no AI inside',
        body: (
          <>
            <p>
              Crocheters have been burned by AI: fake patterns, and photos of things that were never made. A chatbot
              gives a confident answer that sounds right and costs you an evening of unpicking. So the app never
              guesses. Every explanation, diagram and stitch count is ordinary code following the rules of crochet,
              reading the pattern&rsquo;s own words and numbers. Where they don&rsquo;t add up, it says so.
            </p>
            <p>
              And designers sell their PDFs for a living. A pattern you add is never published, shared or sold. It has
              no public address, it&rsquo;s checked as yours every time it opens, and nothing is sent to an AI.
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
              The whole app hangs off a single gesture: tap the row that has lost you. You get three choices and
              nothing else: save my place, see a diagram, or explain it.
            </p>
            <p>
              Big tap targets. The designer&rsquo;s own PDF shown faithfully at 1:1, never re-flowed into something
              you don&rsquo;t recognise. And because no two patterns are written alike, Easy-read lays every one out
              the same way: the designer&rsquo;s own words, set bigger and calmer, with only your size.
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
        caption: 'Some things are easier to see than to read. Every diagram is drawn from the pattern’s words alone.',
      },
      {
        type: 'text',
        heading: 'The small things that make it feel looked after',
        body: (
          <p>
            Put it down mid-row and it opens right where you were, on your phone or your laptop. Tell it your size once
            and every line of a six-size pattern shows only your number. Tell it your hook and it works out how much yarn
            you&rsquo;ll really need, then suggests yarns that will work. None of these are big features. They&rsquo;re
            the moments where something remembers for you.
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
        heading: 'What I got wrong, and changed',
        body: (
          <p>
            The biggest change came from watching who I was designing for. My first pitch was built on highlighting:
            drag across the words that confuse you.
          </p>
        ),
      },
      {
        type: 'pivot',
        before: {
          label: 'First idea',
          title: 'Highlight the words that lose you',
          body: 'Precise drag-selection across small text is the hardest gesture there is for shaky hands, it’s worse on touch, and it was fragile on a PDF.',
        },
        after: {
          label: 'What I changed',
          title: 'Tap the row. Drag only if you want to.',
          body: 'A plain tap takes the whole row. Dragging still works for just a fragment. The gesture you can manage decides the scope.',
        },
      },
      {
        type: 'text',
        heading: 'Everything has to answer',
        body: (
          <p>
            Testing the prototype, 6 of the 58 bits of text I tried returned nothing: all of them the front matter,
            like tension, notes and measurements. That&rsquo;s exactly what a nervous crocheter reads first. So I made
            every part of a pattern lead somewhere.
          </p>
        ),
      },
      {
        type: 'text',
        heading: 'Render, look, fix, again',
        body: (
          <>
            <p>
              Teaching code to draw a pattern with no model to fill the gaps meant writing the rules of crochet down,
              one at a time. I studied how real designers write: a filet blanket with its own abbreviations, a vest in
              six sizes, a mosaic chart, a chart made in Excel.
            </p>
            <p>
              The loop was always the same: render a real pattern, look hard at the drawing, find what was wrong, write
              the rule, render it again. After catching a chart wrong three times in one sitting, I added a checklist:
              every finished chart is now cross-examined against the pattern&rsquo;s own words, like its stitch counts
              and its &ldquo;repeat rows 2&ndash;5&rdquo;.
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
        heading: 'Design for the hardest hands first',
        body: (
          <>
            <p>
              <strong>Accessibility made it better for everyone.</strong> Designing for arthritis and tremor gave me the
              tap-a-row gesture, and that turned out to be the simplest way in for anyone.
            </p>
            <p>
              <strong>Saying no to AI in the product made AI in my process more useful.</strong> Doing it without
              guessing meant hundreds of exact rules and a test for each, which is exactly the work AI is brilliant at
              helping with. AI did a lot of the typing. I did the looking: spotting what was off, deciding the rule, and
              saying when it was good enough.
            </p>
            <p>
              <strong>What I&rsquo;d do next:</strong> test with more crocheters beyond my family, take the diagrams out
              of their testing phase, and let Easy-read switch a pattern between UK and US terms.
            </p>
          </>
        ),
      },
    ],
  },
];
