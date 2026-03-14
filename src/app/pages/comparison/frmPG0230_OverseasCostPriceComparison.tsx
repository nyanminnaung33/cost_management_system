import { useState } from "react";
import { CheckCircle2, AlertTriangle, Download, FileCheck, Search } from "lucide-react";
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

export function OverseasCostPriceComparison() {
  const [records, setRecords] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [targetMonth, setTargetMonth] = useState("2026-03");

  const mockRecords = [
    {
      id: "1",
      workDate: "2026-03-11",
      blNo: "BL-2026-001",
      supplierCode: "OS001",
      supplierName: "Shanghai Freight Co.",
      costType: "海上運賃",
      currency: "USD",
      foreignAmount: 1500,
      actualJpyAmount: 225750,
      masterJpyAmount: 225000,
      amountDifference: 750,
      status: "mismatch",
      selected: false,
    },
    {
      id: "2",
      workDate: "2026-03-11",
      blNo: "BL-2026-002",
      supplierCode: "OS002",
      supplierName: "Singapore Logistics",
      costType: "港湾費用",
      currency: "USD",
      foreignAmount: 800,
      actualJpyAmount: 120400,
      masterJpyAmount: 120400,
      amountDifference: 0,
      status: "match",
      selected: false,
    },
  ];

  const handleCompare = () => {
    setRecords(mockRecords);
  };

  const handleSelectAll = (checked: boolean) => {
    setRecords(records.map(r => ({ ...r, selected: checked })));
  };

  const selectedCount = records.filter(r => r.selected).length;
  const matchCount = records.filter(r => r.status === "match").length;
  const mismatchCount = records.filter(r => r.status === "mismatch").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">海外費用原価照合</h1>
        <p className="text-gray-600 mt-1">frmPG0230 - Overseas Cost Price Comparison</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>照合条件</CardTitle>
          <CardDescription>実際原価とマスタ原価を照合します</CardDescription>
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
                <Input id="supplier" placeholder="OS001" />
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
                  <SelectItem value="freight">海上運賃</SelectItem>
                  <SelectItem value="port">港湾費用</SelectItem>
                  <SelectItem value="customs">通関費用</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">通貨</Label>
              <Select>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="全通貨" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全通貨</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="CNY">CNY</SelectItem>
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

      {records.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>総件数</CardDescription>
                <CardTitle className="text-2xl">{records.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>一致</CardDescription>
                <CardTitle className="text-2xl text-green-600">{matchCount}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>差異あり</CardDescription>
                <CardTitle className="text-2xl text-orange-600">{mismatchCount}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>照合結果</CardTitle>
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
                  <Button size="sm" disabled={selectedCount === 0}>
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
                      <TableHead>B/L No</TableHead>
                      <TableHead>仕入先コード</TableHead>
                      <TableHead>仕入先名</TableHead>
                      <TableHead>費用種別</TableHead>
                      <TableHead>通貨</TableHead>
                      <TableHead className="text-right">外貨金額</TableHead>
                      <TableHead className="text-right">実原価</TableHead>
                      <TableHead className="text-right">マスタ原価</TableHead>
                      <TableHead className="text-right">差異</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow 
                        key={record.id}
                        className={record.status === "mismatch" ? "bg-orange-50" : ""}
                      >
                        <TableCell>
                          <Checkbox
                            checked={record.selected}
                            onCheckedChange={(checked) => 
                              setRecords(records.map(r => r.id === record.id ? { ...r, selected: checked } : r))
                            }
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
                        <TableCell className="font-mono text-sm">{record.workDate}</TableCell>
                        <TableCell className="font-mono text-sm">{record.blNo}</TableCell>
                        <TableCell className="font-mono text-sm">{record.supplierCode}</TableCell>
                        <TableCell>{record.supplierName}</TableCell>
                        <TableCell>{record.costType}</TableCell>
                        <TableCell className="font-mono text-sm">{record.currency}</TableCell>
                        <TableCell className="text-right font-mono">
                          {record.foreignAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.actualJpyAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.masterJpyAmount.toLocaleString()}
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
    </div>
  );
}
