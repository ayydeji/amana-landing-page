import { Check } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Free gap report",
    time: "20 MINUTES · AT YOUR OFFICE",
    description:
      "We review your current setup and give you a written report of exactly what HMRC would flag. You keep it whether or not we work together.",
  },
  {
    step: 2,
    title: "We build everything",
    time: "3–5 WORKING DAYS",
    description:
      "Risk assessment, policies, checklists, sanctions setup, training — bespoke to your business. You don't need to prepare anything.",
  },
  {
    step: 3,
    title: "You're inspection-ready",
    time: "GUARANTEED FOR 12 MONTHS",
    description:
      "If HMRC knocked tomorrow, you'd open the folder and everything's there. We come back annually for refresher training and updates.",
  },
];

function StepCard({
  step,
  title,
  time,
  description,
}: {
  step: number;
  title: string;
  time: string;
  description: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border/50 bg-bg-card p-6 lg:p-8">
      {/* Step label */}
      <p className="mb-6 text-sm text-text-faint">Step {step}</p>

      {/* Title */}
      <h3 className="font-(family-name:--font-display) mb-3 text-2xl text-text lg:text-3xl">
        {title}
      </h3>

      {/* Time badge */}
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-lime">
        {time}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed text-text-dim">{description}</p>
    </div>
  );
}

export function Plan() {
  return (
    <section id="plan" className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        {/* Header */}
        <div className="mb-16 max-w-4xl lg:mb-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime">
            How It Works
          </p>
          <h2 className="font-(family-name:--font-display) text-3xl leading-[1.1] text-text sm:text-4xl lg:text-5xl">
            Three steps. Under a week. You're covered.
          </h2>
        </div>

        {/* Steps grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {steps.map((step) => (
            <StepCard
              key={step.step}
              step={step.step}
              title={step.title}
              time={step.time}
              description={step.description}
            />
          ))}
        </div>

        {/* Success line */}
        <div className="rounded-2xl border border-lime/20 bg-lime/[0.03] px-6 py-6 sm:px-8 lg:px-12 lg:py-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime">
              <Check className="h-5 w-5 text-bg" strokeWidth={2.5} />
            </div>
            <p className="font-(family-name:--font-display) text-lg text-text sm:text-xl lg:text-2xl">
              Less than the cost of one fine. Protected for a full year.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://cal.com/muhammad-kamal-amana/amana-compliance-gap-audit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-lime px-8 py-4 text-base font-semibold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-dim hover:shadow-lg hover:shadow-lime/20"
          >
            Get a Free Gap Report
          </a>
        </div>
      </div>
    </section>
  );
}
