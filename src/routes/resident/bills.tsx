import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/resident/bills")({
  component: ResidentBills,
  head: () => ({
    meta: [{ title: "Квитанции и оплаты | ИВЦ ЖКХ" }],
  })
});

function ResidentBills() {
  const bills = [
    { period: 'Май 2026', amount: 4120.00, status: 'paid', date: '10.05.2026' },
    { period: 'Апрель 2026', amount: 3950.00, status: 'paid', date: '12.04.2026' },
    { period: 'Март 2026', amount: 4500.00, status: 'paid', date: '08.03.2026' },
    { period: 'Февраль 2026', amount: 5200.00, status: 'paid', date: '10.02.2026' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">История начислений</h1>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Период</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата оплаты</TableHead>
                <TableHead className="text-right">Квитанция</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{bill.period}</TableCell>
                  <TableCell>{bill.amount.toLocaleString()} ₽</TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-emerald-500">Оплачено</Badge>
                  </TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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
