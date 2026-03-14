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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export function OtherProcessingInput() {
  const [records, setRecords] = useState<any[]>([]);
  const [workDate, setWorkDate] = useState("2026-03-11");

  const mockRecords = [
    {
      id: "1",
      workDate: "2026-03-11",
      processingType: "梱包資材",
      itemCode: "PKG-001",
      itemName: "段ボール箱(大)",
      quantity: 100,
      unitPrice: 300,
      amount: 30000,
    },
    {
      id: "2",
      workDate: "2026-03-11",
      processingType: "廃棄処理",
      itemCode: "DSP-001",
      itemName: "産業廃棄物処理",
      quantity: 5,
      unitPrice: 15000,
      amount: 75000,
    },
  ];

  const handleSearch = () => {
    setRecords(mockRecords);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">その他加工入力</h1>
        <p className="text-gray-600 mt-1">frmPG0520 - Other Processing Input</p>
      </div>

      <Tabs defaultValue="packaging" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="packaging">梱包資材</TabsTrigger>
          <TabsTrigger value="disposal">廃棄処理</TabsTrigger>
          <TabsTrigger value="moving">引越</TabsTrigger>
          <TabsTrigger value="relocation">移転</TabsTrigger>
          <TabsTrigger value="other">その他</TabsTrigger>
        </TabsList>

        <TabsContent value="packaging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>梱包資材費用入力</CardTitle>
              <CardDescription>梱包資材費用データを入力します</CardDescription>
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
                  <Label htmlFor="item-code">資材コード</Label>
                  <div className="flex gap-2">
                    <Input id="item-code" placeholder="PKG-001" />
                    <Button variant="outline" size="icon">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">数量</Label>
                  <Input id="quantity" type="number" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit-price">単価</Label>
                  <Input id="unit-price" type="number" placeholder="300" />
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
        </TabsContent>

        <TabsContent value="disposal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>廃棄処理費用入力</CardTitle>
              <CardDescription>廃棄処理費用データを入力します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="disposal-date">処理日</Label>
                  <Input id="disposal-date" type="date" value={workDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disposal-type">処理種別</Label>
                  <Select>
                    <SelectTrigger id="disposal-type">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="industrial">産業廃棄物</SelectItem>
                      <SelectItem value="general">一般廃棄物</SelectItem>
                      <SelectItem value="recyclable">リサイクル</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disposal-quantity">数量</Label>
                  <Input id="disposal-quantity" type="number" placeholder="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disposal-price">単価</Label>
                  <Input id="disposal-price" type="number" placeholder="15000" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button>
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
        </TabsContent>

        <TabsContent value="moving" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>引越費用入力</CardTitle>
              <CardDescription>引越費用データを入力します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="moving-date">引越日</Label>
                  <Input id="moving-date" type="date" value={workDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moving-from">引越元</Label>
                  <Input id="moving-from" placeholder="住所" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moving-to">引越先</Label>
                  <Input id="moving-to" placeholder="住所" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moving-amount">費用</Label>
                  <Input id="moving-amount" type="number" placeholder="50000" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button>
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
        </TabsContent>

        <TabsContent value="relocation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>移転費用入力</CardTitle>
              <CardDescription>移転費用データを入力します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="relocation-date">移転日</Label>
                  <Input id="relocation-date" type="date" value={workDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relocation-type">移転種別</Label>
                  <Select>
                    <SelectTrigger id="relocation-type">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">事務所移転</SelectItem>
                      <SelectItem value="warehouse">倉庫移転</SelectItem>
                      <SelectItem value="facility">施設移転</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relocation-contractor">業者</Label>
                  <Input id="relocation-contractor" placeholder="業者名" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relocation-amount">費用</Label>
                  <Input id="relocation-amount" type="number" placeholder="500000" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button>
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
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>その他費用入力</CardTitle>
              <CardDescription>その他の費用データを入力します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="other-date">処理日</Label>
                  <Input id="other-date" type="date" value={workDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="other-description">内容</Label>
                  <Input id="other-description" placeholder="費用内容" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="other-quantity">数量</Label>
                  <Input id="other-quantity" type="number" placeholder="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="other-amount">金額</Label>
                  <Input id="other-amount" type="number" placeholder="10000" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button>
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
        </TabsContent>
      </Tabs>

      {records.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>その他費用一覧</CardTitle>
            <CardDescription>
              合計金額: ¥{records.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>作業日</TableHead>
                    <TableHead>処理種別</TableHead>
                    <TableHead>項目コード</TableHead>
                    <TableHead>項目名</TableHead>
                    <TableHead className="text-right">数量</TableHead>
                    <TableHead className="text-right">単価</TableHead>
                    <TableHead className="text-right">金額</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">
                        {record.workDate}
                      </TableCell>
                      <TableCell>{record.processingType}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {record.itemCode}
                      </TableCell>
                      <TableCell>{record.itemName}</TableCell>
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
      )}
    </div>
  );
}
