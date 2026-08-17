import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
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
  ChevronRight,
  Layers,
  Archive,
  CalendarCheck,
  FileBox,
  Layout,
  Plus
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
  { id: 1, name: 'ОСВ_Июнь_2026.pdf', date: '15.06.2026', size: '2.4 MB', author: 'Иванова А.', version: 'v2.1' },
  { id: 2, name: 'Реестр_Должников_Май.xlsx', date: '01.06.2026', size: '1.8 MB', author: 'Системный бот', version: 'v1.0' },
  { id: 3, name: 'Статистика_Услуг_Кв1.pdf', date: '10.04.2026', size: '4.2 MB', author: 'Петров С.', version: 'v1.4' },
];


const schedules = [
  { id: 1, name: 'Еженедельный реестр оплат', period: 'Каждый понедельник', email: 'fin@uk-teplo.ru', status: 'active' },
  { id: 2, name: 'Месячная ОСВ', period: '1-е число месяца', email: 'director@uk-teplo.ru', status: 'active' },
];

function ReportsPage() {
  const firstTemplate = reportTemplates[0];
  if (!firstTemplate) return null;
  const [selectedTemplate, setSelectedTemplate] = React.useState(firstTemplate.id);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [lastReport, setLastReport] = React.useState<string | null>(null);
  const [constructorStep, setConstructorStep] = React.useState(1);



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
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all shrink-0 w-[240px] lg:w-full group ${
                        selectedTemplate === template.id 
                          ? 'bg-[#F1F3F9] border-[#0F172A] shadow-sm' 
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >

                      <div className="flex items-center gap-3 w-full">
                        <div className={`p-2.5 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                          selectedTemplate === template.id 
                            ? 'bg-[#0F172A] text-white shadow-md' 
                            : 'bg-slate-50 text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-600'
                        }`}>
                          <template.icon className="h-5 w-5" />
                        </div>

                        <div className="flex-1 overflow-hidden">

                          <p className={`text-sm font-semibold truncate transition-colors ${
                            selectedTemplate === template.id ? 'text-[#0F172A]' : 'text-slate-700 group-hover:text-slate-900'
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
                <CardHeader className="border-b bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Конструктор отчета: {reportTemplates.find(t => t.id === selectedTemplate)?.title}</CardTitle>
                      <CardDescription>Шаг {constructorStep} из 3: {constructorStep === 1 ? 'Параметры и фильтры' : constructorStep === 2 ? 'Группировка и поля' : 'Формат и экспорт'}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 w-8 rounded-full ${i <= constructorStep ? 'bg-primary' : 'bg-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {constructorStep === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-2 duration-300">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Расчетный период</label>
                        <Select defaultValue="june2026">
                          <SelectTrigger className="h-11"><SelectValue placeholder="Выберите месяц" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="june2026">Июнь 2026</SelectItem>
                            <SelectItem value="may2026">Май 2026</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Объекты фонда</label>
                        <Select defaultValue="all">
                          <SelectTrigger className="h-11"><SelectValue placeholder="Все дома" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все объекты (12)</SelectItem>
                            <SelectItem value="l15">ул. Ленина, д. 15</SelectItem>
                            <SelectItem value="m4">ул. Мира, д. 4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Дополнительные фильтры</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['По услугам', 'По долгу > 3 мес', 'Только перерасчеты', 'С активными счетчиками'].map(f => (
                            <Badge key={f} variant="outline" className="py-2 justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                              <Plus className="h-3 w-3 mr-1" /> {f}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {constructorStep === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Группировка данных</label>
                          <Select defaultValue="house">
                            <SelectTrigger className="h-11"><SelectValue placeholder="Группировать по..." /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="house">По домам</SelectItem>
                              <SelectItem value="service">По услугам</SelectItem>
                              <SelectItem value="flat">По квартирам</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Сортировка</label>
                          <Select defaultValue="desc">
                            <SelectTrigger className="h-11"><SelectValue placeholder="Порядок..." /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="desc">По убыванию суммы</SelectItem>
                              <SelectItem value="asc">По возрастанию суммы</SelectItem>
                              <SelectItem value="addr">По адресу</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700 text-center block">Выберите поля для отображения</label>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {['Лицевой счет', 'ФИО', 'Адрес', 'Начислено', 'Пени', 'Оплачено', 'Сальдо на начало', 'Сальдо на конец'].map(p => (
                            <Badge key={p} className="py-2 px-4 cursor-pointer hover:bg-primary transition-all bg-primary/10 text-primary border-primary/20">
                              {p}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {constructorStep === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { label: 'PDF', icon: FileText, desc: 'Печатная форма' },
                          { label: 'Excel (XLSX)', icon: FileBarChart, desc: 'Для аналитики' },
                          { label: 'Word (DOCX)', icon: FileBox, desc: 'Для справок' },
                          { label: 'Архив (ZIP)', icon: Archive, desc: 'Пакетная выгрузка' },
                        ].map((f) => (
                          <div key={f.label} className="flex flex-col items-center p-4 border-2 rounded-xl hover:border-primary cursor-pointer transition-all bg-white hover:shadow-md">
                            <div className="p-3 bg-slate-50 rounded-lg mb-2">
                              <f.icon className="h-6 w-6 text-slate-700" />
                            </div>
                            <span className="text-xs font-bold">{f.label}</span>
                            <span className="text-[9px] text-muted-foreground mt-1">{f.desc}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-4">
                        <CalendarCheck className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="text-sm font-semibold text-blue-900">Регулярный отчет?</p>
                          <p className="text-[10px] text-blue-700">Вы можете сохранить этот шаблон и настроить его автоматическую генерацию в разделе "Расписание".</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t flex items-center justify-between">
                    <Button 
                      variant="ghost" 
                      onClick={() => setConstructorStep(s => Math.max(1, s - 1))}
                      disabled={constructorStep === 1 || isGenerating}
                    >
                      Назад
                    </Button>
                    <div className="flex gap-2">
                      {constructorStep < 3 ? (
                        <Button onClick={() => setConstructorStep(s => Math.min(3, s + 1))}>
                          Далее <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button onClick={handleGenerate} disabled={isGenerating}>
                          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                          {isGenerating ? "Формирование..." : "Сформировать отчет"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>


              {lastReport && (
                <Card className="border-emerald-200 bg-emerald-50/30 p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-900">Отчет готов</p>
                      <p className="text-xs text-emerald-700">Создан в {lastReport}</p>
                    </div>
                  </div>
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      alert("Файл скачивается...");
                      setLastReport(null);
                    }}
                  >
                    Скачать файл
                  </Button>
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
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{doc.name}</p>
                          <Badge variant="outline" className="text-[8px] py-0">{doc.version}</Badge>
                        </div>
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