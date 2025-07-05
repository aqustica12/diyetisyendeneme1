import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";


export default function AdminMealPlansPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Yemek Planları</h1>
                 <div className="ml-auto flex items-center gap-2">
                    <Button size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Yeni Plan Ekle
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Mevcut Planlar</CardTitle>
                    <CardDescription>Danışanlarınız için yemek planları oluşturun ve yönetin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Yemek planı yönetimi özellikleri burada yer alacak.</p>
                </CardContent>
            </Card>
        </div>
    )
}
