import Image from "next/image";
import { Phone, Truck, Package, MessageCircle, Wrench, Flame, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SaunaLifestyle() {
  const benefits = [
    {
      icon: Phone,
      text: "Free Consultation",
    },
    {
      icon: Truck,
      text: "Delivery & Installation Across BC",
    },
    {
      icon: Package,
      text: "Canada-Wide Shipping",
    },
  ];
  const steps = [
    {
      icon: MessageCircle,
      title: "Free Consultation",
      description:
        "We help you choose the right sauna for your home, lifestyle and wellness goals.",
    },
    {
      icon: Wrench,
      title: "Delivery & Installation",
      description:
        "Full service delivery and installation across BC. Support every step of the way.",
    },
    {
      icon: Flame,
      title: "Your Daily Ritual",
      description:
        "Unwind, recover, and reset on your schedule — no spa appointments required.",
    },
    {
      icon: Shield,
      title: "Built to Last",
      description:
        "Canadian made, designed for long term durabilty and lasting value in your home.",
    },
  ];

  return (
    <>
      {/* Horizontal Benefits Banner */}
      <div className="w-full bg-[#E9DFD2] py-3 mt-12 rounded-md shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-2 sm:gap-4 md:gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-2">
              {/* Icon + Text container - stacks on mobile, inline on sm+ */}
              <div className="flex flex-col items-center gap-0.5 sm:flex-row sm:gap-2">
                <benefit.icon className="h-4 w-4 shrink-0 text-neutral-900 sm:h-5 sm:w-5" />
                <span className="text-center text-[10px] font-semibold leading-tight tracking-wide text-neutral-900 sm:text-xs md:text-sm">
                  {benefit.text}
                </span>
              </div>
              {/* Vertical divider */}
              {index < benefits.length - 1 && (
                <span className="ml-1 h-8 w-px bg-neutral-900/30 sm:ml-2 sm:h-4 md:ml-6 lg:ml-10" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* <section className="mx-auto max-w-7xl px-6 py-8 md:py-24"> */}
      {/* Modern Image with Overlay Content */}
      {/* <div className="relative min-h-[900px] overflow-hidden rounded-sm bg-neutral-900 shadow-2xl md:aspect-video md:min-h-0">
          {/* Background Image */}
      {/* <Image
        src="https://res.cloudinary.com/dw4ev5whz/image/upload/v1769628155/torontosaunaco/Website_Infographic_ykafve.jpg"
        alt="Sauna interior lifestyle"
        fill
        className="object-cover"
        priority
      /> */}
      {/* </div> */}
      {/* </section> */}





      <section className="mx-auto max-w-7xl px-6 py-8 md:py-24">
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
              <h1 className="font-serif text-3xl font-light italic text-center text-white md:text-5xl lg:text-4xl mb-6 md:mb-8">
                A Simple Path To Your Everyday Wellness.
              </h1>

              <ol className="space-y-4 md:space-y-5">
                {steps.map((step, index) => (
                  <li key={index} className="flex gap-3 md:gap-4">
                    <span className="flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-[#E9DFD2]">
                      <step.icon className="h-4 w-4 md:h-5 md:w-5 text-black" />
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
                  <Button variant="outline" className="w-full border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
