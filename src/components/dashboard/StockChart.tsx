import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jul", inward: 245, outward: 180, returns: 42 },
  { month: "Aug", inward: 312, outward: 245, returns: 55 },
  { month: "Sep", inward: 289, outward: 220, returns: 38 },
  { month: "Oct", inward: 356, outward: 310, returns: 62 },
  { month: "Nov", inward: 398, outward: 342, returns: 71 },
  { month: "Dec", inward: 420, outward: 365, returns: 58 },
];

export function StockChart() {
  return (
    <div className="card-shadow rounded-xl bg-card p-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Stock Movement</h3>
        <p className="text-sm text-muted-foreground">Monthly inward vs outward comparison</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="inward" 
              name="Inward"
              fill="hsl(var(--chart-2))" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="outward" 
              name="Outward"
              fill="hsl(var(--chart-1))" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="returns" 
              name="Returns"
              fill="hsl(var(--chart-3))" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
