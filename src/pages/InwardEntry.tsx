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
import { CalendarIcon, Plus, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { bookNames, suppliers } from "@/data/bookData";
import { toast } from "@/hooks/use-toast";

const recentEntries = [
  { id: "1", date: "2025-12-01", bookName: "Ananda Vikatan", quantity: 20, supplier: "Vikatan Publications", billNo: "VIK-2024-001" },
  { id: "2", date: "2025-11-30", bookName: "Junior Vikatan", quantity: 30, supplier: "Vikatan Publications", billNo: "VIK-2024-002" },
  { id: "3", date: "2025-11-29", bookName: "Kungumam", quantity: 25, supplier: "Kungumam Media", billNo: "KUN-2024-015" },
  { id: "4", date: "2025-11-28", bookName: "Bakathi", quantity: 23, supplier: "Kumadam Press", billNo: "KUM-2024-008" },
];

const InwardEntry = () => {
  const [date, setDate] = useState<Date>();
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSave = () => {
    if (!date || !bookName || !quantity || !supplierName) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Entry Saved",
      description: `Inward entry for ${quantity} copies of ${bookName} has been saved.`,
    });

    // Reset form
    setDate(undefined);
    setBookName("");
    setAuthor("");
    setQuantity("");
    setSupplierName("");
    setBillNumber("");
    setRemarks("");
  };

  return (
    <MainLayout title="Inward Entry" subtitle="Record new stock arrivals">
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form Section */}
        <div className="lg:col-span-3">
          <div className="card-shadow rounded-xl bg-card p-6 animate-fade-in">
            <h3 className="mb-6 text-lg font-semibold text-foreground">New Inward Entry</h3>
            
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
                      onSelect={setDate}
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

              {/* Author / Publisher */}
              <div className="space-y-2">
                <Label htmlFor="author">Author / Publisher</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author or publisher"
                />
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Inward *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>

              {/* Supplier */}
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier Name *</Label>
                <Select value={supplierName} onValueChange={setSupplierName}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bill Number */}
              <div className="space-y-2">
                <Label htmlFor="billNumber">Bill Number / Reference</Label>
                <Input
                  id="billNumber"
                  value={billNumber}
                  onChange={(e) => setBillNumber(e.target.value)}
                  placeholder="Enter bill number"
                />
              </div>

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

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} className="gap-2">
                <Plus className="h-4 w-4" />
                Save Inward Entry
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Entries Panel */}
        <div className="lg:col-span-2">
          <div className="card-shadow rounded-xl bg-card animate-fade-in">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div>
                <h3 className="font-semibold text-foreground">Recent Inward Entries</h3>
                <p className="text-sm text-muted-foreground">Last 7 days</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Book</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{entry.bookName}</p>
                          <p className="text-xs text-muted-foreground">{entry.billNo}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary">{entry.quantity}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {entry.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InwardEntry;
