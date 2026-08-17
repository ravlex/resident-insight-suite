import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { 

  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Users, 
  ArrowUpRight,
  ChevronRight,
  Download,
  AlertCircle,
  Sparkles,
  CheckSquare,
  Clock,
  Layers,
  Map as MapIcon,
  Filter as FilterIcon
} from "lucide-react";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const collectionData = [
  { name: 'Янв', billed: 4500000, collected: 4100000 },
  { name: 'Фев', billed: 4200000, collected: 3950000 },
  { name: 'Мар', billed: 4800000, collected: 4600000 },
  { name: 'Апр', billed: 4100000, collected: 3800000 },
  { name: 'Май', billed: 4300000, collected: 4150000 },
  { name: 'Июн', billed: 4600000, collected: 4400000 },
];

const forecastData = [
  { name: 'Июн', actual: 4400000, forecast: 4400000 },
  { name: 'Июл', forecast: 4550000 },
  { name: 'Авг', forecast: 4300000 },
  { name: 'Сен', forecast: 4700000 },
  { name: 'Окт', forecast: 5100000 },
  { name: 'Ноя', forecast: 5400000 },
];

const debtorSegmentation = [
  { name: 'до 2 мес', value: 45, color: '#10b981' },
  { name: '2-6 мес', value: 30, color: '#f59e0b' },
  { name: '6-12 мес', value: 15, color: '#ef4444' },
  { name: '12+ мес', value: 10, color: '#7f1d1d' },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [{ title: "Дашборд | ИВЦ ЖКХ и ТЭК" }],
  })

});

