import React, { useCallback, useEffect, useRef } from 'react';
import { Crosshair, MapPin, Navigation, Radius, ShieldCheck } from 'lucide-react';
import { Country, Listing } from '../types';
import { ManagedMapView } from './ManagedMapView';

export type RadiusValue = number | 'all';

interface DirectoryMapPanelProps {
  listings: Listing[];
  currentCountry: Country;
  mapCenter: google.maps.LatLngLiteral;
  radiusKm: RadiusValue;
  onRadiusChange: (radius: RadiusValue) => void;
  onSelectListing: (listing: Listing) => void;
}

export const DirectoryMapPanel: React.FC<DirectoryMapPanelProps> = ({
  listings,
  currentCountry,
  mapCenter,
  radiusKm,
  onRadiusChange,
  onSelectListing,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const latitudes = listings.map((listing) => listing.coordinates.lat);
  const longitudes = listings.map((listing) => listing.coordinates.lng);
  const minLat = Math.min(mapCenter.lat - 0.08, ...(latitudes.length ? latitudes : [mapCenter.lat]));
  const maxLat = Math.max(mapCenter.lat + 0.08, ...(latitudes.length ? latitudes : [mapCenter.lat]));
  const minLng = Math.min(mapCenter.lng - 0.12, ...(longitudes.length ? longitudes : [mapCenter.lng]));
  const maxLng = Math.max(mapCenter.lng + 0.12, ...(longitudes.length ? longitudes : [mapCenter.lng]));

  const fallbackPosition = (listing: Listing) => ({
    left: `${12 + ((listing.coordinates.lng - minLng) / Math.max(maxLng - minLng, 0.001)) * 76}%`,
    top: `${18 + (1 - (listing.coordinates.lat - minLat) / Math.max(maxLat - minLat, 0.001)) * 62}%`,
  });

  const renderMapData = useCallback(() => {
    const map = mapRef.current;
    if (!map || !window.google?.maps) return;

    markersRef.current.forEach((marker) => { marker.map = null; });
    markersRef.current = [];
    circleRef.current?.setMap(null);

    const bounds = new window.google.maps.LatLngBounds();
    listings.forEach((listing) => {
      const position = listing.coordinates;
      bounds.extend(position);
      const pin = document.createElement('div');
      pin.className = 'marketplace-map-pin';
      pin.textContent = listing.price > 0 ? `${currentCountry.currencySymbol}${Math.round(listing.price / 1000)}k` : 'View';
      pin.title = listing.title;
      pin.onclick = () => onSelectListing(listing);
      const marker = new window.google.maps.marker.AdvancedMarkerElement({ map, position, content: pin, title: listing.title });
      markersRef.current.push(marker);
    });

    if (radiusKm !== 'all') {
      circleRef.current = new window.google.maps.Circle({
        map,
        center: mapCenter,
        radius: radiusKm * 1000,
        fillColor: '#f59e0b',
        fillOpacity: 0.1,
        strokeColor: '#f59e0b',
        strokeOpacity: 0.7,
        strokeWeight: 2,
      });
      bounds.extend(mapCenter);
      map.fitBounds(bounds, 48);
    } else if (listings.length > 0) {
      map.fitBounds(bounds, 48);
    } else {
      map.setCenter(mapCenter);
      map.setZoom(11);
    }
  }, [currentCountry.currencySymbol, listings, mapCenter, onSelectListing, radiusKm]);

  useEffect(() => {
    renderMapData();
  }, [renderMapData]);

  return (
    <section className="directory-map-panel mx-auto w-full max-w-7xl px-4 sm:px-6" aria-labelledby="map-browse-title">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-600"><Navigation className="h-4 w-4" /> Explore nearby</div>
          <h2 id="map-browse-title" className="font-display text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl">Browse on the map</h2>
          <p className="mt-1 text-sm text-slate-500">See verified listings around {currentCountry.name} and narrow the search by distance.</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          <Radius className="ml-2 h-4 w-4 text-amber-500" />
          {(['all', 5, 10, 25, 50] as RadiusValue[]).map((value) => (
            <button key={value} onClick={() => onRadiusChange(value)} className={`rounded-xl px-3 py-2 text-[11px] font-extrabold transition ${radiusKm === value ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
              {value === 'all' ? 'All' : `${value} km`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.1)] lg:grid-cols-[1.35fr_.65fr]">
        <div className="relative min-h-[360px] bg-slate-100">
          <div className="directory-map-fallback absolute inset-0 overflow-hidden p-5" aria-label="Listing map preview">
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(28deg,transparent_46%,rgba(148,163,184,.22)_47%,rgba(148,163,184,.22)_48%,transparent_49%),linear-gradient(112deg,transparent_44%,rgba(148,163,184,.18)_45%,rgba(148,163,184,.18)_46%,transparent_47%),linear-gradient(rgba(148,163,184,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.18)_1px,transparent_1px)] [background-size:180px_180px,220px_220px,34px_34px,34px_34px]" />
            <div className="relative z-[1] flex items-center justify-between"><span className="rounded-full bg-white/90 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-500 shadow-sm">{currentCountry.name} live map</span><span className="rounded-full bg-slate-950/80 px-3 py-2 text-[10px] font-bold text-white">Interactive preview</span></div>
            <div className="absolute left-[46%] top-[42%] h-24 w-24 rounded-full border border-amber-400/60 bg-amber-300/10 shadow-[0_0_0_16px_rgba(245,158,11,.06)]" />
            {listings.map((listing) => <button key={listing.id} onClick={() => onSelectListing(listing)} style={fallbackPosition(listing)} className="absolute z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-950 px-2.5 py-1.5 text-[10px] font-black text-white shadow-[0_8px_20px_rgba(15,23,42,.28)] transition hover:scale-110 hover:bg-amber-500 hover:text-slate-950">{listing.city}</button>)}
            {listings.length === 0 && <div className="absolute inset-x-8 top-1/2 z-[2] -translate-y-1/2 rounded-2xl border border-white/70 bg-white/90 p-5 text-center text-sm font-bold text-slate-600 shadow-sm">No listings in this radius yet</div>}
          </div>
          <ManagedMapView initialCenter={mapCenter} initialZoom={11} onMapReady={(map) => { mapRef.current = map; renderMapData(); }} className="relative z-[3] h-[390px] w-full bg-transparent" />
          <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-2 text-[11px] font-bold text-slate-700 shadow-sm backdrop-blur"><Crosshair className="h-3.5 w-3.5 text-amber-500" /> {radiusKm === 'all' ? 'Regional view' : `${radiusKm} km radius`}</div>
          <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl bg-slate-950/85 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur"><span className="text-amber-300">{listings.length}</span> listings visible</div>
        </div>
        <div className="max-h-[390px] overflow-y-auto border-t border-slate-100 lg:border-l lg:border-t-0">
          <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur"><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">Nearby results</p><p className="mt-1 text-sm font-bold text-slate-900">{listings.length} matching listings</p></div>
          {listings.slice(0, 8).map((listing) => (
            <button key={listing.id} onClick={() => onSelectListing(listing)} className="flex w-full gap-3 border-b border-slate-100 p-4 text-left transition hover:bg-amber-50/50">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100"><img src={listing.images[0]} alt="" className="h-full w-full object-cover" /><span className="absolute bottom-1 left-1 rounded bg-slate-950/80 px-1.5 py-0.5 text-[9px] font-bold text-white">{listing.city}</span></div>
              <div className="min-w-0"><p className="truncate text-xs font-extrabold text-slate-900">{listing.title}</p><p className="mt-1 truncate text-[11px] text-slate-500">{listing.categoryName} · {listing.regionArea || listing.region}</p><p className="mt-2 flex items-center gap-1 text-[11px] font-black text-slate-800">{currentCountry.currencySymbol}{listing.price.toLocaleString()} {listing.verifiedVendor && <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />}</p></div>
            </button>
          ))}
          {listings.length === 0 && <div className="p-8 text-center text-sm text-slate-500"><MapPin className="mx-auto mb-3 h-6 w-6 text-slate-300" />No listings in this radius yet. Try expanding your search.</div>}
        </div>
      </div>
    </section>
  );
};
