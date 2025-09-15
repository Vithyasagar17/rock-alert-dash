import { useState, useEffect } from 'react';
import { Header } from './Header';
import { RiskStatusCard } from './RiskStatusCard';
import { TrendChart } from './TrendChart';
import { EnvironmentalDataTable } from './EnvironmentalDataTable';
import { toast } from '@/hooks/use-toast';
import { 
  getCurrentRisk, 
  generateTrendData, 
  getEnvironmentalData 
} from '@/data/mockData';

export const Dashboard = () => {
  const [riskData, setRiskData] = useState(getCurrentRisk());
  const [trendData, setTrendData] = useState(generateTrendData());
  const [environmentalData, setEnvironmentalData] = useState(getEnvironmentalData());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Auto-refresh data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newRiskData = getCurrentRisk();
      const newEnvironmentalData = getEnvironmentalData();
      
      // Update data
      setRiskData(newRiskData);
      setEnvironmentalData(newEnvironmentalData);
      setLastUpdate(new Date());
      
      // Update trend data (add new point, remove oldest)
      setTrendData(prevData => {
        const newPoint = {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          probability: newRiskData.probability,
          category: newRiskData.category
        };
        const updatedData = [...prevData.slice(1), newPoint];
        return updatedData;
      });
      
      // Show toast for high risk changes
      if (newRiskData.category === 'High' || newRiskData.category === 'Very High') {
        if (Math.random() > 0.8) { // Occasionally show notification
          toast({
            title: "Risk Alert",
            description: `${newRiskData.category} risk detected: ${newRiskData.probability}%`,
            variant: "destructive"
          });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleExportData = () => {
    // Generate CSV content
    const csvContent = [
      ['Parameter', 'Value', 'Unit', 'Status', 'Last Updated'],
      ...environmentalData.map(item => [
        item.parameter,
        item.value.toString(),
        item.unit,
        item.status,
        item.lastUpdated.toISOString()
      ]),
      ['Risk Probability', riskData.probability.toString(), '%', riskData.category, riskData.timestamp.toISOString()]
    ].map(row => row.join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rockfall-data-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Environmental data exported to CSV file",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onExportData={handleExportData} />
      
      <div className="container mx-auto px-6 pb-8">
        {/* Status Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <RiskStatusCard riskData={riskData} />
          </div>
          <div className="lg:col-span-2">
            <EnvironmentalDataTable data={environmentalData} />
          </div>
        </div>

        {/* Trend Chart */}
        <div className="mb-6">
          <TrendChart data={trendData} />
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground border-t border-border pt-4">
          <p>
            Last updated: {lastUpdate.toLocaleString()} • 
            Auto-refresh: 5 seconds • 
            Status: Online
          </p>
        </div>
      </div>
    </div>
  );
};