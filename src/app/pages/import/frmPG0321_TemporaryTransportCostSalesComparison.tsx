import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Download, FileCheck, Archive } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";

interface TemporarySalesComparisonRecord {
  id: string;
  workDate: string;
  workNo: string;
  customerCode: string;
  customerName: string;
  departureArrival: string;
  vehicleType: string;
  quantity: number;
  importedUnitPrice: number;
  masterUnitPrice: number;
  priceDifference: number;
  importedAmount: number;
  masterAmount: number;
  amountDifference: number;
  status: "match" | "mismatch" | "missing";
  message?: string;
}

export function TemporaryTransportCostSalesComparison() {
  const [comparisonResults, setComparisonResults] = useState<TemporarySalesComparisonRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [targetMonth, setTargetMonth] = useState("2026-03");

  const mockSalesComparisonData: TemporarySalesComparisonRecord[] = [
    {
      id: "1",
      workDate: "2026-03-10",
      workNo: "TMP-2026-001",
      customerCode: "CU001",
      customerName: "株式会社山田商事",
      departureArrival: "東京→大阪",
      vehicleType: "4tトラック",
      quantity: 10,
      importedUnitPrice: 55000,
      masterUnitPrice: 55000,
      priceDifference: 0,
      importedAmount: 550000,
      masterAmount: 550000,
      amountDifference: 0,
      status: "match",
    },
    {
      id: "2",
      workDate: "2026-03-10",
      workNo: "TMP-2026-002",
      customerCode: "CU002",
      customerName: "田中物産株式会社",
      departureArrival: "横浜→名古屋",
      vehicleType: "10tトラック",
      quantity: 5,
      importedUnitPrice: 78000,
      masterUnitPrice: 75000,
      priceDifference: 3000,
      importedAmount: 390000,
      masterAmount: 375000,
      amountDifference: 15000,
      status: "mismatch",
      message: "売上単価が¥3,000 高い",
    },
    {
      id: "3",
      workDate: "2026-03-10",
      workNo: "TMP-2026-004",
      customerCode: "CU001",
      customerName: "株式会社山田商事",
      departureArrival: "東京→福岡",
      vehicleType: "4tトラック",
      quantity: 8,
      importedUnitPrice: 110000,
      masterUnitPrice: 95000,
      priceDifference: 15000,
      importedAmount: 880000,
      masterAmount: 760000,
      amountDifference: 120000,
      status: "mismatch",
      message: "売上単価が¥15,000 高い（特別価格）",
    },
    {
      id: "4",
      workDate: "2026-03-10",
      workNo: "TMP-2026-005",
      customerCode: "CU003",
      customerName: "佐藤運輸株式会社",
      departureArrival: "名古屋→神戸",
      vehicleType: "4tトラック",
      quantity: 6,
      importedUnitPrice: 46000,
      masterUnitPrice: 46000,
      priceDifference: 0,
      importedAmount: 276000,
      masterAmount: 276000,
      amountDifference: 0,
      status: "match",
    },
  ];

  const handleCompare = () => {
    setComparisonResults(mockSalesComparisonData);
  };

  const handleConfirm = () => {
    setShowConfirmDialog(true);
  };

  const handleExport = () => {
    console.log("Exporting comparison results...");
  };

  const filteredResults =
    filterStatus === "all"
      ? comparisonResults
      : comparisonResults.filter((r) => r.status === filterStatus);

  const matchCount = comparisonResults.filter((r) => r.status === "match").length;
  const mismatchCount = comparisonResults.filter((r) => r.status === "mismatch").length;
  const missingCount = comparisonResults.filter((r) => r.status === "missing").length;
  const totalImportedAmount = comparisonResults.reduce((sum, r) => sum + r.importedAmount, 0);
  const totalMasterAmount = comparisonResults.reduce((sum, r) => sum + r.masterAmount, 0);
  const totalDifference = totalImportedAmount - totalMasterAmount;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">運送費用仮インポート売上照合</h1>
        <p className="text-gray-600 mt-1">frmPG0321 - Temporary Transport Cost Sales Comparison</p>
      </div>

      {/* Comparison Settings */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Archive className="w-5 h-5 text-orange-600" />
              仮データ売上照合設定
            </div>
          </CardTitle>
          <CardDescription>
            仮インポートデータと売上マスタを照合します
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Label htmlFor="customer">顧客</Label>
              <Select defaultValue="all">
                <SelectTrigger id="customer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全顧客</SelectItem>
                  <SelectItem value="cu001">株式会社山田商事</SelectItem>
                  <SelectItem value="cu002">田中物産株式会社</SelectItem>
                  <SelectItem value="cu003">佐藤運輸株式会社</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comparison-type">照合タイプ</Label>
              <Select defaultValue="sales">
                <SelectTrigger id="comparison-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">売上照合</SelectItem>
                  <SelectItem value="both">原価・売上両方</SelectItem>
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

      {/* Results Section */}
      {comparisonResults.length > 0 && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>総件数</CardDescription>
                <CardTitle className="text-2xl">{comparisonResults.length}</CardTitle>
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
                <CardDescription>未登録</CardDescription>
                <CardTitle className="text-2xl text-red-600">
                  {missingCount}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>仮データ売上</CardDescription>
                <CardTitle className="text-lg">¥{totalImportedAmount.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>差異金額</CardDescription>
                <CardTitle className={`text-lg ${totalDifference > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {totalDifference > 0 ? '+' : ''}¥{totalDifference.toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>売上照合結果</CardTitle>
                  <CardDescription>
                    仮データとマスタ売上データの差異を確認してください
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
                      <SelectItem value="missing">未登録のみ</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="w-4 h-4 mr-2" />
                    エクスポート
                  </Button>
                  <Button size="sm" onClick={handleConfirm} disabled={missingCount > 0}>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    本データへ確定
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">状態</TableHead>
                      <TableHead>作業日</TableHead>
                      <TableHead>作業No</TableHead>
                      <TableHead>顧客コード</TableHead>
                      <TableHead>顧客名</TableHead>
                      <TableHead>発着地</TableHead>
                      <TableHead>車種</TableHead>
                      <TableHead className="text-right">数量</TableHead>
                      <TableHead className="text-right">仮データ単価</TableHead>
                      <TableHead className="text-right">マスタ単価</TableHead>
                      <TableHead className="text-right">単価差異</TableHead>
                      <TableHead className="text-right">仮データ売上</TableHead>
                      <TableHead className="text-right">マスタ売上</TableHead>
                      <TableHead className="text-right">売上差異</TableHead>
                      <TableHead>メッセージ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.map((record) => (
                      <TableRow key={record.id}>
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
                          {record.status === "missing" && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              <XCircle className="w-4 h-4" />
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
                          ¥{record.importedUnitPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.masterUnitPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className={`text-right font-mono ${record.priceDifference !== 0 ? 'text-orange-600 font-semibold' : ''}`}>
                          {record.priceDifference > 0 ? '+' : ''}¥{record.priceDifference.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.importedAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.masterAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className={`text-right font-mono ${record.amountDifference !== 0 ? 'text-orange-600 font-semibold' : ''}`}>
                          {record.amountDifference > 0 ? '+' : ''}¥{record.amountDifference.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {record.message}
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
            <DialogTitle>本データへ確定</DialogTitle>
            <DialogDescription>
              仮データを本データとして確定します。よろしいですか？
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-700">
              総件数: {comparisonResults.length}件<br />
              一致: {matchCount}件<br />
              差異あり: {mismatchCount}件<br />
              仮データ売上: ¥{totalImportedAmount.toLocaleString()}<br />
              差異金額: {totalDifference > 0 ? '+' : ''}¥{totalDifference.toLocaleString()}
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
              確定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
