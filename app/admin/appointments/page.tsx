
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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppointment } from "@/context/AppointmentContext";
import type { Appointment } from "@/context/AppointmentContext";
import { useClient } from "@/context/ClientContext";


const appointmentSchema = z.object({
    id: z.string().optional(),
    clientName: z.string().min(2, { message: "Danışan adı en az 2 karakter olmalıdır." }),
    date: z.string().min(1, { message: "Tarih seçimi zorunludur." }),
    time: z.string().min(1, { message: "Saat seçimi zorunludur." }),
    status: z.enum(["Onaylandı", "Beklemede", "İptal Edildi"]),
    price: z.coerce.number().nonnegative({ message: "Fiyat pozitif bir sayı olmalıdır." }).optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function AppointmentsPage() {
    const { appointments, addAppointment, updateAppointment, deleteAppointment: deleteAppointmentFromContext } = useAppointment();
    const { clients } = useClient();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [appointmentToEdit, setAppointmentToEdit] = useState<Appointment | null>(null);
    const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: { clientName: "", date: "", time: "", status: "Beklemede", price: undefined },
    });

    const handleOpenForm = (appointment: Appointment | null) => {
        setAppointmentToEdit(appointment);
        reset(appointment || { clientName: "", date: "", time: "", status: "Beklemede", price: undefined });
        setIsFormOpen(true);
    };

    const handleDeleteConfirm = (appointment: Appointment) => {
        setAppointmentToDelete(appointment);
    };

    const deleteAppointment = async () => {
        if (appointmentToDelete) {
            await deleteAppointmentFromContext(appointmentToDelete.id);
            setAppointmentToDelete(null);
        }
    };

    const onSubmit = async (data: AppointmentFormValues) => {
        if (appointmentToEdit) {
            await updateAppointment({ ...appointmentToEdit, ...data });
            if (data.status === 'Onaylandı' && appointmentToEdit.status !== 'Onaylandı') {
                const client = clients.find(c => c.name === appointmentToEdit.clientName);
                if (client && client.phone) {
                    const message = encodeURIComponent(`Merhaba ${client.name}, ${new Date(data.date).toLocaleDateString('tr-TR')} tarihi, ${data.time} saati için oluşturduğunuz randevu talebiniz onaylanmıştır. Sağlıklı günler dileriz.\n- Fitopya`);
                    const whatsappUrl = `https://wa.me/${client.phone.replace(/\\D/g, '')}?text=${message}`;
                    window.open(whatsappUrl, '_blank');
                }
            }
        } else {
            const { id, ...newAppointmentData } = data;
            await addAppointment(newAppointmentData);
        }
        setIsFormOpen(false);
    };

    return (
        <>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <Card>
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Randevu Yönetimi</CardTitle>
                            <CardDescription>Yaklaşan ve geçmiş randevuları yönetin.</CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <Button size="sm" className="gap-1" onClick={() => handleOpenForm(null)}>
                                <PlusCircle />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Yeni Randevu Oluştur</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Danışan</TableHead>
                                    <TableHead>Tarih</TableHead>
                                    <TableHead>Saat</TableHead>
                                    <TableHead>Fiyat</TableHead>
                                    <TableHead>Durum</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Eylemler</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map(appointment => (
                                    <TableRow key={appointment.id}>
                                        <TableCell className="font-medium">{appointment.clientName}</TableCell>
                                        <TableCell>{new Date(appointment.date).toLocaleDateString('tr-TR')}</TableCell>
                                        <TableCell>{appointment.time}</TableCell>
                                        <TableCell>{appointment.price ? `${appointment.price} TL` : '-'}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                appointment.status === 'Onaylandı' ? 'default'
                                                    : appointment.status === 'İptal Edildi' ? 'destructive'
                                                        : 'secondary'
                                            }>
                                                {appointment.status}
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
                                                    <DropdownMenuItem onClick={() => handleOpenForm(appointment)}>Düzenle</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleDeleteConfirm(appointment); }} className="text-destructive">Sil</DropdownMenuItem>
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
                        <DialogTitle>{appointmentToEdit ? 'Randevu Düzenle' : 'Yeni Randevu Oluştur'}</DialogTitle>
                        <DialogDescription>
                            {appointmentToEdit ? 'Randevu bilgilerini güncelleyin.' : 'Yeni randevu için bilgileri girin.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="clientName" className="text-right">Danışan Adı</Label>
                            <Input id="clientName" {...register("clientName")} className="col-span-3" />
                            {errors.clientName && <p className="col-span-3 col-start-2 text-destructive text-sm">{errors.clientName.message}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">Tarih</Label>
                            <Input id="date" type="date" {...register("date")} className="col-span-3" />
                             {errors.date && <p className="col-span-3 col-start-2 text-destructive text-sm">{errors.date.message}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">Saat</Label>
                            <Input id="time" type="time" {...register("time")} className="col-span-3" />
                             {errors.time && <p className="col-span-3 col-start-2 text-destructive text-sm">{errors.time.message}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Fiyat (TL)</Label>
                            <Input id="price" type="number" {...register("price")} className="col-span-3" placeholder="Örn: 250"/>
                            {errors.price && <p className="col-span-3 col-start-2 text-destructive text-sm">{errors.price.message}</p>}
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
                                            <SelectItem value="Onaylandı">Onaylandı</SelectItem>
                                            <SelectItem value="Beklemede">Beklemede</SelectItem>
                                            <SelectItem value="İptal Edildi">İptal Edildi</SelectItem>
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

             <AlertDialog open={!!appointmentToDelete} onOpenChange={() => setAppointmentToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bu işlem geri alınamaz. Bu, randevu verilerini kalıcı olarak silecektir.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteAppointment}>Sil</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
