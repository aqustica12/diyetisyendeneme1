
"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Client } from "@/context/ClientContext";
import { useClient } from "@/context/ClientContext";

const clientSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır." }),
    email: z.string().email({ message: "Geçersiz e-posta adresi." }),
    phone: z.string().min(10, { message: "Telefon numarası en az 10 karakter olmalıdır." }),
    status: z.enum(["Aktif", "Pasif", "Beklemede"]),
});

type ClientFormValues = z.infer<typeof clientSchema>;

export default function ClientsPage() {
    const { clients, addClient, updateClient, deleteClient: deleteClientFromContext } = useClient();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
    const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: { name: "", email: "", phone: "", status: "Beklemede" },
    });

    const handleOpenForm = (client: Client | null) => {
        setClientToEdit(client);
        reset(client || { name: "", email: "", phone: "", status: "Beklemede" });
        setIsFormOpen(true);
    };

    const handleDeleteConfirm = (client: Client) => {
        setClientToDelete(client);
    };

    const deleteClient = () => {
        if (clientToDelete) {
            deleteClientFromContext(clientToDelete.id);
            setClientToDelete(null);
        }
    };

    const onSubmit = (data: ClientFormValues) => {
        if (clientToEdit) {
            updateClient({ ...clientToEdit, ...data });
        } else {
            addClient({
                ...data,
                joinDate: new Date().toISOString().split('T')[0],
                avatar: `https://placehold.co/100x100.png`,
            });
        }
        setIsFormOpen(false);
    };

    return (
        <>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <Card>
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Danışan Yönetimi</CardTitle>
                            <CardDescription>Mevcut danışanları görüntüleyin ve yönetin.</CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <Button size="sm" className="gap-1" onClick={() => handleOpenForm(null)}>
                                <PlusCircle />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Yeni Danışan Ekle</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Avatar</span>
                                    </TableHead>
                                    <TableHead>Ad Soyad</TableHead>
                                    <TableHead className="hidden md:table-cell">E-posta</TableHead>
                                    <TableHead className="hidden md:table-cell">Telefon</TableHead>
                                    <TableHead>Durum</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Eylemler</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients.map(client => (
                                    <TableRow key={client.id}>
                                        <TableCell className="hidden sm:table-cell">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={client.avatar} data-ai-hint="person portrait" alt={client.name} />
                                                <AvatarFallback>{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="font-medium">{client.name}</TableCell>
                                        <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                                        <TableCell className="hidden md:table-cell">{client.phone}</TableCell>
                                        <TableCell>
                                            <Badge variant={client.status === 'Aktif' ? 'default' : client.status === 'Beklemede' ? 'secondary' : 'outline'}>
                                                {client.status}
                                            </Badge>
                                        </TableCell>
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
                                                        <Link href={`/admin/clients/${client.id}`}>Profili Görüntüle</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleOpenForm(client)}>Düzenle</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleDeleteConfirm(client); }} className="text-destructive">Sil</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{clientToEdit ? 'Danışan Düzenle' : 'Yeni Danışan Ekle'}</DialogTitle>
                        <DialogDescription>
                            {clientToEdit ? 'Danışan bilgilerini güncelleyin.' : 'Yeni danışan için bilgileri girin.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Ad Soyad</Label>
                            <Input id="name" {...register("name")} className="col-span-3" />
                            {errors.name && <p className="col-span-3 col-start-2 text-destructive text-sm">{errors.name.message}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">E-posta</Label>
                            <Input id="email" type="email" {...register("email")} className="col-span-3" />
                             {errors.email && <p className="col-span-3 col-start-2 text-destructive text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Telefon</Label>
                            <Input id="phone" type="tel" {...register("phone")} className="col-span-3" />
                             {errors.phone && <p className="col-span-3 col-start-2 text-destructive text-sm">{errors.phone.message}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Durum</Label>
                             <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Durum Seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Aktif">Aktif</SelectItem>
                                            <SelectItem value="Pasif">Pasif</SelectItem>
                                            <SelectItem value="Beklemede">Beklemede</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
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

             <AlertDialog open={!!clientToDelete} onOpenChange={() => setClientToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bu işlem geri alınamaz. Bu, danışan verilerini sunucularımızdan kalıcı olarak silecektir.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteClient}>Sil</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