function MetricCard({ title, value, subtext, trend, trendValue, icon: Icon }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className={cn(
            "flex items-center text-sm font-medium",
            trend === 'up' ? "text-emerald-600" : "text-red-600"
          )}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {trendValue}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Index() {
  const [selectedService, setSelectedService] = React.useState("all");


  return (
    <div className="space-y-8">
      {/* AI Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        </div>
        <input 
          type="text" 
          placeholder="Спросите AI об аналитике (например: 'Покажи дома с ростом долга за май')" 
          className="w-full h-14 pl-12 pr-4 bg-white border-2 border-primary/20 rounded-2xl shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm outline-none"
        />
        <div className="absolute inset-y-0 right-4 flex items-center">
          <Button size="sm" className="h-8">Анализировать</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Обзор показателей</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Оперативная сводка по сборам и задолженности
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="mr-2 h-4 w-4" /> <span className="hidden xs:inline">Экспорт</span> PDF
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none">Сформировать отчет</Button>
        </div>
      </div>

      {/* Service Filter & Benchmark Toggle */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border-2 border-slate-100">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Фильтр по услугам:</span>
        </div>
        <div className="flex gap-2">
          {["all", "gvs", "hvs", "electro"].map((s) => (
            <Button 
              key={s}
              variant={selectedService === s ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedService(s)}
              className="h-8 text-xs"
            >
              {s === "all" ? "Все услуги" : s === "gvs" ? "ГВС" : s === "hvs" ? "ХВС" : "Электро"}
            </Button>
          ))}
        </div>
        <div className="ml-auto hidden md:flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border">
          <Layers className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase text-slate-500">Benchmark ИВЦ:</span>
          <Badge variant="outline" className="bg-white text-emerald-600 border-emerald-100">Активен</Badge>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard 
          title="Собираемость" 
          value="94.2%" 
          subtext="+2.1% к прошлому месяцу" 
          trend="up" 
          trendValue="8.4%" 
          icon={Wallet} 
        />
        <MetricCard 
          title="Начислено всего" 
          value="4.62 млн ₽" 
          subtext="За июнь 2026" 
          trend="up" 
          trendValue="12%" 
          icon={ArrowUpRight} 
        />
        <MetricCard 
          title="Всего должников" 
          value="1,248" 
          subtext="15% от общего числа л/с" 
          trend="down" 
          trendValue="3.2%" 
          icon={Users} 
        />
        <MetricCard 
          title="Прогноз сборов" 
          value="4.35 млн ₽" 
          subtext="На основе AI-анализа" 
          trend="up" 
          trendValue="5.1%" 
          icon={TrendingUp} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Динамика сборов vs Рынок</CardTitle>
              <CardDescription>Сравнение собираемости нашей УК со средним значением по ИВЦ (Benchmark)</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" /> Наша УК
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-slate-300" /> Рынок
              </div>
            </div>
          </CardHeader>

          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="collected" name="Наша УК" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="billed" name="Среднее по ИВЦ" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">

          <CardHeader>
            <CardTitle>География обращений</CardTitle>
            <CardDescription>Концентрация жалоб по домам (топ 5)</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <div className="space-y-4">
              {[
                { address: 'ул. Ленина, д. 15', complaints: 14, trend: 'up' },
                { address: 'ул. Мира, д. 4', complaints: 9, trend: 'up' },
                { address: 'ул. Победы, д. 10', complaints: 5, trend: 'down' },
                { address: 'ул. Советская, д. 2', complaints: 3, trend: 'stable' },
                { address: 'ул. Гагарина, д. 7', complaints: 2, trend: 'stable' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">{h.address}</span>
                  <Badge variant={h.complaints > 10 ? "destructive" : "secondary"}>
                    {h.complaints} жалоб
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Прогноз поступлений (AI)</CardTitle>
            <CardDescription>Ожидаемые сборы до конца года с учетом сезонности</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="forecast" name="Прогноз" stroke="#3b82f6" fillOpacity={1} fill="url(#colorForecast)" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="actual" name="Факт" stroke="#1e293b" fill="#1e293b" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Анализ кассовых разрывов</CardTitle>
            <CardDescription>Сравнение прогноза сборов с обязательными платежами РСО</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500 text-white rounded-full">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-900">Риск дефицита в августе</p>
                    <p className="text-xs text-red-700">Ожидаемый разрыв: 450,000 ₽</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs border-red-200 text-red-800 hover:bg-red-100">Подробнее</Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Покрытие обязательств</span>
                  <span className="font-semibold text-orange-600">82%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full w-[82%]"></div>
                </div>
                <p className="text-[10px] text-muted-foreground italic">
                  * На основе прогноза оплат за ГВС и Электричество
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Календарь оплат</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: '15', status: 'fact', amount: '420k', label: 'Сегодня' },
                { day: '16', status: 'forecast', amount: '380k', label: 'Завтра' },
                { day: '17', status: 'forecast', amount: '510k', label: 'Ср' },
                { day: '18', status: 'forecast', amount: '290k', label: 'Чт' },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg border-l-4 border-l-primary bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-slate-700">{d.day}</div>
                    <div>
                      <p className="text-[10px] font-medium text-slate-500">{d.label}</p>
                      <p className="text-xs font-bold text-slate-900">{d.amount} ₽</p>
                    </div>
                  </div>
                  <Badge variant={d.status === 'fact' ? 'default' : 'outline'} className="text-[8px] h-4">
                    {d.status === 'fact' ? 'Факт' : 'Прогноз'}
                  </Badge>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs h-8" size="sm">
                Весь календарь <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">

          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Последние обращения</CardTitle>
              <CardDescription>Требуют вашего внимания сегодня</CardDescription>
            </div>
            <Button variant="ghost" size="sm">Все обращения <ChevronRight className="ml-1 h-4 w-4" /></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: '1042', user: 'Иванов А.И.', subject: 'Перерасчет ХВС', status: 'new', time: '10 мин назад' },
                { id: '1038', user: 'Петрова С.М.', subject: 'Качество отопления', status: 'process', time: '1 час назад' },
                { id: '1035', user: 'Сидоров К.В.', subject: 'Замена счетчика', status: 'new', time: '3 часа назад' },
              ].map((req) => (
                <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      req.status === 'new' ? "bg-blue-500" : "bg-orange-500"
                    )} />
                    <div>
                      <p className="font-medium text-sm">{req.subject}</p>
                      <p className="text-xs text-muted-foreground">{req.user} • л/с 1294028</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{req.time}</p>
                    <p className="text-xs font-medium text-primary mt-1">№{req.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">

          <CardHeader>
            <CardTitle>AI-Инсайт</CardTitle>
            <CardDescription>Умный помощник проанализировал данные</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold text-sm">Прогноз собираемости</span>
              </div>
              <p className="text-sm leading-relaxed">
                На основе данных за прошлый год и текущих оплат, ожидаемая собираемость к концу месяца составит <strong>96.4%</strong>. 
                Рекомендуется направить уведомления группе "2-6 мес" в домах по ул. Ленина, так как там наблюдается снижение активности на 12%.
              </p>
              <Button className="w-full text-xs" variant="outline" size="sm">
                Посмотреть детальный анализ
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1">

          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Активные задачи</CardTitle>
              <CardDescription>Ближайшие дедлайны</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild><Link to="/tasks">Все задачи</Link></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'Сверка по Ленина 15', date: 'Сегодня', priority: 'high' },
                { title: 'Отчет для РСО', date: 'Завтра', priority: 'medium' },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckSquare className={cn("h-4 w-4", task.priority === 'high' ? "text-red-500" : "text-muted-foreground")} />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" /> {task.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Utility for className merging if not imported
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

