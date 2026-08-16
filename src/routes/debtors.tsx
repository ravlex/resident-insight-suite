import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  FileCheck, 
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
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Работа с должниками</h1>
          <p className="text-muted-foreground mt-1">
            Управление дебиторской задолженностью и автоматизация взыскания
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Выгрузить реестр
          </Button>
          <Button>
            <FileCheck className="mr-2 h-4 w-4" /> Массовая рассылка уведомлений
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
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" /> Отправить уведомление
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" /> Позвонить (автообзвон)
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
        </CardContent>
      </Card>
    </div>
  );
}
