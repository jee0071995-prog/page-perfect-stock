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
import { CalendarIcon, Plus, Filter, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { bookNames } from "@/data/bookData";
import { toast } from "@/hooks/use-toast";

const returnEntries = [
  { id: "1", date: "2025-12-01", bookName: "Ananda Vikatan", quantity: 8, returnedBy: "Ram Store", status: "accepted", remarks: "Unsold copies" },
  { id: "2", date: "2025-11-30", bookName: "Aval Vikatan", quantity: 15, returnedBy: "Vedivel Store", status: "pending", remarks: "Damaged copies" },
  { id: "3", date: "2025-11-29", bookName: "Junior Vikatan", quantity: 10, returnedBy: "Murali Store", status: "accepted", remarks: "End of issue period" },
  { id: "4", date: "2025-11-28", bookName: "Kungumam", quantity: 5, returnedBy: "Subash Store", status: "rejected", remarks: "Past return deadline" },
  { id: "5", date: "2025-11-27", bookName: "Bakathi", quantity: 12, returnedBy: "Santhosh Store", status: "pending", remarks: "Unsold copies" },
];

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-warning/10 text-warning" },
  accepted: { label: "Accepted", icon: CheckCircle, className: "bg-success/10 text-success" },
  rejected: { label: "Rejected", icon: XCircle, className: "bg-destructive/10 text-destructive" },
};

const Returns = () => {
  const [date, setDate] = useState<Date>();
  const [bookName, setBookName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [returnedBy, setReturnedBy] = useState("");
  const [remarks, setRemarks] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterBook, setFilterBook] = useState("");

  const handleSave = () => {
    if (!date || !bookName || !quantity || !returnedBy) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Return Entry Saved",
      description: `Return entry for ${quantity} copies of ${bookName} has been recorded.`,
    });

    setDate(undefined);
    setBookName("");
    setQuantity("");
    setReturnedBy("");
    setRemarks("");
  };

  const filteredEntries = returnEntries.filter(entry => {
    if (filterBook && entry.bookName !== filterBook) return false;
    return true;
  });

  return (
    <MainLayout title="Return Entry" subtitle="Record and manage book returns">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form Section */}
        <div className="card-shadow rounded-xl bg-card p-6 animate-fade-in">
          <h3 className="mb-6 text-lg font-semibold text-foreground">New Return Entry</h3>
          
          <div className="grid gap-5">
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

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Returned *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>

              {/* Returned By */}
              <div className="space-y-2">
                <Label htmlFor="returnedBy">Returned By *</Label>
                <Input
                  id="returnedBy"
                  value={returnedBy}
                  onChange={(e) => setReturnedBy(e.target.value)}
                  placeholder="Store or customer name"
                />
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Reason for return, condition, etc."
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Plus className="h-4 w-4" />
              Save Return Entry
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="card-shadow rounded-xl bg-card p-4 text-center animate-fade-in">
              <p className="text-2xl font-bold text-warning">5</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div className="card-shadow rounded-xl bg-card p-4 text-center animate-fade-in">
              <p className="text-2xl font-bold text-success">45</p>
              <p className="text-sm text-muted-foreground">Accepted</p>
            </div>
            <div className="card-shadow rounded-xl bg-card p-4 text-center animate-fade-in">
              <p className="text-2xl font-bold text-destructive">3</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Returns Table */}
      <div className="mt-6 card-shadow rounded-xl bg-card animate-fade-in">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <h3 className="font-semibold text-foreground">Return Status</h3>
            <p className="text-sm text-muted-foreground">All return entries</p>
          </div>
          <div className="flex gap-2">
            <Select value={filterBook} onValueChange={setFilterBook}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by book" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Books</SelectItem>
                {bookNames.map((book) => (
                  <SelectItem key={book} value={book}>
                    {book}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Date</TableHead>
              <TableHead>Book Name</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>Returned By</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntries.map((entry) => {
              const config = statusConfig[entry.status as keyof typeof statusConfig];
              const Icon = config.icon;
              return (
                <TableRow key={entry.id}>
                  <TableCell className="text-muted-foreground">{entry.date}</TableCell>
                  <TableCell className="font-medium">{entry.bookName}</TableCell>
                  <TableCell className="text-right">{entry.quantity}</TableCell>
                  <TableCell>{entry.returnedBy}</TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate">
                    {entry.remarks}
                  </TableCell>
                  <TableCell>
                    <Badge className={config.className}>
                      <Icon className="mr-1 h-3 w-3" />
                      {config.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
};

export default Returns;
