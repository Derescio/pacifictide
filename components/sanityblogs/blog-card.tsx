import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../pacifictidesaunas/lib/sanity/image";

export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    publishedAt?: string;
    mainImage?: any;
    body?: any;
}

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : null;

    return (
        <Link
            href={`/blogs/${post.slug}`}
            className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
        >
            {/* Image */}
            <div className={`relative overflow-hidden bg-neutral-100 ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                {post.mainImage ? (
                    <Image
                        src={urlFor(post.mainImage).width(800).height(600).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-[#E9DFD2]/30">
                        <span className="font-serif text-4xl italic text-neutral-300">PT</span>
                    </div>
                )}

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="bg-[#f8f5f1] p-5 md:p-6">
                {/* Date */}
                {formattedDate && (
                    <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
                        {formattedDate}
                    </p>
                )}

                {/* Title */}
                <h3 className={`font-serif italic text-neutral-800 transition-colors group-hover:text-neutral-600 ${featured ? "text-xl md:text-2xl" : "text-lg"}`}>
                    {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                        {post.excerpt}
                    </p>
                )}

                {/* Read More */}
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-neutral-700 transition-colors group-hover:text-neutral-900">
                    <span>Read Article</span>
                    <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}

