import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminProgressPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Gelişim Takibi</h1>
                 <div className="ml-auto flex items-center gap-2">
                    <Button size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Yeni Rapor Ekle
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Gelişim Raporları</CardTitle>
                    <CardDescription>Danışanlarınızın gelişimini buradan takip edin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Gelişim takibi özellikleri burada yer alacak.</p>
                </CardContent>
            </Card>
        </div>
    )
}
