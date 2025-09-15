import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { TrendPoint } from '@/data/mockData';

interface TrendChartProps {
  data: TrendPoint[];
}

export const TrendChart = ({ data }: TrendChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="industrial-card p-3 shadow-lg">
          <p className="text-sm font-medium">{`Time: ${label}`}</p>
          <p className="text-sm">
            <span className="font-semibold">Risk: {data.probability}%</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Category: {data.category}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="industrial-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Risk Trend - Past 24 Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 100]}
                label={{ value: 'Risk %', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Risk threshold lines */}
              <ReferenceLine 
                y={30} 
                stroke="hsl(var(--warning))" 
                strokeDasharray="5 5"
                label={{ value: "Moderate", position: "insideTopRight" }}
              />
              <ReferenceLine 
                y={50} 
                stroke="hsl(var(--risk-high))" 
                strokeDasharray="5 5"
                label={{ value: "High", position: "insideTopRight" }}
              />
              <ReferenceLine 
                y={70} 
                stroke="hsl(var(--destructive))" 
                strokeDasharray="5 5"
                label={{ value: "Very High", position: "insideTopRight" }}
              />
              
              <Line 
                type="monotone" 
                dataKey="probability" 
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(var(--secondary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span>Moderate (30%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-risk-high rounded-full" />
            <span>High (50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded-full" />
            <span>Very High (70%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};