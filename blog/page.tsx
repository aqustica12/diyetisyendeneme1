
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBlog } from '@/context/BlogContext';
import { useState } from 'react';

export default function BlogPage() {
  const { posts } = useBlog();
  const [filter, setFilter] = useState('Tümü');

  const categories = Array.from(new Set(posts.map(p => p.category)));
  const filteredPosts = filter === 'Tümü' ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Blog</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Sağlıklı yaşam, beslenme ve diyet hakkında en güncel yazılarımız.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        <Button variant={filter === 'Tümü' ? 'secondary' : 'outline'} onClick={() => setFilter('Tümü')}>Tümü</Button>
        {categories.map(category => (
          <Button key={category} variant={filter === category ? 'secondary' : 'outline'} onClick={() => setFilter(category)}>{category}</Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <Card key={post.slug} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <Link href={`/blog/${post.slug}`} className="block">
              <Image
                src={post.image}
                data-ai-hint="healthy food blog"
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-48 object-cover "
              />
            </Link>
            <CardHeader>
              <CardTitle>
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="mt-2">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto bg-secondary/30 py-3 px-6">
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
