import React from 'react';
import { C } from '../components/Shapes';

/*
 * Case studies. Each one is written to show how I work: the problem, who it's
 * for, the decisions (and what they cost), the details, and how it was built.
 */

export type CaseStudy = {
  id: string;
  title: string;
  madeFor: string;
  bg: string;
  intro: string;
  facts: { label: string; value: string }[];
  link?: { href: string; label: string };
  hero: { src: string; alt: string };
  sections: { heading: string; body: React.ReactNode }[];
  decisions?: { title: string; body: React.ReactNode }[];
  gallery?: { src: string; alt: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'knot-a-problem',
    title: 'Knot a Problem',
    madeFor: 'For crocheters',
    bg: C.yellow,
    intro:
      'A web app that reads any crochet pattern with you. Tap the row that has lost you and get it back in plain words or drawn as a diagram.',
    facts: [
      { label: 'My role', value: 'Design and build, solo' },
      { label: 'Built with', value: 'Next.js, pdf.js and Claude Code' },
      { label: 'First tester', value: 'My granny, 81' },
      { label: 'Status', value: 'Live and being tested' },
    ],
    link: { href: 'https://knotaproblem.app/', label: 'Visit knotaproblem.app' },
    hero: {
      src: '/knot-a-problem.webp',
      alt: 'Social post: Put it down. Pick it up. Still on round 3. A granny square diagram that keeps your place.',
    },
    sections: [
      {
        heading: 'The problem',
        body: (
          <>
            <p>
              My granny has crocheted for sixty years and couldn&rsquo;t remember what a pattern meant. Then my cousin
              started learning and got stuck on the stitches. Then I caught myself googling the same terms.
            </p>
            <p>
              Crochet patterns are written in a dense shorthand, often in UK or US terms without saying which, with
              every size crammed into brackets. Most people read them as a PDF on a phone, and lose their place the
              moment they put it down.
            </p>
          </>
        ),
      },
      {
        heading: 'Who it’s for',
        body: (
          <>
            <p>
              Accessibility is the spec, not a nice-to-have. The first tester is 81. Designing for her means designing
              for an audience nobody else serves: people with arthritis, low vision, dyslexia, tremor or brain fog.
            </p>
            <p>
              That decided a lot: big tap targets, the designer&rsquo;s own PDF shown faithfully at 1:1 rather than
              re-flowed, and every explanation in plain words.
            </p>
          </>
        ),
      },
    ],
    decisions: [
      {
        title: 'Write for a crocheter, not an engineer',
        body: (
          <>
            An early draft of the site sold the chart engine and the parsing. All true, none of it hers. The person
            landing here has just googled &ldquo;why does my crochet pattern not make sense&rdquo;. She wants to know it
            will help, that it&rsquo;s easy, and that it was made with care.
          </>
        ),
      },
      {
        title: 'It never guesses',
        body: (
          <>
            Crocheters are rightly wary of AI after a flood of fake patterns. So every explanation is ordinary code
            reading the pattern&rsquo;s own words and stitch counts. Where the numbers don&rsquo;t add up, it says so
            instead of inventing something that sounds right.
          </>
        ),
      },
      {
        title: 'Your pattern, on your screen',
        body: (
          <>
            The people most likely to love this app are the same people who call out pattern piracy, and they&rsquo;re
            right to. Uploads are private and checked as yours every time they open, and the marketing never films
            someone else&rsquo;s pattern.
          </>
        ),
      },
      {
        title: 'Show the point, not the screen',
        body: (
          <>
            Screenshots drag toolbars and panel edges into an image whose job is one argument. So most of the visuals
            are built, not captured: one idea per tile, drawn properly.
          </>
        ),
      },
      {
        title: 'Clear differences read as decisions',
        body: (
          <>
            Near-misses look broken. When the landing page&rsquo;s feature rows looked slightly off, making them
            uniform removed the fault and the character together. The fix was to make the differences bigger, not
            smaller.
          </>
        ),
      },
    ],
    gallery: [
      { src: '/work/knot/01-tagline.webp', alt: 'Never get stuck reading a crochet pattern again' },
      { src: '/work/knot/05-uk-us.webp', alt: 'Your pattern says dc: the same word in UK and US terms' },
      { src: '/work/knot/03-key.webp', alt: 'The key: every stitch this pattern uses, in its own terms' },
      { src: '/work/knot/12-why.webp', alt: 'Why I built it: it started with (2sc, inc) x5' },
    ],
  },
];

export const extraSections: Record<string, { heading: string; body: React.ReactNode }[]> = {
  'knot-a-problem': [
    {
      heading: 'The details',
      body: (
        <>
          <p>
            In the prototype, selecting text in a PDF sometimes went wrong: the highlight drifted above the words. The
            cause was buried in how the PDF viewer sizes its invisible text layer. I pinned that layer to the exact
            pixel size of the page, then tested the fix by measuring positions, not just by checking it looked right.
          </p>
          <p>
            It&rsquo;s the kind of bug most people would never notice. The people who would are the ones holding a hook
            in one hand and their phone in the other.
          </p>
        </>
      ),
    },
    {
      heading: 'How I built it',
      body: (
        <>
          <p>
            I designed and built it myself, with Claude Code as my pair. I started with a design prototype, mapped
            every behaviour in it, and split what could ship now from what needed a real pattern parser first. Then
            I built it properly: accounts, private uploads, a faithful PDF viewer, and a library of your patterns.
          </p>
          <p>
            AI did a lot of the typing. The judgement about what to build, who it&rsquo;s for and when it&rsquo;s good
            enough stayed mine.
          </p>
        </>
      ),
    },
  ],
};
