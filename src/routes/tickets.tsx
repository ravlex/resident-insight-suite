import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
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
    category: 'Бухгалтерия',
    object: 'ул. Ленина, д. 15',
    time: '10 мин назад',
    deadline: '18.06.2026',
    initiator: 'Иванова А. (УК)',
    messages: [
      { sender: 'УК', text: 'Добрый день, прошу провести сверку по л/с 1294028. Есть расхождения в ГВС.' }
    ]
  },
  { 
    id: 'T-2026-038', 
    subject: 'Обновление данных по приборам учета', 
    status: 'process', 
    priority: 'medium',
    category: 'Приборы учета',
    object: 'ул. Мира, д. 4',
    time: '2 часа назад',
    deadline: '19.06.2026',
    initiator: 'Петров С. (УК)',
    messages: [
      { sender: 'УК', text: 'Прошу добавить новые поверки по дому Ленина 15.' },
      { sender: 'ИВЦ', text: 'Принято, данные в обработке.' }
    ]
  },
  { 
    id: 'T-2026-035', 
    subject: 'Доступ к паспортному столу', 
    status: 'closed', 
    priority: 'low',
    category: 'ИТ',
    object: 'Все объекты',
    time: '1 день назад',
    deadline: '16.06.2026',
    initiator: 'Сидоров К. (УК)',
    messages: [
      { sender: 'УК', text: 'Не работает вход в личный кабинет сотрудника.' },
      { sender: 'ИВЦ', text: 'Доступ восстановлен, проверьте.' }
    ]
  },
];

function TicketsPage() {
  const [selectedId, setSelectedId] = React.useState('T-2026-042');

  const selectedTicket = mockTickets.find(t => t.id === selectedId) || mockTickets[0]!;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'process': return 'bg-orange-500';
      case 'closed': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'process': return 'В работе';
      case 'closed': return 'Закрыт';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-blue-50/50 border-blue-100">
          <p className="text-xs font-medium text-blue-600 uppercase">В работе</p>
          <p className="text-2xl font-bold mt-1 text-blue-900">12</p>
        </Card>
        <Card className="p-4 bg-orange-50/50 border-orange-100">
          <p className="text-xs font-medium text-orange-600 uppercase">Ср. время ответа</p>
          <p className="text-2xl font-bold mt-1 text-orange-900">2.4 ч</p>
        </Card>
        <Card className="p-4 bg-emerald-50/50 border-emerald-100">
          <p className="text-xs font-medium text-emerald-600 uppercase">SLA</p>
          <p className="text-2xl font-bold mt-1 text-emerald-900">98%</p>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-280px)] gap-6 overflow-hidden">
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
                    <Badge className={cn("text-[10px]", getStatusColor(t.status))}>
                      {getStatusText(t.status)}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{t.time}</span>
                  </div>
                  <h3 className="font-semibold text-sm truncate">{t.subject}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-muted-foreground">№{t.id}</p>
                    <Badge variant="outline" className="text-[9px] py-0">{t.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader className="border-b px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{selectedTicket.subject}</CardTitle>
                <Badge variant="outline" className="text-[10px]">{selectedTicket.priority === 'high' ? 'Высокий' : 'Средний'}</Badge>
              </div>
              <CardDescription className="text-xs mt-1">
                Объект: {selectedTicket.object} • Дедлайн: {selectedTicket.deadline}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">Решение</Button>
              <Badge className={cn(getStatusColor(selectedTicket.status))}>{getStatusText(selectedTicket.status)}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex flex-col items-center mb-6">
              <div className="px-3 py-1 bg-muted rounded-full text-[10px] text-muted-foreground">
                Запрос создан: {selectedTicket.time} • Инициатор: {selectedTicket.initiator}
              </div>
            </div>
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
          <div className="p-4 border-t bg-muted/5 flex gap-2">
            <Input placeholder="Написать ответ или прикрепить документ..." className="bg-background" />
            <Button size="icon"><Send className="h-4 w-4" /></Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
