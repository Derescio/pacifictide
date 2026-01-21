import { AutoScroll } from "@/components/shared/auto-scroll";
import { ContactForm } from "@/components/shared/contact-form";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-neutral-50">
            <AutoScroll offsetY={150} />
            <div className="mx-auto w-full max-w-6xl px-6 py-16">
                {/* Header */}
                <div className="mb-12 text-center">
                    <p className="mb-3 text-sm uppercase tracking-widest text-amber-500">
                        CONNECT WITH US
                    </p>
                    <h1 className="font-serif text-4xl font-light italic text-neutral-900 md:text-5xl">
                        Get in Touch
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
                        Whether you seek a private sanctuary or a commercial centerpiece, our
                        consultants are ready to tailor the Pacific Tide experience to your vision.
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Left Column - Contact Form */}
                    <ContactForm />

                    {/* Right Column - Contact Information */}
                    <div className="space-y-8">
                        {/* Headquarters */}
                        <div className="rounded-lg bg-white p-8 shadow-sm">
                            <p className="mb-4 text-xs uppercase tracking-widest text-amber-500">
                                PACIFIC TIDE
                            </p>
                            <h2 className="mb-4 font-serif text-2xl italic text-neutral-900">
                                Vancouver, BC
                            </h2>
                            <div className="space-y-3 text-neutral-600">
                                <div className="flex items-start gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="mt-0.5 h-5 w-5 shrink-0"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                        />
                                    </svg>
                                    <a href="tel:+16045551234" className="hover:text-amber-500">
                                        +1 (604) 867-5762
                                    </a>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="mt-0.5 h-5 w-5 shrink-0"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:info@pacifictide.com"
                                        className="hover:text-amber-500"
                                    >
                                        hello@pacifictide.ca
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="rounded-lg bg-white p-8 shadow-sm">
                            <p className="mb-4 text-xs uppercase tracking-widest text-amber-500">
                                Business Hours
                            </p>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between text-neutral-700">
                                    <span>Monday — Friday</span>
                                    <span className="font-medium">09:00 — 18:00</span>
                                </div>
                                <div className="flex items-center justify-between text-neutral-700">
                                    <span>Saturday</span>
                                    <span className="font-medium">10:00 — 16:00</span>
                                </div>
                                {/* <div className="flex items-center justify-between text-neutral-700">
                                    <span>Sunday</span>
                                    <span className="font-medium">By Appointment Only</span>
                                </div> */}
                            </div>
                        </div>

                        {/* Showrooms */}
                        <div className="rounded-lg bg-white p-8 shadow-sm">
                            <p className="mb-4 text-xs uppercase tracking-widest text-amber-500">
                                Nationwide
                            </p>
                            <div className="flex flex-wrap gap-2 text-sm text-neutral-700">
                                <span>Vancouver</span>
                                <span className="text-neutral-300">|</span>
                                <span>Toronto</span>
                                {/* <span className="text-neutral-300">|</span>
                                <span>Calgary</span>
                                <span className="text-neutral-300">|</span>
                                <span>Montreal</span> */}
                            </div>
                            {/* <button className="mt-4 text-sm font-medium text-amber-500 hover:text-amber-600">
                                VIEW ALL LOCATIONS
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}