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
      'A web app that reads any crochet pattern with you. Tap the row that has lost you and get it back in plain words, or drawn as a diagram.',
    facts: [
      { label: 'Role', value: 'Design and build, solo' },
      { label: 'Built with', value: 'Next.js, pdf.js, Claude Code' },
      { label: 'First tester', value: 'My granny, 81' },
      { label: 'Status', value: 'Live, in testing' },
    ],
    link: { href: 'https://knotaproblem.app/', label: 'Visit knotaproblem.app' },
    blocks: [
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
        heading: 'Patterns are written in a shorthand nobody remembers',
        body: (
          <>
            <p>
              My granny has crocheted for sixty years and couldn&rsquo;t remember what a pattern meant. Then my cousin
              started learning and got stuck on the stitches. Then I caught myself googling the same terms.
            </p>
            <p>
              Patterns are dense with abbreviations, often in UK or US terms without saying which, with every size
              crammed into brackets. Most people read them as a PDF on a phone, and lose their place the moment they
              put it down.
            </p>
          </>
        ),
      },
      {
        type: 'figure',
        images: [k('plain-words', 'A confusing row of pattern text, and the same row explained in plain English')],
        caption: 'Tap the bit that has lost you and get it back in plain English.',
      },
      {
        type: 'text',
        eyebrow: 'Who it’s for',
        heading: 'Designed for an 81-year-old first',
        body: (
          <>
            <p>
              Designing for my granny means designing for an audience nobody else serves: people with arthritis, low
              vision, dyslexia, tremor or brain fog. It meant big tap targets, the designer&rsquo;s own PDF shown
              faithfully at 1:1, and every explanation in plain words.
            </p>
          </>
        ),
      },
      { type: 'quote', text: 'Accessibility is the spec, not a nice-to-have.' },
      {
        type: 'figure',
        images: [
          k('your-place', 'A row counter on round 8, so you never lose your place'),
          k('your-size', 'Ch 70 (78, 86, 94, 102) becomes Ch 94 once you pick your size'),
        ],
        caption: 'Your place is kept for you, and every line shows only your size.',
      },
      {
        type: 'decisions',
        eyebrow: 'Decisions',
        heading: 'Five calls that shaped it',
        items: [
          {
            title: 'Write for a crocheter, not an engineer',
            body: (
              <>
                An early draft of the site sold the chart engine and the parsing. All true, none of it hers. The person
                landing here has just googled &ldquo;why does my crochet pattern not make sense&rdquo;. She wants to
                know it will help, that it&rsquo;s easy, and that it was made with care.
              </>
            ),
          },
          {
            title: 'It never guesses',
            body: (
              <>
                Crocheters are rightly wary of AI after a flood of fake patterns. So every explanation is ordinary code
                reading the pattern&rsquo;s own words and stitch counts. Where the numbers don&rsquo;t add up, it says
                so instead of inventing something that sounds right.
              </>
            ),
          },
          {
            title: 'Your pattern, on your screen',
            body: (
              <>
                The people most likely to love this are the same people who call out pattern piracy. Uploads are
                private, checked as yours every time they open, and the marketing never films someone else&rsquo;s
                pattern.
              </>
            ),
          },
          {
            title: 'Show the point, not the screen',
            body: (
              <>
                Screenshots drag toolbars into an image whose job is one argument. So the visuals on this page are
                built, not captured: one idea per tile, drawn properly.
              </>
            ),
          },
          {
            title: 'Clear differences read as decisions',
            body: (
              <>
                Near-misses look broken. Making the landing page&rsquo;s rows uniform removed the fault and the
                character together. The fix was to make the differences bigger, not smaller.
              </>
            ),
          },
        ],
      },
      {
        type: 'figure',
        images: [k('diagrams', 'Three stitch diagrams drawn from pattern text: a star, a granny square and flat rows')],
        caption: 'Rows of words become the chart the pattern never came with. The drawings are new, and the app says so.',
      },
      {
        type: 'text',
        eyebrow: 'The details',
        heading: 'Fixing a bug almost nobody would notice',
        body: (
          <>
            <p>
              In the prototype, selecting text in a PDF sometimes went wrong: the highlight drifted above the words.
              The cause was buried in how the PDF viewer sizes its invisible text layer. I pinned that layer to the
              exact pixel size of the page, then tested the fix by measuring positions, not by eye.
            </p>
            <p>
              The people who&rsquo;d notice are the ones holding a hook in one hand and their phone in the other.
            </p>
          </>
        ),
      },
      {
        type: 'figure',
        images: [
          k('your-hook', 'Your hook, not the label’s: a 4.5 mm hook needs 860 m of yarn, not 765 m'),
          k('yarns', 'Yarns that will work, with how many balls of each you need'),
        ],
        caption: 'Tell it your hook and it does the yarn maths, then suggests yarns that will work.',
      },
      {
        type: 'text',
        eyebrow: 'How I built it',
        heading: 'Built with AI, judged by me',
        body: (
          <>
            <p>
              I designed and built it myself, with Claude Code as my pair. I started from a design prototype, mapped
              every behaviour in it, and split what could ship now from what needed a real pattern parser first. Then
              I built it properly: accounts, private uploads, a faithful PDF viewer and a library of your patterns.
            </p>
            <p>
              AI did a lot of the typing. The judgement about what to build, who it&rsquo;s for and when it&rsquo;s
              good enough stayed mine.
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
