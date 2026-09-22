import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Home,
  ShoppingBag,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { PillarType } from '../types';

interface PillarDiscoveryProps {
  onSelectPillar: (pillar: PillarType) => void;
  onOpenPostListing: () => void;
}

type PillarCard = {
  id: PillarType;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  accent: string;
  examples: string;
};

const pillars: PillarCard[] = [
  {
    id: 'marketplace',
    eyebrow: 'Buy & sell',
    title: 'Marketplace',
    description: 'Products, vehicles, equipment and everyday finds from local sellers.',
    image: '/images/pillar-marketplace.web.jpg',
    icon: ShoppingBag,
    accent: 'from-amber-500 to-orange-600',
    examples: 'Cars · Tech · Fashion · Agriculture',
  },
  {
    id: 'business',
    eyebrow: 'Find trusted brands',
    title: 'Business directory',
    description: 'Discover credible companies, shops, clinics, restaurants and partners.',
    image: '/images/pillar-business.web.jpg',
    icon: Building2,
    accent: 'from-sky-500 to-indigo-600',
    examples: 'Companies · Retail · Health · Hospitality',
  },
  {
    id: 'service',
    eyebrow: 'Hire with confidence',
    title: 'Services directory',
    description: 'Compare skilled professionals for the work that keeps life moving.',
    image: '/images/pillar-services.web.jpg',
    icon: Wrench,
    accent: 'from-emerald-500 to-teal-600',
    examples: 'Trades · Solar · Repairs · Logistics',
  },
  {
    id: 'property',
    eyebrow: 'Make your next move',
    title: 'Property directory',
    description: 'Search homes, rentals, land and commercial space across the region.',
    image: '/images/pillar-property.web.jpg',
    icon: Home,
    accent: 'from-violet-500 to-fuchsia-600',
    examples: 'Homes · Rentals · Land · Commercial',
  },
];

export const PillarDiscovery: React.FC<PillarDiscoveryProps> = ({ onSelectPillar, onOpenPostListing }) => {
  return (
    <section className="pillar-discovery mx-auto w-full max-w-7xl px-4 sm:px-6" aria-labelledby="discovery-heading">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-600">
            <Sparkles className="h-4 w-4" /> One hub. Four ways to move.
          </div>
          <h2 id="discovery-heading" className="font-display text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Everything you need, in one place.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Shop, compare, hire and invest across a trusted regional network built for real-world decisions.
          </p>
        </div>
        <button onClick={onOpenPostListing} className="group inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-800 shadow-sm transition hover:border-amber-300 hover:text-amber-700">
          List your business or property <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <button
              key={pillar.id}
              onClick={() => onSelectPillar(pillar.id)}
              className="pillar-card group relative min-h-[270px] overflow-hidden rounded-[26px] text-left shadow-[0_18px_55px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.2)] focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-200"
            >
              <img src={pillar.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/15" />
              <div className={`absolute right-5 top-5 h-16 w-16 rounded-2xl bg-gradient-to-br ${pillar.accent} opacity-80 blur-2xl transition group-hover:opacity-100`} />
              <div className="relative flex h-full min-h-[270px] flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="mb-7 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                      <Icon className="h-3.5 w-3.5 text-amber-300" /> {pillar.eyebrow}
                    </span>
                    <ArrowRight className="h-5 w-5 text-white/70 transition group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                  <h3 className="max-w-sm font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{pillar.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-200">{pillar.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold text-white/70">
                  <span>{pillar.examples}</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-300"><BadgeCheck className="h-3.5 w-3.5" /> Verified options</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
