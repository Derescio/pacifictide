interface ProductSpecificationsProps {
    dimensions: string | null;
    specifications: any;
    designation: string;
    woodType: string | null;
}

export function ProductSpecifications({
    dimensions,
    specifications,
    designation,
    woodType,
}: ProductSpecificationsProps) {
    return (
        <div className="rounded-lg bg-white/50 p-6">
            <h2 className="mb-6 text-2xl font-semibold text-neutral-900">
                Specifications & Details
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
                {/* General Information */}
                <div>
                    <h3 className="mb-3 text-lg font-semibold text-neutral-900">General Information</h3>
                    <dl className="space-y-2">
                        {designation && (
                            <div className="flex justify-between border-b border-neutral-200 py-2">
                                <dt className="text-neutral-600">Collection</dt>
                                <dd className="font-medium text-neutral-900">{designation}</dd>
                            </div>
                        )}
                        {dimensions && (
                            <div className="flex justify-between border-b border-neutral-200 py-2">
                                <dt className="text-neutral-600">Dimensions</dt>
                                <dd className="font-medium text-neutral-900">{dimensions}</dd>
                            </div>
                        )}
                        {woodType && (
                            <div className="flex justify-between border-b border-neutral-200 py-2">
                                <dt className="text-neutral-600">Wood Type</dt>
                                <dd className="font-medium text-neutral-900">
                                    {typeof woodType === "string" ? woodType : "Custom"}
                                </dd>
                            </div>
                        )}
                    </dl>
                </div>

                {/* Additional Specifications */}
                {specifications && Object.keys(specifications).length > 0 && (
                    <div>
                        <h3 className="mb-3 text-lg font-semibold text-neutral-900">
                            Additional Specifications
                        </h3>
                        <dl className="space-y-2">
                            {Object.entries(specifications).map(([key, value]) => (
                                <div key={key} className="flex justify-between border-b border-neutral-200 py-2">
                                    <dt className="text-neutral-600 capitalize">
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                    </dt>
                                    <dd className="font-medium text-neutral-900">
                                        {typeof value === "object" ? JSON.stringify(value) : String(value)}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}
            </div>

            {/* Important Notes */}
            <div className="mt-6 rounded-lg bg-amber-50 p-4">
                <h4 className="mb-2 text-sm font-semibold text-neutral-900">Important Notes</h4>
                <ul className="space-y-1 text-sm text-neutral-700">
                    <li>• Professional installation recommended</li>
                    <li>• Electrical work must be performed by licensed electrician</li>
                    <li>• Delivery times may vary based on location</li>
                    <li>• All products come with manufacturer warranty</li>
                </ul>
            </div>
        </div>
    );
}

