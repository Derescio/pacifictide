import { getPosts } from "@/components/sanityblogs/fetchblogs";
import { BlogCard, BlogPost } from "@/components/sanityblogs/blog-card";
import Link from "next/link";

export const metadata = {
  title: "Blog | Pacific Tide Saunas",
  description: "Explore our wellness journal for tips, guides, and insights about sauna therapy and healthy living.",
};

export default async function BlogsPage() {
  const posts: BlogPost[] = await getPosts();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-600">
          <Link href="/" className="transition-colors hover:text-neutral-900">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900">Blog</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
            Wellness Journal
          </p>
          <h1 className="font-serif text-4xl font-light italic text-neutral-900 md:text-5xl">
            Stories & Insights
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            Discover tips, guides, and inspiration for your sauna journey and wellness lifestyle.
          </p>
        </div>

        {/* Blog Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard
                key={post._id}
                post={post}
                featured={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-[#f8f5f1] p-12 text-center">
            <p className="font-serif text-2xl italic text-neutral-600">
              No articles yet
            </p>
            <p className="mt-2 text-neutral-500">
              Check back soon for wellness tips and sauna guides.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
