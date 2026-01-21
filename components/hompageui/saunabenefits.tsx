import { Flame, Sofa, ShieldCheck } from "lucide-react";

export function SaunaBenefits() {
  const features = [
    {
      icon: Flame,
      title: "Designed for Home Wellness",
      description:
        "Thoughtfully designed saunas that transform your space into a private wellness retreat.",
    },
    {
      icon: Sofa,
      title: "Comfort by Design",
      description:
        "Ergonomic benches, balanced heat circulation, and natural materials for deep relaxation.",
    },
    {
      icon: ShieldCheck,
      title: "Built to Last",
      description:
        "Crafted from premium wood and reliable heating systems, backed by long-term support.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-3">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                <Icon className="h-6 w-6 text-neutral-900" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-neutral-900">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
