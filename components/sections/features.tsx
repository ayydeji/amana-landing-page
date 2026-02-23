const coreBuildItems = [
  {
    title: "Bespoke Risk Assessment",
    description:
      "Specific to your firm, area, client mix, and transaction types",
  },
  {
    title: "AML Policy & Procedures Manual",
    description:
      "Complete policy document covering every regulatory requirement",
  },
  {
    title: "CDD Checklists",
    description: "Step-by-step for every transaction type your team handles",
  },
  {
    title: "Sanctions & PEP Screening Setup",
    description:
      "Process and tools to screen every client against the UK sanctions list",
  },
  {
    title: "Nominated Officer Framework",
    description:
      "Terms of reference and SAR decision framework for your appointed officer",
  },
  {
    title: "Staff AML Training",
    description:
      "Half-day session with individual certificates and attendance records",
  },
];

const bonusItems = [
  {
    title: "The HMRC Inspection File",
    description:
      "Every document tabbed and indexed in the exact order HMRC requests during an inspection",
  },
  {
    title: "Inspection Day Playbook",
    description:
      "What HMRC asks, what they're really testing, what to say if you don't know an answer",
  },
  {
    title: "New Joiner Induction Pack",
    description:
      "Ready-made pack for every new hire — AML overview, procedures, sign-off form",
  },
  {
    title: "Suspicious Activity Toolkit",
    description:
      "One-page flowchart: what to do when something doesn't look right",
  },
  {
    title: "90-Day Support Line",
    description:
      "Call or email us with any compliance question for 3 months after the build",
  },
  {
    title: "Quarterly Regulatory Alerts",
    description:
      "Any regulation changes that affect your sector — delivered to your inbox",
  },
];

function FeatureCell({
  item,
  index,
  totalItems,
  columns = 3,
}: {
  item: { title: string; description: string };
  index: number;
  totalItems: number;
  columns?: number;
}) {
  const isTopRow = index < columns;
  const isLeftEdge = index % columns === 0;
  const isBottomRow = index >= totalItems - columns;
  const isRightEdge = (index + 1) % columns === 0;

  // Corner radius classes
  const isTopLeft = index === 0;
  const isTopRight = index === columns - 1;
  const isBottomLeft = index === totalItems - columns;
  const isBottomRight = index === totalItems - 1;

  return (
    <div
      className={`relative flex flex-col bg-bg-card p-6 transition-all duration-300 hover:z-10 hover:scale-105 lg:p-8
        ${!isTopRow ? "border-t border-border/50" : ""}
        ${!isLeftEdge ? "lg:border-l lg:border-border/50" : ""}
        ${!isTopRow || index >= columns ? "border-t border-border/50 lg:border-t-0" : ""}
        ${index > 0 ? "border-t border-border/50" : ""}
        lg:border-t-0
        ${!isBottomRow ? "lg:border-b lg:border-border/50" : ""}
        ${isTopLeft ? "rounded-t-2xl lg:rounded-tl-2xl lg:rounded-tr-none" : ""}
        ${isTopRight ? "lg:rounded-tr-2xl" : ""}
        ${isBottomLeft ? "lg:rounded-bl-2xl" : ""}
        ${isBottomRight ? "rounded-b-2xl lg:rounded-br-2xl lg:rounded-bl-none" : ""}
      `}
    >
      <h3 className="mb-2 text-base font-semibold text-text">{item.title}</h3>
      <p className="text-sm leading-relaxed text-text-dim">
        {item.description}
      </p>
    </div>
  );
}

function BonusCell({
  item,
  index,
  totalItems,
}: {
  item: { title: string; description: string };
  index: number;
  totalItems: number;
}) {
  const columns = 3;
  const isLeftEdge = index % columns === 0;
  const isBottomRow = index >= totalItems - columns;

  // Corner radius classes
  const isTopLeft = index === 0;
  const isTopRight = index === columns - 1;
  const isBottomLeft = index === totalItems - columns;
  const isBottomRight = index === totalItems - 1;

  return (
    <div
      className={`relative flex flex-col bg-bg-card p-5 transition-all duration-300 hover:z-10 hover:scale-105 lg:p-6
        ${index > 0 ? "border-t border-border/50 lg:border-t-0" : ""}
        ${!isLeftEdge ? "lg:border-l lg:border-border/50" : ""}
        ${!isBottomRow ? "lg:border-b lg:border-border/50" : ""}
        ${isTopLeft ? "rounded-t-2xl lg:rounded-tl-2xl lg:rounded-tr-none" : ""}
        ${isTopRight ? "lg:rounded-tr-2xl" : ""}
        ${isBottomLeft ? "lg:rounded-bl-2xl" : ""}
        ${isBottomRight ? "rounded-b-2xl lg:rounded-br-2xl lg:rounded-bl-none" : ""}
      `}
    >
      <h4 className="mb-1.5 text-sm font-semibold text-text">{item.title}</h4>
      <p className="text-xs leading-relaxed text-text-dim">
        {item.description}
      </p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        {/* Header */}
        <div className="mb-16 max-w-4xl lg:mb-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime">
            The Inspection-Ready System
          </p>
          <h2 className="font-(family-name:--font-display) mb-6 text-3xl leading-[1.1] text-text sm:text-4xl lg:text-5xl">
            Everything HMRC expects to see — built bespoke, delivered in days.
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-text-dim lg:text-lg">
            Not a template. Not a generic manual. A complete compliance
            framework built around your business, your area, and your client
            types — by someone with a decade in tier-1 banking compliance,
            including Deutsche Bank and NatWest's second line of defence.
          </p>
        </div>

        {/* Core Build Grid */}
        <div className="mb-16 lg:mb-20">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-text-faint">
            Core Build
          </p>
          <div className="rounded-2xl border border-border/50">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {coreBuildItems.map((item, index) => (
                <FeatureCell
                  key={item.title}
                  item={item}
                  index={index}
                  totalItems={coreBuildItems.length}
                  columns={3}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Included at No Extra Cost Grid */}
        <div>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-lime">
            Included at No Extra Cost
          </p>
          <div className="rounded-2xl border border-lime/20 bg-lime/[0.02]">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {bonusItems.map((item, index) => (
                <BonusCell
                  key={item.title}
                  item={item}
                  index={index}
                  totalItems={bonusItems.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
