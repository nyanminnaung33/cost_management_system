import { useState } from "react";
import { CheckCircle2, Lock, Download, Search } from "lucide-react";
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
import {
  Select,
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

interface PaymentRecord {
  id: string;
  paymentDate: string;
  supplierCode: string;
  supplierName: string;
  invoiceNo: string;
  costType: string;
  amount: number;
  status: "pending" | "confirmed";
  selected: boolean;
}

export function PaymentConfirmation() {
  const [records, setRecords] = useState<PaymentRecord[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [targetMonth, setTargetMonth] = useState("2026-03");

  const mockRecords: PaymentRecord[] = [
    {
      id: "1",
      paymentDate: "2026-03-31",
      supplierCode: "C001",
      supplierName: "東京運送株式会社",
      invoiceNo: "PAY-2026-03-001",
      costType: "運送費用",
      amount: 450000,
      status: "pending",
      selected: false,
    },
    {
      id: "2",
      paymentDate: "2026-03-31",
      supplierCode: "OS001",
      supplierName: "Shanghai Freight Co.",
      invoiceNo: "PAY-2026-03-002",
      costType: "海外費用",
      amount: 225750,
      status: "pending",
      selected: false,
    },
    {
      id: "3",
      paymentDate: "2026-03-31",
      supplierCode: "C002",
      supplierName: "関東物流センター",
      invoiceNo: "PAY-2026-03-003",
      costType: "運送費用",
      amount: 325000,
      status: "confirmed",
      selected: false,
    },
  ];

  const handleSearch = () => {
    setRecords(mockRecords);
  };

  const handleSelectAll = (checked: boolean) => {
    setRecords(records.map(r => r.status === "pending" ? { ...r, selected: checked } : r));
  };

  const handleSelectRecord = (id: string, checked: boolean) => {
    setRecords(records.map(r => r.id === id ? { ...r, selected: checked } : r));
  };

  const handleConfirm = () => {
    setShowConfirmDialog(true);
  };

  const selectedCount = records.filter(r => r.selected).length;
  const selectedAmount = records.filter(r => r.selected).reduce((sum, r) => sum + r.amount, 0);
  const pendingCount = records.filter(r => r.status === "pending").length;
  const confirmedCount = records.filter(r => r.status === "confirmed").length;
  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">支払確定</h1>
        <p className="text-gray-600 mt-1">frmPG2000 - Payment Confirmation</p>
      </div>

      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle>検索条件</CardTitle>
          <CardDescription>
            支払確定対象データを検索します
          </CardDescription>
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
              <Label htmlFor="cost-type">費用種別</Label>
              <Select>
                <SelectTrigger id="cost-type">
                  <SelectValue placeholder="全種別" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全種別</SelectItem>
                  <SelectItem value="transport">運送費用</SelectItem>
                  <SelectItem value="overseas">海外費用</SelectItem>
                  <SelectItem value="other">その他費用</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">ステータス</Label>
              <Select defaultValue="pending">
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  <SelectItem value="pending">未確定</SelectItem>
                  <SelectItem value="confirmed">確定済</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Results */}
      {records.length > 0 && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>総件数</CardDescription>
                <CardTitle className="text-2xl">{records.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>未確定</CardDescription>
                <CardTitle className="text-2xl text-orange-600">
                  {pendingCount}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>確定済</CardDescription>
                <CardTitle className="text-2xl text-green-600">
                  {confirmedCount}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>総支払額</CardDescription>
                <CardTitle className="text-xl">¥{totalAmount.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>選択中金額</CardDescription>
                <CardTitle className="text-xl text-blue-600">
                  ¥{selectedAmount.toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Data Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>支払確定一覧</CardTitle>
                  <CardDescription>
                    確定する支払データを選択してください ({selectedCount}件選択中)
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    エクスポート
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleConfirm}
                    disabled={selectedCount === 0}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    一括確定 ({selectedCount})
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={records.filter(r => r.status === "pending").length > 0 && 
                                  records.filter(r => r.status === "pending").every(r => r.selected)}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>支払日</TableHead>
                      <TableHead>仕入先コード</TableHead>
                      <TableHead>仕入先名</TableHead>
                      <TableHead>支払No</TableHead>
                      <TableHead>費用種別</TableHead>
                      <TableHead className="text-right">支払金額</TableHead>
                      <TableHead>ステータス</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          {record.status === "pending" ? (
                            <Checkbox
                              checked={record.selected}
                              onCheckedChange={(checked) => handleSelectRecord(record.id, checked as boolean)}
                            />
                          ) : (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.paymentDate}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.supplierCode}
                        </TableCell>
                        <TableCell>{record.supplierName}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.invoiceNo}
                        </TableCell>
                        <TableCell>{record.costType}</TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          ¥{record.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {record.status === "pending" ? (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              未確定
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              確定済
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>支払確定</DialogTitle>
            <DialogDescription>
              選択した{selectedCount}件を確定します。よろしいですか？
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <p className="text-sm text-gray-700">
              確定件数: {selectedCount}件<br />
              確定金額: ¥{selectedAmount.toLocaleString()}
            </p>
            <p className="text-sm text-red-600 font-semibold">
              ※確定後は取消処理が必要になります。
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              キャンセル
            </Button>
            <Button onClick={() => {
              setShowConfirmDialog(false);
              // Handle confirm logic
            }}>
              <Lock className="w-4 h-4 mr-2" />
              確定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
