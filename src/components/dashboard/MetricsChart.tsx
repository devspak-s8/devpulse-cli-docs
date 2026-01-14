import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ErrorMetrics, MetricDataPoint } from '@/lib/mockData';

interface MetricsChartProps {
  title: string;
  data: MetricDataPoint[];
  color?: string;
  type?: 'line' | 'area';
  unit?: string;
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-mono text-sm font-semibold text-foreground">
          {payload[0].value.toFixed(2)}{unit}
        </p>
      </div>
    );
  }
  return null;
};

export const MetricsChart = ({ 
  title, 
  data, 
  color = 'hsl(220, 10%, 55%)', 
  type = 'area',
  unit = ''
}: MetricsChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card p-4"
    >
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 15%)" vertical={false} />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10 }} 
                axisLine={{ stroke: 'hsl(220, 12%, 15%)' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip unit={unit} />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                fill={`url(#gradient-${title})`}
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 15%)" vertical={false} />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10 }} 
                axisLine={{ stroke: 'hsl(220, 12%, 15%)' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip unit={unit} />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: color }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

interface MultiLineChartProps {
  title: string;
  data: ErrorMetrics[];
}

const serviceColors = [
  'hsl(220, 10%, 65%)',
  'hsl(220, 10%, 55%)',
  'hsl(220, 10%, 45%)',
  'hsl(220, 10%, 35%)',
  'hsl(220, 10%, 75%)',
  'hsl(220, 10%, 50%)',
];

export const MultiLineChart = ({ title, data }: MultiLineChartProps) => {
  // Transform data for recharts
  const chartData = data[0]?.data.map((point, index) => {
    const result: any = { timestamp: point.timestamp };
    data.forEach((service) => {
      result[service.service] = service.data[index]?.value || 0;
    });
    return result;
  }) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card p-4"
    >
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 15%)" vertical={false} />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10 }} 
              axisLine={{ stroke: 'hsl(220, 12%, 15%)' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10 }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(220, 15%, 10%)', 
                border: '1px solid hsl(220, 12%, 15%)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(220, 10%, 45%)', fontSize: 12 }}
              itemStyle={{ fontSize: 12 }}
            />
            {data.map((service, index) => (
              <Line 
                key={service.service}
                type="monotone" 
                dataKey={service.service} 
                stroke={serviceColors[index % serviceColors.length]} 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {data.map((service, index) => (
          <div key={service.service} className="flex items-center gap-2">
            <div 
              className="h-2 w-2 rounded-full" 
              style={{ backgroundColor: serviceColors[index % serviceColors.length] }}
            />
            <span className="text-xs text-muted-foreground">{service.service}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
