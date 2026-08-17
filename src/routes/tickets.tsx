import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  MessageSquareText, 
  Search, 
  Send, 
  Sparkles, 
  User, 
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Inbox
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tickets")({
  component: TicketsPage,
  head: () => ({
    meta: [{ title: "Взаимодействие с ИВЦ | ИВЦ ЖКХ и ТЭК" }],
  })
});

const mockTickets = [
  { 
    id: 'T-2026-042', 
    subject: 'Сверка начислений за июнь', 
    status: 'new', 
    priority: 'high',
    time: '10 мин назад',
    messages: [
      { sender: 'УК', text: 'Добрый день, прошу провести сверку по л/с 1294028. Есть расхождения в ГВС.' }
    ]
  },
  { 
    id: 'T-2026-038', 
    subject: 'Обновление данных по приборам учета', 
    status: 'process', 
    priority: 'medium',
    time: '2 часа назад',
    messages: [
      { sender: 'УК', text: 'Прошу добавить новые поверки по дому Ленина 15.' },
      { sender: 'ИВЦ', text: 'Принято, данные в обработке.' }
    ]
  },
];

function TicketsPage() {
  const [selectedId, setSelectedId] = useState('T-2026-042');
  const selectedTicket = mockTickets.find(t => t.id === selectedId) || mockTickets[0];

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] gap-6 overflow-hidden">
      <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Запросы в ИВЦ</h2>
          <Button size="sm">Новый запрос</Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Поиск запросов..." className="pl-9" />
        </div>
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {mockTickets.map((t) => (
              <div 
                key={t.id} 
                onClick={() => setSelectedId(t.id)}
                className={cn(
                  "p-4 border rounded-xl cursor-pointer hover:border-primary/50 transition-all",
                  selectedId === t.id ? "bg-primary/5 border-primary shadow-sm" : "bg-card"
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <Badge variant={t.status === 'new' ? 'default' : 'secondary'} className="text-[10px]">
                    {t.status === 'new' ? 'Новый' : 'В работе'}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{t.time}</span>
                </div>
                <h3 className="font-semibold text-sm">{t.subject}</h3>
                <p className="text-[10px] text-muted-foreground mt-1">№{t.id}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b px-6 py-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">{selectedTicket.subject}</CardTitle>
            <CardDescription className="text-xs">Запрос {selectedTicket.id} • Срок исполнения: 24ч</CardDescription>
          </div>
          <Badge variant="outline">Ожидает ответа</Badge>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {selectedTicket.messages.map((m, i) => (
            <div key={i} className={cn("flex gap-3", m.sender === 'ИВЦ' ? 'flex-row-reverse' : '')}>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                {m.sender === 'УК' ? <User className="h-4 w-4" /> : <Inbox className="h-4 w-4" />}
              </div>
              <div className={cn("p-4 rounded-2xl max-w-[70%]", m.sender === 'УК' ? 'bg-muted/30 rounded-tl-none' : 'bg-primary/10 rounded-tr-none text-primary') }>
                <p className="text-sm">{m.text}</p>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="p-4 border-t bg-muted/5">
          <Input placeholder="Написать ответ..." className="bg-background" />
        </div>
      </Card>
    </div>
  );
}
