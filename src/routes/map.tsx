import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, Phone, Volume2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/map")({
  component: MapPage,
  head: () => ({
    meta: [{ title: "Карта задолженности | ИВЦ ЖКХ" }],
  })
});

function MapPage() {
  const [showCall, setShowCall] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Тепловая карта задолженности</h1>
          <p className="text-muted-foreground">Визуализация долгов по жилому фонду</p>
        </div>
        <Button onClick={() => setShowCall(true)} variant="destructive" className="animate-pulse">
          <Phone className="mr-2 h-4 w-4" /> Демо-звонок ИИ
        </Button>
      </div>

      <Card className="w-full aspect-video bg-slate-50 relative overflow-hidden flex items-center justify-center border-2 border-dashed">
        <div className="text-center">
          <div className="flex gap-4 justify-center mb-4">
            <div className="w-20 h-20 bg-red-500/20 rounded-full animate-ping" />
            <div className="w-16 h-16 bg-orange-500/20 rounded-full animate-bounce mt-8" />
            <div className="w-24 h-24 bg-red-600/20 rounded-full animate-pulse" />
          </div>
          <p className="font-medium text-slate-500">Здесь отображается интерактивная карта районов</p>
          <div className="mt-4 flex gap-4 text-xs">
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full" /> Критически (>100к)</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded-full" /> Высоко (>50к)</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-500 rounded-full" /> Средне (>10к)</div>
          </div>
        </div>
        
        {/* Call Simulation Overlay */}
        {showCall && (
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-in fade-in scale-in-95">
            <div className="max-w-sm w-full bg-white rounded-3xl p-8 text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center relative">
                <Volume2 className="h-10 w-10 text-primary animate-pulse" />
                <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ИИ-Помощник: Вызов</h3>
                <p className="text-sm text-muted-foreground mt-2 italic">
                  "Здравствуйте, это автоматический ассистент ИВЦ. У вас задолженность 15,420 руб. Желаете составить график платежей?"
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button variant="destructive" size="lg" className="rounded-full w-14 h-14 p-0" onClick={() => setShowCall(false)}>
                  <X className="h-6 w-6" />
                </Button>
                <Button variant="default" size="lg" className="rounded-full w-14 h-14 p-0 bg-emerald-500 hover:bg-emerald-600 border-none">
                  <Check className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Центральный р-н</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">4.8 млн ₽</div>
            <p className="text-xs text-muted-foreground">12 домов в красной зоне</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Северный р-н</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">2.1 млн ₽</div>
            <p className="text-xs text-muted-foreground">5 домов в оранжевой зоне</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Западный р-н</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">0.4 млн ₽</div>
            <p className="text-xs text-muted-foreground">Все дома в норме</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
