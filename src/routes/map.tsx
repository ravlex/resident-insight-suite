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

      <Card className="w-full aspect-video bg-[#f8fafc] relative overflow-hidden flex items-center justify-center border-none shadow-inner group">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[#e5e7eb] bg-[url('https://static-maps.yandex.ru/v1?ll=44.5170,48.7080&spn=0.1,0.1&size=650,450&scale=2&l=map&theme=light')] bg-cover bg-center transition-transform duration-[40s] hover:scale-105" />
        <div className="absolute inset-0 bg-white/10" />


        
        {/* Interactive Heatmap Points */}
        <div className="relative w-full h-full">
          <div className="absolute top-[20%] left-[20%] group/point cursor-pointer">
            <div className="w-12 h-12 bg-red-500/30 rounded-full animate-ping absolute -inset-3" />
            <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg relative z-10 transition-transform group-hover/point:scale-125" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/point:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl">
              Тракторозаводский: 1.2 млн ₽
            </div>
          </div>

          <div className="absolute top-[30%] left-[40%] group/point cursor-pointer">
            <div className="w-10 h-10 bg-orange-500/30 rounded-full animate-ping absolute -inset-2" />
            <div className="w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-lg relative z-10 transition-transform group-hover/point:scale-125" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/point:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl">
              Краснооктябрьский: 850к ₽
            </div>
          </div>

          <div className="absolute top-[45%] left-[50%] group/point cursor-pointer">
            <div className="w-8 h-8 bg-yellow-400/30 rounded-full animate-ping absolute -inset-1" />
            <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-lg relative z-10 transition-transform group-hover/point:scale-125" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/point:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl">
              Центральный: 320к ₽
            </div>
          </div>

          <div className="absolute top-[60%] left-[45%] group/point cursor-pointer">
            <div className="w-10 h-10 bg-red-500/30 rounded-full animate-ping absolute -inset-2" />
            <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg relative z-10 transition-transform group-hover/point:scale-125" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/point:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl">
              Ворошиловский: 1.1 млн ₽
            </div>
          </div>

          <div className="absolute top-[70%] left-[40%] group/point cursor-pointer">
            <div className="w-8 h-8 bg-orange-500/30 rounded-full animate-ping absolute -inset-1" />
            <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg relative z-10 transition-transform group-hover/point:scale-125" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/point:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl">
              Советский: 600к ₽
            </div>
          </div>


          {/* Map Overlay Controls */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-slate-200 z-10">
            <h4 className="text-sm font-bold mb-2">Легенда карты</h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-600 rounded-full" /> Критически ({">"}1 млн ₽)</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full" /> Высоко (500к - 1 млн ₽)</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-full" /> Средне (100к - 500к ₽)</div>
            </div>
          </div>

          <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
            <button className="bg-white/90 backdrop-blur-md w-8 h-8 rounded-lg shadow-lg border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">+</button>
            <button className="bg-white/90 backdrop-blur-md w-8 h-8 rounded-lg shadow-lg border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">-</button>
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
