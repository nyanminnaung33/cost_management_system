import { useState } from "react";
import { Save, Plus, Search, Package } from "lucide-react";
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
import { Textarea } from "../../components/ui/textarea";

export function DeliveryRequestInput() {
  const [records, setRecords] = useState<any[]>([]);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("2026-03-12");

  const mockRecords = [
    {
      id: "1",
      requestNo: "DL-2026-0312-001",
      requestDate: "2026-03-11",
      deliveryDate: "2026-03-12",
      customerCode: "CU001",
      customerName: "株式会社山田商事",
      departureAddress: "東京都港区",
      arrivalAddress: "大阪府大阪市",
      cargoType: "パレット",
      quantity: 10,
      status: "受付済",
    },
    {
      id: "2",
      requestNo: "DL-2026-0312-002",
      requestDate: "2026-03-11",
      deliveryDate: "2026-03-12",
      customerCode: "CU002",
      customerName: "田中物産株式会社",
      departureAddress: "神奈川県横浜市",
      arrivalAddress: "愛知県名古屋市",
      cargoType: "カートン",
      quantity: 25,
      status: "受付済",
    },
  ];

  const handleSearch = () => {
    setRecords(mockRecords);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">配送依頼入力</h1>
        <p className="text-gray-600 mt-1">frmPG1000 - Delivery Request Input</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>検索条件</CardTitle>
          <CardDescription>配送依頼データを検索します</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="delivery-date">配送日</Label>
              <Input
                id="delivery-date"
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="request-no">依頼No</Label>
              <Input id="request-no" placeholder="DL-2026-0312-001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer">顧客コード</Label>
              <div className="flex gap-2">
                <Input id="customer" placeholder="CU001" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">ステータス</Label>
              <Select defaultValue="all">
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  <SelectItem value="received">受付済</SelectItem>
                  <SelectItem value="assigned">配車済</SelectItem>
                  <SelectItem value="completed">完了</SelectItem>
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
              新規依頼登録
            </Button>
          </div>
        </CardContent>
      </Card>

      {records.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>配送依頼一覧 ({records.length}件)</CardTitle>
                <CardDescription>登録済みの配送依頼データ</CardDescription>
              </div>
              <Package className="w-8 h-8 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>依頼No</TableHead>
                    <TableHead>依頼日</TableHead>
                    <TableHead>配送日</TableHead>
                    <TableHead>顧客コード</TableHead>
                    <TableHead>顧客名</TableHead>
                    <TableHead>発送元</TableHead>
                    <TableHead>配送先</TableHead>
                    <TableHead>貨物種別</TableHead>
                    <TableHead className="text-right">数量</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">
                        {record.requestNo}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {record.requestDate}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {record.deliveryDate}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {record.customerCode}
                      </TableCell>
                      <TableCell>{record.customerName}</TableCell>
                      <TableCell className="text-sm">
                        {record.departureAddress}
                      </TableCell>
                      <TableCell className="text-sm">
                        {record.arrivalAddress}
                      </TableCell>
                      <TableCell>{record.cargoType}</TableCell>
                      <TableCell className="text-right font-mono">
                        {record.quantity}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {record.status}
                        </span>
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

      <Dialog open={showInputDialog} onOpenChange={setShowInputDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>配送依頼新規登録</DialogTitle>
            <DialogDescription>
              配送依頼の詳細情報を入力してください
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="input-request-date">依頼日 *</Label>
              <Input id="input-request-date" type="date" defaultValue="2026-03-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-delivery-date">配送希望日 *</Label>
              <Input id="input-delivery-date" type="date" defaultValue={deliveryDate} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="input-customer">顧客 *</Label>
              <div className="flex gap-2">
                <Input id="input-customer" placeholder="CU001" className="w-32" />
                <Input placeholder="顧客名" className="flex-1" />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="input-departure-address">発送元住所 *</Label>
              <Input
                id="input-departure-address"
                placeholder="東京都港区..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-departure-contact">発送元担当者</Label>
              <Input id="input-departure-contact" placeholder="山田太郎" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-departure-tel">発送元電話番号</Label>
              <Input id="input-departure-tel" placeholder="03-1234-5678" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="input-arrival-address">配送先住所 *</Label>
              <Input
                id="input-arrival-address"
                placeholder="大阪府大阪市..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-arrival-contact">配送先担当者</Label>
              <Input id="input-arrival-contact" placeholder="田中花子" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-arrival-tel">配送先電話番号</Label>
              <Input id="input-arrival-tel" placeholder="06-1234-5678" />
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
              <Label htmlFor="input-quantity">数量 *</Label>
              <Input id="input-quantity" type="number" placeholder="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-weight">重量(kg)</Label>
              <Input id="input-weight" type="number" placeholder="500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-volume">容積(m³)</Label>
              <Input id="input-volume" type="number" step="0.1" placeholder="5.0" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="input-remarks">備考</Label>
              <Textarea id="input-remarks" placeholder="特記事項があれば記入してください" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInputDialog(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setShowInputDialog(false)}>
              <Save className="w-4 h-4 mr-2" />
              登録
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
