
import { useState } from 'react';
import { 
  FileJson, FileText, Table, Download
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface ExportOrdersDialogProps {
  trigger: React.ReactNode;
  onExport: (format: 'csv' | 'json' | 'excel', selection: 'all' | 'filtered' | 'selected') => void;
  hasFilters: boolean;
  hasSelection: boolean;
}

const ExportOrdersDialog = ({ 
  trigger, 
  onExport, 
  hasFilters, 
  hasSelection 
}: ExportOrdersDialogProps) => {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<'csv' | 'json' | 'excel'>('csv');
  const [selection, setSelection] = useState<'all' | 'filtered' | 'selected'>('all');
  
  const handleExport = () => {
    onExport(format, selection);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Orders</DialogTitle>
          <DialogDescription>
            Choose a file format and select which orders to export.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="format">File Format</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={format === 'csv' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => setFormat('csv')}
              >
                <FileText className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button
                variant={format === 'excel' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => setFormat('excel')}
              >
                <Table className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button
                variant={format === 'json' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => setFormat('json')}
              >
                <FileJson className="h-4 w-4 mr-2" />
                JSON
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Orders to Export</Label>
            <RadioGroup value={selection} onValueChange={(value) => setSelection(value as 'all' | 'filtered' | 'selected')}>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="flex-1 cursor-pointer">All Orders</Label>
              </div>
              
              <div className={`flex items-center space-x-2 rounded-md border p-3 ${!hasFilters ? 'opacity-50' : ''}`}>
                <RadioGroupItem value="filtered" id="filtered" disabled={!hasFilters} />
                <Label htmlFor="filtered" className={`flex-1 ${!hasFilters ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  Filtered Orders
                  {!hasFilters && <span className="block text-xs text-muted-foreground">No filters applied</span>}
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 rounded-md border p-3 ${!hasSelection ? 'opacity-50' : ''}`}>
                <RadioGroupItem value="selected" id="selected" disabled={!hasSelection} />
                <Label htmlFor="selected" className={`flex-1 ${!hasSelection ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  Selected Orders
                  {!hasSelection && <span className="block text-xs text-muted-foreground">No orders selected</span>}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportOrdersDialog;
