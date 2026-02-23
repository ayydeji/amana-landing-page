import { Check } from "lucide-react";

const nonComplianceCosts = [
  { label: "Typical HMRC fine", value: "£5,000+" },
  { label: "Legal representation", value: "£10,000+" },
  { label: "Public naming on register", value: "Priceless", isItalic: true },
  { label: "Lost client trust", value: "Priceless", isItalic: true },
];

const systemBenefits = [
  "Complete compliance build",
  "Staff training & certificates",
  "12-month guarantee",
  "90-day expert support",
];

export function Comparison() {
  return (
    <section id="comparison" className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center lg:mb-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime">
            The Real Cost
          </p>
          <h2 className="font-(family-name:--font-display) text-3xl leading-[1.1] text-text sm:text-4xl lg:text-5xl">
            The cost of getting caught vs. the cost of getting covered.
          </h2>
        </div>

        {/* Comparison grid */}
        <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
          {/* Left card - Cost of non-compliance */}
          <div className="rounded-2xl border border-border/50 bg-bg-card p-6 sm:p-8 lg:p-10">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-red sm:mb-8">
              Cost of Non-Compliance
            </p>
            <div className="space-y-0">
              {nonComplianceCosts.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between py-4 sm:py-5 ${
                    index < nonComplianceCosts.length - 1
                      ? "border-b border-border/50"
                      : ""
                  }`}
                >
                  <span className="text-sm text-text-dim sm:text-base">{item.label}</span>
                  <span
                    className={`font-(family-name:--font-display) text-lg text-text sm:text-xl ${
                      item.isItalic ? "italic" : ""
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* VS divider */}
          <div className="flex items-center justify-center py-2 lg:px-8 lg:py-0">
            <span className="font-(family-name:--font-display) text-xl text-text-faint lg:text-2xl">
              vs.
            </span>
          </div>

          {/* Right card - The Inspection-Ready System */}
          <div className="rounded-2xl border border-lime/30 bg-bg-card p-6 sm:p-8 lg:p-10">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-lime sm:mb-8">
              The Inspection-Ready System
            </p>
            <div className="space-y-0">
              {systemBenefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className={`flex items-center justify-between py-4 sm:py-5 ${
                    index < systemBenefits.length - 1
                      ? "border-b border-border/50"
                      : ""
                  }`}
                >
                  <span className="text-sm text-text-dim sm:text-base">{benefit}</span>
                  <Check className="h-5 w-5 text-lime" strokeWidth={2.5} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
