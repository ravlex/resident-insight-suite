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
  CheckCircle2
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

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
  head: () => ({
    meta: [{ title: "Отчеты и аналитика | ИВЦ ЖКХ" }],
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
  },
  { 
    id: 'service_stats', 
    title: 'Статистика по услугам', 
    description: 'Анализ потребления ресурсов (вода, свет, тепло)',
    category: 'Аналитика',
    icon: FileBarChart
  }
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Конструктор отчетов</h1>
          <p className="text-muted-foreground mt-1">
            Создавайте детальные аналитические выгрузки и бухгалтерские документы
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Templates Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-semibold text-sm px-2">Выберите шаблон</h3>
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2 pr-4">
              {reportTemplates.map((template) => (
                <div 
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedTemplate === template.id 
                      ? 'bg-[#F1F3F9] border-[#0F172A] shadow-sm ring-1 ring-[#0F172A]' 
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
                      <Badge 
                        variant="secondary" 
                        className={`mt-1.5 text-[10px] py-0 px-2 h-4.5 font-medium transition-colors ${
                          selectedTemplate === template.id 
                            ? 'bg-white text-slate-600 border-slate-200' 
                            : 'bg-slate-100 text-slate-500 border-transparent'
                        }`}
                      >
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Config and Preview */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Параметры отчета</CardTitle>
              <CardDescription>
                Настройте фильтры для выбранного шаблона: {reportTemplates.find(t => t.id === selectedTemplate)?.title ?? ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Период</label>
                  <Select defaultValue="june2026">
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите месяц" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="june2026">Июнь 2026</SelectItem>
                      <SelectItem value="may2026">Май 2026</SelectItem>
                      <SelectItem value="april2026">Апрель 2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Объект управления</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Все дома" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все объекты</SelectItem>
                      <SelectItem value="lenina15">ул. Ленина, д. 15</SelectItem>
                      <SelectItem value="mira4">ул. Мира, д. 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Услуги</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Все услуги" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все начисления</SelectItem>
                      <SelectItem value="water">Водоснабжение</SelectItem>
                      <SelectItem value="heating">Отопление</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Дополнительные фильтры: отключены</span>
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Обработка данных...
                    </>
                  ) : (
                    <>
                      Сформировать отчет
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {lastReport && (
            <Card className="border-emerald-200 bg-emerald-50/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    <div>
                      <h4 className="font-semibold text-emerald-900">Отчет готов к выгрузке</h4>
                      <p className="text-sm text-emerald-700">Сформирован в {lastReport}. Размер файла: 2.4 МБ</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-emerald-200 hover:bg-emerald-100 text-emerald-800">
                      <Download className="mr-2 h-4 w-4" /> Excel
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Download className="mr-2 h-4 w-4" /> PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!lastReport && !isGenerating && (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-muted/20">
              <FileBarChart className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-center max-w-xs">
                Выберите шаблон и нажмите "Сформировать", чтобы увидеть предпросмотр данных
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
