import { createFileRoute } from "@tanstack/react-router";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Users, 
  ArrowUpRight,
  ChevronRight,
  Download
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
    meta: [{ title: "Дашборд | ИВЦ ЖКХ" }],
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
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Обзор показателей</h1>
          <p className="text-muted-foreground mt-1">
            Оперативная сводка по сборам и задолженности за текущий период
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Экспорт PDF
          </Button>
          <Button size="sm">Сформировать отчет</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Динамика сборов</CardTitle>
            <CardDescription>Сравнение начислений и фактических платежей (6 мес.)</CardDescription>
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
                <Bar dataKey="billed" name="Начислено" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="collected" name="Собрано" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Сегментация дебиторской задолженности</CardTitle>
            <CardDescription>Распределение должников по периоду просрочки</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={debtorSegmentation} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                  {debtorSegmentation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

        <Card>
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
      </div>
    </div>
  );
}

// Utility for className merging if not imported
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

