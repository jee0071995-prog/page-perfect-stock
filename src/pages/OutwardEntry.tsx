import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarIcon, FileText, Download, Printer, ArrowUpFromLine } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { bookNames, booksList } from "@/data/bookData";
import { toast } from "@/hooks/use-toast";

const todayOutward = [
  { id: "1", bookName: "Ananda Vikatan", quantity: 5, customer: "Ram Store", amount: 200 },
  { id: "2", bookName: "Junior Vikatan", quantity: 8, customer: "Vedivel Store", amount: 240 },
  { id: "3", bookName: "Kungumam", quantity: 4, customer: "Murali Store", amount: 140 },
];

const customers = [
  "Ram Store",
  "Vedivel Store",
  "Murali Store",
  "Subash Store",
  "Padmanaban Store",
  "Santhosh Store",
  "Walk-in Customer",
];

const OutwardEntry = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [bookName, setBookName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [generatedBill, setGeneratedBill] = useState<any>(null);

  const selectedBook = booksList.find(b => b.bookName === bookName);
  const rate = selectedBook?.rateOfBook || 0;
  const amount = Number(quantity) * rate;

  const handleGenerateBill = () => {
    if (!date || !bookName || !quantity || !customerName) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const billNumber = `BILL-${format(new Date(), 'yyyyMMdd')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    setGeneratedBill({
      billNumber,
      date: format(date, 'PPP'),
      customerName,
      items: [
        {
          bookName,
          quantity: Number(quantity),
          rate,
          amount,
        }
      ],
      totalItems: Number(quantity),
      totalAmount: amount,
    });
    
    setShowInvoice(true);

    toast({
      title: "Bill Generated",
      description: `Bill ${billNumber} has been generated successfully.`,
    });
  };

  return (
    <MainLayout title="Outward Entry" subtitle="Record stock outgoing and generate bills">
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form Section */}
        <div className="lg:col-span-3">
          <div className="card-shadow rounded-xl bg-card p-6 animate-fade-in">
            <h3 className="mb-6 text-lg font-semibold text-foreground">New Outward Entry</h3>
            
            <div className="grid gap-5 md:grid-cols-2">
              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Book Name */}
              <div className="space-y-2">
                <Label htmlFor="bookName">Book Name *</Label>
                <Select value={bookName} onValueChange={setBookName}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select book" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {bookNames.map((book) => (
                      <SelectItem key={book} value={book}>
                        {book}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Outward *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>

              {/* Customer */}
              <div className="space-y-2">
                <Label htmlFor="customer">Customer / Store Name *</Label>
                <Select value={customerName} onValueChange={setCustomerName}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {customers.map((customer) => (
                      <SelectItem key={customer} value={customer}>
                        {customer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Calculated Amount */}
              {bookName && quantity && (
                <div className="space-y-2 md:col-span-2">
                  <div className="rounded-lg bg-secondary p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rate per book:</span>
                      <span className="font-medium">₹{rate}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-lg">
                      <span className="font-medium">Total Amount:</span>
                      <span className="font-bold text-primary">₹{amount}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Remarks */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter any additional notes"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={handleGenerateBill} className="gap-2">
                <FileText className="h-4 w-4" />
                Generate Bill
              </Button>
              <Button className="gap-2">
                <ArrowUpFromLine className="h-4 w-4" />
                Save Outward
              </Button>
            </div>
          </div>
        </div>

        {/* Today's Summary Panel */}
        <div className="lg:col-span-2">
          <div className="card-shadow rounded-xl bg-card animate-fade-in">
            <div className="border-b border-border p-4">
              <h3 className="font-semibold text-foreground">Today's Outward Summary</h3>
              <p className="text-sm text-muted-foreground">{format(new Date(), 'PPP')}</p>
            </div>
            <div className="p-4">
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-primary/10 p-3 text-center">
                  <p className="text-2xl font-bold text-primary">17</p>
                  <p className="text-xs text-muted-foreground">Total Items</p>
                </div>
                <div className="rounded-lg bg-success/10 p-3 text-center">
                  <p className="text-2xl font-bold text-success">₹580</p>
                  <p className="text-xs text-muted-foreground">Total Value</p>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Book</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayOutward.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{entry.bookName}</p>
                        <p className="text-xs text-muted-foreground">{entry.customer}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{entry.quantity}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{entry.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Invoice Dialog */}
      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice Generated</DialogTitle>
          </DialogHeader>
          {generatedBill && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold">BookStock Store</h3>
                  <p className="text-sm text-muted-foreground">123 Main Street, Chennai</p>
                  <p className="text-sm text-muted-foreground">Phone: +91 98765 43210</p>
                </div>
                <div className="border-t border-dashed border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bill No:</span>
                    <span className="font-medium">{generatedBill.billNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{generatedBill.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Customer:</span>
                    <span>{generatedBill.customerName}</span>
                  </div>
                </div>
                <div className="mt-4 border-t border-dashed border-border pt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left">Item</th>
                        <th className="pb-2 text-right">Qty</th>
                        <th className="pb-2 text-right">Rate</th>
                        <th className="pb-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedBill.items.map((item: any, idx: number) => (
                        <tr key={idx}>
                          <td className="py-1">{item.bookName}</td>
                          <td className="py-1 text-right">{item.quantity}</td>
                          <td className="py-1 text-right">₹{item.rate}</td>
                          <td className="py-1 text-right">₹{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 border-t border-dashed border-border pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{generatedBill.totalAmount}</span>
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

export default OutwardEntry;
