import { useState } from "react";
import { CheckCircle2, Download, FileCheck, Archive } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function TemporaryOverseasCostPriceComparison() {
  const [targetMonth, setTargetMonth] = useState("2026-03");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">海外費用仮インポート原価照合</h1>
        <p className="text-gray-600 mt-1">frmPG0322 - Temporary Overseas Cost Price Comparison</p>
      </div>

      {/* Comparison Settings */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Archive className="w-5 h-5 text-orange-600" />
              仮データ照合設定
            </div>
          </CardTitle>
          <CardDescription>
            海外費用仮インポートデータと原価マスタを照合します
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target-month">対象年月</Label>
              <Input
                id="target-month"
                type="month"
                value={targetMonth}
                onChange={(e) => setTargetMonth(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">仕入先</Label>
              <Select defaultValue="all">
                <SelectTrigger id="supplier">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全仕入先</SelectItem>
                  <SelectItem value="os001">Shanghai Freight Co.</SelectItem>
                  <SelectItem value="os002">Singapore Logistics</SelectItem>
                  <SelectItem value="os003">Hong Kong Shipping</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost-type">費用種別</Label>
              <Select defaultValue="all">
                <SelectTrigger id="cost-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全費用種別</SelectItem>
                  <SelectItem value="freight">海上運賃</SelectItem>
                  <SelectItem value="port">港湾費用</SelectItem>
                  <SelectItem value="customs">通関費用</SelectItem>
                  <SelectItem value="insurance">保険料</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button>
              <FileCheck className="w-4 h-4 mr-2" />
              照合実行
            </Button>
            <Button variant="outline">
              キャンセル
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for results */}
      <Card>
        <CardHeader>
          <CardTitle>照合結果</CardTitle>
          <CardDescription>
            照合実行後、結果がここに表示されます
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Archive className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>照合を実行してください</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
