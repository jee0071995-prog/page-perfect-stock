import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
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
import { Search, Package } from "lucide-react";

const stockData = [
  { id: "1", bookName: "Ananda Vikatan", publisher: "Vikatan", opening: 50, inward: 80, outward: 65, returned: 18, closing: 83 },
  { id: "2", bookName: "Aval Vikatan", publisher: "Vikatan", opening: 40, inward: 60, outward: 45, returned: 28, closing: 83 },
  { id: "3", bookName: "Junior Vikatan", publisher: "Vikatan", opening: 100, inward: 180, outward: 155, returned: 86, closing: 211 },
  { id: "4", bookName: "Nanayam Vikatan", publisher: "Vikatan", opening: 20, inward: 24, outward: 14, returned: 7, closing: 37 },
  { id: "5", bookName: "Pasumai Vikatan", publisher: "Vikatan", opening: 30, inward: 36, outward: 19, returned: 12, closing: 59 },
  { id: "6", bookName: "Sakthi Vikatan", publisher: "Vikatan", opening: 35, inward: 45, outward: 22, returned: 19, closing: 77 },
  { id: "7", bookName: "Bakathi", publisher: "Kumadam", opening: 50, inward: 69, outward: 34, returned: 29, closing: 114 },
  { id: "8", bookName: "Kumadam", publisher: "Kumadam", opening: 55, inward: 110, outward: 81, returned: 25, closing: 109 },
  { id: "9", bookName: "Malaimathi", publisher: "Kumadam", opening: 15, inward: 21, outward: 14, returned: 4, closing: 26 },
  { id: "10", bookName: "Kungumam", publisher: "Kungumam", opening: 60, inward: 92, outward: 68, returned: 27, closing: 111 },
  { id: "11", bookName: "Snegiti", publisher: "Kungumam", opening: 30, inward: 48, outward: 20, returned: 16, closing: 74 },
  { id: "12", bookName: "Thuglak", publisher: "Thuglak", opening: 25, inward: 36, outward: 28, returned: 8, closing: 41 },
];

const publishers = ["All", "Vikatan", "Kumadam", "Kungumam", "Thuglak"];
const months = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const StockSummary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All Months");

  const filteredStock = stockData.filter((item) => {
    const matchesSearch = item.bookName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPublisher = selectedPublisher === "All" || item.publisher === selectedPublisher;
    return matchesSearch && matchesPublisher;
  });

  const totals = filteredStock.reduce(
    (acc, item) => ({
      opening: acc.opening + item.opening,
      inward: acc.inward + item.inward,
      outward: acc.outward + item.outward,
      returned: acc.returned + item.returned,
      closing: acc.closing + item.closing,
    }),
    { opening: 0, inward: 0, outward: 0, returned: 0, closing: 0 }
  );

  return (
    <MainLayout title="Stock Summary" subtitle="Overview of current inventory">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5 mb-6">
        <div className="card-shadow rounded-xl bg-card p-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">Opening Stock</p>
          <p className="text-2xl font-bold text-foreground">{totals.opening}</p>
        </div>
        <div className="card-shadow rounded-xl bg-card p-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">Total Inward</p>
          <p className="text-2xl font-bold text-success">{totals.inward}</p>
        </div>
        <div className="card-shadow rounded-xl bg-card p-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">Total Outward</p>
          <p className="text-2xl font-bold text-primary">{totals.outward}</p>
        </div>
        <div className="card-shadow rounded-xl bg-card p-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">Total Returned</p>
          <p className="text-2xl font-bold text-warning">{totals.returned}</p>
        </div>
        <div className="card-shadow rounded-xl bg-card p-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">Closing Stock</p>
          <p className="text-2xl font-bold text-chart-4">{totals.closing}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card-shadow rounded-xl bg-card animate-fade-in">
        <div className="flex flex-col gap-4 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Stock Details</h3>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full md:w-[200px]"
              />
            </div>
            <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Publisher" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {publishers.map((pub) => (
                  <SelectItem key={pub} value={pub}>
                    {pub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Book Name</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead className="text-right">Opening</TableHead>
                <TableHead className="text-right">Inward</TableHead>
                <TableHead className="text-right">Outward</TableHead>
                <TableHead className="text-right">Returned</TableHead>
                <TableHead className="text-right">Closing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStock.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.bookName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.publisher}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{item.opening}</TableCell>
                  <TableCell className="text-right text-success font-medium">
                    +{item.inward}
                  </TableCell>
                  <TableCell className="text-right text-primary font-medium">
                    -{item.outward}
                  </TableCell>
                  <TableCell className="text-right text-warning font-medium">
                    +{item.returned}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant="secondary"
                      className={item.closing < 50 ? "bg-destructive/10 text-destructive" : ""}
                    >
                      {item.closing}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow className="bg-secondary/50 font-bold">
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right">{totals.opening}</TableCell>
                <TableCell className="text-right text-success">+{totals.inward}</TableCell>
                <TableCell className="text-right text-primary">-{totals.outward}</TableCell>
                <TableCell className="text-right text-warning">+{totals.returned}</TableCell>
                <TableCell className="text-right">{totals.closing}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default StockSummary;
