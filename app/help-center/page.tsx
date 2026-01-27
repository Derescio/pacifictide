import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { AutoScroll } from "@/components/shared/auto-scroll"
import Link from "next/link"


export default function HelpCenterPage() {
    return (
        <div className="min-h-screen bg-neutral-50">
            <AutoScroll offsetY={150} />
            <div className="mx-auto w-full max-w-6xl px-6 py-12">
                <div className="mb-10 rounded-3xl bg-white p-8 shadow-sm md:p-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
                        FAQ
                    </p>
                    <h1 className="mt-3 font-serif text-2xl font-light italic text-neutral-900 md:text-3xl">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg">
                        Clear answers to the most common questions about heating, installation,
                        delivery, and daily use. If you need more help, our team is always ready.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                    <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                        <Accordion type="single" collapsible defaultValue="item-1" className="divide-y divide-neutral-100">
                            <AccordionItem value="item-1" className="py-2">
                                <AccordionTrigger className="text-left text-base font-semibold text-neutral-900">
                                    How long does it take to heat up?
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-relaxed text-neutral-600 md:text-base">
                                    On average, it takes about 30 to 40 minutes for the sauna to heat up
                                    to achieve your desired temperature. This heating time is dependent
                                    upon the ambient temperature from which the room begins heating and
                                    the ventilation provided.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="py-2">
                                <AccordionTrigger className="text-left text-base font-semibold text-neutral-900">
                                    What is the temperature range for a sauna?
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-relaxed text-neutral-600 md:text-base">
                                    The temperature for a sauna typically ranges between 150 F and 194 F
                                    (65 – 90 Celsius).
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3" className="py-2">
                                <AccordionTrigger className="text-left text-base font-semibold text-neutral-900">
                                    How does the sauna heat up?
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-relaxed text-neutral-600 md:text-base">
                                    The process for heating your sauna most often involves an electric
                                    heater or wood burning stove that heats a compartment of stones,
                                    which then radiates the heat throughout the room. Once the room reaches
                                    the set temperature, the heater will cycle on and off, typically
                                    operating about 50% of the time. If applicable, the heated stone will
                                    keep the room hot and at a stable temperature.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4" className="py-2">
                                <AccordionTrigger className="text-left text-base font-semibold text-neutral-900">
                                    How long should I stay in the sauna?
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-relaxed text-neutral-600 md:text-base">
                                    The recommended length of time to remain in a sauna is 10-20 minutes.
                                    Depending on your comfort level, take breaks in between your sauna
                                    session.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5" className="py-2">
                                <AccordionTrigger className="text-left text-base font-semibold text-neutral-900">
                                    What are the prerequisites for installing a sauna?
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-relaxed text-neutral-600 md:text-base">
                                    Electrical heater: If you decide to go with an electrical heater, you are
                                    required to have 240 Volt and a dedicated outlet. All wiring has to be
                                    installed according to the sauna heater manufacturer instructions and by
                                    a licensed electrician.
                                    <br />
                                    <br />
                                    Wood burning stove: If you decide to go with a wood burning stove, it is
                                    suggested to consult with your City bylaws on distances regards to
                                    property lines, hedges and neighbours prior to installation.
                                    <br />
                                    <br />
                                    No wood burning heater should be used inside. It is important to be aware
                                    that some saunas may require electrical work for your heater and/or
                                    lighting inside your sauna. Solar lights are a great alternative.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-6" className="py-2">
                                <AccordionTrigger className="text-left text-base font-semibold text-neutral-900">
                                    What are the delivery options for a sauna?
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-relaxed text-neutral-600 md:text-base">
                                    There are four different ways we can deliver your sauna to you:
                                    <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
                                        <li>DIY Kit pick-up</li>
                                        <li>DIY Kit delivery</li>
                                        <li>Fully assembled sauna delivery</li>
                                        <li>Delivery and assembly on-site</li>
                                    </ul>
                                    <p className="mt-3 text-neutral-600">
                                        Please reach out to us directly should you have any delivery inquiries
                                        outside of Ontario, Canada.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
                                Quick Facts
                            </p>
                            <div className="mt-6 space-y-4">
                                <div className="rounded-2xl bg-neutral-50 p-4">
                                    <p className="text-sm text-neutral-500">Average heat-up time</p>
                                    <p className="text-2xl font-semibold text-neutral-900">30-40 min</p>
                                </div>
                                <div className="rounded-2xl bg-neutral-50 p-4">
                                    <p className="text-sm text-neutral-500">Typical temperature</p>
                                    <p className="text-2xl font-semibold text-neutral-900">150-194 F</p>
                                </div>
                                <div className="rounded-2xl bg-neutral-50 p-4">
                                    <p className="text-sm text-neutral-500">Recommended session</p>
                                    <p className="text-2xl font-semibold text-neutral-900">10-20 min</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-neutral-900 p-6 text-white shadow-sm md:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                                Need Help?
                            </p>
                            <h2 className="mt-3 font-serif text-2xl font-light italic">
                                Talk with our specialists
                            </h2>
                            <p className="mt-3 text-sm text-white/70">
                                We can answer questions about installs, delivery, and custom options.
                            </p>
                            <div className="mt-6 space-y-3 text-sm">
                                <Link href='/contact'>
                                    <p className="font-medium text-xl hover:text-amber-500">Click here to Contact Us</p>
                                </Link>

                                <p className="font-medium">+1 (604) 867-5762</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}