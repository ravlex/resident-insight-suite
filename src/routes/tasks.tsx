import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { CheckSquare, Plus, Clock, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/tasks")({
  component: TasksPage,
  head: () => ({
    meta: [{ title: "Внутренние задачи | ИВЦ ЖКХ и ТЭК" }],
  })
});

const tasks = [
  { id: 1, title: 'Проверить начисления по дому Ленина 15', deadline: 'Сегодня', status: 'В работе' },
  { id: 2, title: 'Подготовить отчет для РСО', deadline: 'Завтра', status: 'Новая' },
];

function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Внутренние задачи</h1>
        <Button><Plus className="mr-2 h-4 w-4" /> Добавить задачу</Button>
      </div>
      <div className="grid gap-4">
        {tasks.map(t => (
          <Card key={t.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CheckSquare className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{t.title}</p>
                <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {t.deadline}</span>
                </div>
              </div>
            </div>
            <Badge>{t.status}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
