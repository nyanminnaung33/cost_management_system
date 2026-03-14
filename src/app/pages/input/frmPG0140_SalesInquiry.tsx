import { useState } from "react";
import { Search, Download } from "lucide-react";
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

export function SalesInquiry() {
  const [targetMonth, setTargetMonth] = useState("2026-03");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    const mockResults = [
      {
        id: "1",
        customerCode: "CU001",
        customerName: "株式会社山田商事",
        invoiceNo: "INV-2026-03-001",
        invoiceDate: "2026-03-31",
        salesAmount: 550000,
        costAmount: 450000,
        profit: 100000,
        profitRate: 18.2,
      },
      {
        id: "2",
        customerCode: "CU002",
        customerName: "田中物産株式会社",
        invoiceNo: "INV-2026-03-002",
        invoiceDate: "2026-03-31",
        salesAmount: 390000,
        costAmount: 325000,
        profit: 65000,
        profitRate: 16.7,
      },
    ];
    setSearchResults(mockResults);
  };

  const totalSales = searchResults.reduce((sum, r) => sum + r.salesAmount, 0);
  const totalCost = searchResults.reduce((sum, r) => sum + r.costAmount, 0);
  const totalProfit = totalSales - totalCost;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">売上照会</h1>
        <p className="text-gray-600 mt-1">frmPG0140 - Sales Inquiry</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>検索条件</CardTitle>
          <CardDescription>売上データを照会します</CardDescription>
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
              <Input id="customer" placeholder="CU001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoice-no">請求書番号</Label>
              <Input id="invoice-no" placeholder="INV-2026-03-001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">ステータス</Label>
              <Select defaultValue="all">
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  <SelectItem value="confirmed">確定済</SelectItem>
                  <SelectItem value="pending">未確定</SelectItem>
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
              <Download className="w-4 h-4 mr-2" />
              エクスポート
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>売上合計</CardDescription>
                <CardTitle className="text-2xl">¥{totalSales.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>原価合計</CardDescription>
                <CardTitle className="text-2xl">¥{totalCost.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>利益合計</CardDescription>
                <CardTitle className="text-2xl text-green-600">¥{totalProfit.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>利益率</CardDescription>
                <CardTitle className="text-2xl">{((totalProfit / totalSales) * 100).toFixed(1)}%</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>売上照会結果 ({searchResults.length}件)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>顧客コード</TableHead>
                      <TableHead>顧客名</TableHead>
                      <TableHead>請求書番号</TableHead>
                      <TableHead>請求日</TableHead>
                      <TableHead className="text-right">売上金額</TableHead>
                      <TableHead className="text-right">原価金額</TableHead>
                      <TableHead className="text-right">利益</TableHead>
                      <TableHead className="text-right">利益率</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-mono text-sm">
                          {record.customerCode}
                        </TableCell>
                        <TableCell>{record.customerName}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.invoiceNo}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.invoiceDate}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.salesAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.costAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold text-green-600">
                          ¥{record.profit.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {record.profitRate.toFixed(1)}%
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
