"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";
import type { CartItem, CartSummary, EmailRequest } from "../../.utils/types";
import { toast } from "sonner";

interface ProductOptionsSelectorProps {
    product: {
        id: string;
        name: string;
        basePrice: number;
        options: {
            id: string;
            name: string;
            optionType: string;
            category: string | null;
            price: number;
            isDefault: boolean;
        }[];
        heaters: {
            id: string;
            type: string; // 'ELECTRIC' | 'WOOD'
            name: string;
            model: string;
            basePrice: number;
            electricSpec?: {
                power: number;
                voltage: string;
                electricianRequired: boolean;
            };
            woodSpec?: {
                fuelType: string;
            };
            options: any;
            images: {
                id: string;
                url: string;
                altText: string | null;
                isPrimary: boolean;
            }[];
        }[];
    };
}

export function ProductOptionsSelector({ product }: ProductOptionsSelectorProps) {
    // Initialize with default selections
    const defaultInstallation = product.options.find(
        (opt) => opt.optionType === "INSTALLATION" && opt.isDefault
    );

    const [selectedHeater, setSelectedHeater] = useState<typeof product.heaters[0] | null>(null);
    const [selectedInstallation, setSelectedInstallation] = useState(
        defaultInstallation?.id || null
    );
    const [selectedHeaterOptions, setSelectedHeaterOptions] = useState<{
        stones?: string;
        controls?: string;
        safetyRailing?: string;
    }>({});
    const [selectedWoodType, setSelectedWoodType] = useState<string | null>(null);
    const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
    const [quoteDetails, setQuoteDetails] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isQuoteSubmitting, setIsQuoteSubmitting] = useState(false);
    const [quoteError, setQuoteError] = useState<string | null>(null);
    const [quoteSuccess, setQuoteSuccess] = useState(false);


    // Calculate total price
    const totalPrice = useMemo(() => {
        let total = product.basePrice;

        // Add heater base price
        if (selectedHeater) {
            total += selectedHeater.basePrice;
        }

        // Add heater options
        if (selectedHeater?.options) {
            const options = selectedHeater.options as any;

            if (selectedHeaterOptions.stones && options.stones) {
                const stoneOption = options.stones.find(
                    (s: any) => s.type === selectedHeaterOptions.stones
                );
                if (stoneOption) total += stoneOption.price;
            }

            if (selectedHeaterOptions.controls && options.controls) {
                const controlOption = options.controls.find(
                    (c: any) => c.type === selectedHeaterOptions.controls
                );
                if (controlOption) total += controlOption.price;
            }

            if (selectedHeaterOptions.safetyRailing && options.safetyRailing) {
                const railingOption = options.safetyRailing.find(
                    (r: any) => r.type === selectedHeaterOptions.safetyRailing
                );
                if (railingOption) total += railingOption.price;
            }
        }

        // Add installation option
        if (selectedInstallation) {
            const installOption = product.options.find((opt) => opt.id === selectedInstallation);
            if (installOption) {
                total += installOption.price;
            }
        }

        // Add wood type option
        if (selectedWoodType) {
            const woodOption = product.options.find((opt) => opt.id === selectedWoodType);
            if (woodOption) {
                total += woodOption.price;
            }
        }

        // Add upgrade options
        selectedUpgrades.forEach((upgradeId) => {
            const upgrade = product.options.find((opt) => opt.id === upgradeId);
            if (upgrade) {
                total += upgrade.price;
            }
        });

        return total;
    }, [product, selectedHeater, selectedHeaterOptions, selectedInstallation, selectedWoodType, selectedUpgrades]);

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
        }).format(price);

    const installationOptions = product.options.filter((opt) => opt.optionType === "INSTALLATION");
    const woodTypeOptions = product.options.filter((opt) => opt.optionType === "WOOD_TYPE");
    const addonOptions = product.options.filter((opt) => opt.optionType === "FINISH"); // Add-Ons (additional_upgrades)

    const selectedInstallationOption = selectedInstallation
        ? product.options.find((opt) => opt.id === selectedInstallation) ?? null
        : null;
    const selectedWoodTypeOption = selectedWoodType
        ? product.options.find((opt) => opt.id === selectedWoodType) ?? null
        : null;
    const selectedUpgradeOptions = selectedUpgrades
        .map((upgradeId) => product.options.find((opt) => opt.id === upgradeId))
        .filter((opt): opt is ProductOptionsSelectorProps["product"]["options"][0] => Boolean(opt));
    const deliveryFee =
        selectedInstallationOption &&
            selectedInstallationOption.name.toLowerCase().includes("diy") &&
            selectedInstallationOption.price === 0
            ? 350
            : 0;

    // Helper function to extract image URL from category field
    const getImageFromCategory = (categoryJson: string | null) => {
        if (!categoryJson) return null;
        try {
            const data = JSON.parse(categoryJson);
            return data.image || null;
        } catch {
            return null;
        }
    };

    const handleQuoteSubmit = async () => {
        setQuoteError(null);
        setQuoteSuccess(false);

        if (!quoteDetails.name.trim() || !quoteDetails.email.trim()) {
            setQuoteError("Name and email are required to request a quote.");
            return;
        }

        const heaterOptions: Array<{ name: string; price: number }> = [];
        if (selectedHeater?.options) {
            const options = selectedHeater.options as Record<string, Array<{ type: string; price: number }>>;
            Object.entries(options).forEach(([optionKey, optionValues]) => {
                const selectedValue = (selectedHeaterOptions as Record<string, string | undefined>)[
                    optionKey
                ];
                const match = optionValues.find((option) => option.type === selectedValue);
                if (match) {
                    const label =
                        optionKey.charAt(0).toUpperCase() +
                        optionKey.slice(1).replace(/([A-Z])/g, " $1");
                    heaterOptions.push({
                        name: `${label}: ${match.type}`,
                        price: match.price,
                    });
                }
            });
        }

        const cartItem: CartItem = {
            name: product.name,
            qty: 1,
            price: product.basePrice,
            configuration: {
                woodType: selectedWoodTypeOption ? { name: selectedWoodTypeOption.name } : undefined,
                stove: selectedHeater ? { name: selectedHeater.name } : undefined,
                installation: selectedInstallationOption
                    ? { name: selectedInstallationOption.name }
                    : undefined,
                delivery: deliveryFee
                    ? { included: false, cost: deliveryFee }
                    : undefined,
                upgrades: selectedUpgradeOptions.map((upgrade) => ({
                    name: upgrade.name,
                    price: upgrade.price,
                })),
                heaterOptions: heaterOptions.length ? heaterOptions : undefined,
            },
        };

        const cartSummary: CartSummary = {
            subtotal: totalPrice,
            shipping: deliveryFee,
            tax: 0,
            total: totalPrice + deliveryFee,
        };

        const payload: EmailRequest = {
            name: quoteDetails.name.trim(),
            email: quoteDetails.email.trim(),
            phone: quoteDetails.phone.trim() || undefined,
            subject: `Quote Request: ${product.name}`,
            message:
                quoteDetails.message.trim() ||
                "Quote request submitted from the product page.",
            isCartQuote: true,
            cartItems: [cartItem],
            cartSummary,
        };

        try {
            setIsQuoteSubmitting(true);
            const response = await fetch("/api/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                toast.error(errorData?.message ?? "Failed to send quote request.");
                throw new Error(errorData?.message ?? "Failed to send quote request.");
            }
            toast.success("Quote request sent. We will reach out soon.");
            setQuoteSuccess(true);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to send quote request.");
            setQuoteError(
                error instanceof Error ? error.message : "Failed to send quote request."
            );
        } finally {
            setIsQuoteSubmitting(false);
        }
    };

    return (
        <div className="rounded-lg bg-white/50 p-6">
            <h2 className="mb-6 text-2xl font-semibold text-neutral-900">Configure Your Sauna</h2>

            <Accordion type="multiple" defaultValue={["wood-type"]} className="w-full">
                {/* 1. Wood Type Options */}
                {woodTypeOptions.length > 0 && (
                    <AccordionItem value="wood-type">
                        <AccordionTrigger className="text-base font-medium">
                            <div className="flex items-center gap-2">
                                Wood Type
                                {selectedWoodType && (
                                    <Check className="h-4 w-4 text-green-600" />
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-3 pt-2">
                                {woodTypeOptions.map((option) => {
                                    const imageUrl = getImageFromCategory(option.category);
                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => setSelectedWoodType(option.id)}
                                            className={`w-full rounded-lg border-2 p-4 text-left transition-all ${selectedWoodType === option.id
                                                ? "border-amber-400 bg-amber-50"
                                                : "border-neutral-200 hover:border-neutral-300"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                {imageUrl && (
                                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                                                        <Image
                                                            src={imageUrl}
                                                            alt={option.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="64px"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-medium text-neutral-900">{option.name}</p>
                                                </div>
                                                <p className="font-semibold text-neutral-900">
                                                    {option.price === 0 ? "Included" : `+ ${formatPrice(option.price)}`}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {/* 2. Heater Selection */}
                {product.heaters.length > 0 && (
                    <AccordionItem value="heater">
                        <AccordionTrigger className="text-base font-medium">
                            <div className="flex items-center gap-2">
                                Heater Selection
                                {selectedHeater && (
                                    <Check className="h-4 w-4 text-green-600" />
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 pt-2">
                                <div className="space-y-3">
                                    {product.heaters.map((heater) => {
                                        const primaryImage = heater.images.find((img) => img.isPrimary) || heater.images[0];
                                        return (
                                            <button
                                                key={heater.id}
                                                onClick={() => {
                                                    setSelectedHeater(heater);
                                                    setSelectedHeaterOptions({});
                                                }}
                                                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${selectedHeater?.id === heater.id
                                                    ? "border-amber-400 bg-amber-50"
                                                    : "border-neutral-200 hover:border-neutral-300"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {primaryImage && (
                                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                                                            <Image
                                                                src={primaryImage.url}
                                                                alt={heater.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="64px"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="font-medium text-neutral-900">{heater.name}</p>
                                                        <p className="text-sm text-neutral-600">
                                                            {heater.type === 'ELECTRIC' && heater.electricSpec ? (
                                                                `${heater.electricSpec.power} kW • ${heater.model}`
                                                            ) : (
                                                                `Wood-Burning • ${heater.model}`
                                                            )}
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold text-neutral-900">
                                                        {formatPrice(heater.basePrice)}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Heater Options */}
                                {selectedHeater?.options && (
                                    <div className="space-y-4 rounded-lg bg-neutral-50 p-4">
                                        <h3 className="text-sm font-semibold text-neutral-900">Heater Options</h3>

                                        {/* Dynamic Heater Options - Loop through all available options */}
                                        {selectedHeater.options &&
                                            Object.entries(selectedHeater.options as Record<string, any[]>).map(
                                                ([optionKey, optionValues]) => {
                                                    // Format the label nicely (e.g., "Chimney Kit" stays as is, "stones" becomes "Stones")
                                                    const optionLabel =
                                                        optionKey.charAt(0).toUpperCase() +
                                                        optionKey.slice(1).replace(/([A-Z])/g, " $1");

                                                    return (
                                                        <div key={optionKey}>
                                                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                                                {optionLabel}
                                                            </label>
                                                            <select
                                                                value={(selectedHeaterOptions as any)[optionKey] || ""}
                                                                onChange={(e) =>
                                                                    setSelectedHeaterOptions((prev) => ({
                                                                        ...prev,
                                                                        [optionKey]: e.target.value,
                                                                    }))
                                                                }
                                                                className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                                                            >
                                                                <option value="">Select {optionLabel.toLowerCase()}</option>
                                                                {optionValues.map((option: any, idx: number) => (
                                                                    <option key={idx} value={option.type}>
                                                                        {option.type} - {formatPrice(option.price)}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    );
                                                }
                                            )}
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {/* 3. Add-Ons */}
                {addonOptions.length > 0 && (
                    <AccordionItem value="addons">
                        <AccordionTrigger className="text-base font-medium">
                            <div className="flex items-center gap-2">
                                Add-Ons (Optional)
                                {selectedUpgrades.length > 0 && (
                                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                                        {selectedUpgrades.length}
                                    </span>
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-3 pt-2">
                                {addonOptions.map((option) => {
                                    const isSelected = selectedUpgrades.includes(option.id);
                                    const imageUrl = getImageFromCategory(option.category);
                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                setSelectedUpgrades((prev) =>
                                                    isSelected
                                                        ? prev.filter((id) => id !== option.id)
                                                        : [...prev, option.id]
                                                );
                                            }}
                                            className={`w-full rounded-lg border-2 p-4 text-left transition-all ${isSelected
                                                ? "border-amber-400 bg-amber-50"
                                                : "border-neutral-200 hover:border-neutral-300"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => { }}
                                                    className="h-4 w-4 shrink-0 rounded border-neutral-300 text-amber-400 focus:ring-amber-400"
                                                />
                                                {imageUrl && (
                                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                                                        <Image
                                                            src={imageUrl}
                                                            alt={option.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="64px"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-medium text-neutral-900">{option.name}</p>
                                                </div>
                                                <p className="font-semibold text-neutral-900">
                                                    + {formatPrice(option.price)}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {/* 4. Installation Options */}
                {installationOptions.length > 0 && (
                    <AccordionItem value="installation">
                        <AccordionTrigger className="text-base font-medium">
                            <div className="flex items-center gap-2">
                                Installation
                                {selectedInstallation && (
                                    <Check className="h-4 w-4 text-green-600" />
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-3 pt-2">
                                {installationOptions.map((option) => {
                                    const isDIY = option.name.toLowerCase().includes("diy");
                                    // Extract just the base name without the existing delivery fee text
                                    const baseName = option.name.replace(/\s*\(\+\s*\$?\d+\s*Delivery\s*Fee\)/gi, "");
                                    const deliveryFee = 350; // Fixed delivery fee for DIY
                                    const imageUrl = getImageFromCategory(option.category);

                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => setSelectedInstallation(option.id)}
                                            className={`w-full rounded-lg border-2 p-4 text-left transition-all ${selectedInstallation === option.id
                                                ? "border-amber-400 bg-amber-50"
                                                : "border-neutral-200 hover:border-neutral-300"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                {imageUrl && (
                                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                                                        <Image
                                                            src={imageUrl}
                                                            alt={baseName}
                                                            fill
                                                            className="object-cover"
                                                            sizes="64px"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-medium text-neutral-900">{baseName}</p>
                                                    {isDIY && option.price === 0 && (
                                                        <p className="text-xs text-neutral-600">
                                                            (+ ${deliveryFee} Delivery Fee)
                                                        </p>
                                                    )}
                                                </div>
                                                <p className="font-semibold text-neutral-900">
                                                    {option.price === 0 ? "$0" : formatPrice(option.price)}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>

            {/* Total Price */}
            <div className="border-t border-neutral-300 pt-6">
                <div className="mb-4 flex items-baseline justify-between">
                    <span className="text-lg text-neutral-600">Total Price</span>
                    <span className="text-3xl font-bold text-neutral-900">{formatPrice(totalPrice)}</span>
                </div>
                <hr className="my-4 mt-8" />
                <p className="mb-4 text-xl text-neutral-600 font-semibold text-center">Ready to get started ? </p>
                <p className="mb-4 text-xl text-neutral-600 font-semibold text-center">Send us an email about {product.name}.</p>
                <div className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
                                Name
                            </label>
                            <input
                                value={quoteDetails.name}
                                onChange={(event) =>
                                    setQuoteDetails((prev) => ({
                                        ...prev,
                                        name: event.target.value,
                                    }))
                                }
                                placeholder="Your name"
                                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
                                Email
                            </label>
                            <input
                                type="email"
                                value={quoteDetails.email}
                                onChange={(event) =>
                                    setQuoteDetails((prev) => ({
                                        ...prev,
                                        email: event.target.value,
                                    }))
                                }
                                placeholder="you@email.com"
                                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
                            Phone (optional)
                        </label>
                        <input
                            type="tel"
                            value={quoteDetails.phone}
                            onChange={(event) =>
                                setQuoteDetails((prev) => ({
                                    ...prev,
                                    phone: event.target.value,
                                }))
                            }
                            placeholder="Phone number"
                            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
                            Message (optional)
                        </label>
                        <textarea
                            value={quoteDetails.message}
                            onChange={(event) =>
                                setQuoteDetails((prev) => ({
                                    ...prev,
                                    message: event.target.value,
                                }))
                            }
                            placeholder="Any specific requests or delivery notes"
                            rows={3}
                            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                        />
                    </div>
                </div>
                {quoteError && (
                    <p className="mt-3 text-sm text-red-600">{quoteError}</p>
                )}
                {quoteSuccess && (
                    <p className="mt-3 text-sm text-green-700">
                        Quote request sent. We will reach out soon.
                    </p>
                )}
                <button
                    onClick={handleQuoteSubmit}
                    disabled={isQuoteSubmitting}
                    className="mt-5 w-full rounded-lg bg-amber-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isQuoteSubmitting ? "Sending..." : "Request Quote"}
                </button>
                <p className="mt-3 text-center text-sm text-neutral-600">
                    Contact us for availability and shipping details
                </p>
            </div>
        </div>
    );
}

