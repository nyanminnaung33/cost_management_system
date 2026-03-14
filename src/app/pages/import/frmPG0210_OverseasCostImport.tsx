import { useState } from "react";
import { Upload, FileText, CheckCircle2, XCircle, Download, AlertTriangle } from "lucide-react";
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
import { Progress } from "../../components/ui/progress";
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

interface OverseasCostRecord {
  id: string;
  workDate: string;
  blNo: string;
  supplierCode: string;
  supplierName: string;
  countryCode: string;
  countryName: string;
  costType: string;
  currency: string;
  foreignAmount: number;
  exchangeRate: number;
  jpyAmount: number;
  status: "success" | "error" | "warning";
  message?: string;
}

export function OverseasCostImport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<OverseasCostRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const mockOverseasData: OverseasCostRecord[] = [
    {
      id: "1",
      workDate: "2026-03-10",
      blNo: "BL-2026-001",
      supplierCode: "OS001",
      supplierName: "Shanghai Freight Co.",
      countryCode: "CN",
      countryName: "中国",
      costType: "海上運賃",
      currency: "USD",
      foreignAmount: 1500,
      exchangeRate: 150.5,
      jpyAmount: 225750,
      status: "success",
    },
    {
      id: "2",
      workDate: "2026-03-10",
      blNo: "BL-2026-002",
      supplierCode: "OS002",
      supplierName: "Singapore Logistics",
      countryCode: "SG",
      countryName: "シンガポール",
      costType: "港湾費用",
      currency: "USD",
      foreignAmount: 800,
      exchangeRate: 150.5,
      jpyAmount: 120400,
      status: "success",
    },
    {
      id: "3",
      workDate: "2026-03-10",
      blNo: "BL-2026-003",
      supplierCode: "OS999",
      supplierName: "Unknown Supplier",
      countryCode: "XX",
      countryName: "不明",
      costType: "通関費用",
      currency: "USD",
      foreignAmount: 500,
      exchangeRate: 0,
      jpyAmount: 0,
      status: "error",
      message: "為替レートが設定されていません",
    },
    {
      id: "4",
      workDate: "2026-03-10",
      blNo: "BL-2026-004",
      supplierCode: "OS003",
      supplierName: "Hong Kong Shipping",
      countryCode: "HK",
      countryName: "香港",
      costType: "保険料",
      currency: "USD",
      foreignAmount: 2500,
      exchangeRate: 150.5,
      jpyAmount: 376250,
      status: "warning",
      message: "金額が標準額を大幅に超過しています",
    },
    {
      id: "5",
      workDate: "2026-03-10",
      blNo: "BL-2026-005",
      supplierCode: "OS004",
      supplierName: "Taiwan Marine",
      countryCode: "TW",
      countryName: "台湾",
      costType: "海上運賃",
      currency: "USD",
      foreignAmount: 1200,
      exchangeRate: 150.5,
      jpyAmount: 180600,
      status: "success",
    },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setImporting(true);
    setImportProgress(0);

    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setImporting(false);
          setImportResults(mockOverseasData);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleConfirm = () => {
    setShowConfirmDialog(true);
  };

  const handleExport = () => {
    console.log("Exporting results...");
  };

  const filteredResults =
    filterStatus === "all"
      ? importResults
      : importResults.filter((r) => r.status === filterStatus);

  const successCount = importResults.filter((r) => r.status === "success").length;
  const errorCount = importResults.filter((r) => r.status === "error").length;
  const warningCount = importResults.filter((r) => r.status === "warning").length;
  const totalAmount = importResults.reduce((sum, r) => sum + r.jpyAmount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">海外費用作業明細インポート</h1>
        <p className="text-gray-600 mt-1">frmPG0210 - Overseas Cost Import</p>
      </div>

      {/* Import Section */}
      <Card>
        <CardHeader>
          <CardTitle>ファイル選択</CardTitle>
          <CardDescription>
            海外費用作業明細データCSVファイルをインポートしてください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">インポートファイル</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                disabled={importing}
              />
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{selectedFile.name}</span>
                  <span className="text-gray-400">
                    ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="import-type">インポート種別</Label>
              <Select defaultValue="standard">
                <SelectTrigger id="import-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">標準インポート</SelectItem>
                  <SelectItem value="overwrite">上書きインポート</SelectItem>
                  <SelectItem value="append">追加インポート</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {importing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">インポート中...</span>
                <span className="text-gray-600">{importProgress}%</span>
              </div>
              <Progress value={importProgress} />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleImport}
              disabled={!selectedFile || importing}
            >
              <Upload className="w-4 h-4 mr-2" />
              インポート実行
            </Button>
            <Button variant="outline" disabled={importing}>
              キャンセル
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {importResults.length > 0 && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>総件数</CardDescription>
                <CardTitle className="text-2xl">{importResults.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>成功</CardDescription>
                <CardTitle className="text-2xl text-green-600">
                  {successCount}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>警告</CardDescription>
                <CardTitle className="text-2xl text-orange-600">
                  {warningCount}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>エラー</CardDescription>
                <CardTitle className="text-2xl text-red-600">
                  {errorCount}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>合計金額</CardDescription>
                <CardTitle className="text-xl">¥{totalAmount.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>インポート結果</CardTitle>
                  <CardDescription>
                    処理結果の詳細を確認してください
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="success">成功のみ</SelectItem>
                      <SelectItem value="warning">警告のみ</SelectItem>
                      <SelectItem value="error">エラーのみ</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="w-4 h-4 mr-2" />
                    エクスポート
                  </Button>
                  <Button size="sm" onClick={handleConfirm} disabled={errorCount > 0}>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    確定
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
                      <TableHead>B/L No</TableHead>
                      <TableHead>仕入先コード</TableHead>
                      <TableHead>仕入先名</TableHead>
                      <TableHead>国コード</TableHead>
                      <TableHead>国名</TableHead>
                      <TableHead>費用種別</TableHead>
                      <TableHead>通貨</TableHead>
                      <TableHead className="text-right">外貨金額</TableHead>
                      <TableHead className="text-right">為替レート</TableHead>
                      <TableHead className="text-right">円貨金額</TableHead>
                      <TableHead>メッセージ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          {record.status === "success" && (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          )}
                          {record.status === "error" && (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          {record.status === "warning" && (
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.workDate}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.blNo}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.supplierCode}
                        </TableCell>
                        <TableCell>{record.supplierName}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.countryCode}
                        </TableCell>
                        <TableCell>{record.countryName}</TableCell>
                        <TableCell>{record.costType}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.currency}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {record.foreignAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {record.exchangeRate.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.jpyAmount.toLocaleString()}
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
            <DialogTitle>インポート確定</DialogTitle>
            <DialogDescription>
              インポートしたデータを確定します。よろしいですか？
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-700">
              総件数: {importResults.length}件<br />
              成功: {successCount}件<br />
              警告: {warningCount}件<br />
              合計金額: ¥{totalAmount.toLocaleString()}
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
