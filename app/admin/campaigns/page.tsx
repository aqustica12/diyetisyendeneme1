
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendWhatsAppCampaign } from "@/ai/flows/whatsapp-campaign-flow";
import { useClient } from "@/context/ClientContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function CampaignsPage() {
    const { clients } = useClient();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [selectedPhones, setSelectedPhones] = useState(new Set<string>());

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allPhones = new Set(clients.map(c => c.phone).filter(Boolean));
            setSelectedPhones(allPhones);
        } else {
            setSelectedPhones(new Set());
        }
    };

    const handleSelectOne = (phone: string, checked: boolean) => {
        const newSelectedPhones = new Set(selectedPhones);
        if (checked) {
            newSelectedPhones.add(phone);
        } else {
            newSelectedPhones.delete(phone);
        }
        setSelectedPhones(newSelectedPhones);
    };

    const handleSendCampaign = async () => {
        setIsLoading(true);
        try {
            const result = await sendWhatsAppCampaign({ 
                message, 
                phoneNumbers: Array.from(selectedPhones) 
            });
            
            if (result.errors && result.errors.length > 0) {
                 toast({
                    title: `Kampanya Kısmen Gönderildi`,
                    description: `${result.messagesSent} mesaj gönderildi. ${result.errors.length} hata oluştu: ${result.errors[0]}...`,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Kampanya Gönderildi",
                    description: `${result.messagesSent} danışana başarıyla kampanya mesajı gönderildi.`,
                });
                setMessage("");
                setSelectedPhones(new Set());
            }
        } catch (error: any) {
            toast({
                title: "Kampanya Gönderilemedi",
                description: `Bir hata oluştu: ${error.message}`,
                variant: "destructive",
            });
        }
        setIsLoading(false);
    };
    
    const validClients = clients.filter(c => c.phone);
    const isAllSelected = selectedPhones.size > 0 && selectedPhones.size === validClients.length;
    const isIndeterminate = selectedPhones.size > 0 && selectedPhones.size < validClients.length;

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Mesajınızı Oluşturun</CardTitle>
                    <CardDescription>
                        Aşağıya göndermek istediğiniz kampanya mesajını yazın.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="grid w-full gap-2">
                        <Label htmlFor="message">Mesajınız</Label>
                        <Textarea
                            id="message"
                            placeholder="Yeni kampanyamızdan haberdar olmak ister misiniz?..."
                            rows={8}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Alıcıları Seçin</CardTitle>
                    <CardDescription>
                        Bu mesajı göndermek istediğiniz danışanları seçin.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-96">
                        <Table>
                            <TableHeader className="sticky top-0 bg-card">
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            onCheckedChange={handleSelectAll}
                                            checked={isAllSelected}
                                            aria-label="Hepsini Seç"
                                        />
                                    </TableHead>
                                    <TableHead>Ad Soyad</TableHead>
                                    <TableHead>Telefon</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {validClients.map(client => (
                                    <TableRow key={client.id}>
                                        <TableCell>
                                            <Checkbox
                                                onCheckedChange={(checked) => handleSelectOne(client.phone, !!checked)}
                                                checked={selectedPhones.has(client.phone)}
                                            />
                                        </TableCell>
                                        <TableCell>{client.name}</TableCell>
                                        <TableCell>{client.phone}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">{selectedPhones.size} alıcı seçildi.</p>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button disabled={isLoading || message.length < 5 || selectedPhones.size === 0}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Kampanyayı Gönder
                                    </>
                                )}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Bu işlem, seçili {selectedPhones.size} kişiye WhatsApp mesajı gönderecektir. Bu işlem geri alınamaz.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>İptal</AlertDialogCancel>
                                <AlertDialogAction onClick={handleSendCampaign}>Evet, Gönder</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
    );
}
