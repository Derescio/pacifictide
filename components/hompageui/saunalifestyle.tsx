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
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      {/* Modern Image with Overlay Content */}
      <div className="relative min-h-[600px] overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl md:aspect-21/9 md:min-h-0">
        {/* Background Image */}
        <Image
          src="https://res.cloudinary.com/dw4ev5whz/image/upload/v1762459566/torontosaunaco/stoves/LBench_sugkql.jpg"
          alt="Sauna interior lifestyle"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay - Stronger on mobile for better readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/60 to-black/50 md:from-black/60 md:via-black/60 md:to-black/40" />

        {/* Content Overlay */}
        <div className="relative z-10 flex h-full flex-col justify-center px-6 py-12 md:px-16 lg:px-20">
          <div className="max-w-2xl">
            <h1 className="font-serif text-3xl font-light italic text-white md:text-5xl lg:text-4xl mb-6 md:mb-8">
              Designed to Fit Your Life
            </h1>

            <ol className="space-y-4 md:space-y-5">
              {steps.map((step, index) => (
                <li key={index} className="flex gap-3 md:gap-4">
                  <span className="flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs md:text-sm font-semibold text-black">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium font-serif text-white text-base md:text-lg">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base font-semibold text-white/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3">
              <Link href="/saunas" className="w-full sm:w-auto">
                <Button variant="default" className="w-full border-amber-200 border text-white bg-white/10 hover:bg-white/20">
                  View Saunas
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-white/40 text-white bg-white/10 hover:bg-white/20">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
