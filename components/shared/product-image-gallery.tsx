"use client";

import { useState } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface ProductImage {
    id: string;
    url: string;
    altText: string | null;
    order: number | null;
    isPrimary: boolean;
}

interface ProductImageGalleryProps {
    images: ProductImage[];
    productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (images.length === 0) {
        return (
            <div className="flex aspect-square items-center justify-center rounded-lg bg-neutral-100">
                <p className="text-neutral-400">No images available</p>
            </div>
        );
    }

    const handlePrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
                <Image
                    src={images[selectedIndex].url}
                    alt={images[selectedIndex].altText || `${productName} - Image ${selectedIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                            aria-label="Previous image"
                        >
                            <IconChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                            aria-label="Next image"
                        >
                            <IconChevronRight className="h-6 w-6" />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
                        {selectedIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.map((image, index) => (
                        <button
                            key={image.id}
                            onClick={() => setSelectedIndex(index)}
                            className={`relative aspect-square overflow-hidden rounded-lg transition-all ${selectedIndex === index
                                    ? "ring-2 ring-amber-400 ring-offset-2"
                                    : "opacity-70 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={image.url}
                                alt={image.altText || `${productName} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 25vw, 12vw"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

