import { auth } from "@/lib/auth";
import { Hero } from "@/components/hero";
import { SaunasCarousel } from "@/components/saunas-carousel";
import { Footer } from "@/components/footer";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-neutral-200">
      {/* Hero Section - Full width with 10px gap on sides */}
      {/* <div className="px-2.5 pt-2.5">
        <Hero user={session?.user ?? null} />
      </div> */}

      {/* Site Container - max-w-6xl for other content */}
      <div className="mx-auto w-full max-w-6xl px-2.5">
        <main className="py-16">
          {/* Saunas Carousel */}
          <SaunasCarousel />
        </main>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
