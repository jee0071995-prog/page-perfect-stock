import { useState, useMemo } from "react";
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
import { CalendarIcon, Plus, CheckCircle, XCircle, Clock, Store } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { shopNames, outwardToShops, bookNames } from "@/data/bookData";
import { toast } from "@/hooks/use-toast";

const returnEntries = [
  { id: "1", date: "2025-12-01", bookName: "Ananda Vikatan", quantity: 8, shopName: "Ram Store", status: "accepted", remarks: "Unsold copies" },
  { id: "2", date: "2025-11-30", bookName: "Aval Vikatan", quantity: 15, shopName: "Vedivel Store", status: "pending", remarks: "Damaged copies" },
  { id: "3", date: "2025-11-29", bookName: "Junior Vikatan", quantity: 10, shopName: "Murali Store", status: "accepted", remarks: "End of issue period" },
  { id: "4", date: "2025-11-28", bookName: "Kungumam", quantity: 5, shopName: "Subash Store", status: "rejected", remarks: "Past return deadline" },
  { id: "5", date: "2025-11-27", bookName: "Bakathi", quantity: 12, shopName: "Santhosh Store", status: "pending", remarks: "Unsold copies" },
];

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-warning/10 text-warning" },
  accepted: { label: "Accepted", icon: CheckCircle, className: "bg-success/10 text-success" },
  rejected: { label: "Rejected", icon: XCircle, className: "bg-destructive/10 text-destructive" },
};

const Returns = () => {
  const [date, setDate] = useState<Date>();
  const [shopName, setShopName] = useState("");
  const [bookName, setBookName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");
  const [filterShop, setFilterShop] = useState("");
  const [filterBook, setFilterBook] = useState("");

  // Get books sent to the selected shop (from outward entries)
  const booksForShop = useMemo(() => {
    if (!shopName) return [];
    return outwardToShops.filter(entry => entry.shopName === shopName);
  }, [shopName]);

  // Get available books for selected shop (books that have remaining quantity)
  const availableBooksForReturn = useMemo(() => {
    return booksForShop.filter(entry => entry.quantity - entry.returnedQty > 0);
  }, [booksForShop]);

  // Get selected book's outward entry
  const selectedOutwardEntry = useMemo(() => {
    return booksForShop.find(entry => entry.bookName === bookName);
  }, [booksForShop, bookName]);

  const maxReturnQty = selectedOutwardEntry 
    ? selectedOutwardEntry.quantity - selectedOutwardEntry.returnedQty 
    : 0;

  const handleShopChange = (value: string) => {
    setShopName(value);
    setBookName(""); // Reset book when shop changes
    setQuantity("");
  };

  const handleSave = () => {
    if (!date || !shopName || !bookName || !quantity) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (Number(quantity) > maxReturnQty) {
      toast({
        title: "Quantity Error",
        description: `Maximum returnable quantity is ${maxReturnQty}`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Return Entry Saved",
      description: `Return entry for ${quantity} copies of ${bookName} from ${shopName} has been recorded.`,
    });

    setDate(undefined);
    setShopName("");
    setBookName("");
    setQuantity("");
    setRemarks("");
  };

  const filteredEntries = returnEntries.filter(entry => {
    if (filterBook && filterBook !== "all" && entry.bookName !== filterBook) return false;
    if (filterShop && filterShop !== "all" && entry.shopName !== filterShop) return false;
    return true;
  });

  return (
    <MainLayout title="Return Entry" subtitle="Record returns from shops based on outward entries">
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

              {/* Shop Name - Select first */}
              <div className="space-y-2">
                <Label htmlFor="shopName">Shop Name *</Label>
                <Select value={shopName} onValueChange={handleShopChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shop" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {shopNames.map((shop) => (
                      <SelectItem key={shop} value={shop}>
                        <div className="flex items-center gap-2">
                          <Store className="h-4 w-4" />
                          {shop}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Book Name - Based on outward to selected shop */}
              <div className="space-y-2">
                <Label htmlFor="bookName">Book Name *</Label>
                <Select 
                  value={bookName} 
                  onValueChange={setBookName}
                  disabled={!shopName}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={shopName ? "Select book" : "Select shop first"} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {availableBooksForReturn.length === 0 ? (
                      <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                        No books available for return
                      </div>
                    ) : (
                      availableBooksForReturn.map((entry) => (
                        <SelectItem key={entry.id} value={entry.bookName}>
                          <div className="flex items-center justify-between gap-4">
                            <span>{entry.bookName}</span>
                            <span className="text-xs text-muted-foreground">
                              (Sent: {entry.quantity}, Returnable: {entry.quantity - entry.returnedQty})
                            </span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Quantity Returned * 
                  {maxReturnQty > 0 && (
                    <span className="text-xs text-muted-foreground ml-2">(Max: {maxReturnQty})</span>
                  )}
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  max={maxReturnQty}
                  disabled={!bookName}
                />
              </div>
            </div>

            {/* Selected Book Info */}
            {selectedOutwardEntry && (
              <div className="rounded-lg bg-secondary p-4">
                <p className="text-sm font-medium mb-2">Outward Details for {selectedOutwardEntry.bookName}</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Sent Date</p>
                    <p className="font-medium">{selectedOutwardEntry.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Sent</p>
                    <p className="font-medium">{selectedOutwardEntry.quantity}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Already Returned</p>
                    <p className="font-medium">{selectedOutwardEntry.returnedQty}</p>
                  </div>
                </div>
              </div>
            )}

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

        {/* Statistics & Shop Summary */}
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

          {/* Outward to Shops Summary */}
          <div className="card-shadow rounded-xl bg-card animate-fade-in">
            <div className="border-b border-border p-4">
              <h3 className="font-semibold text-foreground">Books at Shops</h3>
              <p className="text-sm text-muted-foreground">Outward entries pending return</p>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Shop</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead className="text-right">Sent</TableHead>
                    <TableHead className="text-right">Pending</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outwardToShops.filter(e => e.quantity - e.returnedQty > 0).map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.shopName}</TableCell>
                      <TableCell>{entry.bookName}</TableCell>
                      <TableCell className="text-right">{entry.quantity}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary">{entry.quantity - entry.returnedQty}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
            <Select value={filterShop} onValueChange={setFilterShop}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by shop" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Shops</SelectItem>
                {shopNames.map((shop) => (
                  <SelectItem key={shop} value={shop}>
                    {shop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterBook} onValueChange={setFilterBook}>
              <SelectTrigger className="w-[160px]">
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
              <TableHead>Shop Name</TableHead>
              <TableHead>Book Name</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
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
                  <TableCell className="font-medium">{entry.shopName}</TableCell>
                  <TableCell>{entry.bookName}</TableCell>
                  <TableCell className="text-right">{entry.quantity}</TableCell>
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