
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useBlog } from '@/context/BlogContext';
import { useEffect } from 'react';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { posts } = useBlog();

  const post = posts.find(p => p.slug === slug);
  
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Kayseri Diyetisyen Blog`;
    } else {
       document.title = 'Yazı Bulunamadı | Kayseri Diyetisyen Blog';
    }
  }, [post]);


  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">{post.category}</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{post.title}</h1>
        <div className="flex justify-center items-center text-muted-foreground">
          <span>{post.date}</span>
        </div>
      </div>

      <Image
        src={post.image}
        data-ai-hint="healthy lifestyle blog"
        alt={post.title}
        width={1200}
        height={600}
        className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg mb-12"
      />

      <div
        className="blog-content max-w-none mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <div className="text-center mt-16">
        <Link href="/blog" className="text-primary hover:underline">
          &larr; Tüm Yazılara Geri Dön
        </Link>
      </div>
    </article>
  );
}
