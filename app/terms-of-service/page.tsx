import React from "react";

const TermsOfServicePage = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
            <h1 className="text-3xl font-semibold">Terms of Service</h1>

            <p className="text-gray-700">
                By placing an order with <strong>Pacific Tide</strong>, you agree
                to the terms and conditions outlined below. Please review them carefully
                before completing your purchase.
            </p>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Important Notice</h2>
                <p className="text-gray-700">
                    Our saunas are custom-built products. Once manufacturing begins, all
                    purchases are considered final and non-refundable.
                </p>
                <p className="text-gray-700">
                    Please note that our products are <strong>not CSA or WETT certified</strong>.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Refund Policy for Custom Saunas</h2>
                <p className="text-gray-500 text-sm">Effective Date: January 2026</p>

                <div className="space-y-3">
                    <h3 className="font-medium">1. Order Confirmation</h3>
                    <p className="text-gray-700">
                        Once your order is confirmed and payment is received, we begin the
                        design and planning process for your custom sauna.
                    </p>

                    <h3 className="font-medium">2. Cancellation Before Manufacturing</h3>
                    <p className="text-gray-700">
                        You may cancel your order and receive a full refund at any time
                        <strong> before manufacturing begins</strong>.
                    </p>
                    <p className="text-gray-700">
                        To cancel your order, please contact us at{" "}
                        <strong>+1 (604) 867-5762</strong>.
                    </p>

                    <h3 className="font-medium">3. No Refunds After Manufacturing Begins</h3>
                    <p className="text-gray-700">
                        Once manufacturing has started, refunds are no longer available.
                        Manufacturing typically begins within{" "}
                        <strong>7–10 business days</strong> after order confirmation.
                    </p>

                    <h3 className="font-medium">4. Manufacturing Notification</h3>
                    <p className="text-gray-700">
                        You will receive an email confirmation when manufacturing begins,
                        along with an estimated production timeline.
                    </p>

                    <h3 className="font-medium">5. Exceptions</h3>
                    <p className="text-gray-700">
                        In the unlikely event of a defect or issue upon delivery, we will
                        work with you to resolve the matter. Please refer to our Warranty
                        Policy for details regarding repairs or replacements.
                    </p>
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-medium">Contact Information</h2>
                <p className="text-gray-700">
                    If you have any questions about these terms or your order, please reach
                    out to us:
                </p>
                <ul className="text-gray-700 space-y-1">
                    <li>
                        <strong>Email:</strong> hello@pacifictide.ca
                    </li>
                    <li>
                        <strong>Phone:</strong> +1 (604) 867-5762
                    </li>
                </ul>
            </section>

            <p className="text-gray-700">
                Thank you for choosing <strong>Pacific Tide</strong>. We
                appreciate your trust and look forward to building your custom sauna.
            </p>
        </div>
    );
};

export default TermsOfServicePage;
