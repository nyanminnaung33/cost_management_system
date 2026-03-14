import { useState } from "react";
import { Unlock, AlertTriangle, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

export function PaymentConfirmationCancellation() {
  const [records, setRecords] = useState<any[]>([]);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [targetMonth, setTargetMonth] = useState("2026-03");

  const mockRecords = [
    {
      id: "1",
      paymentDate: "2026-03-31",
      supplierCode: "C001",
      supplierName: "東京運送株式会社",
      invoiceNo: "PAY-2026-03-001",
      costType: "運送費用",
      amount: 450000,
      confirmedDate: "2026-03-31 14:30",
      confirmedBy: "山田太郎",
      selected: false,
    },
    {
      id: "2",
      paymentDate: "2026-03-31",
      supplierCode: "C002",
      supplierName: "関東物流センター",
      invoiceNo: "PAY-2026-03-003",
      costType: "運送費用",
      amount: 325000,
      confirmedDate: "2026-03-31 14:35",
      confirmedBy: "山田太郎",
      selected: false,
    },
  ];

  const handleSearch = () => {
    setRecords(mockRecords);
  };

  const handleSelectAll = (checked: boolean) => {
    setRecords(records.map(r => ({ ...r, selected: checked })));
  };

  const selectedCount = records.filter(r => r.selected).length;
  const selectedAmount = records.filter(r => r.selected).reduce((sum, r) => sum + r.amount, 0);
  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">支払確定取消</h1>
        <p className="text-gray-600 mt-1">frmPG2100 - Payment Confirmation Cancellation</p>
      </div>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <CardTitle className="text-orange-900">注意事項</CardTitle>
          </div>
          <CardDescription className="text-orange-700">
            確定済みの支払データを取り消します。取り消し後は再度確定処理が必要になります。
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>検索条件</CardTitle>
          <CardDescription>確定済み支払データを検索します</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target-month">対象年月</Label>
              <Input
                id="target-month"
                type="month"
                value={targetMonth}
                onChange={(e) => setTargetMonth(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">仕入先コード</Label>
              <div className="flex gap-2">
                <Input id="supplier" placeholder="C001" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoice-no">支払No</Label>
              <Input id="invoice-no" placeholder="PAY-2026-03-001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmed-by">確定者</Label>
              <Input id="confirmed-by" placeholder="山田太郎" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              検索
            </Button>
            <Button variant="outline">
              キャンセル
            </Button>
          </div>
        </CardContent>
      </Card>

      {records.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>確定済件数</CardDescription>
                <CardTitle className="text-2xl">{records.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>確定済金額</CardDescription>
                <CardTitle className="text-xl">¥{totalAmount.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>選択中金額</CardDescription>
                <CardTitle className="text-xl text-red-600">
                  ¥{selectedAmount.toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>確定済支払一覧</CardTitle>
                  <CardDescription>
                    取り消す支払データを選択してください ({selectedCount}件選択中)
                  </CardDescription>
                </div>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => setShowCancelDialog(true)} 
                  disabled={selectedCount === 0}
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  確定取消 ({selectedCount})
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={records.length > 0 && records.every(r => r.selected)}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>支払日</TableHead>
                      <TableHead>仕入先コード</TableHead>
                      <TableHead>仕入先名</TableHead>
                      <TableHead>支払No</TableHead>
                      <TableHead>費用種別</TableHead>
                      <TableHead className="text-right">支払金額</TableHead>
                      <TableHead>確定日時</TableHead>
                      <TableHead>確定者</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <Checkbox
                            checked={record.selected}
                            onCheckedChange={(checked) => 
                              setRecords(records.map(r => r.id === record.id ? { ...r, selected: checked } : r))
                            }
                          />
                        </TableCell>
                        <TableCell className="font-mono text-sm">{record.paymentDate}</TableCell>
                        <TableCell className="font-mono text-sm">{record.supplierCode}</TableCell>
                        <TableCell>{record.supplierName}</TableCell>
                        <TableCell className="font-mono text-sm">{record.invoiceNo}</TableCell>
                        <TableCell>{record.costType}</TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          ¥{record.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{record.confirmedDate}</TableCell>
                        <TableCell>{record.confirmedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              支払���定取消
            </DialogTitle>
            <DialogDescription>
              選択した{selectedCount}件の確定を取り消します。よろしいですか？
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <p className="text-sm text-gray-700">
              取消件数: {selectedCount}件<br />
              取消金額: ¥{selectedAmount.toLocaleString()}
            </p>
            <p className="text-sm text-red-600 font-semibold">
              ※取り消し後は未確定状態に戻ります。再度確定処理を行う必要があります。
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={() => setShowCancelDialog(false)}>
              <Unlock className="w-4 h-4 mr-2" />
              確定取消
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
