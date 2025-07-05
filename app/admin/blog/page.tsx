
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Post } from "@/lib/blog-data";
import { useBlog } from "@/context/BlogContext";
import Link from "next/link";


const postSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(3, { message: "Başlık en az 3 karakter olmalıdır." }),
  category: z.string().min(2, { message: "Kategori alanı zorunludur." }),
  content: z.string().min(10, { message: "İçerik en az 10 karakter olmalıdır." }),
});

type PostFormValues = z.infer<typeof postSchema>;


export default function BlogManagementPage() {
    const { posts, addPost, updatePost, deletePost: deletePostFromContext } = useBlog();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
    });

    const handleOpenForm = (post: Post | null) => {
        setPostToEdit(post);
        if (post) {
            reset({
                slug: post.slug,
                title: post.title,
                category: post.category,
                content: post.content.replace(/<[^>]*>/g, '\\n').trim(), // Strip HTML for textarea
            });
        } else {
            reset({
                slug: "",
                title: "",
                category: "",
                content: "",
            });
        }
        setIsFormOpen(true);
    };
    
    const handleDeleteConfirm = (post: Post) => {
        setPostToDelete(post);
    };

    const deletePost = () => {
        if (postToDelete) {
            deletePostFromContext(postToDelete.slug);
            setPostToDelete(null);
        }
    };

    const slugify = (text: string) => {
      const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
      const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
      const p = new RegExp(a.split('').join('|'), 'g')

      return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\\w\\-]+/g, '') // Remove all non-word chars
        .replace(/\\-\\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    }
    
    const onSubmit = (data: PostFormValues) => {
        const excerpt = data.content.substring(0, 100) + '...';
        const date = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
        const htmlContent = `<p>${data.content.replace(/\\n/g, '</p><p>')}</p>`;

        if (postToEdit) {
            const updatedPost = { 
                ...postToEdit, 
                title: data.title, 
                category: data.category, 
                content: htmlContent, 
                excerpt: excerpt
            };
            updatePost(updatedPost);
        } else {
            const newSlug = slugify(data.title);
            const newPost: Post = {
                slug: newSlug,
                title: data.title,
                excerpt: excerpt,
                date: date,
                category: data.category,
                author: 'Kübra Akın',
                authorImage: 'https://placehold.co/100x100.png',
                image: 'https://placehold.co/800x400.png',
                content: htmlContent,
            };
            addPost(newPost);
        }
        setIsFormOpen(false);
    };

    return (
        <>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <Card>
                    <CardHeader className="flex flex-row items-center">
                         <div className="grid gap-2">
                            <CardTitle>Blog Yönetimi</CardTitle>
                            <CardDescription>Blog yazılarınızı buradan yönetin.</CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <Button size="sm" className="gap-1" onClick={() => handleOpenForm(null)}>
                                <PlusCircle />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Yeni Yazı Ekle</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Başlık</TableHead>
                                    <TableHead className="hidden md:table-cell">Kategori</TableHead>
                                    <TableHead className="hidden md:table-cell">Yayınlanma Tarihi</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Eylemler</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map(post => (
                                    <TableRow key={post.slug}>
                                        <TableCell className="font-medium">{post.title}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Badge variant="outline">{post.category}</Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">{post.date}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Menüyü aç</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Eylemler</DropdownMenuLabel>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/blog/${post.slug}`} target="_blank">Görüntüle</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleOpenForm(post)}>Düzenle</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleDeleteConfirm(post); }} className="text-destructive">Sil</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                 <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{postToEdit ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}</DialogTitle>
                        <DialogDescription>
                            {postToEdit ? 'Yazı bilgilerini güncelleyin.' : 'Yeni blog yazısı için bilgileri girin.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Başlık</Label>
                            <Input id="title" {...register("title")} />
                            {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Kategori</Label>
                            <Input id="category" {...register("category")} />
                            {errors.category && <p className="text-destructive text-sm">{errors.category.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="content">İçerik</Label>
                            <Textarea id="content" {...register("content")} rows={10} placeholder="Yazı içeriğini buraya girin..."/>
                            {errors.content && <p className="text-destructive text-sm">{errors.content.message}</p>}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>İptal</Button>
                            </DialogClose>
                            <Button type="submit">Kaydet</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

             <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bu işlem geri alınamaz. Bu, blog yazısını kalıcı olarak silecektir.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction onClick={deletePost}>Sil</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
