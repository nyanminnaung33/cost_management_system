import { useState } from "react";
import { Upload, FileText, CheckCircle2, XCircle, Download, AlertTriangle, Archive } from "lucide-react";
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
import { Checkbox } from "../../components/ui/checkbox";

interface TemporaryTransportRecord {
  id: string;
  workDate: string;
  workNo: string;
  carrierCode: string;
  carrierName: string;
  departureCode: string;
  departureName: string;
  arrivalCode: string;
  arrivalName: string;
  vehicleType: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  status: "success" | "error" | "warning";
  message?: string;
}

export function TemporaryTransportCostImport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<TemporaryTransportRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isTemporary, setIsTemporary] = useState(true);

  const mockTemporaryData: TemporaryTransportRecord[] = [
    {
      id: "1",
      workDate: "2026-03-10",
      workNo: "TMP-2026-001",
      carrierCode: "C001",
      carrierName: "東京運送株式会社",
      departureCode: "DEP-001",
      departureName: "東京",
      arrivalCode: "ARR-001",
      arrivalName: "大阪",
      vehicleType: "4tトラック",
      quantity: 10,
      unitPrice: 45000,
      amount: 450000,
      status: "success",
    },
    {
      id: "2",
      workDate: "2026-03-10",
      workNo: "TMP-2026-002",
      carrierCode: "C002",
      carrierName: "関東物流センター",
      departureCode: "DEP-002",
      departureName: "横浜",
      arrivalCode: "ARR-002",
      arrivalName: "名古屋",
      vehicleType: "10tトラック",
      quantity: 5,
      unitPrice: 65000,
      amount: 325000,
      status: "success",
    },
    {
      id: "3",
      workDate: "2026-03-10",
      workNo: "TMP-2026-003",
      carrierCode: "C999",
      carrierName: "未登録運送会社",
      departureCode: "DEP-999",
      departureName: "不明",
      arrivalCode: "ARR-999",
      arrivalName: "不明",
      vehicleType: "2tトラック",
      quantity: 3,
      unitPrice: 0,
      amount: 0,
      status: "error",
      message: "運送会社コードが見つかりません",
    },
    {
      id: "4",
      workDate: "2026-03-10",
      workNo: "TMP-2026-004",
      carrierCode: "C001",
      carrierName: "東京運送株式会社",
      departureCode: "DEP-001",
      departureName: "東京",
      arrivalCode: "ARR-003",
      arrivalName: "福岡",
      vehicleType: "4tトラック",
      quantity: 8,
      unitPrice: 95000,
      amount: 760000,
      status: "warning",
      message: "単価が標準額より高額です（標準: ¥80,000）",
    },
    {
      id: "5",
      workDate: "2026-03-10",
      workNo: "TMP-2026-005",
      carrierCode: "C003",
      carrierName: "中部トランスポート",
      departureCode: "DEP-003",
      departureName: "名古屋",
      arrivalCode: "ARR-004",
      arrivalName: "神戸",
      vehicleType: "4tトラック",
      quantity: 6,
      unitPrice: 38000,
      amount: 228000,
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
          setImportResults(mockTemporaryData);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
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
        <h1 className="text-2xl font-semibold text-gray-900">運送費用仮インポート</h1>
        <p className="text-gray-600 mt-1">frmPG0310 - Temporary Transport Cost Import</p>
      </div>

      {/* Import Section */}
      <Card>
        <CardHeader>
          <CardTitle>仮データインポート</CardTitle>
          <CardDescription>
            運送費用の仮データをインポートします（本データ確定前の検証用）
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
              <Label htmlFor="target-month">対象年月</Label>
              <Input
                id="target-month"
                type="month"
                defaultValue="2026-03"
                disabled={importing}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="temporary-flag"
              checked={isTemporary}
              onCheckedChange={(checked) => setIsTemporary(checked as boolean)}
            />
            <Label htmlFor="temporary-flag" className="text-sm font-normal cursor-pointer">
              仮データとして登録（照合後に本データへ確定可能）
            </Label>
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
              仮インポート実行
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
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Archive className="w-5 h-5 text-orange-600" />
                      仮データインポート結果
                    </div>
                  </CardTitle>
                  <CardDescription>
                    仮データとして登録されます。照合画面で確認後、本データへ確定してください。
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
                      <TableHead>作業No</TableHead>
                      <TableHead>運送会社コード</TableHead>
                      <TableHead>運送会社名</TableHead>
                      <TableHead>発地コード</TableHead>
                      <TableHead>発地名</TableHead>
                      <TableHead>着地コード</TableHead>
                      <TableHead>着地名</TableHead>
                      <TableHead>車種</TableHead>
                      <TableHead className="text-right">数量</TableHead>
                      <TableHead className="text-right">単価</TableHead>
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
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
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
                        <TableCell className="font-mono text-sm">
                          {record.departureCode}
                        </TableCell>
                        <TableCell>{record.departureName}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.arrivalCode}
                        </TableCell>
                        <TableCell>{record.arrivalName}</TableCell>
                        <TableCell>{record.vehicleType}</TableCell>
                        <TableCell className="text-right font-mono">
                          {record.quantity}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.unitPrice.toLocaleString()}
                        </TableCell>
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
