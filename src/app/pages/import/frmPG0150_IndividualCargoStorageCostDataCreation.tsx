import { useState } from "react";
import { PlayCircle, Save, FileText, CheckCircle2, XCircle, Download } from "lucide-react";
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

interface CargoStorageRecord {
  id: string;
  cargoNo: string;
  cargoDate: string;
  shipperCode: string;
  shipperName: string;
  warehouseCode: string;
  warehouseName: string;
  storageDays: number;
  handlingFee: number;
  storageFee: number;
  totalAmount: number;
  status: "success" | "error" | "warning";
  message?: string;
}

export function IndividualCargoStorageCostDataCreation() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<CargoStorageRecord[]>([]);
  const [targetMonth, setTargetMonth] = useState("2026-03");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const mockData: CargoStorageRecord[] = [
    {
      id: "1",
      cargoNo: "CG-2026-001",
      cargoDate: "2026-03-01",
      shipperCode: "SH001",
      shipperName: "東京商事株式会社",
      warehouseCode: "WH001",
      warehouseName: "東京第一倉庫",
      storageDays: 15,
      handlingFee: 25000,
      storageFee: 45000,
      totalAmount: 70000,
      status: "success",
    },
    {
      id: "2",
      cargoNo: "CG-2026-002",
      cargoDate: "2026-03-05",
      shipperCode: "SH002",
      shipperName: "関東物産",
      warehouseCode: "WH002",
      warehouseName: "横浜物流センター",
      storageDays: 10,
      handlingFee: 18000,
      storageFee: 30000,
      totalAmount: 48000,
      status: "success",
    },
    {
      id: "3",
      cargoNo: "CG-2026-003",
      cargoDate: "2026-03-08",
      shipperCode: "SH003",
      shipperName: "中部貿易",
      warehouseCode: "WH999",
      warehouseName: "未登録倉庫",
      storageDays: 20,
      handlingFee: 30000,
      storageFee: 60000,
      totalAmount: 90000,
      status: "error",
      message: "倉庫コードが見つかりません",
    },
    {
      id: "4",
      cargoNo: "CG-2026-004",
      cargoDate: "2026-03-10",
      shipperCode: "SH001",
      shipperName: "東京商事株式会社",
      warehouseCode: "WH001",
      warehouseName: "東京第一倉庫",
      storageDays: 45,
      handlingFee: 35000,
      storageFee: 135000,
      totalAmount: 170000,
      status: "warning",
      message: "保管日数が標準期間を超過しています",
    },
  ];

  const handleProcess = async () => {
    setProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          setResults(mockData);
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
      ? results
      : results.filter((r) => r.status === filterStatus);

  const successCount = results.filter((r) => r.status === "success").length;
  const errorCount = results.filter((r) => r.status === "error").length;
  const warningCount = results.filter((r) => r.status === "warning").length;
  const totalHandlingFee = results.reduce((sum, r) => sum + r.handlingFee, 0);
  const totalStorageFee = results.reduce((sum, r) => sum + r.storageFee, 0);
  const totalAmount = results.reduce((sum, r) => sum + r.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">個建荷役保管費用データ作成</h1>
        <p className="text-gray-600 mt-1">frmPG0150 - Individual Cargo Handling Storage Cost Data Creation</p>
      </div>

      {/* Process Settings */}
      <Card>
        <CardHeader>
          <CardTitle>データ作成設定</CardTitle>
          <CardDescription>
            個建荷役・保管費用データを作成します
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
                disabled={processing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warehouse">倉庫</Label>
              <Select defaultValue="all">
                <SelectTrigger id="warehouse">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全倉庫</SelectItem>
                  <SelectItem value="wh001">東京第一倉庫</SelectItem>
                  <SelectItem value="wh002">横浜物流センター</SelectItem>
                  <SelectItem value="wh003">大阪物流センター</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="calc-type">計算方法</Label>
              <Select defaultValue="standard">
                <SelectTrigger id="calc-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">標準計算</SelectItem>
                  <SelectItem value="daily">日割計算</SelectItem>
                  <SelectItem value="monthly">月極計算</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {processing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">データ作成中...</span>
                <span className="text-gray-600">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleProcess}
              disabled={processing}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              データ作成実行
            </Button>
            <Button variant="outline" disabled={processing}>
              <Save className="w-4 h-4 mr-2" />
              設定保存
            </Button>
            <Button variant="outline" disabled={processing}>
              キャンセル
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results.length > 0 && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>総件数</CardDescription>
                <CardTitle className="text-2xl">{results.length}</CardTitle>
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
                <CardDescription>荷役費用</CardDescription>
                <CardTitle className="text-xl">¥{totalHandlingFee.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>保管費用</CardDescription>
                <CardTitle className="text-xl">¥{totalStorageFee.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>作成結果</CardTitle>
                  <CardDescription>
                    データ作成結果の詳細を確認してください
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
                      <TableHead>個建No</TableHead>
                      <TableHead>個建日付</TableHead>
                      <TableHead>荷主コード</TableHead>
                      <TableHead>荷主名</TableHead>
                      <TableHead>倉庫コード</TableHead>
                      <TableHead>倉庫名</TableHead>
                      <TableHead className="text-right">保管日数</TableHead>
                      <TableHead className="text-right">荷役費用</TableHead>
                      <TableHead className="text-right">保管費用</TableHead>
                      <TableHead className="text-right">合計金額</TableHead>
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
                          {record.cargoNo}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.cargoDate}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.shipperCode}
                        </TableCell>
                        <TableCell>{record.shipperName}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.warehouseCode}
                        </TableCell>
                        <TableCell>{record.warehouseName}</TableCell>
                        <TableCell className="text-right font-mono">
                          {record.storageDays}日
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.handlingFee.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.storageFee.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          ¥{record.totalAmount.toLocaleString()}
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
