import { useState } from "react";
import { Plus, Edit, Trash2, Search, Save, X } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../components/ui/pagination";

interface PriceMaster {
  id: string;
  effectiveDate: string;
  shipperCode: string;
  shipperName: string;
  originCode: string;
  originName: string;
  destinationCode: string;
  destinationName: string;
  vehicleType: string;
  unitPrice: number;
  remarks: string;
}

export function TransportCostMaster() {
  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState<"add" | "edit">("add");
  const [selectedRecord, setSelectedRecord] = useState<PriceMaster | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [records, setRecords] = useState<PriceMaster[]>([
    {
      id: "1",
      effectiveDate: "2026-01-01",
      shipperCode: "S001",
      shipperName: "日本運輸株式会社",
      originCode: "LOC001",
      originName: "東京物流センター",
      destinationCode: "LOC002",
      destinationName: "横浜倉庫",
      vehicleType: "4tトラック",
      unitPrice: 55000,
      remarks: "",
    },
    {
      id: "2",
      effectiveDate: "2026-01-01",
      shipperCode: "S001",
      shipperName: "日本運輸株式会社",
      originCode: "LOC001",
      originName: "東京物流センター",
      destinationCode: "LOC003",
      destinationName: "名古屋支店",
      vehicleType: "10tトラック",
      unitPrice: 125000,
      remarks: "",
    },
    {
      id: "3",
      effectiveDate: "2026-02-01",
      shipperCode: "S002",
      shipperName: "関東物流センター",
      originCode: "LOC004",
      originName: "埼玉倉庫",
      destinationCode: "LOC005",
      destinationName: "千葉配送センター",
      vehicleType: "2tトラック",
      unitPrice: 35000,
      remarks: "通常配送",
    },
  ]);

  const [formData, setFormData] = useState<Partial<PriceMaster>>({
    effectiveDate: "",
    shipperCode: "",
    shipperName: "",
    originCode: "",
    originName: "",
    destinationCode: "",
    destinationName: "",
    vehicleType: "",
    unitPrice: 0,
    remarks: "",
  });

  const handleAdd = () => {
    setEditMode("add");
    setFormData({
      effectiveDate: new Date().toISOString().split("T")[0],
      shipperCode: "",
      shipperName: "",
      originCode: "",
      originName: "",
      destinationCode: "",
      destinationName: "",
      vehicleType: "",
      unitPrice: 0,
      remarks: "",
    });
    setShowDialog(true);
  };

  const handleEdit = (record: PriceMaster) => {
    setEditMode("edit");
    setSelectedRecord(record);
    setFormData(record);
    setShowDialog(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("このレコードを削除してもよろしいですか？")) {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  const handleSave = () => {
    if (editMode === "add") {
      const newRecord: PriceMaster = {
        id: Date.now().toString(),
        ...formData as PriceMaster,
      };
      setRecords([...records, newRecord]);
    } else if (editMode === "edit" && selectedRecord) {
      setRecords(
        records.map((r) =>
          r.id === selectedRecord.id ? { ...r, ...formData } : r
        )
      );
    }
    setShowDialog(false);
  };

  const filteredRecords = records.filter(
    (record) =>
      record.shipperName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.shipperCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.originName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.destinationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">運送費用原価マスタ</h1>
        <p className="text-gray-600 mt-1">
          frmPG0100 - Transport Cost Price Master
        </p>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>マスタ管理</CardTitle>
              <CardDescription>
                運送費用の原価マスタを管理します
              </CardDescription>
            </div>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              新規追加
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="荷主名、発着地で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input-background"
              />
            </div>
            <Button variant="outline">
              検索条件クリア
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Master Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>登録データ一覧</CardTitle>
          <CardDescription>
            全{filteredRecords.length}件のレコード
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>適用日</TableHead>
                  <TableHead>荷主コード</TableHead>
                  <TableHead>荷主名</TableHead>
                  <TableHead>発地</TableHead>
                  <TableHead>着地</TableHead>
                  <TableHead>車種</TableHead>
                  <TableHead className="text-right">単価</TableHead>
                  <TableHead>備考</TableHead>
                  <TableHead className="w-24">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-sm">
                      {record.effectiveDate}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {record.shipperCode}
                    </TableCell>
                    <TableCell>{record.shipperName}</TableCell>
                    <TableCell className="text-sm">
                      <div>{record.originName}</div>
                      <div className="text-xs text-gray-500">{record.originCode}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{record.destinationName}</div>
                      <div className="text-xs text-gray-500">
                        {record.destinationCode}
                      </div>
                    </TableCell>
                    <TableCell>{record.vehicleType}</TableCell>
                    <TableCell className="text-right font-mono">
                      ¥{record.unitPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {record.remarks}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(record)}
                        >
                          <Edit className="w-4 h-4" />
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

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* Edit/Add Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editMode === "add" ? "新規追加" : "編集"}
            </DialogTitle>
            <DialogDescription>
              運送費用原価マスタの{editMode === "add" ? "登録" : "更新"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">適用日</Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) =>
                  setFormData({ ...formData, effectiveDate: e.target.value })
                }
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipperCode">荷主コード</Label>
              <div className="flex gap-2">
                <Input
                  id="shipperCode"
                  value={formData.shipperCode}
                  onChange={(e) =>
                    setFormData({ ...formData, shipperCode: e.target.value })
                  }
                  className="bg-input-background"
                />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="shipperName">荷主名</Label>
              <Input
                id="shipperName"
                value={formData.shipperName}
                onChange={(e) =>
                  setFormData({ ...formData, shipperName: e.target.value })
                }
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="originCode">発地コード</Label>
              <div className="flex gap-2">
                <Input
                  id="originCode"
                  value={formData.originCode}
                  onChange={(e) =>
                    setFormData({ ...formData, originCode: e.target.value })
                  }
                  className="bg-input-background"
                />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="originName">発地名</Label>
              <Input
                id="originName"
                value={formData.originName}
                onChange={(e) =>
                  setFormData({ ...formData, originName: e.target.value })
                }
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destinationCode">着地コード</Label>
              <div className="flex gap-2">
                <Input
                  id="destinationCode"
                  value={formData.destinationCode}
                  onChange={(e) =>
                    setFormData({ ...formData, destinationCode: e.target.value })
                  }
                  className="bg-input-background"
                />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destinationName">着地名</Label>
              <Input
                id="destinationName"
                value={formData.destinationName}
                onChange={(e) =>
                  setFormData({ ...formData, destinationName: e.target.value })
                }
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">車種</Label>
              <Select
                value={formData.vehicleType}
                onValueChange={(value) =>
                  setFormData({ ...formData, vehicleType: value })
                }
              >
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder="選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2tトラック">2tトラック</SelectItem>
                  <SelectItem value="4tトラック">4tトラック</SelectItem>
                  <SelectItem value="10tトラック">10tトラック</SelectItem>
                  <SelectItem value="トレーラー">トレーラー</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitPrice">単価</Label>
              <Input
                id="unitPrice"
                type="number"
                value={formData.unitPrice}
                onChange={(e) =>
                  setFormData({ ...formData, unitPrice: parseInt(e.target.value) || 0 })
                }
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="remarks">備考</Label>
              <Input
                id="remarks"
                value={formData.remarks}
                onChange={(e) =>
                  setFormData({ ...formData, remarks: e.target.value })
                }
                className="bg-input-background"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              <X className="w-4 h-4 mr-2" />
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
