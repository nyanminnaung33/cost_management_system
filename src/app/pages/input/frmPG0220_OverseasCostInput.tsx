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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

export function OverseasCostInput() {
  const [records, setRecords] = useState<any[]>([]);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [workDate, setWorkDate] = useState("2026-03-11");

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
      exchangeRate: 150.5,
      jpyAmount: 225750,
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
      exchangeRate: 150.5,
      jpyAmount: 120400,
    },
  ];

  const handleSearch = () => {
    setRecords(mockRecords);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">海外費用入力</h1>
        <p className="text-gray-600 mt-1">frmPG0220 - Overseas Cost Input</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>検索条件</CardTitle>
          <CardDescription>海外費用データを検索します</CardDescription>
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
              <Label htmlFor="bl-no">B/L No</Label>
              <Input id="bl-no" placeholder="BL-2026-001" />
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
                  <SelectItem value="insurance">保険料</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              検索
            </Button>
            <Button variant="outline" onClick={() => setShowInputDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              新規登録
            </Button>
          </div>
        </CardContent>
      </Card>

      {records.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>海外費用一覧</CardTitle>
            <CardDescription>
              合計金額: ¥{records.reduce((sum, r) => sum + r.jpyAmount, 0).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>作業日</TableHead>
                    <TableHead>B/L No</TableHead>
                    <TableHead>仕入先コード</TableHead>
                    <TableHead>仕入先名</TableHead>
                    <TableHead>費用種別</TableHead>
                    <TableHead>通貨</TableHead>
                    <TableHead className="text-right">外貨金額</TableHead>
                    <TableHead className="text-right">為替レート</TableHead>
                    <TableHead className="text-right">円貨金額</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
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
                      <TableCell className="text-right font-mono font-semibold">
                        ¥{record.jpyAmount.toLocaleString()}
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
      )}

      <Dialog open={showInputDialog} onOpenChange={setShowInputDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>海外費用新規登録</DialogTitle>
            <DialogDescription>
              海外費用の詳細情報を入力してください
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="input-work-date">作業日 *</Label>
              <Input id="input-work-date" type="date" defaultValue={workDate} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-bl-no">B/L No *</Label>
              <Input id="input-bl-no" placeholder="BL-2026-001" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="input-supplier">仕入先 *</Label>
              <div className="flex gap-2">
                <Input id="input-supplier" placeholder="OS001" className="w-32" />
                <Input placeholder="仕入先名" className="flex-1" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-cost-type">費用種別 *</Label>
              <Select>
                <SelectTrigger id="input-cost-type">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freight">海上運賃</SelectItem>
                  <SelectItem value="port">港湾費用</SelectItem>
                  <SelectItem value="customs">通関費用</SelectItem>
                  <SelectItem value="insurance">保険料</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-currency">通貨 *</Label>
              <Select defaultValue="USD">
                <SelectTrigger id="input-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="CNY">CNY</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-foreign-amount">外貨金額 *</Label>
              <Input id="input-foreign-amount" type="number" placeholder="1500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-exchange-rate">為替レート *</Label>
              <Input id="input-exchange-rate" type="number" step="0.01" placeholder="150.50" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="input-remarks">備考</Label>
              <Input id="input-remarks" placeholder="備考" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInputDialog(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setShowInputDialog(false)}>
              <Save className="w-4 h-4 mr-2" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
