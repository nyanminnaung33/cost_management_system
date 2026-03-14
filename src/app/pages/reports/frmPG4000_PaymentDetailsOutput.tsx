import { useState } from "react";
import {
  FileText,
  Download,
  Printer,
  Calendar,
  Filter,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export function PaymentDetailsOutput() {
  const [outputCriteria, setOutputCriteria] = useState({
    startDate: "2026-03-01",
    endDate: "2026-03-11",
    shipperCode: "",
    outputFormat: "pdf",
    includeSummary: true,
    includeDetails: true,
  });

  const mockPaymentData = [
    {
      paymentNo: "PAY-2026-03-001",
      paymentDate: "2026-03-10",
      shipperCode: "S001",
      shipperName: "日本運輸株式会社",
      items: 15,
      totalAmount: 1875000,
    },
    {
      paymentNo: "PAY-2026-03-002",
      paymentDate: "2026-03-10",
      shipperCode: "S002",
      shipperName: "関東物流センター",
      items: 8,
      totalAmount: 720000,
    },
    {
      paymentNo: "PAY-2026-03-003",
      paymentDate: "2026-03-10",
      shipperCode: "S003",
      shipperName: "中部トランスポート",
      items: 12,
      totalAmount: 1560000,
    },
  ];

  const handleOutput = () => {
    console.log(
      "Generating output with criteria:",
      outputCriteria,
    );
    alert("帳票を出力しました");
  };

  const handlePreview = () => {
    console.log("Previewing report...");
    alert("プレビュー機能");
  };

  const totalItems = mockPaymentData.reduce(
    (sum, p) => sum + p.items,
    0,
  );
  const grandTotal = mockPaymentData.reduce(
    (sum, p) => sum + p.totalAmount,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          支払明細出力
        </h1>
        <p className="text-gray-600 mt-1">
          frmPG4000 - Payment Details Output
        </p>
      </div>

      {/* Output Criteria */}
      <Card>
        <CardHeader>
          <CardTitle>出力条件</CardTitle>
          <CardDescription>
            帳票の出力条件を指定してください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">支払日（開始）</Label>
              <div className="flex gap-2">
                <Input
                  id="startDate"
                  type="date"
                  value={outputCriteria.startDate}
                  onChange={(e) =>
                    setOutputCriteria({
                      ...outputCriteria,
                      startDate: e.target.value,
                    })
                  }
                  className="bg-input-background"
                />
                <Button variant="outline" size="icon">
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">支払日（終了）</Label>
              <div className="flex gap-2">
                <Input
                  id="endDate"
                  type="date"
                  value={outputCriteria.endDate}
                  onChange={(e) =>
                    setOutputCriteria({
                      ...outputCriteria,
                      endDate: e.target.value,
                    })
                  }
                  className="bg-input-background"
                />
                <Button variant="outline" size="icon">
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipperCode">荷主コード</Label>
              <Input
                id="shipperCode"
                value={outputCriteria.shipperCode}
                onChange={(e) =>
                  setOutputCriteria({
                    ...outputCriteria,
                    shipperCode: e.target.value,
                  })
                }
                className="bg-input-background"
                placeholder="すべて"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="outputFormat">出力形式</Label>
              <Select
                value={outputCriteria.outputFormat}
                onValueChange={(value) =>
                  setOutputCriteria({
                    ...outputCriteria,
                    outputFormat: value,
                  })
                }
              >
                <SelectTrigger id="outputFormat">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>出力オプション</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="includeSummary"
                    checked={outputCriteria.includeSummary}
                    onCheckedChange={(checked) =>
                      setOutputCriteria({
                        ...outputCriteria,
                        includeSummary: !!checked,
                      })
                    }
                  />
                  <label
                    htmlFor="includeSummary"
                    className="text-sm cursor-pointer"
                  >
                    集計表を含む
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="includeDetails"
                    checked={outputCriteria.includeDetails}
                    onCheckedChange={(checked) =>
                      setOutputCriteria({
                        ...outputCriteria,
                        includeDetails: !!checked,
                      })
                    }
                  />
                  <label
                    htmlFor="includeDetails"
                    className="text-sm cursor-pointer"
                  >
                    明細を含む
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleOutput}>
              <FileText className="w-4 h-4 mr-2" />
              出力実行
            </Button>
            <Button variant="outline" onClick={handlePreview}>
              プレビュー
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              条件クリア
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Data */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>出力プレビュー</CardTitle>
              <CardDescription>
                出力対象データ: {mockPaymentData.length}件
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                ダウンロード
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="w-4 h-4 mr-2" />
                印刷
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>支払番号</TableHead>
                  <TableHead>支払日</TableHead>
                  <TableHead>荷主コード</TableHead>
                  <TableHead>荷主名</TableHead>
                  <TableHead className="text-right">
                    明細件数
                  </TableHead>
                  <TableHead className="text-right">
                    支払金額
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPaymentData.map((payment) => (
                  <TableRow key={payment.paymentNo}>
                    <TableCell className="font-mono text-sm">
                      {payment.paymentNo}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {payment.paymentDate}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {payment.shipperCode}
                    </TableCell>
                    <TableCell>{payment.shipperName}</TableCell>
                    <TableCell className="text-right">
                      {payment.items}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ¥{payment.totalAmount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-gray-50 font-semibold">
                  <TableCell colSpan={4} className="text-right">
                    合計
                  </TableCell>
                  <TableCell className="text-right">
                    {totalItems}
                  </TableCell>
                  <TableCell className="text-right font-mono text-lg">
                    ¥{grandTotal.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Output History */}
      <Card>
        <CardHeader>
          <CardTitle>出力履歴</CardTitle>
          <CardDescription>過去の出力履歴</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              {
                date: "2026-03-10 14:30",
                fileName: "支払明細_2026-03.pdf",
                user: "山田太郎",
              },
              {
                date: "2026-03-09 11:15",
                fileName: "支払明細_2026-03.pdf",
                user: "佐藤花子",
              },
              {
                date: "2026-03-08 16:45",
                fileName: "支払明細_2026-02.xlsx",
                user: "鈴木一郎",
              },
            ].map((history, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">
                      {history.fileName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {history.date} - {history.user}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}