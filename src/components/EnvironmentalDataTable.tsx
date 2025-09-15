import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Droplets, Activity, Gauge, Beaker, Waves, Cloud } from 'lucide-react';
import type { EnvironmentalData } from '@/data/mockData';

interface EnvironmentalDataTableProps {
  data: EnvironmentalData[];
}

export const EnvironmentalDataTable = ({ data }: EnvironmentalDataTableProps) => {
  const getParameterIcon = (parameter: string) => {
    switch (parameter.toLowerCase()) {
      case 'temperature':
      case 'temperature range':
        return <Thermometer className="w-4 h-4" />;
      case 'rainfall':
      case 'cumulative rainfall (24h)':
        return <Droplets className="w-4 h-4" />;
      case 'vibration':
        return <Activity className="w-4 h-4" />;
      case 'pore pressure':
        return <Gauge className="w-4 h-4" />;
      case 'humidity':
        return <Cloud className="w-4 h-4" />;
      default:
        return <Beaker className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge className="risk-critical">Critical</Badge>;
      case 'warning':
        return <Badge className="risk-high">Warning</Badge>;
      case 'normal':
        return <Badge className="risk-low">Normal</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 min ago';
    if (diffMins < 60) return `${diffMins} mins ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  return (
    <Card className="industrial-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Waves className="w-5 h-5" />
          Environmental Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-semibold text-sm">Parameter</th>
                <th className="text-right py-3 px-2 font-semibold text-sm">Value</th>
                <th className="text-center py-3 px-2 font-semibold text-sm">Status</th>
                <th className="text-right py-3 px-2 font-semibold text-sm">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr 
                  key={item.id} 
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground">
                        {getParameterIcon(item.parameter)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.parameter}</div>
                        {item.threshold && (
                          <div className="text-xs text-muted-foreground">
                            Threshold: {item.threshold}{item.unit}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <div className="font-mono text-lg font-semibold">
                      {item.value}
                      <span className="text-sm text-muted-foreground ml-1">
                        {item.unit}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="py-4 px-2 text-right text-sm text-muted-foreground">
                    {formatTimeAgo(item.lastUpdated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};