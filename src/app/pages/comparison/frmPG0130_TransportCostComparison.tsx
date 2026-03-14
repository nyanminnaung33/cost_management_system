  import { useState } from "react";
  import { Search, CheckCircle2, XCircle, AlertCircle, Filter } from "lucide-react";
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
  import { Checkbox } from "../../components/ui/checkbox";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../components/ui/select";
  import { Badge } from "../../components/ui/badge";
  
  interface ComparisonRecord {
    id: string;
    invoiceNo: string;
    workDate: string;
    shipperCode: string;
    shipperName: string;
    costAmount: number;
    actualAmount: number;
    difference: number;
    status: "matched" | "unmatched" | "pending";
    selected: boolean;
  }
  
  export function TransportCostComparison() {
    const [searchCriteria, setSearchCriteria] = useState({
      startDate: "2026-03-01",
      endDate: "2026-03-11",
      shipperCode: "",
      status: "all",
    });
  
    const [records, setRecords] = useState<ComparisonRecord[]>([
      {
        id: "1",
        invoiceNo: "INV-2026-0310-001",
        workDate: "2026-03-10",
        shipperCode: "S001",
        shipperName: "日本運輸株式会社",
        costAmount: 125000,
        actualAmount: 125000,
        difference: 0,
        status: "matched",
        selected: false,
      },
      {
        id: "2",
        invoiceNo: "INV-2026-0310-002",
        workDate: "2026-03-10",
        shipperCode: "S002",
        shipperName: "関東物流センター",
        costAmount: 87500,
        actualAmount: 90000,
        difference: 2500,
        status: "unmatched",
        selected: false,
      },
      {
        id: "3",
        invoiceNo: "INV-2026-0310-003",
        workDate: "2026-03-10",
        shipperCode: "S003",
        shipperName: "中部トランスポート",
        costAmount: 156000,
        actualAmount: 156000,
        difference: 0,
        status: "matched",
        selected: false,
      },
      {
        id: "4",
        invoiceNo: "INV-2026-0310-004",
        workDate: "2026-03-10",
        shipperCode: "S001",
        shipperName: "日本運輸株式会社",
        costAmount: 98000,
        actualAmount: 0,
        difference: -98000,
        status: "pending",
        selected: false,
      },
      {
        id: "5",
        invoiceNo: "INV-2026-0310-005",
        workDate: "2026-03-10",
        shipperCode: "S004",
        shipperName: "西日本配送",
        costAmount: 210000,
        actualAmount: 205000,
        difference: -5000,
        status: "unmatched",
        selected: false,
      },
    ]);
  
    const handleSearch = () => {
      console.log("Searching with criteria:", searchCriteria);
    };
  
    const handleSelectAll = (checked: boolean) => {
      setRecords(records.map((r) => ({ ...r, selected: checked })));
    };
  
    const handleSelectRecord = (id: string, checked: boolean) => {
      setRecords(
        records.map((r) => (r.id === id ? { ...r, selected: checked } : r))
      );
    };
  
    const handleConfirm = () => {
      const selectedRecords = records.filter((r) => r.selected);
      if (selectedRecords.length === 0) {
        alert("レコードを選択してください");
        return;
      }
      console.log("Confirming records:", selectedRecords);
      alert(`${selectedRecords.length}件のレコードを確定しました`);
    };
  
    const matchedCount = records.filter((r) => r.status === "matched").length;
    const unmatchedCount = records.filter((r) => r.status === "unmatched").length;
    const pendingCount = records.filter((r) => r.status === "pending").length;
    const selectedCount = records.filter((r) => r.selected).length;
  
    const getStatusIcon = (status: string) => {
      switch (status) {
        case "matched":
          return <CheckCircle2 className="w-5 h-5 text-green-600" />;
        case "unmatched":
          return <XCircle className="w-5 h-5 text-red-600" />;
        case "pending":
          return <AlertCircle className="w-5 h-5 text-orange-600" />;
        default:
          return null;
      }
    };
  
    const getStatusBadge = (status: string) => {
      switch (status) {
        case "matched":
          return <Badge className="bg-green-100 text-green-800">一致</Badge>;
        case "unmatched":
          return <Badge className="bg-red-100 text-red-800">不一致</Badge>;
        case "pending":
          return <Badge className="bg-orange-100 text-orange-800">保留</Badge>;
        default:
          return null;
      }
    };
  
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">運送費用原価照合</h1>
          <p className="text-gray-600 mt-1">
            frmPG0130 - Transport Cost Comparison
          </p>
        </div>
  
        {/* Search Criteria */}
        <Card>
          <CardHeader>
            <CardTitle>検索条件</CardTitle>
            <CardDescription>照合するデータの条件を指定してください</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">作業日（開始）</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={searchCriteria.startDate}
                  onChange={(e) =>
                    setSearchCriteria({ ...searchCriteria, startDate: e.target.value })
                  }
                  className="bg-input-background"
                />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="endDate">作業日（終了）</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={searchCriteria.endDate}
                  onChange={(e) =>
                    setSearchCriteria({ ...searchCriteria, endDate: e.target.value })
                  }
                  className="bg-input-background"
                />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="shipperCode">荷主コード</Label>
                <div className="flex gap-2">
                  <Input
                    id="shipperCode"
                    value={searchCriteria.shipperCode}
                    onChange={(e) =>
                      setSearchCriteria({ ...searchCriteria, shipperCode: e.target.value })
                    }
                    className="bg-input-background"
                    placeholder="すべて"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="statusFilter">状態</Label>
                <Select
                  value={searchCriteria.status}
                  onValueChange={(value) =>
                    setSearchCriteria({ ...searchCriteria, status: value })
                  }
                >
                  <SelectTrigger id="statusFilter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="matched">一致</SelectItem>
                    <SelectItem value="unmatched">不一致</SelectItem>
                    <SelectItem value="pending">保留</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
  
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                検索
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                条件クリア
              </Button>
            </div>
          </CardContent>
        </Card>
  
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>総件数</CardDescription>
              <CardTitle className="text-2xl">{records.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>一致</CardDescription>
              <CardTitle className="text-2xl text-green-600">{matchedCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>不一致</CardDescription>
              <CardTitle className="text-2xl text-red-600">{unmatchedCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>保留</CardDescription>
              <CardTitle className="text-2xl text-orange-600">{pendingCount}</CardTitle>
            </CardHeader>
          </Card>
        </div>
  
        {/* Comparison Results */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>照合結果</CardTitle>
                <CardDescription>
                  選択中: {selectedCount}件
                </CardDescription>
              </div>
              <Button onClick={handleConfirm} disabled={selectedCount === 0}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                照合確定
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={records.every((r) => r.selected)}
                        onCheckedChange={(checked) => handleSelectAll(!!checked)}
                      />
                    </TableHead>
                    <TableHead className="w-12">状態</TableHead>
                    <TableHead>送り状No</TableHead>
                    <TableHead>作業日</TableHead>
                    <TableHead>荷主コード</TableHead>
                    <TableHead>荷主名</TableHead>
                    <TableHead className="text-right">原価金額</TableHead>
                    <TableHead className="text-right">実績金額</TableHead>
                    <TableHead className="text-right">差額</TableHead>
                    <TableHead>判定</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow
                      key={record.id}
                      className={record.selected ? "bg-blue-50" : ""}
                    >
                      <TableCell>
                        <Checkbox
                          checked={record.selected}
                          onCheckedChange={(checked) =>
                            handleSelectRecord(record.id, !!checked)
                          }
                        />
                      </TableCell>
                      <TableCell>{getStatusIcon(record.status)}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {record.invoiceNo}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {record.workDate}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {record.shipperCode}
                      </TableCell>
                      <TableCell>{record.shipperName}</TableCell>
                      <TableCell className="text-right font-mono">
                        ¥{record.costAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        ¥{record.actualAmount.toLocaleString()}
                      </TableCell>
                      <TableCell
                        className={`text-right font-mono ${
                          record.difference > 0
                            ? "text-red-600"
                            : record.difference < 0
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      >
                        {record.difference !== 0 &&
                          (record.difference > 0 ? "+" : "")}
                        {record.difference !== 0 &&
                          `¥${record.difference.toLocaleString()}`}
                        {record.difference === 0 && "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
