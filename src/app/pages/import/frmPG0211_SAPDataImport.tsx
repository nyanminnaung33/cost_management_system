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

interface SAPDataRecord {
  id: string;
  sapDocNo: string;
  postingDate: string;
  companyCode: string;
  costCenter: string;
  glAccount: string;
  accountName: string;
  documentType: string;
  amount: number;
  currency: string;
  reference: string;
  status: "success" | "error" | "warning";
  message?: string;
}

export function SAPDataImport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<SAPDataRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const mockSAPData: SAPDataRecord[] = [
    {
      id: "1",
      sapDocNo: "5100000001",
      postingDate: "2026-03-10",
      companyCode: "0001",
      costCenter: "CC-001",
      glAccount: "6000-001",
      accountName: "運送費",
      documentType: "KR",
      amount: 500000,
      currency: "JPY",
      reference: "March Transport Cost",
      status: "success",
    },
    {
      id: "2",
      sapDocNo: "5100000002",
      postingDate: "2026-03-10",
      companyCode: "0001",
      costCenter: "CC-002",
      glAccount: "6000-002",
      accountName: "海外運送費",
      documentType: "KR",
      amount: 750000,
      currency: "JPY",
      reference: "International Freight",
      status: "success",
    },
    {
      id: "3",
      sapDocNo: "5100000003",
      postingDate: "2026-03-10",
      companyCode: "9999",
      costCenter: "CC-999",
      glAccount: "6000-999",
      accountName: "未設定",
      documentType: "KR",
      amount: 250000,
      currency: "JPY",
      reference: "Unknown Cost",
      status: "error",
      message: "会社コードが存在しません",
    },
    {
      id: "4",
      sapDocNo: "5100000004",
      postingDate: "2026-03-10",
      companyCode: "0001",
      costCenter: "CC-003",
      glAccount: "6000-003",
      accountName: "保管費",
      documentType: "KR",
      amount: 1500000,
      currency: "JPY",
      reference: "Storage Cost",
      status: "warning",
      message: "金額が異常に高額です",
    },
    {
      id: "5",
      sapDocNo: "5100000005",
      postingDate: "2026-03-10",
      companyCode: "0001",
      costCenter: "CC-004",
      glAccount: "6000-004",
      accountName: "通関費用",
      documentType: "KR",
      amount: 120000,
      currency: "JPY",
      reference: "Customs Clearance",
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
          setImportResults(mockSAPData);
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
  const totalAmount = importResults.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">SAPデータインポート</h1>
        <p className="text-gray-600 mt-1">frmPG0211 - SAP Data Import</p>
      </div>

      {/* Import Section */}
      <Card>
        <CardHeader>
          <CardTitle>ファイル選択</CardTitle>
          <CardDescription>
            SAPシステムからエクスポートしたデータファイルをインポートしてください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">インポートファイル</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls,.txt"
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
              <Label htmlFor="import-type">データ種別</Label>
              <Select defaultValue="cost">
                <SelectTrigger id="import-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cost">原価データ</SelectItem>
                  <SelectItem value="sales">売上データ</SelectItem>
                  <SelectItem value="master">マスタデータ</SelectItem>
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
                      <TableHead>SAP伝票番号</TableHead>
                      <TableHead>転記日付</TableHead>
                      <TableHead>会社コード</TableHead>
                      <TableHead>原価センタ</TableHead>
                      <TableHead>G/L勘定</TableHead>
                      <TableHead>勘定科目名</TableHead>
                      <TableHead>伝票タイプ</TableHead>
                      <TableHead className="text-right">金額</TableHead>
                      <TableHead>通貨</TableHead>
                      <TableHead>参照</TableHead>
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
                          {record.sapDocNo}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.postingDate}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.companyCode}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.costCenter}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.glAccount}
                        </TableCell>
                        <TableCell>{record.accountName}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.documentType}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.currency}
                        </TableCell>
                        <TableCell className="text-sm">
                          {record.reference}
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
