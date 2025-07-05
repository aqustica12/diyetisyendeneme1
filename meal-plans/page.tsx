
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sunrise, Sun, Sunset } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const weeklyPlan = {
  "Pazartesi": {
    kahvalti: "Yulaf ezmesi, taze meyveler ve bir avuç badem.",
    oglen: "Izgara tavuk salatası, bol yeşillik ve zeytinyağlı sos.",
    aksam: "Fırında somon, kinoa ve buharda pişmiş brokoli.",
  },
  "Salı": {
    kahvalti: "Tam buğday ekmeği üzerine avokado ve haşlanmış yumurta.",
    oglen: "Mercimek çorbası ve yanında tam tahıllı ekmek.",
    aksam: "Sebzeli et sote ve yanında bulgur pilavı.",
  },
  "Çarşamba": {
    kahvalti: "Yoğurt, granola ve bal.",
    oglen: "Zeytinyağlı enginar ve bir kase yoğurt.",
    aksam: "Fırında sebzeli tavuk but ve salata.",
  },
  "Perşembe": {
    kahvalti: "Menemen ve bir dilim peynir.",
    oglen: "Ton balıklı salata.",
    aksam: "Nohutlu ıspanak yemeği ve bir kase yoğurt.",
  },
  "Cuma": {
    kahvalti: "Smoothie (ıspanak, muz, protein tozu).",
    oglen: "Izgara köfte ve piyaz.",
    aksam: "Sebzeli lazanya (hafif versiyon).",
  },
};

export default function MealPlansPage() {
    const { isAuthenticated, userRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated === false) {
            router.push('/login');
        } else if (isAuthenticated === true && userRole !== 'client') {
            router.push('/');
        }
    }, [isAuthenticated, userRole, router]);
    
    if (!isAuthenticated || userRole !== 'client') {
        return (
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="text-center mb-12">
                    <Skeleton className="h-12 w-1/2 mx-auto" />
                    <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
                </div>
                <div className="w-full max-w-3xl mx-auto space-y-2">
                   <Skeleton className="h-20 w-full" />
                   <Skeleton className="h-20 w-full" />
                   <Skeleton className="h-20 w-full" />
                   <Skeleton className="h-20 w-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Haftalık Yemek Planım</h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Bu plan, dengeli ve sağlıklı beslenmeye bir örnektir. Size özel hazırlanan planınız burada görüntülenecektir.
            </p>
        </div>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto" defaultValue="Pazartesi">
            {Object.entries(weeklyPlan).map(([day, meals]) => (
            <AccordionItem key={day} value={day}>
                <AccordionTrigger className="text-xl font-medium hover:no-underline">{day}</AccordionTrigger>
                <AccordionContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Öğün</TableHead>
                        <TableHead>Detay</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    <TableRow>
                        <TableCell className="font-medium flex items-center gap-2"><Sunrise className="w-5 h-5 text-accent-foreground/70"/> Kahvaltı</TableCell>
                        <TableCell>{meals.kahvalti}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium flex items-center gap-2"><Sun className="w-5 h-5 text-accent-foreground/70"/> Öğle</TableCell>
                        <TableCell>{meals.oglen}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium flex items-center gap-2"><Sunset className="w-5 h-5 text-accent-foreground/70"/> Akşam</TableCell>
                        <TableCell>{meals.aksam}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </AccordionContent>
            </AccordionItem>
            ))}
        </Accordion>
        </div>
    );
}
