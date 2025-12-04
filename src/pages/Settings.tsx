import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Building2, Bell, Printer, Database } from "lucide-react";

const Settings = () => {
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <MainLayout title="Settings" subtitle="Manage your store preferences">
      <div className="max-w-3xl space-y-6">
        {/* Store Information */}
        <div className="card-shadow rounded-xl bg-card p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary/10 p-2">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Store Information</h3>
              <p className="text-sm text-muted-foreground">Basic details for invoices</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="BookStock Store" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+91 98765 43210" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Main Street, Chennai - 600001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst">GST Number</Label>
              <Input id="gst" defaultValue="33AABCU9603R1ZM" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="store@bookstock.com" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card-shadow rounded-xl bg-card p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-warning/10 p-2">
              <Bell className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Alert preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Low Stock Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when stock falls below threshold</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Return Reminders</p>
                <p className="text-sm text-muted-foreground">Remind pending returns after issue period</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Summary</p>
                <p className="text-sm text-muted-foreground">Receive daily stock movement summary</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Invoice Settings */}
        <div className="card-shadow rounded-xl bg-card p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-success/10 p-2">
              <Printer className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Invoice Settings</h3>
              <p className="text-sm text-muted-foreground">Customize invoice generation</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-generate Bill Number</p>
                <p className="text-sm text-muted-foreground">Automatically generate sequential bill numbers</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Include GST Details</p>
                <p className="text-sm text-muted-foreground">Show GST breakdown on invoices</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-2 pt-2">
              <div className="space-y-2">
                <Label htmlFor="prefix">Bill Number Prefix</Label>
                <Input id="prefix" defaultValue="BILL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lowStock">Low Stock Threshold</Label>
                <Input id="lowStock" type="number" defaultValue="50" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="card-shadow rounded-xl bg-card p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-chart-4/10 p-2">
              <Database className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Data Management</h3>
              <p className="text-sm text-muted-foreground">Import and export data</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">Import Book List (Excel)</Button>
            <Button variant="outline">Export All Data</Button>
            <Button variant="outline">Backup Database</Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
