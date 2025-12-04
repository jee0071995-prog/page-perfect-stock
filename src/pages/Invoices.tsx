import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Eye, Download, Printer, Receipt } from "lucide-react";

const invoices = [
  { id: "BILL-20251201-001", date: "2025-12-01", customer: "Ram Store", items: 3, amount: 450, status: "paid" },
  { id: "BILL-20251201-002", date: "2025-12-01", customer: "Vedivel Store", items: 5, amount: 680, status: "paid" },
  { id: "BILL-20251130-001", date: "2025-11-30", customer: "Murali Store", items: 2, amount: 240, status: "pending" },
  { id: "BILL-20251130-002", date: "2025-11-30", customer: "Subash Store", items: 4, amount: 520, status: "paid" },
  { id: "BILL-20251129-001", date: "2025-11-29", customer: "Santhosh Store", items: 6, amount: 890, status: "paid" },
  { id: "BILL-20251129-002", date: "2025-11-29", customer: "Padmanaban Store", items: 3, amount: 380, status: "pending" },
  { id: "BILL-20251128-001", date: "2025-11-28", customer: "Walk-in Customer", items: 1, amount: 40, status: "paid" },
  { id: "BILL-20251128-002", date: "2025-11-28", customer: "Ram Store", items: 4, amount: 560, status: "paid" },
];

const statusConfig = {
  paid: { label: "Paid", className: "bg-success/10 text-success" },
  pending: { label: "Pending", className: "bg-warning/10 text-warning" },
};

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showInvoice, setShowInvoice] = useState(false);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewInvoice = (invoice: any) => {
    setSelectedInvoice({
      ...invoice,
      items: [
        { bookName: "Ananda Vikatan", quantity: 2, rate: 40, amount: 80 },
        { bookName: "Junior Vikatan", quantity: 3, rate: 30, amount: 90 },
        { bookName: "Kungumam", quantity: 4, rate: 35, amount: 140 },
      ],
      shopName: "BookStock Store",
      shopAddress: "123 Main Street, Chennai - 600001",
      shopPhone: "+91 98765 43210",
      shopGST: "33AABCU9603R1ZM",
    });
    setShowInvoice(true);
  };

  const totalAmount = filteredInvoices.reduce((acc, inv) => acc + inv.amount, 0);
  const paidAmount = filteredInvoices.filter(i => i.status === 'paid').reduce((acc, inv) => acc + inv.amount, 0);
  const pendingAmount = filteredInvoices.filter(i => i.status === 'pending').reduce((acc, inv) => acc + inv.amount, 0);

  return (
    <MainLayout title="Invoices" subtitle="View and manage all generated bills">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="card-shadow rounded-xl bg-card p-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3">
              <Receipt className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Invoices</p>
              <p className="text-2xl font-bold text-foreground">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="card-shadow rounded-xl bg-card p-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-3">
              <Receipt className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Paid</p>
              <p className="text-2xl font-bold text-success">₹{paidAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="card-shadow rounded-xl bg-card p-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/10 p-3">
              <Receipt className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-warning">₹{pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card-shadow rounded-xl bg-card animate-fade-in">
        <div className="flex flex-col gap-4 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
          <h3 className="font-semibold text-foreground">All Invoices</h3>
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by bill no. or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Bill Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => {
              const config = statusConfig[invoice.status as keyof typeof statusConfig];
              return (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium font-mono">{invoice.id}</TableCell>
                  <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell className="text-right">{invoice.items}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{invoice.amount}
                  </TableCell>
                  <TableCell>
                    <Badge className={config.className}>{config.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => viewInvoice(invoice)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Invoice Preview Dialog */}
      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-6 bg-card">
                {/* Header */}
                <div className="text-center border-b border-dashed border-border pb-4 mb-4">
                  <h3 className="text-xl font-bold text-foreground">{selectedInvoice.shopName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.shopAddress}</p>
                  <p className="text-sm text-muted-foreground">Phone: {selectedInvoice.shopPhone}</p>
                  <p className="text-xs text-muted-foreground mt-1">GSTIN: {selectedInvoice.shopGST}</p>
                </div>

                {/* Bill Info */}
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Bill No:</p>
                    <p className="font-medium font-mono">{selectedInvoice.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Date:</p>
                    <p className="font-medium">{selectedInvoice.date}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Customer:</p>
                    <p className="font-medium">{selectedInvoice.customer}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t border-dashed border-border pt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-2 text-left font-medium">Item</th>
                        <th className="pb-2 text-right font-medium">Qty</th>
                        <th className="pb-2 text-right font-medium">Rate</th>
                        <th className="pb-2 text-right font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item: any, idx: number) => (
                        <tr key={idx} className="border-b border-border/50">
                          <td className="py-2">{item.bookName}</td>
                          <td className="py-2 text-right">{item.quantity}</td>
                          <td className="py-2 text-right">₹{item.rate}</td>
                          <td className="py-2 text-right">₹{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total */}
                <div className="border-t border-dashed border-border pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{selectedInvoice.amount}</span>
                  </div>
                </div>

                {/* Signature */}
                <div className="mt-8 pt-4 border-t border-border">
                  <div className="text-right">
                    <div className="h-12"></div>
                    <p className="text-sm text-muted-foreground border-t border-border pt-2 inline-block">
                      Authorized Signature
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button className="flex-1 gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Invoices;
