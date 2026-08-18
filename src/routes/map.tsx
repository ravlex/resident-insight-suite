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
        <div className="absolute inset-0 bg-[#f1f3f5] overflow-hidden">
          <svg className="w-full h-full text-slate-200" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Simple schematic city layout (Volgograd-like long strip) */}
            <path d="M150 50 L200 80 L180 150 L120 120 Z" fill="currentColor" />
            <path d="M300 100 L400 150 L380 250 L280 200 Z" fill="currentColor" />
            <path d="M450 200 L550 250 L530 350 L430 300 Z" fill="currentColor" />
            <path d="M500 350 L600 400 L580 480 L480 430 Z" fill="currentColor" />
            <path d="M100 200 L150 230 L130 300 L80 270 Z" fill="currentColor" />
            
            {/* Roads */}
            <path d="M0 100 Q 400 250 800 450" stroke="#e2e8f0" strokeWidth="12" />
            <path d="M0 150 Q 400 300 800 500" stroke="#e2e8f0" strokeWidth="8" />
            <path d="M200 0 L600 500" stroke="#e2e8f0" strokeWidth="4" />
            
            {/* River (Volga) */}
            <path d="M650 0 C 700 150 750 350 800 500 L 800 0 Z" fill="#e0f2fe" />
            <path d="M650 0 C 700 150 750 350 800 500" stroke="#bae6fd" strokeWidth="4" />
          </svg>
        </div>
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { name: "Тракторозаводский", debt: "4.8 млн ₽", status: "red" },
          { name: "Краснооктябрьский", debt: "3.2 млн ₽", status: "red" },
          { name: "Дзержинский", debt: "2.5 млн ₽", status: "orange" },
          { name: "Центральный", debt: "1.2 млн ₽", status: "yellow" },
          { name: "Ворошиловский", debt: "3.5 млн ₽", status: "red" },
          { name: "Советский", debt: "2.1 млн ₽", status: "orange" },
          { name: "Кировский", debt: "1.8 млн ₽", status: "yellow" },
          { name: "Красноармейский", debt: "0.9 млн ₽", status: "green" },
        ].map((item) => (
          <Card key={item.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-xl font-bold ${
                item.status === 'red' ? 'text-red-600' : 
                item.status === 'orange' ? 'text-orange-500' : 
                item.status === 'yellow' ? 'text-yellow-600' : 'text-emerald-600'
              }`}>
                {item.debt}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                {item.status === 'green' ? 'Показатели в норме' : 'Требуется внимание'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
