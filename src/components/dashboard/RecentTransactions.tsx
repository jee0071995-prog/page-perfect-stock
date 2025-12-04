import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownToLine, ArrowUpFromLine, RotateCcw } from "lucide-react";

const transactions = [
  {
    id: "1",
    type: "inward",
    bookName: "Ananda Vikatan",
    quantity: 20,
    date: "2025-11-30",
    reference: "INV-001",
  },
  {
    id: "2",
    type: "outward",
    bookName: "Junior Vikatan",
    quantity: 15,
    date: "2025-11-29",
    reference: "BILL-042",
  },
  {
    id: "3",
    type: "return",
    bookName: "Aval Vikatan",
    quantity: 8,
    date: "2025-11-28",
    reference: "RET-012",
  },
  {
    id: "4",
    type: "inward",
    bookName: "Kungumam",
    quantity: 25,
    date: "2025-11-28",
    reference: "INV-002",
  },
  {
    id: "5",
    type: "outward",
    bookName: "Bakathi",
    quantity: 10,
    date: "2025-11-27",
    reference: "BILL-041",
  },
];

const typeConfig = {
  inward: {
    label: "Inward",
    variant: "default" as const,
    icon: ArrowDownToLine,
    className: "bg-success/10 text-success hover:bg-success/20",
  },
  outward: {
    label: "Outward",
    variant: "secondary" as const,
    icon: ArrowUpFromLine,
    className: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  return: {
    label: "Return",
    variant: "outline" as const,
    icon: RotateCcw,
    className: "bg-warning/10 text-warning hover:bg-warning/20",
  },
};

export function RecentTransactions() {
  return (
    <div className="card-shadow rounded-xl bg-card animate-fade-in">
      <div className="border-b border-border p-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <p className="text-sm text-muted-foreground">Latest stock movements</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Type</TableHead>
            <TableHead>Book Name</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const config = typeConfig[transaction.type as keyof typeof typeConfig];
            const Icon = config.icon;
            return (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Badge className={config.className}>
                    <Icon className="mr-1 h-3 w-3" />
                    {config.label}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{transaction.bookName}</TableCell>
                <TableCell className="text-right">{transaction.quantity}</TableCell>
                <TableCell className="text-muted-foreground">
                  {transaction.reference}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {transaction.date}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
