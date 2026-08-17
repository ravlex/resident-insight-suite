import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/notifications")({
  component: NotificationsPage,
  head: () => ({
    meta: [{ title: "События и уведомления | ИВЦ ЖКХ и ТЭК" }],
  })
});

const notifications = [
  { id: 1, type: 'critical', title: 'Риск дефицита бюджета', text: 'Ожидаемый разрыв в августе: 450 000 ₽', time: '5 мин назад' },
  { id: 2, type: 'warning', title: 'Снижение собираемости', text: 'По дому ул. Ленина, 15 собираемость упала на 12%', time: '1 час назад' },
  { id: 3, type: 'info', title: 'Отчет сформирован', text: 'Оборотно-сальдовая ведомость за июнь готова', time: '3 часа назад' },
];

function NotificationsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Центр уведомлений</h1>
      {notifications.map(n => (
        <Card key={n.id} className="hover:bg-muted/50 transition-colors">
          <CardContent className="p-4 flex gap-4">
            <div className={cn("p-2 rounded-full h-fit", 
              n.type === 'critical' ? 'bg-red-100 text-red-600' : 
              n.type === 'warning' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
            )}>
              {n.type === 'critical' ? <AlertCircle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
            </div>
            <div>
              <p className="font-semibold">{n.title}</p>
              <p className="text-sm text-muted-foreground">{n.text}</p>
              <span className="text-[10px] text-muted-foreground mt-2 block">{n.time}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function cn(...inputs: any[]) { return inputs.filter(Boolean).join(" "); }
