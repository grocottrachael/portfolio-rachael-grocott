import React from 'react';
import { C } from '../components/Shapes';

/*
 * Case studies, written to show how I work: the problem, who it's for, the
 * decisions, the details, and how it was built. A study is a list of blocks
 * so pictures can sit next to the part of the story they belong to.
 */

type Img = { src: string; alt: string; w: number; h: number };

export type Block =
  | { type: 'text'; eyebrow: string; heading: string; body: React.ReactNode }
  | { type: 'figure'; images: Img[]; caption?: string }
  | { type: 'quote'; text: string }
  | { type: 'stats'; items: { value: string; label: string }[] }
  | { type: 'shows'; items: { title: string; body: string }[] }
  | { type: 'decisions'; eyebrow: string; heading: string; items: { title: string; body: React.ReactNode }[] }
  | { type: 'gallery'; eyebrow: string; heading: string; body?: React.ReactNode; images: Img[] };

export type CaseStudy = {
  id: string;
  title: string;
  madeFor: string;
  bg: string;
  intro: string;
  facts: { label: string; value: string }[];
  link?: { href: string; label: string };
  blocks: Block[];
};

const knotSizes: Record<string, [number, number]> = {"tap-a-row": [918, 922], "the-key": [918, 914], "plain-words": [1600, 636], "diagrams": [1600, 809], "your-place": [918, 646], "your-size": [1392, 694], "your-hook": [918, 798], "yarns": [920, 830], "01-tagline": [720, 900], "05-uk-us": [720, 900], "03-key": [720, 900], "12-why": [720, 900]};
/* A Knot a Problem image, with its size so pairs can be laid out at equal heights */
const k = (name: string, alt: string): Img => ({ src: `/work/knot/${name}.webp`, alt, w: knotSizes[name][0], h: knotSizes[name][1] });

