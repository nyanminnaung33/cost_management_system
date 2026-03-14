import { useState } from "react";
import { Search, Download, FileText } from "lucide-react";
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

export function TransportCostSearch() {
  const [workDateFrom, setWorkDateFrom] = useState("2026-03-01");
  const [workDateTo, setWorkDateTo] = useState("2026-03-31");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    const mockResults = [
      {
        id: "1",
        workDate: "2026-03-11",
        workNo: "W-2026-0311-001",
        carrierCode: "C001",
        carrierName: "東京運送株式会社",
        costType: "車建て",
        departureArrival: "東京→大阪",
        amount: 45000,
      },
      {
        id: "2",
        workDate: "2026-03-11",
        workNo: "W-2026-0311-002",
        carrierCode: "C002",
        carrierName: "関東物流センター",
        costType: "個建て",
        departureArrival: "横浜→名古屋",
        amount: 15000,
      },
      {
        id: "3",
        workDate: "2026-03-10",
        workNo: "W-2026-0310-001",
        carrierCode: "C001",
        carrierName: "東京運送株式会社",
        costType: "路線",
        departureArrival: "東京→大阪",
        amount: 125000,
      },
    ];
    setSearchResults(mockResults);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">運送費用検索</h1>
        <p className="text-gray-600 mt-1">frmPG0124 - Transport Cost Search</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>検索条件</CardTitle>
          <CardDescription>運送費用データを検索します</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date-from">作業日(From)</Label>
              <Input
                id="date-from"
                type="date"
                value={workDateFrom}
                onChange={(e) => setWorkDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-to">作業日(To)</Label>
              <Input
                id="date-to"
                type="date"
                value={workDateTo}
                onChange={(e) => setWorkDateTo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost-type">費用種別</Label>
              <Select>
                <SelectTrigger id="cost-type">
                  <SelectValue placeholder="全種別" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全種別</SelectItem>
                  <SelectItem value="vehicle">車建て</SelectItem>
                  <SelectItem value="individual">個建て</SelectItem>
                  <SelectItem value="route">路線</SelectItem>
                  <SelectItem value="monthly">月極</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="carrier">運送会社コード</Label>
              <Input id="carrier" placeholder="C001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-no">作業No</Label>
              <Input id="work-no" placeholder="W-2026-0311-001" />
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
        <Card>
          <CardHeader>
            <CardTitle>検索結果 ({searchResults.length}件)</CardTitle>
            <CardDescription>
              合計金額: ¥{searchResults.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>作業日</TableHead>
                    <TableHead>作業No</TableHead>
                    <TableHead>運送会社コード</TableHead>
                    <TableHead>運送会社名</TableHead>
                    <TableHead>費用種別</TableHead>
                    <TableHead>発着地</TableHead>
                    <TableHead className="text-right">金額</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((record) => (
                    <TableRow key={record.id}>
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
                      <TableCell>{record.costType}</TableCell>
                      <TableCell>{record.departureArrival}</TableCell>
                      <TableCell className="text-right font-mono font-semibold">
                        ¥{record.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          詳細
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
