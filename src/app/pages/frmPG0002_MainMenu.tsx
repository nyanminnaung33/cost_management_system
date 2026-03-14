import { useNavigate } from "react-router";
import {
  FileInput,
  FileEdit,
  FileCheck,
  FileText,
  Database,
  Settings,
  Search,
  TrendingUp,
  BarChart3,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

interface MenuCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  items: { label: string; path: string }[];
}

const menuCategories: MenuCategory[] = [
  {
    id: "import",
    title: "取込",
    description: "データインポート機能",
    icon: <FileInput className="w-6 h-6" />,
    color: "blue",
    items: [
      { label: "運送費用作業明細インポート", path: "/app/import/transport-cost" },
      { label: "海外費用作業明細インポート", path: "/app/import/overseas-cost" },
      { label: "SAPデータインポート", path: "/app/import/sap-data" },
    ],
  },
  {
    id: "input",
    title: "入力",
    description: "データ入力機能",
    icon: <FileEdit className="w-6 h-6" />,
    color: "green",
    items: [
      { label: "運送費用月極車入力", path: "/app/input/transport-cost-monthly" },
      { label: "運送費用車建て入力", path: "/app/input/transport-cost-vehicle" },
      { label: "海外費用入力", path: "/app/input/overseas-cost" },
    ],
  },
  {
    id: "comparison",
    title: "照合",
    description: "データ照合・確定機能",
    icon: <FileCheck className="w-6 h-6" />,
    color: "purple",
    items: [
      { label: "運送費用原価照合", path: "/app/comparison/transport-cost" },
      { label: "海外費用原価照合", path: "/app/comparison/overseas-cost" },
      { label: "支払確定", path: "/app/comparison/payment-confirm" },
    ],
  },
  {
    id: "reports",
    title: "帳票",
    description: "レポート出力機能",
    icon: <FileText className="w-6 h-6" />,
    color: "orange",
    items: [
      { label: "支払明細出力", path: "/app/reports/payment-details" },
      { label: "請求明細出力", path: "/app/reports/invoice-details" },
      { label: "運送明細出力", path: "/app/reports/transport-details" },
    ],
  },
  {
    id: "master-price",
    title: "マスタ単価",
    description: "単価マスタ管理",
    icon: <Database className="w-6 h-6" />,
    color: "cyan",
    items: [
      { label: "運送費用原価", path: "/app/master/transport-cost" },
      { label: "運送費用売上", path: "/app/master/transport-sales" },
      { label: "海外費用原価", path: "/app/master/overseas-cost" },
    ],
  },
  {
    id: "master-others",
    title: "マスタその他",
    description: "その他マスタ管理",
    icon: <Settings className="w-6 h-6" />,
    color: "gray",
    items: [
      { label: "発着地", path: "/app/master/destination" },
      { label: "発注者", path: "/app/master/orderer" },
      { label: "車種", path: "/app/master/vehicle-type" },
    ],
  },
];

export function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">メインメニュー</h1>
        <p className="text-gray-600">原価管理システム - 機能選択</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>今月の処理件数</CardDescription>
            <CardTitle className="text-2xl">1,234</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>前月比 +12%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>未照合データ</CardDescription>
            <CardTitle className="text-2xl">87</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-orange-600">
              <Activity className="w-4 h-4 mr-1" />
              <span>要対応</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>今月の総費用</CardDescription>
            <CardTitle className="text-2xl">¥45.6M</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-600">
              <BarChart3 className="w-4 h-4 mr-1" />
              <span>予算内</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>処理待ちインポート</CardDescription>
            <CardTitle className="text-2xl">23</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-blue-600">
              <FileInput className="w-4 h-4 mr-1" />
              <span>新着あり</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuCategories.map((category) => (
          <Card
            key={category.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg bg-${category.color}-50 text-${category.color}-600`}
                    >
                      {category.icon}
                    </div>
                    <span>{category.title}</span>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {category.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.items.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>最近の活動</CardTitle>
          <CardDescription>直近の処理履歴</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                time: "10:30",
                action: "運送費用作業明細インポート",
                user: "山田太郎",
                status: "完了",
              },
              {
                time: "09:45",
                action: "海外費用原価照合",
                user: "佐藤花子",
                status: "完了",
              },
              {
                time: "09:15",
                action: "支払明細出力",
                user: "鈴木一郎",
                status: "完了",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="text-sm font-mono text-gray-500">
                    {activity.time}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{activity.action}</div>
                    <div className="text-xs text-gray-500">{activity.user}</div>
                  </div>
                </div>
                <div className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                  {activity.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
