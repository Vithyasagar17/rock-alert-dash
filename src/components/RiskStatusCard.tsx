import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { RiskData } from '@/data/mockData';

interface RiskStatusCardProps {
  riskData: RiskData;
}

export const RiskStatusCard = ({ riskData }: RiskStatusCardProps) => {
  const getRiskClass = (category: string) => {
    switch (category) {
      case 'Low': return 'risk-low';
      case 'Moderate': return 'risk-moderate';
      case 'High': return 'risk-high';
      case 'Very High': return 'risk-critical';
      default: return 'risk-low';
    }
  };

  const getRiskIcon = (category: string) => {
    if (category === 'High' || category === 'Very High') {
      return <AlertTriangle className="w-6 h-6" />;
    }
    return <TrendingUp className="w-6 h-6" />;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="industrial-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {getRiskIcon(riskData.category)}
            Risk Status
          </span>
          <div className={`status-indicator ${getRiskClass(riskData.category)}`} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Probability Display */}
        <div className="text-center">
          <div className="text-5xl font-bold text-foreground mb-2">
            {riskData.probability}%
          </div>
          <Badge 
            className={`${getRiskClass(riskData.category)} text-lg px-4 py-2 font-semibold`}
          >
            {riskData.category} Risk
          </Badge>
        </div>

        {/* Risk Level Indicators */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Risk Level</span>
            <span>{riskData.probability}% probability</span>
          </div>
          
          {/* Visual Risk Bar */}
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${getRiskClass(riskData.category)}`}
              style={{ width: `${riskData.probability}%` }}
            />
          </div>

          {/* Risk Thresholds */}
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>30%</span>
            <span>50%</span>
            <span>70%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-3">
          <Clock className="w-4 h-4" />
          <span>Last updated: {formatTime(riskData.timestamp)}</span>
        </div>
      </CardContent>
    </Card>
  );
};