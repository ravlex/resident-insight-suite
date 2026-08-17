import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  MessageSquare, 
  Search, 
  Send, 
  Sparkles, 
  User, 
  Clock,
  CheckCircle2,
  AlertCircle
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
    meta: [{ title: "Обращения жителей | ИВЦ ЖКХ" }],
  })
});

const mockRequests = [
  { 
    id: '1042', 
    user: 'Иванов А.И.', 
    address: 'ул. Ленина, 15, кв 42',
    subject: 'Неверное начисление за ГВС', 
    status: 'new', 
    priority: 'high',
    time: '10 мин назад',
    message: 'Здравствуйте. В квитанции за июнь указан объем ГВС 15м3, хотя по счетчикам у меня 4м3. Прошу сделать перерасчет.'
  },
  { 
    id: '1038', 
    user: 'Петрова С.М.', 
    address: 'ул. Ленина, 15, кв 89',
    subject: 'Отсутствие отопления в одной комнате', 
    status: 'process', 
    priority: 'medium',
    time: '1 час назад',
    message: 'Добрый день. В большой комнате батарея холодная, хотя в остальных греет хорошо. Проверьте систему.'
  },
  { 
    id: '1035', 
    user: 'Сидоров К.В.', 
    address: 'ул. Мира, 4, кв 12',
    subject: 'Замена прибора учета электроэнергии', 
    status: 'new', 
    priority: 'low',
    time: '3 часа назад',
    message: 'Срок поверки счетчика истек. Когда придет мастер для замены?'
  },
];

function RequestsPage() {
  const [selectedId, setSelectedId] = useState('1042');
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(false);

  const selectedRequest = mockRequests.find(r => r.id === selectedId) || mockRequests[0];

  if (!selectedRequest) return null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setShowDetailOnMobile(true);
  };

  const generateAiReply = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiSuggestion(
        `Уважаемый ${selectedRequest.user}! Мы приняли ваше обращение №${selectedRequest.id} по вопросу "${selectedRequest.subject}". Наши специалисты проверят данные переданных показаний счетчиков и, в случае выявления расхождений, произведут корректировку в следующем платежном периоде. Ориентировочный срок проверки — 2 рабочих дня.`
      );
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-160px)] gap-6 overflow-hidden">
      {/* List */}
      <div className={cn(
        "w-full lg:w-1/3 flex flex-col gap-4 overflow-hidden",
        showDetailOnMobile ? "hidden lg:flex" : "flex"
      )}>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Поиск обращений..." className="pl-9" />
        </div>
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {mockRequests.map((req) => (
              <div 
                key={req.id} 
                onClick={() => handleSelect(req.id)}
                className={cn(
                  "p-4 border rounded-xl cursor-pointer transition-all hover:border-primary/50",
                  selectedId === req.id ? "bg-primary/5 border-primary shadow-sm" : "bg-card"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={req.priority === 'high' ? 'destructive' : 'outline'} className="text-[10px] px-1.5 py-0">
                    {req.priority === 'high' ? 'СРОЧНО' : req.priority === 'medium' ? 'СРЕДНИЙ' : 'НИЗКИЙ'}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {req.time}
                  </span>
                </div>
                <h3 className="font-semibold text-sm line-clamp-1">{req.subject}</h3>
                <p className="text-xs text-muted-foreground mt-1">{req.user} • {req.address}</p>
                <div className="flex items-center gap-2 mt-3">
                   {req.status === 'new' ? (
                     <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px]">Новое</Badge>
                   ) : (
                     <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-[10px]">В работе</Badge>
                   )}
                   <span className="text-[10px] text-muted-foreground ml-auto">№{req.id}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Detail */}
      <div className={cn(
        "flex-1 flex flex-col gap-6 overflow-hidden",
        !showDetailOnMobile ? "hidden lg:flex" : "flex"
      )}>
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader className="border-b pb-4 px-4 sm:px-6">
            <div className="flex items-center gap-2 lg:hidden mb-4">
              <Button variant="ghost" size="sm" onClick={() => setShowDetailOnMobile(false)} className="-ml-2">
                <ArrowRight className="h-4 w-4 rotate-180 mr-2" /> Назад
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <CardTitle className="text-xl">{selectedRequest.subject}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <User className="h-3 w-3" /> {selectedRequest.user} • л/с 1294028 • {selectedRequest.address}
                </CardDescription>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Делегировать</Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex-1 sm:flex-none">
                  <CheckCircle2 className="sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Закрыть</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <User className="h-4 w-4" />
              </div>
              <div className="bg-muted/30 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                <p className="text-sm leading-relaxed">{selectedRequest.message}</p>
              </div>
            </div>

            {aiSuggestion && (
              <div className="flex gap-4 justify-end">
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Sparkles className="h-3 w-3" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">AI Помощник</span>
                  </div>
                  <p className="text-sm leading-relaxed">{aiSuggestion}</p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="h-7 text-[10px]">Отправить как есть</Button>
                    <Button variant="outline" size="sm" className="h-7 text-[10px]">Редактировать</Button>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
            )}
          </CardContent>
          <div className="p-4 sm:p-6 border-t bg-muted/5">
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-[10px] h-7 border-primary/30 text-primary"
                onClick={generateAiReply}
                disabled={isGenerating}
              >
                <Sparkles className={cn("mr-1.5 h-3 w-3", isGenerating && "animate-spin")} />
                {isGenerating ? "Генерация ответа..." : "Сформировать AI-ответ"}
              </Button>
            </div>
            <div className="relative">
              <textarea 
                placeholder="Введите ваш ответ или используйте AI-помощника..."
                className="w-full min-h-[100px] p-4 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
              />
              <Button size="icon" className="absolute bottom-3 right-3 rounded-full h-8 w-8">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
