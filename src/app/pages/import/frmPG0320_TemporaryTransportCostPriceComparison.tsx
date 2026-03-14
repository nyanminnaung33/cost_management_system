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

interface TemporaryComparisonRecord {
  id: string;
  workDate: string;
  workNo: string;
  carrierCode: string;
  carrierName: string;
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

export function TemporaryTransportCostPriceComparison() {
  const [comparisonResults, setComparisonResults] = useState<TemporaryComparisonRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [targetMonth, setTargetMonth] = useState("2026-03");

  const mockComparisonData: TemporaryComparisonRecord[] = [
    {
      id: "1",
      workDate: "2026-03-10",
      workNo: "TMP-2026-001",
      carrierCode: "C001",
      carrierName: "東京運送株式会社",
      departureArrival: "東京→大阪",
      vehicleType: "4tトラック",
      quantity: 10,
      importedUnitPrice: 45000,
      masterUnitPrice: 45000,
      priceDifference: 0,
      importedAmount: 450000,
      masterAmount: 450000,
      amountDifference: 0,
      status: "match",
    },
    {
      id: "2",
      workDate: "2026-03-10",
      workNo: "TMP-2026-002",
      carrierCode: "C002",
      carrierName: "関東物流センター",
      departureArrival: "横浜→名古屋",
      vehicleType: "10tトラック",
      quantity: 5,
      importedUnitPrice: 65000,
      masterUnitPrice: 62000,
      priceDifference: 3000,
      importedAmount: 325000,
      masterAmount: 310000,
      amountDifference: 15000,
      status: "mismatch",
      message: "単価が¥3,000 高い",
    },
    {
      id: "3",
      workDate: "2026-03-10",
      workNo: "TMP-2026-003",
      carrierCode: "C999",
      carrierName: "未登録運送会社",
      departureArrival: "不明→不明",
      vehicleType: "2tトラック",
      quantity: 3,
      importedUnitPrice: 0,
      masterUnitPrice: 0,
      priceDifference: 0,
      importedAmount: 0,
      masterAmount: 0,
      amountDifference: 0,
      status: "missing",
      message: "マスタに該当データなし",
    },
    {
      id: "4",
      workDate: "2026-03-10",
      workNo: "TMP-2026-004",
      carrierCode: "C001",
      carrierName: "東京運送株式会社",
      departureArrival: "東京→福岡",
      vehicleType: "4tトラック",
      quantity: 8,
      importedUnitPrice: 95000,
      masterUnitPrice: 80000,
      priceDifference: 15000,
      importedAmount: 760000,
      masterAmount: 640000,
      amountDifference: 120000,
      status: "mismatch",
      message: "単価が¥15,000 高い（標準外価格）",
    },
    {
      id: "5",
      workDate: "2026-03-10",
      workNo: "TMP-2026-005",
      carrierCode: "C003",
      carrierName: "中部トランスポート",
      departureArrival: "名古屋→神戸",
      vehicleType: "4tトラック",
      quantity: 6,
      importedUnitPrice: 38000,
      masterUnitPrice: 38000,
      priceDifference: 0,
      importedAmount: 228000,
      masterAmount: 228000,
      amountDifference: 0,
      status: "match",
    },
  ];

  const handleCompare = () => {
    setComparisonResults(mockComparisonData);
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
        <h1 className="text-2xl font-semibold text-gray-900">運送費用仮インポート原価照合</h1>
        <p className="text-gray-600 mt-1">frmPG0320 - Temporary Transport Cost Price Comparison</p>
      </div>

      {/* Comparison Settings */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Archive className="w-5 h-5 text-orange-600" />
              仮データ照合設定
            </div>
          </CardTitle>
          <CardDescription>
            仮インポートデータと原価マスタを照合します
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
              <Label htmlFor="carrier">運送会社</Label>
              <Select defaultValue="all">
                <SelectTrigger id="carrier">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全運送会社</SelectItem>
                  <SelectItem value="c001">東京運送株式会社</SelectItem>
                  <SelectItem value="c002">関東物流センター</SelectItem>
                  <SelectItem value="c003">中部トランスポート</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comparison-type">照合タイプ</Label>
              <Select defaultValue="price">
                <SelectTrigger id="comparison-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">原価照合</SelectItem>
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
                <CardDescription>仮データ金額</CardDescription>
                <CardTitle className="text-lg">¥{totalImportedAmount.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>差異金額</CardDescription>
                <CardTitle className={`text-lg ${totalDifference > 0 ? 'text-red-600' : 'text-green-600'}`}>
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
                  <CardTitle>照合結果</CardTitle>
                  <CardDescription>
                    仮データとマスタデータの差異を確認してください
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
                      <TableHead>運送会社コード</TableHead>
                      <TableHead>運送会社名</TableHead>
                      <TableHead>発着地</TableHead>
                      <TableHead>車種</TableHead>
                      <TableHead className="text-right">数量</TableHead>
                      <TableHead className="text-right">仮データ単価</TableHead>
                      <TableHead className="text-right">マスタ単価</TableHead>
                      <TableHead className="text-right">単価差異</TableHead>
                      <TableHead className="text-right">仮データ金額</TableHead>
                      <TableHead className="text-right">マスタ金額</TableHead>
                      <TableHead className="text-right">金額差異</TableHead>
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
                          {record.carrierCode}
                        </TableCell>
                        <TableCell>{record.carrierName}</TableCell>
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
              仮データ金額: ¥{totalImportedAmount.toLocaleString()}<br />
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
