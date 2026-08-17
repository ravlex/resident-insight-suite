import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, FileText, Send, AlertCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/resident/")({
  component: ResidentDashboard,
  head: () => ({
    meta: [{ title: "Личный кабинет | ИВЦ ЖКХ" }],
  })
});

function ResidentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Личный кабинет жителя</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Текущий баланс</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">2 450.00 ₽</div>
            <p className="text-muted-foreground text-sm mt-1">Оплатите до 25 числа</p>
            <Button className="mt-4 w-full">Оплатить онлайн</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Последнее начисление</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Май 2026</span>
                <span className="font-bold">4 120.00 ₽</span>
              </div>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Скачать квитанцию
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Чат с диспетчером</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-muted rounded-lg text-sm">
            Диспетчер: Здравствуйте! Как я могу вам помочь?
          </div>
          <div className="flex gap-2">
            <input className="flex-1 border rounded-lg p-2" placeholder="Ваше сообщение..." />
            <Button size="icon"><Send className="h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
