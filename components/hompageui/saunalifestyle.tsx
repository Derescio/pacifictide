import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SaunaLifestyle() {
  const steps = [
    {
      title: "Choose Your Sauna",
      description:
        "Select the size, style, and configuration that fits your home and lifestyle.",
    },
    {
      title: "Simple Installation",
      description:
        "Delivered ready to assemble with clear instructions and expert support if needed.",
    },
    {
      title: "Daily Wellness Ritual",
      description:
        "Unwind, recover, and reset on your schedule — no spa appointments required.",
    },
    {
      title: "A Long-Term Investment",
      description:
        "Built for years of use, adding lasting value to both your health and your home.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
          <Image
            src="https://res.cloudinary.com/dw4ev5whz/image/upload/v1762459566/torontosaunaco/stoves/LBench_sugkql.jpg"
            alt="Sauna interior lifestyle"
            fill
            className="object-cover rounded-2xl"
            priority
          />
        </div>

        {/* Steps */}
        <div>
          <h1 className="font-serif text-4xl font-light italic text-neutral-900 md:text-5xl mb-8">
            Designed to Fit Your Life
          </h1>

          <ol className="space-y-6">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-semibold text-black">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-medium text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {/* Two CTA Buttons. View Saunas and Contact Us */}
          <div className="flex gap-4 mt-8 ml-12">
            <Link href="/saunas">
              <Button variant="default">View Saunas</Button>
            </Link>
            <Link href="/contact">
              <Button variant="default">Contact Us</Button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
