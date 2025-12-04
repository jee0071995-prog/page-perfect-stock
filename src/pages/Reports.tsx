import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
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
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const monthlyData = [
  { bookName: "Ananda Vikatan", inward: 80, outward: 65, returns: 18, closing: 83, revenue: 2600 },
  { bookName: "Aval Vikatan", inward: 60, outward: 45, returns: 28, closing: 83, revenue: 1800 },
  { bookName: "Junior Vikatan", inward: 180, outward: 155, returns: 86, closing: 211, revenue: 4650 },
  { bookName: "Nanayam Vikatan", inward: 24, outward: 14, returns: 7, closing: 37, revenue: 490 },
  { bookName: "Pasumai Vikatan", inward: 36, outward: 19, returns: 12, closing: 59, revenue: 570 },
  { bookName: "Sakthi Vikatan", inward: 45, outward: 22, returns: 19, closing: 77, revenue: 880 },
  { bookName: "Bakathi", inward: 69, outward: 34, returns: 29, closing: 114, revenue: 1700 },
  { bookName: "Kumadam", inward: 110, outward: 81, returns: 25, closing: 109, revenue: 2835 },
  { bookName: "Malaimathi", inward: 21, outward: 14, returns: 4, closing: 26, revenue: 420 },
  { bookName: "Kungumam", inward: 92, outward: 68, returns: 27, closing: 111, revenue: 2380 },
  { bookName: "Snegiti", inward: 48, outward: 20, returns: 16, closing: 74, revenue: 800 },
  { bookName: "Thuglak", inward: 36, outward: 28, returns: 8, closing: 41, revenue: 980 },
];

const months = [
  "January 2025",
  "February 2025",
  "March 2025",
  "April 2025",
  "May 2025",
  "June 2025",
  "July 2025",
  "August 2025",
  "September 2025",
  "October 2025",
  "November 2025",
  "December 2025",
];

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState("November 2025");

  const totals = monthlyData.reduce(
    (acc, item) => ({
      inward: acc.inward + item.inward,
      outward: acc.outward + item.outward,
      returns: acc.returns + item.returns,
      closing: acc.closing + item.closing,
      revenue: acc.revenue + item.revenue,
    }),
    { inward: 0, outward: 0, returns: 0, closing: 0, revenue: 0 }
  );

  const handleExportExcel = () => {
    toast({
      title: "Exporting to Excel",
      description: "Your report is being generated...",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Exporting to PDF",
      description: "Your report is being generated...",
    });
  };

  return (
    <MainLayout title="Monthly Reports" subtitle="Detailed monthly breakdown of stock movements">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <div className="card-shadow rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-5 animate-fade-in">
          <p className="text-sm font-medium text-muted-foreground">Total Inward</p>
          <p className="text-3xl font-bold text-primary mt-1">{totals.inward}</p>
          <p className="text-xs text-muted-foreground mt-1">Books received</p>
        </div>
        <div className="card-shadow rounded-xl bg-gradient-to-br from-success/10 to-success/5 p-5 animate-fade-in">
          <p className="text-sm font-medium text-muted-foreground">Total Outward</p>
          <p className="text-3xl font-bold text-success mt-1">{totals.outward}</p>
          <p className="text-xs text-muted-foreground mt-1">Books sold</p>
        </div>
        <div className="card-shadow rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 p-5 animate-fade-in">
          <p className="text-sm font-medium text-muted-foreground">Total Returns</p>
          <p className="text-3xl font-bold text-warning mt-1">{totals.returns}</p>
          <p className="text-xs text-muted-foreground mt-1">Books returned</p>
        </div>
        <div className="card-shadow rounded-xl bg-gradient-to-br from-chart-4/10 to-chart-4/5 p-5 animate-fade-in">
          <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
          <p className="text-3xl font-bold text-chart-4 mt-1">₹{totals.revenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </div>
      </div>

      {/* Report Table */}
      <div className="card-shadow rounded-xl bg-card animate-fade-in">
        <div className="flex flex-col gap-4 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Monthly Breakdown</h3>
            <p className="text-sm text-muted-foreground">Pivot view by book</p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportExcel} className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Excel
              </Button>
              <Button variant="outline" onClick={handleExportPDF} className="gap-2">
                <FileText className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-secondary/30">
                <TableHead className="font-semibold">Book Name</TableHead>
                <TableHead className="text-right font-semibold">Inward</TableHead>
                <TableHead className="text-right font-semibold">Outward</TableHead>
                <TableHead className="text-right font-semibold">Returns</TableHead>
                <TableHead className="text-right font-semibold">Closing Stock</TableHead>
                <TableHead className="text-right font-semibold">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.map((item, index) => (
                <TableRow key={item.bookName} className={index % 2 === 0 ? "bg-secondary/10" : ""}>
                  <TableCell className="font-medium">{item.bookName}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="bg-primary/5">
                      {item.inward}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="bg-success/5 text-success">
                      {item.outward}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="bg-warning/5 text-warning">
                      {item.returns}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{item.closing}</TableCell>
                  <TableCell className="text-right font-semibold text-success">
                    ₹{item.revenue.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals */}
              <TableRow className="bg-secondary font-bold border-t-2 border-border">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right">{totals.inward}</TableCell>
                <TableCell className="text-right text-success">{totals.outward}</TableCell>
                <TableCell className="text-right text-warning">{totals.returns}</TableCell>
                <TableCell className="text-right">{totals.closing}</TableCell>
                <TableCell className="text-right text-success">
                  ₹{totals.revenue.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
