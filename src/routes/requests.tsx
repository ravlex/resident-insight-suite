import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 

  MessageSquare, 
  Search, 
  Send, 
  Sparkles, 
  User, 
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/requests")({
  component: RequestsPage,
  head: () => ({
    meta: [{ title: "Обращения жителей | ИВЦ ЖКХ и ТЭК" }],
  })
});

const mockRequests = [
  { 
    id: 'R-1042', 
    user: 'Иванов А.И.', 
    address: 'ул. Ленина, д. 15, кв. 42',
    subject: 'Перерасчет ХВС', 
    status: 'new', 
    priority: 'high',
    channel: 'Чат',
    isRepeat: true,
    time: '10 мин назад',
    messages: [
      { sender: 'resident', text: 'Здравствуйте, почему в квитанции за май стоит сумма за воду в 2 раза больше? Счетчик не менялся.' }
    ]
  },
  { 
    id: 'R-1038', 
    user: 'Петрова С.М.', 
    address: 'ул. Мира, д. 4, кв. 12',
    subject: 'Качество отопления', 
    status: 'process', 
    priority: 'medium',
    channel: 'Госуслуги',
    isRepeat: false,
    time: '2 часа назад',
    messages: [
      { sender: 'resident', text: 'В квартире холодно, батареи почти не греют.' },
      { sender: 'uk', text: 'Принято, техник придет завтра до 12:00 для замера температуры.' }
    ]
  },
];

function RequestsPage() {
  const [selectedId, setSelectedId] = useState('R-1042');
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(false);
  const selectedReq = mockRequests.find(r => r.id === selectedId) || mockRequests[0]!;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setShowDetailOnMobile(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-muted/50 border-none shadow-none">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Всего за месяц</p>
          <p className="text-xl font-bold mt-1">248</p>
        </Card>
        <Card className="p-4 bg-red-50/50 border-none shadow-none">
          <p className="text-[10px] font-bold text-red-600 uppercase">Повторные</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold mt-1 text-red-900">18%</p>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </div>
        </Card>
        <Card className="p-4 bg-blue-50/50 border-none shadow-none">
          <p className="text-[10px] font-bold text-blue-600 uppercase">Популярный канал</p>
          <p className="text-xl font-bold mt-1 text-blue-900">Чат (64%)</p>
        </Card>
        <Card className="p-4 bg-emerald-50/50 border-none shadow-none">
          <p className="text-[10px] font-bold text-emerald-600 uppercase">Среднее время</p>
          <p className="text-xl font-bold mt-1 text-emerald-900">1.5 ч</p>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-320px)] gap-6 overflow-hidden">
        <div className={cn(
          "w-full lg:w-1/3 flex flex-col gap-4 overflow-hidden",
          showDetailOnMobile ? "hidden lg:flex" : "flex"
        )}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Обращения жителей</h2>
            <Button size="sm" variant="outline">Рассылка</Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Поиск по жителю или адресу..." className="pl-9" />
          </div>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-3">
              {mockRequests.map((r) => (
                <div 
                  key={r.id} 
                  onClick={() => handleSelect(r.id)}
                  className={cn(
                    "p-4 border rounded-xl cursor-pointer hover:border-primary/50 transition-all",
                    selectedId === r.id ? "bg-primary/5 border-primary shadow-sm" : "bg-card"
                  )}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2">
                      <Badge variant={r.status === 'new' ? 'default' : 'secondary'} className="text-[9px]">
                        {r.status === 'new' ? 'Новое' : 'В работе'}
                      </Badge>
                      {r.isRepeat && <Badge variant="destructive" className="text-[9px]">Повторное</Badge>}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{r.time}</span>
                  </div>
                  <h3 className="font-semibold text-sm truncate">{r.subject}</h3>
                  <p className="text-[10px] text-muted-foreground mt-1 truncate">{r.address}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Card className={cn(
          "flex-1 flex flex-col overflow-hidden",
          !showDetailOnMobile ? "hidden lg:flex" : "flex"
        )}>
          <CardHeader className="border-b px-4 sm:px-6 py-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden p-0 h-auto"
                onClick={() => setShowDetailOnMobile(false)}
              >
                <ArrowRight className="h-6 w-6 rotate-180 mr-2" />
              </Button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {selectedReq.user.charAt(0)}
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">{selectedReq.user}</CardTitle>
                <CardDescription className="text-[10px] sm:text-xs">{selectedReq.address}</CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant="outline" className="text-[10px]">{selectedReq.channel}</Badge>
              <span className="text-[10px] text-muted-foreground hidden sm:inline">ID: {selectedReq.id}</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {selectedReq.messages.map((m, i) => (
              <div key={i} className={cn("flex gap-3", m.sender === 'uk' ? 'flex-row-reverse' : '')}>
                <div className={cn("p-4 rounded-2xl max-w-[85%] sm:max-w-[80%]", m.sender === 'resident' ? 'bg-muted/50 rounded-tl-none' : 'bg-primary text-white rounded-tr-none')}>
                  <p className="text-sm">{m.text}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t bg-muted/5">
            <div className="flex gap-2">
              <Input placeholder="Ответить жителю..." className="bg-background" />
              <Button size="icon"><Send className="h-4 w-4" /></Button>
            </div>
            <div className="flex gap-4 mt-2 px-1">
              <button className="text-[10px] text-primary hover:underline flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Сгенерировать ответ AI
              </button>
              <button className="text-[10px] text-muted-foreground hover:underline">Шаблоны ответов</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}