import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useState } from "react";
import { 
  FileBarChart, 
  FileText, 
  Download, 
  Calendar as CalendarIcon, 
  Filter,
  ArrowRight,
  Loader2,
  CheckCircle2,
  History,
  Clock,
  Settings,
  Mail,
  Search,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
  head: () => ({
    meta: [{ title: "Отчеты и аналитика | ИВЦ ЖКХ и ТЭК" }],
  })
});

const reportTemplates = [
  { 
    id: 'osv', 
    title: 'Оборотно-сальдовая ведомость', 
    description: 'Полная сводка по начислениям, оплатам и сальдо за период',
    category: 'Бухгалтерия',
    icon: FileBarChart
  },
  { 
    id: 'debtors_registry', 
    title: 'Реестр должников', 
    description: 'Список лицевых счетов с просроченной задолженностью > 2 мес',
    category: 'Взыскание',
    icon: FileText
  },
  { 
    id: 'payments_registry', 
    title: 'Реестр поступивших платежей', 
    description: 'Детализация всех транзакций по банковским выпискам',
    category: 'Касса',
    icon: Download
  }
];

const archiveDocuments = [
  { id: 1, name: 'ОСВ_Июнь_2026.pdf', date: '15.06.2026', size: '2.4 MB', author: 'Иванова А.' },
  { id: 2, name: 'Реестр_Должников_Май.xlsx', date: '01.06.2026', size: '1.8 MB', author: 'Системный бот' },
  { id: 3, name: 'Статистика_Услуг_Кв1.pdf', date: '10.04.2026', size: '4.2 MB', author: 'Петров С.' },
];

const schedules = [
  { id: 1, name: 'Еженедельный реестр оплат', period: 'Каждый понедельник', email: 'fin@uk-teplo.ru', status: 'active' },
  { id: 2, name: 'Месячная ОСВ', period: '1-е число месяца', email: 'director@uk-teplo.ru', status: 'active' },
];

function ReportsPage() {
  const firstTemplate = reportTemplates[0];
  if (!firstTemplate) return null;
  const [selectedTemplate, setSelectedTemplate] = useState(firstTemplate.id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastReport, setLastReport] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setLastReport(null);
    setTimeout(() => {
      setIsGenerating(false);
      setLastReport(new Date().toLocaleTimeString());
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Отчетность и документы</h1>
        <p className="text-muted-foreground mt-1">
          Единое пространство для формирования, планирования и хранения отчетов
        </p>
      </div>

      <Tabs defaultValue="constructor" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-xl mb-6">
          <TabsTrigger value="constructor" className="rounded-lg data-[state=active]:shadow-sm">Конструктор</TabsTrigger>
          <TabsTrigger value="archive" className="rounded-lg data-[state=active]:shadow-sm">Архив</TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-lg data-[state=active]:shadow-sm">Расписание</TabsTrigger>
        </TabsList>

        <TabsContent value="constructor" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="font-semibold text-sm px-2">Шаблоны</h3>
              <ScrollArea className="h-auto lg:h-[calc(100vh-380px)]">
                <div className="flex lg:flex-col gap-3 pb-4 lg:pb-0 lg:pr-4 overflow-x-auto lg:overflow-x-visible">
                  {reportTemplates.map((template) => (
                    <div 
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all shrink-0 w-[240px] lg:w-full ${
                        selectedTemplate === template.id 
                          ? 'bg-[#F1F3F9] border-[#0F172A] shadow-sm' 
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg flex items-center justify-center transition-colors ${
                          selectedTemplate === template.id 
                            ? 'bg-[#0F172A] text-white shadow-md' 
                            : 'bg-slate-50 text-slate-500'
                        }`}>
                          <template.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className={`text-sm font-semibold truncate ${
                            selectedTemplate === template.id ? 'text-[#0F172A]' : 'text-slate-700'
                          }`}>
                            {template.title}
                          </p>
                          <Badge variant="secondary" className="mt-1 text-[10px] py-0">{template.category}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Параметры формирования</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Период</label>
                      <Select defaultValue="june2026">
                        <SelectTrigger><SelectValue placeholder="Месяц" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="june2026">Июнь 2026</SelectItem>
                          <SelectItem value="may2026">Май 2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Дома</label>
                      <Select defaultValue="all">
                        <SelectTrigger><SelectValue placeholder="Все дома" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все объекты</SelectItem>
                          <SelectItem value="l15">ул. Ленина 15</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Формат</label>
                      <Select defaultValue="pdf">
                        <SelectTrigger><SelectValue placeholder="PDF" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Документ</SelectItem>
                          <SelectItem value="xlsx">Excel Таблица</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="pt-4 border-t flex justify-end">
                    <Button onClick={handleGenerate} disabled={isGenerating}>
                      {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                      {isGenerating ? "Обработка..." : "Сформировать"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {lastReport && (
                <Card className="border-emerald-200 bg-emerald-50/30 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-900">Отчет готов</p>
                      <p className="text-xs text-emerald-700">Создан в {lastReport}</p>
                    </div>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Скачать файл</Button>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="archive" className="m-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Архив документов</CardTitle>
                <CardDescription>История всех сформированных отчетов</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Поиск по названию..." className="pl-9 h-9" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {archiveDocuments.map((doc) => (
                  <div key={doc.id} className="py-4 flex items-center justify-between hover:bg-muted/20 px-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.date} • {doc.size} • Автор: {doc.author}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm"><History className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schedules.map((s) => (
              <Card key={s.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                      <Clock className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-100">Активно</Badge>
                  </div>
                  <CardTitle className="text-lg mt-4">{s.name}</CardTitle>
                  <CardDescription>Периодичность: {s.period}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>Отправка на: {s.email}</span>
                  </div>
                  <div className="pt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="w-full">Настроить</Button>
                    <Button variant="ghost" size="sm" className="w-full text-red-600">Остановить</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="border-dashed flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="p-3 bg-muted rounded-full mb-3">
                <Settings className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium">Новое расписание</p>
              <p className="text-xs text-muted-foreground mt-1">Автоматизируйте рутину</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}