export const caseStudies: CaseStudy[] = [
  {
    id: 'knot-a-problem',
    title: 'Knot a Problem',
    madeFor: 'For crocheters',
    bg: C.yellow,
    intro:
      'A crochet pattern reader with no AI inside. It explains any row in plain words and draws it as a diagram, using only what the pattern itself says. Your pattern stays yours.',
    facts: [
      { label: 'Role', value: 'Design and build, solo' },
      { label: 'AI in the app', value: 'None, on purpose' },
      { label: 'Built with', value: 'Claude Code, as my pair' },
      { label: 'First tester', value: 'My granny, 81' },
    ],
    link: { href: 'https://knotaproblem.app/', label: 'Visit knotaproblem.app' },
    blocks: [
      {
        type: 'shows',
        items: [
          { title: 'Very clear UX', body: 'Tap the row that has lost you. Get it back in plain words.' },
          { title: 'Small delights', body: 'Your place kept, only your size shown, the why behind a stitch.' },
          { title: 'No AI inside', body: 'It never guesses, and your pattern never leaves your library.' },
          { title: 'Built with AI', body: 'Paired with Claude Code to write hundreds of exact rules.' },
        ],
      },
      {
        type: 'figure',
        images: [
          k('tap-a-row', 'Tap a row for the help you need: a pattern row with Save my place, Diagram and Explain'),
          k('the-key', 'The Key: every stitch this pattern uses, explained in UK terms'),
        ],
      },
      {
        type: 'text',
        eyebrow: 'The problem',
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
        caption:
          'Tap the bit that has lost you. It doesn’t just read the shorthand out, it says what the stitches do.',
      },
      {
        type: 'text',
        eyebrow: 'Clear UX',
        heading: 'One tap, one answer',
        body: (
          <>
            <p>
              The whole app hangs off a single gesture: tap the row that has lost you. You get three choices and
              nothing else: save my place, see a diagram, or explain it.
            </p>
            <p>
              And because no two patterns are written alike, Easy-read lays every one out the same way: the
              designer&rsquo;s own words, set bigger and calmer, a row at a time, with only your size. Whoever wrote
              it, it reads the same.
            </p>
            <p>
              I designed it for my granny first, which means for people nobody else serves: arthritis, low vision,
              dyslexia, tremor, brain fog. Big tap targets. The designer&rsquo;s own PDF shown faithfully at 1:1, never
              re-flowed into something she doesn&rsquo;t recognise. Text you can make bigger. Every explanation in
              plain words. Accessibility is the spec, not a nice-to-have.
            </p>
          </>
        ),
      },
      {
        type: 'text',
        eyebrow: 'Delight',
        heading: 'The small things that make it feel looked after',
        body: (
          <>
            <p>
              Put it down mid-row and it opens right where you were, on your phone or your laptop. Tell it your size
              once and every line of a six-size pattern shows only your number. Tell it your hook and it works out how
              much yarn you&rsquo;ll really need, then suggests yarns that will work.
            </p>
            <p>
              None of these are big features. They&rsquo;re the moments where something remembers for you, so you can
              get on with crocheting.
            </p>
          </>
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
      },
      {
        type: 'text',
        eyebrow: 'Principles',
        heading: 'No AI inside, and your pattern stays yours',
        body: (
          <>
            <p>
              Crocheters have been burned by AI: fake patterns, and photos of things that were never made. A chatbot
              will give you a confident answer that sounds right and costs you an evening of unpicking. So the app
              never guesses. Every explanation, diagram and stitch count is ordinary code following the rules of
              crochet, reading the pattern&rsquo;s own words and numbers. Where they don&rsquo;t add up, it says so.
            </p>
            <p>
              And designers sell their PDFs for a living. A pattern you add is never published, shared or sold. It has
              no public address, it&rsquo;s checked as yours every time it opens, and removing it deletes the file.
              No adverts, no trackers, and nothing is sent to an AI.
            </p>
          </>
        ),
      },
      { type: 'quote', text: 'A wrong answer is worse than no answer.' },
      {
        type: 'figure',
        images: [k('diagrams', 'Three stitch diagrams drawn from pattern text: a star, a granny square and flat rows')],
        caption: 'Every diagram is drawn from the pattern’s words alone.',
      },
      {
        type: 'text',
        eyebrow: 'Perfectionism',
        heading: 'Render, look, fix, again',
        body: (
          <>
            <p>
              Teaching code to draw a pattern with no model to fill the gaps meant writing the rules of crochet down
              one at a time. I studied how real designers write, not one tidy example: a filet blanket that invents its
              own abbreviations, a vest in six sizes where every number is six numbers, a mosaic chart, a chart made
              in Excel. Two shoulders that both have a &ldquo;Row 6&rdquo;. Row counts that depend on your own
              tension.
            </p>
            <p>
              The loop was always the same: render a real pattern, look hard at the drawing, find what was wrong,
              write the rule, render it again. After catching the chart wrong three times in one sitting, I added a
              checklist: every finished chart is now cross-examined against the pattern&rsquo;s own words, like its
              stitch counts and its &ldquo;repeat rows 2&ndash;5&rdquo;. And before it lights up your row on a
              designer&rsquo;s own chart, five separate checks have to agree, or it shows nothing rather than the
              wrong stitches.
            </p>
          </>
        ),
      },
      {
        type: 'stats',
        items: [
          { value: '600+', label: 'commits' },
          { value: '88', label: 'test files' },
          { value: '4', label: 'kinds of real pattern studied' },
          { value: '2', label: 'months, from first commit to live' },
        ],
      },
      {
        type: 'text',
        eyebrow: 'Built with AI',
        heading: 'I used AI to build something that doesn’t need it',
        body: (
          <>
            <p>
              I designed and built it myself, pairing with Claude Code the whole way. Doing it without guessing meant
              hundreds of exact rules and a test for every one, which is exactly the kind of work AI is brilliant at
              helping with.
            </p>
            <p>
              AI did a lot of the typing. I did the looking: rendering real patterns, spotting what was off, deciding
              what the rule should be, and saying when it was good enough.
            </p>
          </>
        ),
      },
      {
        type: 'gallery',
        eyebrow: 'Telling people about it',
        heading: 'One point per post',
        body: <>A set of posts for Instagram, each making one point a crocheter would recognise.</>,
        images: [
          k('01-tagline', 'Never get stuck reading a crochet pattern again'),
          k('05-uk-us', 'Your pattern says dc: the same word in UK and US terms'),
          k('03-key', 'The key: every stitch this pattern uses, in its own terms'),
          k('12-why', 'Why I built it: it started with (2sc, inc) x5'),
        ],
      },
    ],
  },
];
