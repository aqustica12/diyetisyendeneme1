
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { posts as initialPosts, type Post } from '@/lib/blog-data';

interface BlogContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (updatedPost: Post) => void;
  deletePost: (slug: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    try {
        const item = window.localStorage.getItem('blogPosts');
        if (item) {
            setPosts(JSON.parse(item));
        }
    } catch (error) {
        console.error("Failed to load posts from localStorage", error);
        setPosts(initialPosts);
    }
  }, []);

  useEffect(() => {
    try {
        window.localStorage.setItem('blogPosts', JSON.stringify(posts));
    } catch (error) {
        console.error("Failed to save posts to localStorage", error);
    }
  }, [posts]);

  const addPost = (post: Post) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(prevPosts => prevPosts.map(p => p.slug === updatedPost.slug ? updatedPost : p));
  };

  const deletePost = (slug: string) => {
    setPosts(prevPosts => prevPosts.filter(p => p.slug !== slug));
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
