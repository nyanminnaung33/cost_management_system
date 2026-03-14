import { useState } from "react";
import { Save, Plus, Search } from "lucide-react";
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

interface RouteCostRecord {
  id: string;
  workDate: string;
  routeCode: string;
  routeName: string;
  carrierCode: string;
  carrierName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export function TransportCostRouteInput() {
  const [records, setRecords] = useState<RouteCostRecord[]>([]);
  const [workDate, setWorkDate] = useState("2026-03-11");

  const mockRecords: RouteCostRecord[] = [
    {
      id: "1",
      workDate: "2026-03-11",
      routeCode: "RT-001",
      routeName: "東京-大阪線",
      carrierCode: "C001",
      carrierName: "東京運送株式会社",
      quantity: 50,
      unitPrice: 2500,
      amount: 125000,
    },
    {
      id: "2",
      workDate: "2026-03-11",
      routeCode: "RT-002",
      routeName: "東京-名古屋線",
      carrierCode: "C002",
      carrierName: "関東物流センター",
      quantity: 35,
      unitPrice: 2200,
      amount: 77000,
    },
  ];

  const handleSearch = () => {
    setRecords(mockRecords);
  };

  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);
  const totalQuantity = records.reduce((sum, r) => sum + r.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">運送費用路線入力</h1>
        <p className="text-gray-600 mt-1">frmPG0123 - Transport Cost Route Input</p>
      </div>

      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle>検索条件</CardTitle>
          <CardDescription>路線別運送費用データを検索します</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="work-date">作業日</Label>
              <Input
                id="work-date"
                type="date"
                value={workDate}
                onChange={(e) => setWorkDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="route-code">路線コード</Label>
              <div className="flex gap-2">
                <Input id="route-code" placeholder="RT-001" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carrier-code">運送会社コード</Label>
              <div className="flex gap-2">
                <Input id="carrier-code" placeholder="C001" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="route-name">路線名</Label>
              <Input id="route-name" placeholder="路線名" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              検索
            </Button>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              新規登録
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {records.length > 0 && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>総件数</CardDescription>
                <CardTitle className="text-2xl">{records.length}件</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>合計数量</CardDescription>
                <CardTitle className="text-2xl">{totalQuantity}個</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>合計金額</CardDescription>
                <CardTitle className="text-2xl">¥{totalAmount.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>対象日付</CardDescription>
                <CardTitle className="text-xl">{workDate}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>路線費用一覧</CardTitle>
              <CardDescription>登録済みの路線費用データ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>作業日</TableHead>
                      <TableHead>路線コード</TableHead>
                      <TableHead>路線名</TableHead>
                      <TableHead>運送会社コード</TableHead>
                      <TableHead>運送会社名</TableHead>
                      <TableHead className="text-right">数量</TableHead>
                      <TableHead className="text-right">単価</TableHead>
                      <TableHead className="text-right">金額</TableHead>
                      <TableHead className="w-24">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-mono text-sm">
                          {record.workDate}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.routeCode}
                        </TableCell>
                        <TableCell>{record.routeName}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.carrierCode}
                        </TableCell>
                        <TableCell>{record.carrierName}</TableCell>
                        <TableCell className="text-right font-mono">
                          {record.quantity}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.unitPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          ¥{record.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            編集
                          </Button>
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
