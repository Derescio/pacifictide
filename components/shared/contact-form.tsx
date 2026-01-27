"use client";

import { useState } from "react";
import { toast } from "sonner"

interface ContactFormProps {
    onSubmit?: (data: FormData) => void | Promise<void>;
    className?: string;
    buttonText?: string;
}

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    inquiryType: string;
    vision: string;
}

const inquirySubjectMap: Record<string, string> = {
    residential: "Private Residential",
    commercial: "Commercial Project",
    consultation: "General Consultation",
    support: "Product Support",
    other: "Other",
};

export function ContactForm({
    onSubmit,
    className = "",
    buttonText = "Request Consultation",
}: ContactFormProps) {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        inquiryType: "",
        vision: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (onSubmit) {
                await onSubmit(formData);
            } else {
                const subject =
                    inquirySubjectMap[formData.inquiryType] ?? "General Inquiry";
                const response = await fetch("/api/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        subject: `Contact Form: ${subject}`,
                        message: formData.vision,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    throw new Error(errorData?.message ?? "Failed to send email.");
                }

                toast.success("Thank you for your inquiry! We'll get back to you soon.");
            }

            // Reset form after successful submission
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                inquiryType: "",
                vision: "",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("There was an error submitting the form. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`rounded-lg bg-white p-8 shadow-sm ${className}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                    <label
                        htmlFor="fullName"
                        className="mb-2 block text-xs  tracking-wide text-neutral-500"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Name"
                        className=" text-sm w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-0"
                    />
                </div>

                {/* Email Address */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-xs  tracking-wide text-neutral-500"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                        className=" text-sm w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-0"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-xs tracking-wide text-neutral-500"
                    >
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="text-sm w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-0"
                    />
                </div>

                {/* Inquiry Type */}
                <div>
                    <label
                        htmlFor="inquiryType"
                        className="mb-2 block text-xs tracking-wide text-neutral-500"
                    >
                        Subject
                    </label>
                    <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-0"
                    >
                        <option value="">Subject</option>
                        <option value="residential">Private Residential</option>
                        <option value="commercial">Commercial Project</option>
                        <option value="consultation">General Consultation</option>
                        <option value="support">Product Support</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Your Vision */}
                <div>
                    <label
                        htmlFor="vision"
                        className="mb-2 block text-xs uppercase tracking-wide text-neutral-500"
                    >
                        Message
                    </label>
                    <textarea
                        id="vision"
                        name="vision"
                        rows={5}
                        value={formData.vision}
                        onChange={handleChange}
                        required
                        placeholder="Ask us anything..."
                        className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-0"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-sm bg-black px-8 py-4 text-sm font-medium uppercase tracking-wide text-amber-400 transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? "Submitting..." : buttonText}
                </button>
            </form>
        </div>
    );
}

