import { useState } from "react";
import { CheckCircle2, AlertTriangle, FileCheck } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";

export function DrayageComparison() {
  const [targetMonth, setTargetMonth] = useState("2026-03");
  const [records, setRecords] = useState<any[]>([]);

  const mockRecords = [
    {
      id: "1",
      workDate: "2026-03-11",
      containerNo: "CONT-2026-001",
      portCode: "TYO",
      portName: "東京港",
      drayageCompany: "東京ドレージ株式会社",
      actualCost: 35000,
      masterCost: 35000,
      difference: 0,
      status: "match",
      selected: false,
    },
    {
      id: "2",
      workDate: "2026-03-11",
      containerNo: "CONT-2026-002",
      portCode: "YOK",
      portName: "横浜港",
      drayageCompany: "関東ドレージ",
      actualCost: 42000,
      masterCost: 40000,
      difference: 2000,
      status: "mismatch",
      selected: false,
    },
  ];

  const handleCompare = () => {
    setRecords(mockRecords);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">ドレージ照合</h1>
        <p className="text-gray-600 mt-1">frmPG0231 - Drayage Comparison</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>照合条件</CardTitle>
          <CardDescription>ドレージ費用を照合します</CardDescription>
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
              <Label htmlFor="port">港コード</Label>
              <Input id="port" placeholder="TYO" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="container">コンテナNo</Label>
              <Input id="container" placeholder="CONT-2026-001" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCompare}>
              <FileCheck className="w-4 h-4 mr-2" />
              照合実行
            </Button>
          </div>
        </CardContent>
      </Card>

      {records.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>ドレージ照合結果</CardTitle>
            <CardDescription>差異を確認してください</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead className="w-12">状態</TableHead>
                    <TableHead>作業日</TableHead>
                    <TableHead>コンテナNo</TableHead>
                    <TableHead>港コード</TableHead>
                    <TableHead>港名</TableHead>
                    <TableHead>ドレージ会社</TableHead>
                    <TableHead className="text-right">実原価</TableHead>
                    <TableHead className="text-right">マスタ原価</TableHead>
                    <TableHead className="text-right">差異</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id} className={record.status === "mismatch" ? "bg-orange-50" : ""}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        {record.status === "match" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="w-4 h-4" />
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            <AlertTriangle className="w-4 h-4" />
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-sm">{record.workDate}</TableCell>
                      <TableCell className="font-mono text-sm">{record.containerNo}</TableCell>
                      <TableCell className="font-mono text-sm">{record.portCode}</TableCell>
                      <TableCell>{record.portName}</TableCell>
                      <TableCell>{record.drayageCompany}</TableCell>
                      <TableCell className="text-right font-mono">
                        ¥{record.actualCost.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        ¥{record.masterCost.toLocaleString()}
                      </TableCell>
                      <TableCell className={`text-right font-mono ${record.difference !== 0 ? 'font-semibold bg-orange-100' : ''}`}>
                        {record.difference !== 0 && (record.difference > 0 ? '+' : '')}
                        {record.difference !== 0 && `¥${record.difference.toLocaleString()}`}
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
