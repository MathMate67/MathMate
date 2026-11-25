import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, Calculator, BookOpen, Trophy, Sparkles, ShoppingCart, Percent, Ruler, Clock, Home as HomeIcon, Wallet, MapPin, PiggyBank, Smile, GraduationCap, Briefcase, Heart, Lightbulb, Globe, ThumbsUp, MessageSquareText, Swords, ChefHat, BarChart3 } from 'lucide-react';
import { LogoMark, HeroIllustration, DailyLifeArt, LearningArt, ChallengeArt, ShoppingArt, CookingArt, BudgetArt, TravelArt, SavingsArt, KidsArt, StudentsArt, AdultsArt } from '@/components/Illustrations';
import ShoppingDiscountCalculator from '@/components/ShoppingDiscountCalculator';
import BudgetCalculator from '@/components/BudgetCalculator';
import TravelCalculator from '@/components/TravelCalculator';
import SavingsCalculator from '@/components/SavingsCalculator';
import LearningZone from '@/components/LearningZone';
import ChallengeZone from '@/components/ChallengeZone';
import MathMateAssistant from '@/components/MathMateAssistant';
import CookingConverter from '@/components/CookingConverter';
import ProgressTracker from '@/components/ProgressTracker';

type Tool = 'shopping' | 'budget' | 'travel' | 'savings' | 'cooking' | 'learning' | 'challenge' | 'assistant' | 'progress';
type OpenTool = (tool: Tool, category?: string) => void;

const NAV_LINKS = [
  { label: 'Home', href: '#home', icon: HomeIcon },
  { label: 'Daily Life Maths', href: '#daily-life', icon: ShoppingCart },
  { label: 'Learning Zone', href: '#learning', icon: BookOpen },
  { label: 'Challenges', href: '#challenges', icon: Trophy },
];

