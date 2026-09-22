import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Home,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Wrench,
} from 'lucide-react';
import { Category, Country, PillarType } from '../types';

interface DirectoryLandingPageProps {
  pillar: Extract<PillarType, 'business' | 'service' | 'property'>;
  currentCountry: Country;
  categories: Category[];
  cities: string[];
  listingCount: number;
  selectedCategory: string;
  selectedCity: string;
  minPrice: number | '';
  maxPrice: number | '';
  onCategoryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onMinPriceChange: (value: number | '') => void;
  onMaxPriceChange: (value: number | '') => void;
  onSearch: (query: string) => void;
  onOpenPostListing: () => void;
}

type DirectoryConfig = {
  label: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  accent: string;
  filterLabel: string;
  filterHint: string;
  chips: string[];
  highlights: { label: string; value: string; icon: React.ElementType }[];
};

const directoryConfig: Record<DirectoryLandingPageProps['pillar'], DirectoryConfig> = {
  business: {
    label: 'Business Directory',
    title: 'Find the businesses that keep your city moving.',
    description: 'From trusted clinics and restaurants to logistics partners and growing local brands, compare credible businesses across your region.',
    image: '/images/pillar-business.web.jpg',
    icon: Building2,
    accent: 'from-sky-500 to-indigo-600',
    filterLabel: 'What kind of business are you looking for?',
    filterHint: 'Search companies, shops, clinics, restaurants…',
    chips: ['Logistics & freight', 'Healthcare', 'Restaurants', 'Construction', 'Professional services'],
    highlights: [
      { label: 'Verified profiles', value: '2,840+', icon: BadgeCheck },
      { label: 'Avg. response time', value: '< 2 hrs', icon: CalendarDays },
      { label: 'Customer rating', value: '4.8 / 5', icon: Star },
    ],
  },
  service: {
    label: 'Services Directory',
    title: 'Hire the right expert for the job.',
    description: 'Find reliable tradespeople, installers, repair teams and professional operators with clear service areas and verified reviews.',
    image: '/images/pillar-services.web.jpg',
    icon: Wrench,
    accent: 'from-emerald-500 to-teal-600',
    filterLabel: 'What needs to get done?',
    filterHint: 'Search plumbers, solar installers, builders…',
    chips: ['Solar & backup power', 'Plumbing', 'Electrical', 'Home repairs', 'Cleaning'],
    highlights: [
      { label: 'Active professionals', value: '1,260+', icon: ShieldCheck },
      { label: 'Jobs matched', value: '18k / mo', icon: Sparkles },
      { label: 'Avg. rating', value: '4.9 / 5', icon: Star },
    ],
  },
  property: {
    label: 'Property Directory',
    title: 'Make your next move a better one.',
    description: 'Search homes, apartments, land and commercial spaces with filters that match how people actually choose property.',
    image: '/images/pillar-property.web.jpg',
    icon: Home,
    accent: 'from-violet-500 to-fuchsia-600',
    filterLabel: 'What kind of property are you after?',
    filterHint: 'Search homes, rentals, land, offices…',
    chips: ['Homes for sale', 'Apartments to rent', 'Commercial space', 'Land & farms', 'New developments'],
    highlights: [
      { label: 'Active listings', value: '8,400+', icon: Home },
      { label: 'Locations covered', value: '27 regions', icon: MapPin },
      { label: 'Price transparency', value: '100%', icon: CircleDollarSign },
    ],
  },
};

