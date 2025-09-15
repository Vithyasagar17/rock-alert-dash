import { Mountain, Home, History, Settings, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import rockIcon from '@/assets/rock-icon.png';

interface HeaderProps {
  onExportData?: () => void;
}

export const Header = ({ onExportData }: HeaderProps) => {
  const navItems = [
    { name: 'Home', icon: Home, active: true },
    { name: 'History', icon: History, active: false },
    { name: 'Settings', icon: Settings, active: false }
  ];

  return (
    <header className="industrial-card border-b-2 border-primary/20 mb-6">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <img 
                src={rockIcon} 
                alt="Rock icon" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Rockfall Risk Monitoring System
              </h1>
              <p className="text-sm text-muted-foreground">
                Open-Pit Mining Safety Dashboard
              </p>
            </div>
          </div>

          {/* Navigation and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Navigation */}
            <nav className="flex gap-1 bg-muted/50 rounded-lg p-1">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant={item.active ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center gap-2 ${
                    item.active 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-primary/10"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Button>
              ))}
            </nav>

            {/* Export Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onExportData}
              className="flex items-center gap-2 border-primary/20 hover:bg-primary/5"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};