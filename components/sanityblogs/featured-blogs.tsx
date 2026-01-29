import { getFeaturedPosts } from "./fetchblogs";
import { BlogCard, BlogPost } from "./blog-card";
import Link from "next/link";

export async function FeaturedBlogs() {
    const posts: BlogPost[] = await getFeaturedPosts(3);

    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section className="py-16">
            {/* Section Header */}
            <div className="mb-10 flex items-end justify-between">
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
                        Wellness Journal
                    </p>
                    <h2 className="font-serif text-3xl font-light italic text-neutral-900 md:text-4xl">
                        Latest from the Blog
                    </h2>
                </div>
                <Link
                    href="/blogs"
                    className="hidden items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900 sm:flex"
                >
                    View All Articles
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            {/* Blog Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                    <BlogCard
                        key={post._id}
                        post={post}
                        featured={index === 0}
                    />
                ))}
            </div>

            {/* Mobile View All Link */}
            <div className="mt-8 text-center sm:hidden">
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50"
                >
                    View All Articles
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}

