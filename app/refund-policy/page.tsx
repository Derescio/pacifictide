import React from "react";

const RefundPolicyPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
            <h1 className="text-3xl font-semibold">Refund Policy</h1>

            <p className="text-gray-500 text-sm">Effective Date: January 2026</p>

            <p className="text-gray-700">
                At <strong>Pacific Tide</strong>, we specialize in custom-built
                saunas designed to meet your specific requirements. Due to the
                personalized nature of our products, we have established the following
                refund policy.
            </p>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Order Confirmation</h2>
                <p className="text-gray-700">
                    Once your order is confirmed and payment is received, we begin the
                    design and planning process for your custom sauna.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Cancellation Before Manufacturing</h2>
                <p className="text-gray-700">
                    You may cancel your order and receive a full refund at any time{" "}
                    <strong>before manufacturing begins</strong>.
                </p>
                <p className="text-gray-700">
                    To request a cancellation, please contact us at{" "}
                    <strong>+1 (604) 867-5762</strong>.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">No Refunds After Manufacturing Begins</h2>
                <p className="text-gray-700">
                    Once manufacturing has started, all sales are final and refunds are no
                    longer available. Manufacturing typically begins within{" "}
                    <strong>7–10 business days</strong> after order confirmation.
                </p>
                <p className="text-gray-700">
                    You will be notified via email when manufacturing begins.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Manufacturing Timeline & Notification</h2>
                <p className="text-gray-700">
                    Upon order confirmation, we will provide an estimated manufacturing
                    timeline. You will also receive an email notification once production
                    officially starts.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Exceptions</h2>
                <p className="text-gray-700">
                    In the unlikely event that your sauna arrives with a defect or issue,
                    we will work with you to resolve the problem. Please refer to our{" "}
                    <strong>Warranty Policy</strong> for details regarding repairs or
                    replacements.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-medium">Contact Information</h2>
                <p className="text-gray-700">
                    If you have any questions about this refund policy or your order, feel
                    free to reach out:
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
                appreciate your trust and look forward to delivering your custom sauna.
            </p>
        </div>
    );
};

export default RefundPolicyPage;
