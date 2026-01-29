import { client } from '../../pacifictidesaunas/lib/sanity/client'

// Fetch all posts
export async function getPosts() {
  return client.fetch(`
        *[_type == "blogPost"] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            publishedAt,
            mainImage,
            body
        }
    `)
}

// Fetch featured/latest posts for homepage (limit to 3)
export async function getFeaturedPosts(limit: number = 3) {
  return client.fetch(`
        *[_type == "blogPost"] | order(publishedAt desc)[0...${limit}] {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            publishedAt,
            mainImage
        }
    `)
}

// Fetch single post by slug
export async function getPostBySlug(slug: string) {
  return client.fetch(`
        *[_type == "blogPost" && slug.current == $slug][0] {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            publishedAt,
            mainImage,
            body
        }
    `, { slug })
}

// Fetch related posts (excluding current post)
export async function getRelatedPosts(currentSlug: string, limit: number = 3) {
  return client.fetch(`
        *[_type == "blogPost" && slug.current != $currentSlug] | order(publishedAt desc)[0...${limit}] {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            publishedAt,
            mainImage
        }
    `, { currentSlug })
}