export const DirectoryLandingPage: React.FC<DirectoryLandingPageProps> = ({
  pillar,
  currentCountry,
  categories,
  cities,
  listingCount,
  selectedCategory,
  selectedCity,
  minPrice,
  maxPrice,
  onCategoryChange,
  onCityChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSearch,
  onOpenPostListing,
}) => {
  const config = directoryConfig[pillar];
  const Icon = config.icon;
  const pillarCategories = categories.filter((category) => category.pillar === pillar);

  return (
    <section className="directory-landing mx-auto w-full max-w-7xl px-4 sm:px-6" aria-labelledby="directory-landing-title">
      <div className="directory-hero relative overflow-hidden rounded-[30px] bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
        <img src={config.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
        <div className={`absolute -right-12 -top-16 h-64 w-64 rounded-full bg-gradient-to-br ${config.accent} opacity-30 blur-3xl`} />
        <div className="relative grid min-h-[360px] items-end gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_.8fr] lg:p-12">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-300">
              <Icon className="h-4 w-4" /> {config.label} <span className="text-white/35">/</span> {currentCountry.name}
            </div>
            <h1 id="directory-landing-title" className="max-w-2xl font-display text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl">{config.title}</h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">{config.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {config.chips.map((chip) => (
                <button key={chip} onClick={() => onSearch(chip)} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-bold text-white/85 backdrop-blur transition hover:border-amber-300/60 hover:bg-white/15 hover:text-white">{chip}</button>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="ml-auto max-w-sm rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-white/70">Live in {currentCountry.name}</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Updated today</span>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-5">
                {config.highlights.map((highlight) => {
                  const HighlightIcon = highlight.icon;
                  return <div key={highlight.label}><HighlightIcon className="mb-3 h-4 w-4 text-amber-300" /><p className="text-lg font-black text-white">{highlight.value}</p><p className="mt-1 text-[10px] leading-4 text-white/55">{highlight.label}</p></div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="directory-filter-panel relative z-10 mx-3 -mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_55px_rgba(15,23,42,0.14)] sm:p-5 lg:mx-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="min-w-0 flex-1 lg:min-w-[300px] lg:flex-[1.4]">
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">{config.filterLabel}</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-amber-400 focus-within:bg-white">
              <Search className="h-5 w-5 shrink-0 text-amber-500" />
              <input onKeyDown={(event) => { if (event.key === 'Enter') onSearch(event.currentTarget.value); }} placeholder={config.filterHint} className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400" />
            </div>
          </div>
          <label className="min-w-[170px] text-xs font-bold text-slate-500">Category
            <span className="relative mt-2 block"><select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)} className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-9 text-sm font-bold text-slate-800 outline-none focus:border-amber-400"><option value="all">All categories</option>{pillarCategories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /></span>
          </label>
          <label className="min-w-[160px] text-xs font-bold text-slate-500">Location
            <span className="relative mt-2 block"><select value={selectedCity} onChange={(event) => onCityChange(event.target.value)} className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-9 text-sm font-bold text-slate-800 outline-none focus:border-amber-400"><option value="all">All locations</option>{cities.map((city) => <option key={city} value={city}>{city}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /></span>
          </label>
          <div className="min-w-[190px] text-xs font-bold text-slate-500">{pillar === 'property' ? 'Budget' : 'Price / value'}
            <div className="mt-2 flex items-center gap-2"><div className="relative flex-1"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">{currentCountry.currencySymbol}</span><input type="number" value={minPrice} onChange={(event) => onMinPriceChange(event.target.value === '' ? '' : Number(event.target.value))} placeholder="Min" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-7 pr-2 text-sm font-bold text-slate-800 outline-none focus:border-amber-400" /></div><span className="text-slate-300">—</span><div className="relative flex-1"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">{currentCountry.currencySymbol}</span><input type="number" value={maxPrice} onChange={(event) => onMaxPriceChange(event.target.value === '' ? '' : Number(event.target.value))} placeholder="Max" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-7 pr-2 text-sm font-bold text-slate-800 outline-none focus:border-amber-400" /></div></div>
          </div>
          <button onClick={() => onSearch(`${config.label} in ${selectedCity === 'all' ? currentCountry.name : selectedCity}`)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-amber-500 hover:text-slate-950"><SlidersHorizontal className="h-4 w-4" /> Apply filters</button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs"><span className="font-bold text-slate-700"><span className="tabular-nums text-amber-600">{listingCount}</span> live listings in {currentCountry.name}</span><span className="inline-flex items-center gap-1.5 text-slate-500"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Verified profiles · transparent pricing · local response</span></div>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl bg-slate-100 px-5 py-4 sm:flex-row sm:items-center"><div><p className="text-sm font-extrabold text-slate-900">Are you a business, service provider or property professional?</p><p className="mt-1 text-xs text-slate-500">Reach buyers in the moments they are ready to decide.</p></div><button onClick={onOpenPostListing} className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-amber-400">Create a listing <ArrowRight className="h-4 w-4" /></button></div>
      <p className="mt-4 text-center text-[11px] font-semibold text-slate-400">Directory data is localized for {currentCountry.subdomain}.marketplacehub.company and updates as vendors respond.</p>
    </section>
  );
};
