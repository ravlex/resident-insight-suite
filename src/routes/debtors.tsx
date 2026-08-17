import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 

  Search, 
  Filter, 
  Download, 
  FileCheck, 
  FileText,
  MoreHorizontal,
  Mail,
  Phone,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/debtors")({
  component: DebtorsPage,
  head: () => ({
    meta: [{ title: "Работа с должниками | ИВЦ ЖКХ" }],
  })
});

const mockDebtors = [
  { id: '1', account: '1294028', address: 'ул. Ленина, д. 15, кв. 42', owner: 'Иванов А.И.', amount: 15420.50, period: 4, status: 'critical' },
  { id: '2', account: '1294035', address: 'ул. Ленина, д. 15, кв. 89', owner: 'Петрова С.М.', amount: 8200.00, period: 2, status: 'warning' },
  { id: '3', account: '1294102', address: 'ул. Мира, д. 4, кв. 12', owner: 'Сидоров К.В.', amount: 45600.75, period: 14, status: 'court' },
  { id: '4', account: '1294156', address: 'ул. Мира, д. 4, кв. 56', owner: 'Кузнецов П.С.', amount: 2100.00, period: 1, status: 'normal' },
  { id: '5', account: '1294201', address: 'пр. Гагарина, д. 10, кв. 5', owner: 'Смирнова Е.А.', amount: 12300.20, period: 3, status: 'warning' },
];

function DebtorsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");


  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Работа с должниками</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Управление задолженностью и взыскание
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => alert('Экспорт реестра запущен')}>
            <Download className="mr-2 h-4 w-4" /> Выгрузить
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none" onClick={() => alert('Переход к массовым коммуникациям')}>
            <FileCheck className="mr-2 h-4 w-4" /> Рассылка
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Общий долг</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4 млн ₽</div>
            <p className="text-xs text-red-600 mt-1 font-medium">+5% за месяц</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Критическая задолженность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 млн ₽</div>
            <p className="text-xs text-muted-foreground mt-1">Более 6 месяцев просрочки</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">В работе у юристов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85 дел</div>
            <p className="text-xs text-emerald-600 mt-1 font-medium">12 решений получено</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Реестр лицевых счетов</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" /> Фильтры
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className="p-2">
                    <p className="text-xs font-semibold mb-2 px-2 uppercase text-muted-foreground tracking-wider">Период долга</p>
                    <DropdownMenuItem>Более 3 месяцев</DropdownMenuItem>
                    <DropdownMenuItem>Более 6 месяцев</DropdownMenuItem>
                    <DropdownMenuItem>Более года</DropdownMenuItem>
                    <div className="h-px bg-border my-2" />
                    <p className="text-xs font-semibold mb-2 px-2 uppercase text-muted-foreground tracking-wider">Сумма</p>
                    <DropdownMenuItem>От 10 000 ₽</DropdownMenuItem>
                    <DropdownMenuItem>От 50 000 ₽</DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Лицевой счет</TableHead>
                <TableHead>Адрес / Собственник</TableHead>
                <TableHead>Сумма долга</TableHead>
                <TableHead>Период (мес)</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDebtors.map((debtor) => (
                <TableRow key={debtor.id}>
                  <TableCell className="font-medium">{debtor.account}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{debtor.address}</span>
                      <span className="text-xs text-muted-foreground">{debtor.owner}</span>
                    </div>
                  </TableCell>
                  <TableCell>{debtor.amount.toLocaleString()} ₽</TableCell>
                  <TableCell>{debtor.period}</TableCell>
                  <TableCell>
                    <Badge variant={
                      debtor.status === 'critical' ? 'destructive' :
                      debtor.status === 'warning' ? 'secondary' :
                      debtor.status === 'court' ? 'outline' : 'default'
                    } className={cn(
                      debtor.status === 'court' && "border-red-500 text-red-500",
                      debtor.status === 'warning' && "bg-orange-100 text-orange-700 hover:bg-orange-100"
                    )}>
                      {debtor.status === 'critical' && 'Критический'}
                      {debtor.status === 'warning' && 'Предупреждение'}
                      {debtor.status === 'court' && 'Судебный приказ'}
                      {debtor.status === 'normal' && 'Текущий'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert('Формирование уведомления PDF для ' + debtor.account)}>
                          <FileText className="mr-2 h-4 w-4" /> Сформировать уведомление (PDF)
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" /> Отправить на Email / в ЛК
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert('Настройка автообзвона для ' + debtor.account)}>
                          <Phone className="mr-2 h-4 w-4" /> Позвонить (автообзвон)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert('Настройка массовой рассылки для ' + debtor.account)}>
                          <Mail className="mr-2 h-4 w-4" /> Отправить Email / SMS
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <AlertCircle className="mr-2 h-4 w-4" /> Передать в суд
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
