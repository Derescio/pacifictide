import { auth } from "@/lib/auth";
import { Hero } from "@/components/shared/hero";
import { FeaturedSaunas } from "@/components/shared/featured-saunas";
import { Footer } from "@/components/shared/footer";
import { SaunaLifestyle } from "@/components/hompageui/saunalifestyle";
import { SaunaBenefits } from "@/components/hompageui/saunabenefits";
import { ContactForm } from "@/components/shared/contact-form";
import { TrustedPartners } from "@/components/shared/trusted-partners";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section - Full width with 10px gap on sides */}
      {/* <div className="px-2.5 pt-2.5">
        <Hero user={session?.user ?? null} />
      </div> */}

      {/* Site Container - max-w-6xl for other content */}
      <div className="mx-auto w-full max-w-6xl px-2.5">
        <main className="py-2.5 md:py-10">
          {/* Featured Saunas Carousel - fetches products with isFeatured: true */}

          <SaunaLifestyle />
          <FeaturedSaunas />
          <SaunaBenefits />
          <h1 className="mb-3 md:text-center font-serif text-2xl font-light italic text-neutral-900 md:text-4xl">Ready to Begin ? Contact Us</h1>
          <ContactForm />
          <TrustedPartners />
        </main>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
