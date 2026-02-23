import { ArrowRight, Check } from "lucide-react";

const reassurances = [
  "Free gap report",
  "20 minutes at your office",
  "12-month workmanship guarantee",
];

export function CTA() {
  return (
    <section id="cta" className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <h2 className="font-(family-name:--font-display) mb-8 text-4xl leading-[1.1] text-text sm:text-5xl lg:text-6xl">
            Find out where you stand.
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-text-dim lg:text-xl">
            Book a free 20-minute gap report. We'll tell you exactly what HMRC
            would flag — and you keep the report whether or not we work
            together.
          </p>

          {/* CTA Button */}
          <a
            href="https://cal.com/muhammad-kamal-amana/amana-complience-gap-audit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-lime px-8 py-4 text-base font-semibold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-dim hover:shadow-lg hover:shadow-lime/20 sm:px-10 sm:py-5 sm:text-lg"
          >
            Get a Free Gap Report
            <ArrowRight className="h-5 w-5" />
          </a>

          {/* Reassurances */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {reassurances.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-lime" strokeWidth={2.5} />
                <span className="text-sm text-text-dim">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
