import React from "react";

const WarrantyPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
            <h1 className="text-3xl font-semibold">Warranty</h1>

            <p className="text-gray-500 text-sm">Last updated: January 23, 2026</p>

            <p className="text-gray-700">
                At <strong>The Toronto Sauna Co.</strong>, we stand behind the quality and
                craftsmanship of our saunas. This warranty outlines what is covered,
                what is not, and how to maintain coverage.
            </p>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Warranty Coverage</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>
                        <strong>Coverage Period:</strong> 1 year (residential use)
                    </li>
                    <li>
                        <strong>Region:</strong> Canada (primary)
                    </li>
                    <li>
                        <strong>Support:</strong> Email and phone assistance
                    </li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Coverage Period Details</h2>
                <p className="text-gray-700">
                    We warrant our saunas against defects in materials and workmanship
                    under normal residential use for a period of{" "}
                    <strong>one (1) year</strong> from the date the product is received by
                    the original end-user purchaser.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">What’s Covered</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Manufacturing defects in materials and workmanship</li>
                    <li>
                        Repair or replacement using new or refurbished parts, at our
                        discretion
                    </li>
                    <li>Coverage applies to the original purchaser only</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">What’s Not Covered</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Normal wear and tear or natural weather-related aging</li>
                    <li>
                        Damage caused by misuse, negligence, improper installation, or
                        unauthorized modifications
                    </li>
                    <li>
                        Labor costs associated with third parties (e.g. electricians,
                        plumbers)
                    </li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Required Maintenance</h2>
                <p className="text-gray-700">
                    To keep your warranty valid, routine maintenance must be performed as
                    outlined in your product’s assembly and maintenance manual. Failure
                    to follow these guidelines may void this warranty.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Tighten barrel bands as needed</li>
                    <li>Regularly clean and maintain the sauna</li>
                    <li>
                        Stain or seal exterior wood when applicable
                    </li>
                    <li>Follow all assembly and maintenance instructions provided</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Warranty Duration</h2>
                <p className="text-gray-700">
                    The warranty lasts for <strong>365 days</strong> from the date of
                    purchase. Any replacement part provided under warranty will be
                    covered for the remainder of the original warranty period or 365 days
                    from replacement—whichever is longer.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Limitations</h2>
                <p className="text-gray-700">
                    This warranty is non-transferable and applies to residential use only.
                    The manufacturer and associated retailers are not liable for any
                    injury, loss, or damage resulting from the use or misuse of the
                    product.
                </p>
            </section>

            <p className="text-gray-700">
                If you have questions regarding warranty coverage or maintenance
                requirements, please contact our support team. We’re here to help.
            </p>
        </div>
    );
};

export default WarrantyPage;
