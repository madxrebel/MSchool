import React from 'react';
import { Building2, Hammer, Handshake, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { SCHOOLS } from '../data/schools';

interface PartnersAndStoryProps {
  onOpenBooking?: () => void;
}

/** Our story: school owners first. Keep this to facts you can stand behind. */
const STORY = {
  eyebrow: 'Our Story',
  headline: 'We are school owners first. We built MSchool for our own schools.',
  subheadline:
    'We have been running schools since 2000. We built the system we needed for ourselves, used it every day, and once it worked, we made it available to our partner schools.',
  stages: [
    {
      tag: '2000',
      title: 'We started running schools',
      description:
        'Fees, attendance, results and paperwork, handled by hand every day. We know exactly what a busy school office feels like.',
      Icon: Building2,
      color: '#1a73e8',
    },
    {
      tag: 'Built in-house',
      title: 'We built it for ourselves first',
      description:
        'A system made for our own counters and classrooms, and used daily by our own staff and teachers. If it did not work for us, it did not ship.',
      Icon: Hammer,
      color: '#f29900',
    },
    {
      tag: 'Shared with partners',
      title: 'Then we shared it with other schools',
      description:
        'Once it worked in our schools, we offered it to partner schools, with the same support we would want for ourselves.',
      Icon: Handshake,
      color: '#1e8e3e',
    },
  ],
};

export const PartnersAndStory: React.FC<PartnersAndStoryProps> = () => {
  return (
    <section id="case-study" className="py-16 sm:py-22 bg-white text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f0fe] border border-[#d2e3fc] text-xs font-bold text-[#1a73e8] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{STORY.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202124] tracking-tight mb-3">
            {STORY.headline}
          </h2>

          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
            {STORY.subheadline}
          </p>
        </div>

        {/* Three-step story */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {STORY.stages.map((stage, idx) => (
            <motion.div
              key={stage.tag}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#bdc1c6] shadow-2xs flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-xl bg-white border border-[#dadce0] flex items-center justify-center"
                  style={{ color: stage.color }}
                >
                  <stage.Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#dadce0] text-[#3c4043]">
                  {stage.tag}
                </span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#202124] leading-snug">{stage.title}</h3>
              <p className="text-sm text-[#5f6368] leading-relaxed">{stage.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Real Partner Institutions Grid */}
        <div>
          <div className="text-center mb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5f6368]">
              Active partner schools relying on MSchool every morning
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {SCHOOLS.map((school) => (
              <div
                key={school.name}
                className="w-[calc(50%-0.5rem)] sm:w-48 p-4 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#bdc1c6] hover:shadow-sm transition-all flex flex-col items-center text-center gap-3"
              >
                <img
                  src={school.logo}
                  alt={`${school.name} logo`}
                  loading="lazy"
                  draggable={false}
                  className="keep-theme w-20 h-20 rounded-2xl object-contain bg-white border border-[#e8eaed] p-0.5"
                />
                <div className="text-sm font-bold text-[#202124] leading-snug">{school.name}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
