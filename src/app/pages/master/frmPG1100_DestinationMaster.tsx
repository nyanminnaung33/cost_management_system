import { useState } from "react";
import { Plus, Edit, Trash2, Search, Save, X, MapPin } from "lucide-react";
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
import { Badge } from "../../components/ui/badge";

interface Destination {
  id: string;
  code: string;
  name: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  phone: string;
  fax: string;
  contactPerson: string;
  isActive: boolean;
}

export function DestinationMaster() {
  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState<"add" | "edit">("add");
  const [selectedRecord, setSelectedRecord] = useState<Destination | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [records, setRecords] = useState<Destination[]>([
    {
      id: "1",
      code: "LOC001",
      name: "東京物流センター",
      postalCode: "135-0064",
      prefecture: "東京都",
      city: "江東区",
      address: "青海2-4-32",
      phone: "03-1234-5678",
      fax: "03-1234-5679",
      contactPerson: "山田太郎",
      isActive: true,
    },
    {
      id: "2",
      code: "LOC002",
      name: "横浜倉庫",
      postalCode: "221-0056",
      prefecture: "神奈川県",
      city: "横浜市",
      address: "神奈川区金港町1-4",
      phone: "045-1234-5678",
      fax: "045-1234-5679",
      contactPerson: "佐藤花子",
      isActive: true,
    },
    {
      id: "3",
      code: "LOC003",
      name: "名古屋支店",
      postalCode: "450-0002",
      prefecture: "愛知県",
      city: "名古屋市",
      address: "中村区名駅4-5-28",
      phone: "052-1234-5678",
      fax: "052-1234-5679",
      contactPerson: "鈴木一郎",
      isActive: true,
    },
    {
      id: "4",
      code: "LOC004",
      name: "埼玉倉庫（旧）",
      postalCode: "330-0802",
      prefecture: "埼玉県",
      city: "さいたま市",
      address: "大宮区宮町1-5",
      phone: "048-1234-5678",
      fax: "048-1234-5679",
      contactPerson: "田中美咲",
      isActive: false,
    },
  ]);

  const [formData, setFormData] = useState<Partial<Destination>>({
    code: "",
    name: "",
    postalCode: "",
    prefecture: "",
    city: "",
    address: "",
    phone: "",
    fax: "",
    contactPerson: "",
    isActive: true,
  });

  const handleAdd = () => {
    setEditMode("add");
    setFormData({
      code: "",
      name: "",
      postalCode: "",
      prefecture: "",
      city: "",
      address: "",
      phone: "",
      fax: "",
      contactPerson: "",
      isActive: true,
    });
    setShowDialog(true);
  };

  const handleEdit = (record: Destination) => {
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
      const newRecord: Destination = {
        id: Date.now().toString(),
        ...formData as Destination,
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
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.prefecture.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">発着地マスタ</h1>
        <p className="text-gray-600 mt-1">
          frmPG1100 - Destination/Origin Master
        </p>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>発着地管理</CardTitle>
              <CardDescription>
                発着地情報を管理します
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
                placeholder="名称、コード、都道府県で検索..."
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
                  <TableHead>コード</TableHead>
                  <TableHead>名称</TableHead>
                  <TableHead>都道府県</TableHead>
                  <TableHead>市区町村</TableHead>
                  <TableHead>住所</TableHead>
                  <TableHead>電話番号</TableHead>
                  <TableHead>担当者</TableHead>
                  <TableHead>状態</TableHead>
                  <TableHead className="w-24">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-sm font-medium">
                      {record.code}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {record.name}
                      </div>
                    </TableCell>
                    <TableCell>{record.prefecture}</TableCell>
                    <TableCell>{record.city}</TableCell>
                    <TableCell className="text-sm">{record.address}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {record.phone}
                    </TableCell>
                    <TableCell>{record.contactPerson}</TableCell>
                    <TableCell>
                      {record.isActive ? (
                        <Badge className="bg-green-100 text-green-800">有効</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">無効</Badge>
                      )}
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
        </CardContent>
      </Card>

      {/* Edit/Add Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editMode === "add" ? "新規追加" : "編集"}
            </DialogTitle>
            <DialogDescription>
              発着地マスタの{editMode === "add" ? "登録" : "更新"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">発着地コード *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="bg-input-background"
                placeholder="LOC001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">名称 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-input-background"
                placeholder="東京物流センター"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">郵便番号</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                className="bg-input-background"
                placeholder="135-0064"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prefecture">都道府県 *</Label>
              <Select
                value={formData.prefecture}
                onValueChange={(value) =>
                  setFormData({ ...formData, prefecture: value })
                }
              >
                <SelectTrigger id="prefecture">
                  <SelectValue placeholder="選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="北海道">北海道</SelectItem>
                  <SelectItem value="東京都">東京都</SelectItem>
                  <SelectItem value="神奈川県">神奈川県</SelectItem>
                  <SelectItem value="埼玉県">埼玉県</SelectItem>
                  <SelectItem value="千葉県">千葉県</SelectItem>
                  <SelectItem value="愛知県">愛知県</SelectItem>
                  <SelectItem value="大阪府">大阪府</SelectItem>
                  <SelectItem value="福岡県">福岡県</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">市区町村 *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="bg-input-background"
                placeholder="江東区"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">住所 *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="bg-input-background"
                placeholder="青海2-4-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">電話番号</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="bg-input-background"
                placeholder="03-1234-5678"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fax">FAX番号</Label>
              <Input
                id="fax"
                value={formData.fax}
                onChange={(e) =>
                  setFormData({ ...formData, fax: e.target.value })
                }
                className="bg-input-background"
                placeholder="03-1234-5679"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson">担当者名</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) =>
                  setFormData({ ...formData, contactPerson: e.target.value })
                }
                className="bg-input-background"
                placeholder="山田太郎"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isActive">状態</Label>
              <Select
                value={formData.isActive ? "active" : "inactive"}
                onValueChange={(value) =>
                  setFormData({ ...formData, isActive: value === "active" })
                }
              >
                <SelectTrigger id="isActive">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">有効</SelectItem>
                  <SelectItem value="inactive">無効</SelectItem>
                </SelectContent>
              </Select>
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