function Navbar({ onOpen }: { onOpen: OpenTool }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <LogoMark className="w-9 h-9 md:w-10 md:h-10 transition-transform group-hover:rotate-6" />
            <span className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-slate-800">
              Math<span className="text-brand-blue">Mate</span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => onOpen('assistant')}
                className="px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors"
              >
                Assistant
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpen('progress')}
                className="px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors"
              >
                My Progress
              </button>
            </li>
          </ul>

          {/* CTA */}
          <a
            href="#learning"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue text-white text-sm font-bold shadow-soft hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all"
          >
            Start Learning <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-soft animate-fade-up">
          <ul className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-semibold text-slate-700 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors"
                >
                  <link.icon className="w-5 h-5 text-brand-purple" />
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => { setOpen(false); onOpen('assistant'); }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-base font-semibold text-slate-700 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors"
              >
                <MessageSquareText className="w-5 h-5 text-brand-purple" />
                Maths Assistant
              </button>
            </li>
            <li>
              <button
                onClick={() => { setOpen(false); onOpen('progress'); }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-base font-semibold text-slate-700 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors"
              >
                <BarChart3 className="w-5 h-5 text-brand-purple" />
                My Progress
              </button>
            </li>
            <li className="pt-2">
              <a
                href="#learning"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl bg-brand-blue text-white font-bold shadow-soft"
              >
                Start Learning <ArrowRight className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero({ onOpen }: { onOpen: OpenTool }) {
  return (
    <section id="home" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute -top-10 -left-16 w-72 h-72 bg-brand-sky/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 -right-16 w-80 h-80 bg-brand-lilac/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div className="text-center lg:text-left animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-lilac/40 text-sm font-bold text-brand-purple shadow-sm">
            <Sparkles className="w-4 h-4" /> Maths, made friendly
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-800">
            Learn Maths. <span className="text-brand-blue">Use Maths.</span>
            <br />
            Make Life <span className="text-brand-yellow">Easier.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
            MathMate turns everyday numbers into simple, friendly skills — from
            shopping and budgets to quick practice. No pressure, just
            practical maths that clicks.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a
              href="#learning"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-blue text-white text-base font-bold shadow-card hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all"
            >
              Start Learning <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={() => onOpen('challenge')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border-2 border-brand-lilac/50 text-brand-purple text-base font-bold hover:bg-brand-purple/5 hover:scale-105 active:scale-95 transition-all"
            >
              Try a Challenge
            </button>
          </div>

          {/* mini stats */}
          <div className="mt-10 flex gap-8 justify-center lg:justify-start">
            {[
              { n: '5', l: 'Everyday calculators' },
              { n: '13', l: 'Learning topics' },
              { n: '3', l: 'Ways to learn' },
            ].map((s) => (
              <div key={s.l} className="text-center lg:text-left">
                <div className="font-display text-2xl font-extrabold text-slate-800">{s.n}</div>
                <div className="text-sm text-slate-500 font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div className="relative animate-pop">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/10 via-brand-purple/10 to-brand-yellow/10 rounded-[3rem] blur-2xl" />
          <div className="relative bg-white/70 backdrop-blur-sm rounded-[2.5rem] border border-white shadow-card p-6 md:p-10">
            <HeroIllustration className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    id: 'daily-life',
    title: 'Daily Life Maths',
    desc: 'See the maths hiding in shopping, cooking, travel and bills. Practical examples that make numbers useful, not scary.',
    href: '#daily-life',
    cta: 'Explore everyday maths',
    accent: 'yellow',
    icon: Calculator,
    Art: DailyLifeArt,
  },
  {
    id: 'learning',
    title: 'Learning Zone',
    desc: 'Step-by-step lessons on the fundamentals — arithmetic, fractions, percentages and more, explained in plain language.',
    href: '#learning',
    cta: 'Start a lesson',
    accent: 'blue',
    icon: BookOpen,
    Art: LearningArt,
  },
  {
    id: 'challenges',
    title: 'Challenge Zone',
    desc: 'Test yourself with quick multiple-choice questions. Use hints, earn points, and beat your best score.',
    href: '#challenges',
    cta: 'Take a challenge',
    accent: 'purple',
    icon: Trophy,
    Art: ChallengeArt,
  },
] as const;

const ACCENT: Record<string, { bg: string; ring: string; text: string; btn: string }> = {
  yellow: { bg: 'bg-brand-sand', ring: 'border-amber-200', text: 'text-amber-600', btn: 'bg-brand-yellow hover:bg-amber-400' },
  blue: { bg: 'bg-blue-50', ring: 'border-blue-200', text: 'text-brand-blue', btn: 'bg-brand-blue hover:bg-blue-600' },
  purple: { bg: 'bg-violet-50', ring: 'border-violet-200', text: 'text-brand-purple', btn: 'bg-brand-purple hover:bg-violet-600' },
};

function Features({ onOpen }: { onOpen: OpenTool }) {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-lilac/15 text-sm font-bold text-brand-purple">
            Three ways to grow
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-slate-800">
            Everything you need to master maths
          </h2>
          <p className="mt-3 text-slate-600">
            Pick a path and start wherever feels comfortable. Each area builds real confidence with real numbers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((f, i) => {
            const a = ACCENT[f.accent];
            return (
              <article
                key={f.id}
                id={f.id === 'challenges' ? f.id : `feature-${f.id}`}
                className={`group relative scroll-mt-24 bg-white rounded-4xl border-2 ${a.ring} p-6 md:p-8 shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 animate-fade-up`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className={`absolute -top-5 left-6 w-12 h-12 rounded-2xl ${a.bg} ${a.ring} border-2 flex items-center justify-center shadow-sm`}>
                  <f.icon className={`w-6 h-6 ${a.text}`} />
                </div>
                <div className={`mt-4 rounded-3xl ${a.bg} p-4 mb-5 overflow-hidden`}>
                  <f.Art className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-800">{f.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{f.desc}</p>
                {f.id === 'daily-life' ? (
                  <a
                    href={f.href}
                    className={`mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold ${a.btn} hover:scale-105 active:scale-95 transition-all`}
                  >
                    {f.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    onClick={() => onOpen(f.id === 'learning' ? 'learning' : 'challenge')}
                    className={`mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold ${a.btn} hover:scale-105 active:scale-95 transition-all`}
                  >
                    {f.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- Section 1: Daily Life Maths ---
const DAILY_CARDS = [
  { id: 'shopping', title: 'Shopping & Discounts', desc: 'Work out sale prices, compare deals and spot the real savings before you reach the checkout.', icon: ShoppingCart, Art: ShoppingArt, tint: 'bg-brand-sand', ring: 'border-amber-200', text: 'text-amber-600' },
  { id: 'budget', title: 'Budget Planning', desc: 'Add your monthly income and expenses, then see what is left and where your money goes.', icon: Wallet, Art: BudgetArt, tint: 'bg-blue-50', ring: 'border-blue-200', text: 'text-brand-blue' },
  { id: 'travel', title: 'Travel Expenses', desc: 'Work out how much fuel a trip needs and what it will cost, step by step.', icon: MapPin, Art: TravelArt, tint: 'bg-violet-50', ring: 'border-violet-200', text: 'text-brand-purple' },
  { id: 'savings', title: 'Savings & Percentages', desc: 'Find a percentage of any amount and see how much you save over the months.', icon: PiggyBank, Art: SavingsArt, tint: 'bg-emerald-50', ring: 'border-emerald-200', text: 'text-emerald-600' },
  { id: 'cooking', title: 'Cooking Measurements', desc: 'Switch between cups, spoons and millilitres, and scale a recipe up or down.', icon: ChefHat, Art: CookingArt, tint: 'bg-brand-sand', ring: 'border-amber-200', text: 'text-amber-600' },
] as const;

function DailyLifeMaths({ onOpen }: { onOpen: OpenTool }) {
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <section id="daily-life" className="scroll-mt-16 py-16 md:py-24 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-sand text-sm font-bold text-amber-600">
            Maths you'll actually use
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-slate-800">
            Daily Life Maths
          </h2>
          <p className="mt-3 text-slate-600">
            The maths behind the moments that fill your day — from the supermarket aisle to your monthly budget.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DAILY_CARDS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => onOpen(c.id)}
              className={`group relative w-full text-left bg-white rounded-4xl border-2 ${c.ring} p-6 shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 animate-fade-up cursor-pointer`}
              style={{ animationDelay: `${i * 110}ms` }}
              aria-label={`${c.title}: open the calculator`}
            >
              <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-blue text-white text-xs font-bold opacity-90 group-hover:opacity-100 transition-opacity">
                <Calculator className="w-3.5 h-3.5" /> Open
              </span>
              <div className={`rounded-3xl ${c.tint} p-3 mb-4 flex items-center justify-center overflow-hidden`}>
                <c.Art className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-xl ${c.tint} ${c.text}`}>
                  <c.icon className="w-4.5 h-4.5" />
                </span>
                <h3 className="font-display text-lg font-bold text-slate-800">{c.title}</h3>
              </div>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">{c.desc}</p>
              <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${c.text} group-hover:gap-2.5 transition-all`}>
                Try it <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Section 2: Learning for Everyone ---
const LEARN_CARDS = [
  { id: 'kids', title: 'Kids', desc: 'Fun, colourful basics that turn counting, adding and shapes into a game. Build confidence from the very first sum.', icon: Smile, Art: KidsArt, tint: 'bg-brand-sand', ring: 'border-amber-200', text: 'text-amber-600', badge: 'Ages 5-10' },
  { id: 'students', title: 'Students', desc: 'School maths made clear — algebra, geometry and problem-solving explained step by step, with practice that sticks.', icon: GraduationCap, Art: StudentsArt, tint: 'bg-blue-50', ring: 'border-blue-200', text: 'text-brand-blue', badge: 'School & college' },
  { id: 'adults', title: 'Adults', desc: 'Percentages, ratios, simple interest and practical everyday calculations you can rely on.', icon: Briefcase, Art: AdultsArt, tint: 'bg-violet-50', ring: 'border-violet-200', text: 'text-brand-purple', badge: 'Everyday life' },
] as const;

function LearningForEveryone({ onOpen }: { onOpen: OpenTool }) {
  return (
    <section id="learning" className="scroll-mt-16 py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute -left-20 top-1/3 w-72 h-72 bg-brand-sky/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-10 w-72 h-72 bg-brand-lilac/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-lilac/15 text-sm font-bold text-brand-purple">
            For every age and stage
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-slate-800">
            Learning for Everyone
          </h2>
          <p className="mt-3 text-slate-600">
            Whether you're just starting out or brushing up, MathMate meets you where you are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {LEARN_CARDS.map((c, i) => (
            <article
              key={c.id}
              className={`group relative bg-white rounded-4xl border-2 ${c.ring} p-6 md:p-8 shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 animate-fade-up`}
              style={{ animationDelay: `${i * 130}ms` }}
            >
              <span className={`absolute top-5 right-5 px-3 py-1 rounded-full ${c.tint} ${c.text} text-xs font-bold`}>
                {c.badge}
              </span>
              <div className={`rounded-3xl ${c.tint} p-4 mb-5 overflow-hidden`}>
                <c.Art className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-2.5">
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl ${c.tint} ${c.text}`}>
                  <c.icon className="w-5 h-5" />
                </span>
                <h3 className="font-display text-xl font-bold text-slate-800">{c.title}</h3>
              </div>
              <p className="mt-3 text-slate-600 leading-relaxed">{c.desc}</p>
              <button
                onClick={() => onOpen('learning', c.id)}
                className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${c.text} hover:gap-3 transition-all`}
              >
                Start here <ArrowRight className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Section: Assistant and Progress ---
function HelpAndProgress({ onOpen }: { onOpen: OpenTool }) {
  return (
    <section id="help" className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
        <button
          onClick={() => onOpen('assistant')}
          className="group text-left rounded-4xl border-2 border-violet-200 bg-violet-50/60 p-6 md:p-8 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-brand-purple text-white">
            <MessageSquareText className="w-6 h-6" />
          </span>
          <h3 className="mt-4 font-display text-xl font-bold text-slate-800">Maths Assistant</h3>
          <p className="mt-2 text-slate-600 leading-relaxed">Search a topic, read a clear explanation with an example, or ask for a practice question. It is a built-in help library, not a live AI service.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-purple group-hover:gap-3 transition-all">Open the assistant <ArrowRight className="w-4 h-4" /></span>
        </button>
        <button
          onClick={() => onOpen('progress')}
          className="group text-left rounded-4xl border-2 border-emerald-200 bg-emerald-50/60 p-6 md:p-8 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-emerald-500 text-white">
            <BarChart3 className="w-6 h-6" />
          </span>
          <h3 className="mt-4 font-display text-xl font-bold text-slate-800">My Progress</h3>
          <p className="mt-2 text-slate-600 leading-relaxed">See questions attempted, correct answers and points. Saved only in this browser, with no sign-in and no personal details.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 group-hover:gap-3 transition-all">See my progress <ArrowRight className="w-4 h-4" /></span>
        </button>
      </div>
    </section>
  );
}

// --- Section 3: Why MathMate? ---
const WHY_CARDS = [
  { icon: Lightbulb, title: 'Practical, not theoretical', desc: 'Every lesson connects to a real situation — shopping, cooking, travel, bills — so the maths has a clear purpose.', tint: 'bg-amber-100 text-amber-600' },
  { icon: Heart, title: 'Simple, friendly language', desc: 'No jargon, no intimidating formulas. Just clear steps and plain explanations anyone can follow.', tint: 'bg-blue-100 text-brand-blue' },
  { icon: Globe, title: 'Accessible anywhere', desc: 'Learn on your phone, tablet or computer. Short lessons fit into your day, wherever you are.', tint: 'bg-violet-100 text-brand-purple' },
  { icon: ThumbsUp, title: 'Built for confidence', desc: 'Gentle challenges and steady progress help you trust your own maths — one win at a time.', tint: 'bg-emerald-100 text-emerald-600' },
];

function WhyMathMate() {
  return (
    <section id="why" className="py-16 md:py-24 bg-gradient-to-b from-violet-50/60 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-yellow/20 text-sm font-bold text-amber-600">
            Why choose us
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-slate-800">
            Why MathMate?
          </h2>
          <p className="mt-3 text-slate-600">
            We believe maths should feel useful, simple and within reach for everyone. Here's how MathMate makes that happen.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CARDS.map((c, i) => (
            <div
              key={c.title}
              className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 hover:shadow-card hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 110}ms` }}
            >
              <div className={`w-12 h-12 rounded-2xl ${c.tint} flex items-center justify-center mb-4`}>
                <c.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-800">{c.title}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const USES = [
  { icon: ShoppingCart, title: 'Smart Shopping', desc: 'Compare prices, work out discounts and stick to your budget without second-guessing.', color: 'bg-amber-100 text-amber-600' },
  { icon: Percent, title: 'Percentages & Tips', desc: 'Split a bill, leave a fair tip, or decode a sale sign in seconds.', color: 'bg-blue-100 text-brand-blue' },
  { icon: Ruler, title: 'Measuring & DIY', desc: 'Convert units, estimate materials and measure up for home projects.', color: 'bg-violet-100 text-brand-purple' },
  { icon: Clock, title: 'Time & Planning', desc: 'Schedule your day, estimate travel time and stay on top of deadlines.', color: 'bg-emerald-100 text-emerald-600' },
];

function HowItHelps() {
  return (
    <section id="how" className="py-16 md:py-24 bg-gradient-to-b from-blue-50/60 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-yellow/20 text-sm font-bold text-amber-600">
              Why it matters
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
              Maths makes everyday life easier
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              You don't need to be a genius. You just need the right tools and a
              bit of practice. MathMate shows you how the maths you learn shows
              up in real life — so it actually sticks.
            </p>
            <a
              href="#learning"
              className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-purple text-white font-bold shadow-card hover:bg-violet-600 hover:scale-105 active:scale-95 transition-all"
            >
              Start Learning <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {USES.map((u, i) => (
              <div
                key={u.title}
                className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 hover:shadow-card hover:-translate-y-1 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-2xl ${u.color} flex items-center justify-center mb-4`}>
                  <u.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-800">{u.title}</h3>
                <p className="mt-1.5 text-slate-600 text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection({ onOpen }: { onOpen: OpenTool }) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-brand-blue via-brand-purple to-brand-lilac p-10 md:p-14 text-center overflow-hidden shadow-card">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -left-8 w-48 h-48 bg-brand-yellow/30 rounded-full blur-2xl" />
          <h2 className="relative font-display text-3xl sm:text-4xl font-extrabold text-white">
            Ready to make friends with maths?
          </h2>
          <p className="relative mt-3 text-white/90 text-lg max-w-xl mx-auto">
            Start with one lesson or one challenge. No sign-up, no pressure — just maths that finally makes sense.
          </p>
          <a
            href="#learning"
            className="relative mt-7 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-brand-blue font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Start Learning <ArrowRight className="w-5 h-5" />
          </a>
          <button
            onClick={() => onOpen('challenge')}
            className="relative mt-7 sm:ml-3 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/15 border-2 border-white/60 text-white font-bold text-base hover:bg-white/25 hover:scale-105 active:scale-95 transition-all"
          >
            Try a Challenge
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer({ onOpen }: { onOpen: OpenTool }) {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2.5">
              <LogoMark className="w-9 h-9" />
              <span className="font-display text-xl font-extrabold text-white">
                Math<span className="text-brand-sky">Mate</span>
              </span>
            </a>
            <p className="mt-4 text-slate-400 max-w-sm leading-relaxed">
              Learn Maths. Use Maths. Make Life Easier. Friendly, practical maths for every day.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-brand-sky transition-colors">{l.label}</a>
                </li>
              ))}
              <li><button onClick={() => onOpen('assistant')} className="hover:text-brand-sky transition-colors">Maths Assistant</button></li>
              <li><button onClick={() => onOpen('progress')} className="hover:text-brand-sky transition-colors">My Progress</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-3">Get started</h4>
            <a
              href="#learning"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue text-white text-sm font-bold hover:bg-blue-600 transition-colors"
            >
              Start Learning <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MathMate. Made for everyday learners.</p>
          <p className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-yellow" /> Maths, made friendly.
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [tool, setTool] = useState<Tool | null>(null);
  const [learnCat, setLearnCat] = useState<string | null>(null);

  const onOpen: OpenTool = (t, category) => {
    setLearnCat(t === 'learning' ? category ?? null : null);
    setTool(t);
  };
  const close = () => setTool(null);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar onOpen={onOpen} />
      <main>
        <Hero onOpen={onOpen} />
        <Features onOpen={onOpen} />
        <DailyLifeMaths onOpen={onOpen} />
        <LearningForEveryone onOpen={onOpen} />
        <HelpAndProgress onOpen={onOpen} />
        <HowItHelps />
        <WhyMathMate />
        <CTASection onOpen={onOpen} />
      </main>
      <Footer onOpen={onOpen} />

      <ShoppingDiscountCalculator open={tool === 'shopping'} onClose={close} />
      <BudgetCalculator open={tool === 'budget'} onClose={close} />
      <TravelCalculator open={tool === 'travel'} onClose={close} />
      <SavingsCalculator open={tool === 'savings'} onClose={close} />
      <CookingConverter open={tool === 'cooking'} onClose={close} />
      <LearningZone open={tool === 'learning'} onClose={close} initialCategory={learnCat} />
      <ChallengeZone open={tool === 'challenge'} onClose={close} />
      <MathMateAssistant open={tool === 'assistant'} onClose={close} />
      <ProgressTracker open={tool === 'progress'} onClose={close} />
    </div>
  );
}

export default App;
