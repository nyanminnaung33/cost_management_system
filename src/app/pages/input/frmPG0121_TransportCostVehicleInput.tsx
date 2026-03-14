import { useState } from "react";
import { Save, Plus, Trash2, Search, Calculator, FileText } from "lucide-react";
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

interface VehicleCostRecord {
  id: string;
  workDate: string;
  workNo: string;
  carrierCode: string;
  carrierName: string;
  vehicleType: string;
  vehicleNo: string;
  departureCode: string;
  departureName: string;
  arrivalCode: string;
  arrivalName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export function TransportCostVehicleInput() {
  const [records, setRecords] = useState<VehicleCostRecord[]>([]);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<VehicleCostRecord | null>(null);
  const [workDate, setWorkDate] = useState("2026-03-11");
  const [carrierCode, setCarrierCode] = useState("");

  const mockRecords: VehicleCostRecord[] = [
    {
      id: "1",
      workDate: "2026-03-11",
      workNo: "W-2026-0311-001",
      carrierCode: "C001",
      carrierName: "東京運送株式会社",
      vehicleType: "4tトラック",
      vehicleNo: "品川500あ1234",
      departureCode: "DEP-001",
      departureName: "東京",
      arrivalCode: "ARR-001",
      arrivalName: "大阪",
      quantity: 1,
      unitPrice: 45000,
      amount: 45000,
    },
    {
      id: "2",
      workDate: "2026-03-11",
      workNo: "W-2026-0311-002",
      carrierCode: "C002",
      carrierName: "関東物流センター",
      vehicleType: "10tトラック",
      vehicleNo: "横浜100さ5678",
      departureCode: "DEP-002",
      departureName: "横浜",
      arrivalCode: "ARR-002",
      arrivalName: "名古屋",
      quantity: 1,
      unitPrice: 65000,
      amount: 65000,
    },
  ];

  const handleSearch = () => {
    setRecords(mockRecords);
  };

  const handleNew = () => {
    setSelectedRecord(null);
    setShowInputDialog(true);
  };

  const handleEdit = (record: VehicleCostRecord) => {
    setSelectedRecord(record);
    setShowInputDialog(true);
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const handleSave = () => {
    setShowInputDialog(false);
    // Save logic here
  };

  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">運送費用車建て入力</h1>
        <p className="text-gray-600 mt-1">frmPG0121 - Transport Cost Vehicle-based Input</p>
      </div>

      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle>検索条件</CardTitle>
          <CardDescription>車建て運送費用データを検索します</CardDescription>
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
              <Label htmlFor="carrier-code">運送会社コード</Label>
              <div className="flex gap-2">
                <Input
                  id="carrier-code"
                  placeholder="C001"
                  value={carrierCode}
                  onChange={(e) => setCarrierCode(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle-type">車種</Label>
              <Select>
                <SelectTrigger id="vehicle-type">
                  <SelectValue placeholder="全車種" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全車種</SelectItem>
                  <SelectItem value="2t">2tトラック</SelectItem>
                  <SelectItem value="4t">4tトラック</SelectItem>
                  <SelectItem value="10t">10tトラック</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle-no">車両番号</Label>
              <Input
                id="vehicle-no"
                placeholder="車両番号"
              />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <CardDescription>対象日付</CardDescription>
                <CardTitle className="text-xl">{workDate}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>車建て費用一覧</CardTitle>
              <CardDescription>登録済みの車建て費用データ</CardDescription>
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
                      <TableHead>車種</TableHead>
                      <TableHead>車両番号</TableHead>
                      <TableHead>発地</TableHead>
                      <TableHead>着地</TableHead>
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
                          {record.workNo}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.carrierCode}
                        </TableCell>
                        <TableCell>{record.carrierName}</TableCell>
                        <TableCell>{record.vehicleType}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {record.vehicleNo}
                        </TableCell>
                        <TableCell>{record.departureName}</TableCell>
                        <TableCell>{record.arrivalName}</TableCell>
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
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(record)}
                            >
                              編集
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(record.id)}
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
              {selectedRecord ? "車建て費用編集" : "車建て費用新規登録"}
            </DialogTitle>
            <DialogDescription>
              車建て運送費用の詳細情報を入力してください
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="input-work-date">作業日 *</Label>
              <Input id="input-work-date" type="date" defaultValue={workDate} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-work-no">作業No</Label>
              <Input id="input-work-no" placeholder="自動採番" disabled />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="input-carrier">運送会社 *</Label>
              <div className="flex gap-2">
                <Input id="input-carrier" placeholder="C001" className="w-32" />
                <Input placeholder="運送会社名" className="flex-1" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-vehicle-type">車種 *</Label>
              <Select>
                <SelectTrigger id="input-vehicle-type">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2t">2tトラック</SelectItem>
                  <SelectItem value="4t">4tトラック</SelectItem>
                  <SelectItem value="10t">10tトラック</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-vehicle-no">車両番号 *</Label>
              <Input id="input-vehicle-no" placeholder="品川500あ1234" />
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
              <Label htmlFor="input-quantity">数量 *</Label>
              <Input id="input-quantity" type="number" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-unit-price">単価 *</Label>
              <Input id="input-unit-price" type="number" placeholder="45000" />
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
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
