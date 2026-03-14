import { useState } from "react";
import { Save, Plus, Trash2, Search } from "lucide-react";
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

interface IndividualCostRecord {
  id: string;
  workDate: string;
  cargoNo: string;
  shipperCode: string;
  shipperName: string;
  departureCode: string;
  departureName: string;
  arrivalCode: string;
  arrivalName: string;
  cargoType: string;
  weight: number;
  volume: number;
  unitPrice: number;
  amount: number;
}

export function TransportCostIndividualInput() {
  const [records, setRecords] = useState<IndividualCostRecord[]>([]);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IndividualCostRecord | null>(null);
  const [workDate, setWorkDate] = useState("2026-03-11");

  const mockRecords: IndividualCostRecord[] = [
    {
      id: "1",
      workDate: "2026-03-11",
      cargoNo: "CG-2026-0311-001",
      shipperCode: "SH001",
      shipperName: "東京商事株式会社",
      departureCode: "DEP-001",
      departureName: "東京",
      arrivalCode: "ARR-001",
      arrivalName: "大阪",
      cargoType: "パレット",
      weight: 500,
      volume: 2.5,
      unitPrice: 15000,
      amount: 15000,
    },
    {
      id: "2",
      workDate: "2026-03-11",
      cargoNo: "CG-2026-0311-002",
      shipperCode: "SH002",
      shipperName: "関東物産",
      departureCode: "DEP-002",
      departureName: "横浜",
      arrivalCode: "ARR-002",
      arrivalName: "名古屋",
      cargoType: "カートン",
      weight: 300,
      volume: 1.8,
      unitPrice: 12000,
      amount: 12000,
    },
  ];

  const handleSearch = () => {
    setRecords(mockRecords);
  };

  const handleNew = () => {
    setSelectedRecord(null);
    setShowInputDialog(true);
  };

  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);
  const totalWeight = records.reduce((sum, r) => sum + r.weight, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">運送費用個建て入力</h1>
        <p className="text-gray-600 mt-1">frmPG0122 - Transport Cost Individual Cargo Input</p>
      </div>

      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle>検索条件</CardTitle>
          <CardDescription>個建て運送費用データを検索します</CardDescription>
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
              <Label htmlFor="shipper-code">荷主コード</Label>
              <div className="flex gap-2">
                <Input id="shipper-code" placeholder="SH001" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo-type">貨物種別</Label>
              <Select>
                <SelectTrigger id="cargo-type">
                  <SelectValue placeholder="全種別" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全種別</SelectItem>
                  <SelectItem value="pallet">パレット</SelectItem>
                  <SelectItem value="carton">カートン</SelectItem>
                  <SelectItem value="container">コンテナ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo-no">個建No</Label>
              <Input id="cargo-no" placeholder="CG-2026-0311-001" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              検索
            </Button>
            <Button variant="outline" onClick={handleNew}>
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
                <CardDescription>合計金額</CardDescription>
                <CardTitle className="text-2xl">¥{totalAmount.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>合計重量</CardDescription>
                <CardTitle className="text-2xl">{totalWeight.toLocaleString()}kg</CardTitle>
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
              <CardTitle>個建て費用一覧</CardTitle>
              <CardDescription>登録済みの個建て費用データ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>作業日</TableHead>
                      <TableHead>個建No</TableHead>
                      <TableHead>荷主コード</TableHead>
                      <TableHead>荷主名</TableHead>
                      <TableHead>発地</TableHead>
                      <TableHead>着地</TableHead>
                      <TableHead>貨物種別</TableHead>
                      <TableHead className="text-right">重量(kg)</TableHead>
                      <TableHead className="text-right">容積(m³)</TableHead>
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
                          {record.cargoNo}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.shipperCode}
                        </TableCell>
                        <TableCell>{record.shipperName}</TableCell>
                        <TableCell>{record.departureName}</TableCell>
                        <TableCell>{record.arrivalName}</TableCell>
                        <TableCell>{record.cargoType}</TableCell>
                        <TableCell className="text-right font-mono">
                          {record.weight}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {record.volume}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ¥{record.unitPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          ¥{record.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedRecord(record);
                                setShowInputDialog(true);
                              }}
                            >
                              編集
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setRecords(records.filter((r) => r.id !== record.id))}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
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

      {/* Input Dialog */}
      <Dialog open={showInputDialog} onOpenChange={setShowInputDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedRecord ? "個建て費用編集" : "個建て費用新規登録"}
            </DialogTitle>
            <DialogDescription>
              個建て運送費用の詳細情報を入力してください
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="input-work-date">作業日 *</Label>
              <Input id="input-work-date" type="date" defaultValue={workDate} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-cargo-no">個建No</Label>
              <Input id="input-cargo-no" placeholder="自動採番" disabled />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="input-shipper">荷主 *</Label>
              <div className="flex gap-2">
                <Input id="input-shipper" placeholder="SH001" className="w-32" />
                <Input placeholder="荷主名" className="flex-1" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="input-departure">発地 *</Label>
              <div className="flex gap-2">
                <Input id="input-departure" placeholder="DEP-001" className="w-32" />
                <Input placeholder="発地名" className="flex-1" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="input-arrival">着地 *</Label>
              <div className="flex gap-2">
                <Input id="input-arrival" placeholder="ARR-001" className="w-32" />
                <Input placeholder="着地名" className="flex-1" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-cargo-type">貨物種別 *</Label>
              <Select>
                <SelectTrigger id="input-cargo-type">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pallet">パレット</SelectItem>
                  <SelectItem value="carton">カートン</SelectItem>
                  <SelectItem value="container">コンテナ</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-weight">重量(kg) *</Label>
              <Input id="input-weight" type="number" placeholder="500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-volume">容積(m³)</Label>
              <Input id="input-volume" type="number" step="0.1" placeholder="2.5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-unit-price">単価 *</Label>
              <Input id="input-unit-price" type="number" placeholder="15000" />
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
