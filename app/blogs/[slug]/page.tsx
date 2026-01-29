import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getPostBySlug, getRelatedPosts, getPosts } from "@/components/sanityblogs/fetchblogs";
import { BlogCard, BlogPost } from "@/components/sanityblogs/blog-card";
import { urlFor } from "../../../pacifictidesaunas/lib/sanity/image";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post: BlogPost) => ({
        slug: post.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found | Pacific Tide Saunas",
        };
    }

    return {
        title: `${post.title} | Pacific Tide Saunas Blog`,
        description: post.excerpt || `Read ${post.title} on Pacific Tide Saunas Blog`,
    };
}

// Custom PortableText components for styling
const portableTextComponents = {
    block: {
        h1: ({ children }: any) => (
            <h1 className="mb-6 mt-10 font-serif text-3xl font-light italic text-neutral-900 md:text-4xl">
                {children}
            </h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="mb-4 mt-8 font-serif text-2xl font-light italic text-neutral-900 md:text-3xl">
                {children}
            </h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="mb-3 mt-6 font-serif text-xl font-light italic text-neutral-900 md:text-2xl">
                {children}
            </h3>
        ),
        normal: ({ children }: any) => (
            <p className="mb-4 text-base leading-relaxed text-neutral-700 md:text-lg">
                {children}
            </p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="my-6 border-l-4 border-[#E9DFD2] bg-[#f8f5f1] py-4 pl-6 pr-4 font-serif italic text-neutral-700">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="mb-4 ml-6 list-disc space-y-2 text-neutral-700">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="mb-4 ml-6 list-decimal space-y-2 text-neutral-700">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
        number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }: any) => <em className="italic">{children}</em>,
        link: ({ children, value }: any) => (
            <a
                href={value?.href}
                className="text-amber-700 underline decoration-amber-300 underline-offset-2 transition-colors hover:text-amber-800"
                target={value?.href?.startsWith("http") ? "_blank" : undefined}
                rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
                {children}
            </a>
        ),
    },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post: BlogPost | null = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts: BlogPost[] = await getRelatedPosts(slug, 3);

    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : null;

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Content */}
            <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-500">
                    <Link href="/" className="transition-colors hover:text-neutral-700">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/blogs" className="transition-colors hover:text-neutral-700">
                        Blog
                    </Link>
                    <span>/</span>
                    <span className="truncate text-neutral-700">{post.title}</span>
                </nav>

                {/* Title & Date */}
                <header className="mb-8">
                    {formattedDate && (
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-600">
                            {formattedDate}
                        </p>
                    )}
                    <h1 className="font-serif text-3xl font-light italic text-neutral-900 md:text-5xl">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="mt-4 text-lg leading-relaxed text-neutral-600">
                            {post.excerpt}
                        </p>
                    )}
                </header>

                {/* Featured Image */}
                {post.mainImage && (
                    <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl">
                        <Image
                            src={urlFor(post.mainImage).width(1200).height(675).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Article Body */}
                {post.body && (
                    <div className="prose-custom">
                        <PortableText value={post.body} components={portableTextComponents} />
                    </div>
                )}

                {/* Share / Back */}
                <div className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-8">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back to Blog
                    </Link>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
                <section className="bg-[#f8f5f1] py-16">
                    <div className="mx-auto max-w-6xl px-6">
                        <h2 className="mb-8 font-serif text-2xl font-light italic text-neutral-900 md:text-3xl">
                            More Articles
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts.map((relatedPost) => (
                                <BlogCard key={relatedPost._id} post={relatedPost} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

