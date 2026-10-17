import React from 'react';

/**
 * "Trusted by" logo slider.
 *
 * Every image in src/assets/schools/ is picked up automatically. The school name is the file name
 * with hyphens turned into spaces, e.g. "The-Standard-School.jpg" -> "The Standard School".
 * To add a school: drop its logo (png/jpg/jpeg/webp/svg, ideally square) into that folder.
 */
const logoModules = import.meta.glob('../assets/schools/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const SCHOOLS = Object.entries(logoModules)
  .map(([path, src]) => {
    const file = path.split('/').pop() || '';
    const name = file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
    return { name, src };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const BADGE_WIDTH_PX = 400; // rough width of one badge incl. margin, used to fill the track
const SECONDS_PER_BADGE = 6;

const SchoolBadge: React.FC<{ name: string; src: string }> = ({ name, src }) => (
  <div className="flex items-center gap-4 pl-3 pr-7 py-3 mx-3 rounded-3xl bg-white/[0.07] border border-white/10 backdrop-blur-sm shrink-0">
    <img
      src={src}
      alt={`${name} logo`}
      loading="lazy"
      draggable={false}
      className="w-20 h-20 rounded-2xl object-contain bg-white p-0.5 shadow-md"
    />
    <span className="block text-left text-lg sm:text-xl font-bold text-white whitespace-nowrap">{name}</span>
  </div>
);

export const SchoolsMarquee: React.FC = () => {
  if (SCHOOLS.length === 0) return null;

  // Repeat the list until one half is wider than a large screen, then duplicate that half so the
  // -50% loop is seamless no matter how few schools there are.
  const repeats = Math.max(1, Math.ceil(2400 / (SCHOOLS.length * BADGE_WIDTH_PX)));
  const half = Array.from({ length: repeats }, () => SCHOOLS).flat();
  const items = [...half, ...half];

  return (
    <section aria-label="Schools using MSchool" className="bg-[#202124] py-10 sm:py-12">
      <p className="text-center text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#8ab4f8] mb-7 px-4">
        Schools already running on MSchool
      </p>
      <div
        className="marquee-viewport overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div className="marquee-track" style={{ animationDuration: `${half.length * SECONDS_PER_BADGE}s` }}>
          {items.map((school, i) => (
            <SchoolBadge key={`${school.name}-${i}`} name={school.name} src={school.src} />
          ))}
        </div>
      </div>
    </section>
  );
};
