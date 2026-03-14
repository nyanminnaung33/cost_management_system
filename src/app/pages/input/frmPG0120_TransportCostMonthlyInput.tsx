import { useState } from "react";
import { Save, Search, Plus, Trash2, Calendar } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Textarea } from "../../components/ui/textarea";

interface MonthlyVehicle {
  id: string;
  vehicleType: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  remarks: string;
}

export function TransportCostMonthlyInput() {
  const [formData, setFormData] = useState({
    imeKaishaCode: "0001",
    imeNengetu: "2026-03",
    imeShipperCode: "",
    imeShipperName: "",
    imeDestinationCode: "",
    imeDestinationName: "",
    imeRemarks: "",
  });

  const [vehicles, setVehicles] = useState<MonthlyVehicle[]>([
    {
      id: "1",
      vehicleType: "2tトラック",
      quantity: 10,
      unitPrice: 35000,
      amount: 350000,
      remarks: "",
    },
    {
      id: "2",
      vehicleType: "4tトラック",
      quantity: 5,
      unitPrice: 55000,
      amount: 275000,
      remarks: "",
    },
  ]);

  const handleAddVehicle = () => {
    const newVehicle: MonthlyVehicle = {
      id: Date.now().toString(),
      vehicleType: "",
      quantity: 0,
      unitPrice: 0,
      amount: 0,
      remarks: "",
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const handleVehicleChange = (
    id: string,
    field: keyof MonthlyVehicle,
    value: string | number
  ) => {
    setVehicles(
      vehicles.map((v) => {
        if (v.id === id) {
          const updated = { ...v, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updated.amount = updated.quantity * updated.unitPrice;
          }
          return updated;
        }
        return v;
      })
    );
  };

  const totalAmount = vehicles.reduce((sum, v) => sum + v.amount, 0);

  const handleSave = () => {
    console.log("Saving data:", { formData, vehicles });
    alert("データを保存しました");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">運送費用月極車入力</h1>
        <p className="text-gray-600 mt-1">
          frmPG0120 - Transport Cost Monthly Vehicle Input
        </p>
      </div>

      {/* Header Information */}
      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
          <CardDescription>月極車費用の基本情報を入力してください</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="imeKaishaCode">会社コード</Label>
              <div className="flex gap-2">
                <Input
                  id="imeKaishaCode"
                  value={formData.imeKaishaCode}
                  onChange={(e) =>
                    setFormData({ ...formData, imeKaishaCode: e.target.value })
                  }
                  className="bg-input-background"
                />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imeNengetu">対象年月</Label>
              <div className="flex gap-2">
                <Input
                  id="imeNengetu"
                  type="month"
                  value={formData.imeNengetu}
                  onChange={(e) =>
                    setFormData({ ...formData, imeNengetu: e.target.value })
                  }
                  className="bg-input-background"
                />
                <Button variant="outline" size="icon">
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imeShipperCode">荷主コード</Label>
              <div className="flex gap-2">
                <Input
                  id="imeShipperCode"
                  value={formData.imeShipperCode}
                  onChange={(e) =>
                    setFormData({ ...formData, imeShipperCode: e.target.value })
                  }
                  className="bg-input-background"
                  placeholder="荷主コードを入力"
                />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imeShipperName">荷主名</Label>
              <Input
                id="imeShipperName"
                value={formData.imeShipperName}
                onChange={(e) =>
                  setFormData({ ...formData, imeShipperName: e.target.value })
                }
                className="bg-input-background"
                placeholder="荷主名を入力"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imeDestinationCode">届先コード</Label>
              <div className="flex gap-2">
                <Input
                  id="imeDestinationCode"
                  value={formData.imeDestinationCode}
                  onChange={(e) =>
                    setFormData({ ...formData, imeDestinationCode: e.target.value })
                  }
                  className="bg-input-background"
                  placeholder="届先コードを入力"
                />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imeDestinationName">届先名</Label>
              <Input
                id="imeDestinationName"
                value={formData.imeDestinationName}
                onChange={(e) =>
                  setFormData({ ...formData, imeDestinationName: e.target.value })
                }
                className="bg-input-background"
                placeholder="届先名を入力"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="imeRemarks">備考</Label>
              <Textarea
                id="imeRemarks"
                value={formData.imeRemarks}
                onChange={(e) =>
                  setFormData({ ...formData, imeRemarks: e.target.value })
                }
                className="bg-input-background"
                placeholder="備考を入力"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>車種明細</CardTitle>
              <CardDescription>車種ごとの数量と単価を入力してください</CardDescription>
            </div>
            <Button onClick={handleAddVehicle} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              車種追加
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>車種</TableHead>
                  <TableHead className="w-32">数量</TableHead>
                  <TableHead className="w-40">単価</TableHead>
                  <TableHead className="w-40 text-right">金額</TableHead>
                  <TableHead>備考</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle, index) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="text-gray-500">{index + 1}</TableCell>
                    <TableCell>
                      <Select
                        value={vehicle.vehicleType}
                        onValueChange={(value) =>
                          handleVehicleChange(vehicle.id, "vehicleType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2tトラック">2tトラック</SelectItem>
                          <SelectItem value="4tトラック">4tトラック</SelectItem>
                          <SelectItem value="10tトラック">10tトラック</SelectItem>
                          <SelectItem value="トレーラー">トレーラー</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={vehicle.quantity}
                        onChange={(e) =>
                          handleVehicleChange(
                            vehicle.id,
                            "quantity",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="bg-input-background text-right"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={vehicle.unitPrice}
                        onChange={(e) =>
                          handleVehicleChange(
                            vehicle.id,
                            "unitPrice",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="bg-input-background text-right"
                      />
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ¥{vehicle.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Input
                        value={vehicle.remarks}
                        onChange={(e) =>
                          handleVehicleChange(vehicle.id, "remarks", e.target.value)
                        }
                        className="bg-input-background"
                        placeholder="備考"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-gray-50 font-semibold">
                  <TableCell colSpan={4} className="text-right">
                    合計金額
                  </TableCell>
                  <TableCell className="text-right font-mono text-lg">
                    ¥{totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2 justify-end">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              保存
            </Button>
            <Button variant="outline">
              確定
            </Button>
            <Button variant="outline">
              クリア
            </Button>
            <Button variant="outline">
              閉じる
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
