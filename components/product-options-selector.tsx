"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

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
            name: string;
            model: string;
            power: number;
            basePrice: number;
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
    const defaultHeater = product.heaters[0] || null;
    const defaultInstallation = product.options.find(
        (opt) => opt.optionType === "INSTALLATION" && opt.isDefault
    );

    const [selectedHeater, setSelectedHeater] = useState(defaultHeater);
    const [selectedInstallation, setSelectedInstallation] = useState(
        defaultInstallation?.id || null
    );
    const [selectedHeaterOptions, setSelectedHeaterOptions] = useState<{
        stones?: string;
        controls?: string;
        safetyRailing?: string;
    }>({});

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

        return total;
    }, [product, selectedHeater, selectedHeaterOptions, selectedInstallation]);

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
        }).format(price);

    const installationOptions = product.options.filter((opt) => opt.optionType === "INSTALLATION");

    return (
        <div className="rounded-lg bg-white/50 p-6">
            <h2 className="mb-6 text-2xl font-semibold text-neutral-900">Configure Your Sauna</h2>

            {/* Heater Selection */}
            {product.heaters.length > 0 && (
                <div className="mb-6">
                    <label className="mb-3 block text-sm font-medium text-neutral-700">
                        Select Heater
                    </label>
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
                                                {heater.power} kW • {heater.model}
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
                </div>
            )}

            {/* Heater Options */}
            {selectedHeater?.options && (
                <div className="mb-6 space-y-4 rounded-lg bg-neutral-50 p-4">
                    <h3 className="text-sm font-semibold text-neutral-900">Heater Options</h3>

                    {/* Stones */}
                    {(selectedHeater.options as any).stones && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">Stones</label>
                            <select
                                value={selectedHeaterOptions.stones || ""}
                                onChange={(e) =>
                                    setSelectedHeaterOptions((prev) => ({ ...prev, stones: e.target.value }))
                                }
                                className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                            >
                                <option value="">Select stones option</option>
                                {(selectedHeater.options as any).stones.map((stone: any, idx: number) => (
                                    <option key={idx} value={stone.type}>
                                        {stone.type} - {formatPrice(stone.price)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Controls */}
                    {(selectedHeater.options as any).controls && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">Controls</label>
                            <select
                                value={selectedHeaterOptions.controls || ""}
                                onChange={(e) =>
                                    setSelectedHeaterOptions((prev) => ({ ...prev, controls: e.target.value }))
                                }
                                className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                            >
                                <option value="">Select control type</option>
                                {(selectedHeater.options as any).controls.map((control: any, idx: number) => (
                                    <option key={idx} value={control.type}>
                                        {control.type} - {formatPrice(control.price)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Safety Railing */}
                    {(selectedHeater.options as any).safetyRailing && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Safety Railing
                            </label>
                            <select
                                value={selectedHeaterOptions.safetyRailing || ""}
                                onChange={(e) =>
                                    setSelectedHeaterOptions((prev) => ({
                                        ...prev,
                                        safetyRailing: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                            >
                                <option value="">Select safety railing</option>
                                {(selectedHeater.options as any).safetyRailing.map((railing: any, idx: number) => (
                                    <option key={idx} value={railing.type}>
                                        {railing.type} - {formatPrice(railing.price)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            )}

            {/* Installation Options */}
            {installationOptions.length > 0 && (
                <div className="mb-6">
                    <label className="mb-3 block text-sm font-medium text-neutral-700">Installation</label>
                    <div className="space-y-2">
                        {installationOptions.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setSelectedInstallation(option.id)}
                                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${selectedInstallation === option.id
                                    ? "border-amber-400 bg-amber-50"
                                    : "border-neutral-200 hover:border-neutral-300"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-neutral-900">{option.name}</p>
                                    <p className="font-semibold text-neutral-900">
                                        {option.price === 0 ? "Included" : formatPrice(option.price)}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Total Price */}
            <div className="border-t border-neutral-300 pt-6">
                <div className="mb-4 flex items-baseline justify-between">
                    <span className="text-lg text-neutral-600">Total Price</span>
                    <span className="text-3xl font-bold text-neutral-900">{formatPrice(totalPrice)}</span>
                </div>
                <button className="w-full rounded-lg bg-amber-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-amber-500">
                    Request Quote
                </button>
                <p className="mt-3 text-center text-sm text-neutral-600">
                    Contact us for availability and shipping details
                </p>
            </div>
        </div>
    );
}

