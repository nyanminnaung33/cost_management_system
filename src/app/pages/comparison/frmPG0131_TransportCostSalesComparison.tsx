import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Download, FileCheck, Search } from "lucide-react";
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

interface SalesComparisonRecord {
  id: string;
  workDate: string;
  workNo: string;
  customerCode: string;
  customerName: string;
  departureArrival: string;
  vehicleType: string;
  quantity: number;
  actualSalesPrice: number;
  masterSalesPrice: number;
  priceDifference: number;
  actualSalesAmount: number;
  masterSalesAmount: number;
  amountDifference: number;
  status: "match" | "mismatch" | "pending";
  selected: boolean;
}

export function TransportCostSalesComparison() {
  const [records, setRecords] = useState<SalesComparisonRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [targetMonth, setTargetMonth] = useState("2026-03");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const mockRecords: SalesComparisonRecord[] = [
    {
      id: "1",
      workDate: "2026-03-11",
      workNo: "W-2026-0311-001",
      customerCode: "CU001",
      customerName: "株式会社山田商事",
      departureArrival: "東京→大阪",
      vehicleType: "4tトラック",
      quantity: 10,
      actualSalesPrice: 55000,
      masterSalesPrice: 55000,
      priceDifference: 0,
      actualSalesAmount: 550000,
      masterSalesAmount: 550000,
      amountDifference: 0,
      status: "match",
      selected: false,
    },
    {
      id: "2",
      workDate: "2026-03-11",
      workNo: "W-2026-0311-002",
      customerCode: "CU002",
      customerName: "田中物産株式会社",
      departureArrival: "横浜→名古屋",
      vehicleType: "10tトラック",
      quantity: 5,
      actualSalesPrice: 78000,
      masterSalesPrice: 75000,
      priceDifference: 3000,
      actualSalesAmount: 390000,
      masterSalesAmount: 375000,
      amountDifference: 15000,
      status: "mismatch",
      selected: false,
    },
    {
      id: "3",
      workDate: "2026-03-10",
      workNo: "W-2026-0310-001",
      customerCode: "CU003",
      customerName: "佐藤運輸株式会社",
      departureArrival: "名古屋→神戸",
      vehicleType: "4tトラック",
      quantity: 6,
      actualSalesPrice: 46000,
      masterSalesPrice: 46000,
      priceDifference: 0,
      actualSalesAmount: 276000,
      masterSalesAmount: 276000,
      amountDifference: 0,
      status: "match",
      selected: false,
    },
    {
      id: "4",
      workDate: "2026-03-10",
      workNo: "W-2026-0310-002",
      customerCode: "CU001",
      customerName: "株式会社山田商事",
      departureArrival: "東京→福岡",
      vehicleType: "4tトラック",
      quantity: 8,
      actualSalesPrice: 110000,
      masterSalesPrice: 95000,
      priceDifference: 15000,
      actualSalesAmount: 880000,
      masterSalesAmount: 760000,
      amountDifference: 120000,
      status: "mismatch",
      selected: false,
    },
  ];

  const handleCompare = () => {
    setRecords(mockRecords);
  };

  const handleSelectAll = (checked: boolean) => {
    setRecords(records.map(r => ({ ...r, selected: checked })));
  };

  const handleSelectRecord = (id: string, checked: boolean) => {
    setRecords(records.map(r => r.id === id ? { ...r, selected: checked } : r));
  };

  const handleApprove = () => {
    setShowConfirmDialog(true);
  };

  const filteredRecords = filterStatus === "all"
    ? records
    : records.filter(r => r.status === filterStatus);

  const selectedCount = records.filter(r => r.selected).length;
  const matchCount = records.filter(r => r.status === "match").length;
  const mismatchCount = records.filter(r => r.status === "mismatch").length;
  const totalActualAmount = records.reduce((sum, r) => sum + r.actualSalesAmount, 0);
  const totalMasterAmount = records.reduce((sum, r) => sum + r.masterSalesAmount, 0);
  const totalDifference = totalActualAmount - totalMasterAmount;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">運送費用売上照合</h1>
        <p className="text-gray-600 mt-1">frmPG0131 - Transport Cost Sales Comparison</p>
      </div>

      {/* Comparison Settings */}
      <Card>
        <CardHeader>
          <CardTitle>照合条件</CardTitle>
          <CardDescription>
            実際売上とマスタ売上を照合します
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
              <Label htmlFor="customer">顧客コード</Label>
              <div className="flex gap-2">
                <Input id="customer" placeholder="CU001" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle-type">車種</Label>
              <Select>
                <SelectTrigger id="vehicle-type">
                  <SelectValue placeholder="全車種" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全車種</SelectItem>
                  <SelectItem value="2t">2tトラック</SelectItem>
                  <SelectItem value="4t">4tトラック</SelectItem>
                  <SelectItem value="10t">10tトラック</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comparison-type">照合範囲</Label>
              <Select defaultValue="all">
                <SelectTrigger id="comparison-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全データ</SelectItem>
                  <SelectItem value="unconfirmed">未確定のみ</SelectItem>
                  <SelectItem value="mismatch">差異ありのみ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCompare}>
              <FileCheck className="w-4 h-4 mr-2" />
              照合実行
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
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>総件数</CardDescription>
                <CardTitle className="text-2xl">{records.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>一致</CardDescription>
                <CardTitle className="text-2xl text-green-600">
                  {matchCount}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>差異あり</CardDescription>
                <CardTitle className="text-2xl text-orange-600">
                  {mismatchCount}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>実売上合計</CardDescription>
                <CardTitle className="text-lg">¥{totalActualAmount.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>マスタ売上</CardDescription>
                <CardTitle className="text-lg">¥{totalMasterAmount.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>差異金額</CardDescription>
                <CardTitle className={`text-lg ${totalDifference > 0 ? 'text-blue-600' : totalDifference < 0 ? 'text-red-600' : ''}`}>
                  {totalDifference > 0 ? '+' : ''}¥{totalDifference.toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>売上照合結果</CardTitle>
                  <CardDescription>
                    差異がある項目を確認してください ({selectedCount}件選択中)
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="match">一致のみ</SelectItem>
                      <SelectItem value="mismatch">差異のみ</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    エクスポート
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleApprove}
                    disabled={selectedCount === 0}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    承認 ({selectedCount})
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
                          checked={records.length > 0 && records.every(r => r.selected)}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-12">状態</TableHead>
                      <TableHead>作業日</TableHead>
                      <TableHead>作業No</TableHead>
                      <TableHead>顧客コード</TableHead>
                      <TableHead>顧客名</TableHead>
                      <TableHead>発着地</TableHead>
                      <TableHead>車種</TableHead>
                      <TableHead className="text-right">数量</TableHead>
                      <TableHead className="text-right">実売上単価</TableHead>
                      <TableHead className="text-right">マスタ単価</TableHead>
                      <TableHead className="text-right">単価差異</TableHead>
                      <TableHead className="text-right">実売上金額</TableHead>
                      <TableHead className="text-right">マスタ金額</TableHead>
                      <TableHead className="text-right">金額差異</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record) => (
                      <TableRow 
                        key={record.id}
                        className={record.status === "mismatch" ? "bg-orange-50" : ""}
                      >
                        <TableCell>
                          <Checkbox
                            checked={record.selected}
                            onCheckedChange={(checked) => handleSelectRecord(record.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell>
                          {record.status === "match" && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle2 className="w-4 h-4" />
                            </Badge>
                          )}
                          {record.status === "mismatch" && (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              <AlertTriangle className="w-4 h-4" />
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.workDate}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.workNo}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.customerCode}
                        </TableCell>
                        <TableCell>{record.customerName}</TableCell>
                        <TableCell>{record.departureArrival}</TableCell>
                        <TableCell>{record.vehicleType}</TableCell>
                        <TableCell className="text-right font-mono">
                          {record.quantity}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.actualSalesPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.masterSalesPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className={`text-right font-mono ${record.priceDifference !== 0 ? 'font-semibold bg-orange-100' : ''}`}>
                          {record.priceDifference !== 0 && (record.priceDifference > 0 ? '+' : '')}
                          {record.priceDifference !== 0 && `¥${record.priceDifference.toLocaleString()}`}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.actualSalesAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.masterSalesAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className={`text-right font-mono ${record.amountDifference !== 0 ? 'font-semibold bg-orange-100' : ''}`}>
                          {record.amountDifference !== 0 && (record.amountDifference > 0 ? '+' : '')}
                          {record.amountDifference !== 0 && `¥${record.amountDifference.toLocaleString()}`}
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
            <DialogTitle>照合承認確認</DialogTitle>
            <DialogDescription>
              選択した{selectedCount}件を承認します。よろしいですか？
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-700">
              承認後は修正できません。内容を確認の上、実行してください。
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              キャンセル
            </Button>
            <Button onClick={() => {
              setShowConfirmDialog(false);
              // Handle approval logic
            }}>
              承認
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
