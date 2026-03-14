import { useState } from "react";
import { Upload, FileText, CheckCircle2, XCircle, Download } from "lucide-react";
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

interface ImportRecord {
  id: string;
  workDate: string;
  invoiceNo: string;
  shipperCode: string;
  shipperName: string;
  destination: string;
  amount: number;
  status: "success" | "error" | "warning";
  message?: string;
}

export function TransportCostImport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<ImportRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const mockImportData: ImportRecord[] = [
    {
      id: "1",
      workDate: "2026-03-10",
      invoiceNo: "INV-2026-0310-001",
      shipperCode: "S001",
      shipperName: "日本運輸株式会社",
      destination: "東京都港区",
      amount: 125000,
      status: "success",
    },
    {
      id: "2",
      workDate: "2026-03-10",
      invoiceNo: "INV-2026-0310-002",
      shipperCode: "S002",
      shipperName: "関東物流センター",
      destination: "神奈川県横浜市",
      amount: 87500,
      status: "success",
    },
    {
      id: "3",
      workDate: "2026-03-10",
      invoiceNo: "INV-2026-0310-003",
      shipperCode: "S003",
      shipperName: "中部トランスポート",
      destination: "愛知県名古屋市",
      amount: 0,
      status: "error",
      message: "金額が0円です",
    },
    {
      id: "4",
      workDate: "2026-03-10",
      invoiceNo: "INV-2026-0310-004",
      shipperCode: "S001",
      shipperName: "日本運輸株式会社",
      destination: "大阪府大阪市",
      amount: 156000,
      status: "warning",
      message: "重複の可能性があります",
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

    // Simulate import process
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setImporting(false);
          setImportResults(mockImportData);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleExport = () => {
    // Mock export functionality
    console.log("Exporting results...");
  };

  const filteredResults =
    filterStatus === "all"
      ? importResults
      : importResults.filter((r) => r.status === filterStatus);

  const successCount = importResults.filter((r) => r.status === "success").length;
  const errorCount = importResults.filter((r) => r.status === "error").length;
  const warningCount = importResults.filter((r) => r.status === "warning").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">運送費用作業明細インポート</h1>
        <p className="text-gray-600 mt-1">frmPG0110 - Transport Cost Work Details Import</p>
      </div>

      {/* Import Section */}
      <Card>
        <CardHeader>
          <CardTitle>ファイル選択</CardTitle>
          <CardDescription>
            CSVまたはExcelファイルをインポートしてください
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                      <TableHead>送り状No</TableHead>
                      <TableHead>荷主コード</TableHead>
                      <TableHead>荷主名</TableHead>
                      <TableHead>届先</TableHead>
                      <TableHead className="text-right">金額</TableHead>
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
                            <XCircle className="w-5 h-5 text-orange-600" />
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.workDate}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.invoiceNo}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.shipperCode}
                        </TableCell>
                        <TableCell>{record.shipperName}</TableCell>
                        <TableCell>{record.destination}</TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.amount.toLocaleString()}
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
    </div>
  );
}
