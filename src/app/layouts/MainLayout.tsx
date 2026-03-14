import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  ChevronDown,
  ChevronRight,
  FileInput,
  FileEdit,
  FileCheck,
  FileText,
  Database,
  Settings,
  Search,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "import",
    label: "取込",
    icon: <FileInput className="w-4 h-4" />,
    children: [
      { id: "pg0110", label: "運送費用作業明細インポート", path: "/app/import/transport-cost" },
      { id: "pg0111", label: "運送費用送り状インポート", path: "/app/import/transport-invoice" },
      { id: "pg0150", label: "個建荷役保管費用データ作成", path: "/app/import/cargo-storage-cost" },
      { id: "pg0210", label: "海外費用作業明細インポート", path: "/app/import/overseas-cost" },
      { id: "pg0211", label: "SAPデータインポート", path: "/app/import/sap-data" },
      { id: "pg0510", label: "その他費用作業明細インポート", path: "/app/import/other-cost" },
      { id: "pg0310", label: "運送費用仮インポート", path: "/app/import/temporary-transport-cost" },
      { id: "pg0311", label: "海外費用仮インポート", path: "/app/import/temporary-overseas-cost" },
      { id: "pg0320", label: "運送費用仮インポート原価照合", path: "/app/import/temporary-transport-cost-price" },
      { id: "pg0321", label: "運送費用仮インポート売上照合", path: "/app/import/temporary-transport-cost-sales" },
      { id: "pg0322", label: "海外費用仮インポート原価照合", path: "/app/import/temporary-overseas-cost-price" },
      { id: "pg0323", label: "海外費用仮インポート売上照合", path: "/app/import/temporary-overseas-cost-sales" },
    ],
  },
  {
    id: "input",
    label: "入力",
    icon: <FileEdit className="w-4 h-4" />,
    children: [
      { id: "pg0120", label: "運送費用月極車入力", path: "/app/input/transport-cost-monthly" },
      { id: "pg0121", label: "運送費用車建て入力", path: "/app/input/transport-cost-vehicle" },
      { id: "pg0122", label: "運送費用個建て入力", path: "/app/input/transport-cost-individual" },
      { id: "pg0123", label: "運送費用路線入力", path: "/app/input/transport-cost-route" },
      { id: "pg0124", label: "運送費用索", path: "/app/input/transport-cost-search" },
      { id: "pg0140", label: "売上照会", path: "/app/input/sales-inquiry" },
      { id: "pg0220", label: "海外費用入力", path: "/app/input/overseas-cost" },
      { id: "pg0520", label: "その他加工入力", path: "/app/input/other-processing" },
      { id: "pg1000", label: "配送依頼入力", path: "/app/input/delivery-request" },
    ],
  },
  {
    id: "comparison",
    label: "照合",
    icon: <FileCheck className="w-4 h-4" />,
    children: [
      { id: "pg0130", label: "運送費用原価照合", path: "/app/comparison/transport-cost" },
      { id: "pg0131", label: "運送費用売上照合", path: "/app/comparison/transport-sales" },
      { id: "pg0230", label: "海外費用原価照合", path: "/app/comparison/overseas-cost" },
      { id: "pg0231", label: "ドレージ照合", path: "/app/comparison/drayage" },
      { id: "pg0232", label: "航空運賃照合", path: "/app/comparison/air-freight" },
      { id: "pg0233", label: "海外費用売上照合", path: "/app/comparison/overseas-sales" },
      { id: "pg2000", label: "支払確定", path: "/app/comparison/payment-confirm" },
      { id: "pg2001", label: "請求確定", path: "/app/comparison/invoice-confirm" },
      { id: "pg2100", label: "支払確定取消", path: "/app/comparison/payment-cancel" },
    ],
  },
  {
    id: "reports",
    label: "帳票",
    icon: <FileText className="w-4 h-4" />,
    children: [
      { id: "pg4000", label: "支払明細出力", path: "/app/reports/payment-details" },
      { id: "pg4100", label: "請求明細出力", path: "/app/reports/invoice-details" },
      { id: "pg4200", label: "運送明細出力", path: "/app/reports/transport-details" },
      { id: "pg4300", label: "貿易明細出力", path: "/app/reports/trade-details" },
      { id: "pg4400", label: "SAP用データリスト出力", path: "/app/reports/sap-data-list" },
      { id: "pg5200", label: "請求総合計表出力", path: "/app/reports/invoice-summary" },
      { id: "pg5300", label: "DBデータ抽出", path: "/app/reports/db-extract" },
      { id: "pg7000", label: "CO2算出データ出力", path: "/app/reports/co2-output" },
    ],
  },
  {
    id: "master-price",
    label: "マスタ単価",
    icon: <Database className="w-4 h-4" />,
    children: [
      { id: "pg0100", label: "運送費用原価", path: "/app/master/transport-cost" },
      { id: "pg0101", label: "運送費用売上", path: "/app/master/transport-sales" },
      { id: "pg0103", label: "運送費用原価検索", path: "/app/master/transport-cost-search" },
      { id: "pg0200", label: "海外費用原価", path: "/app/master/overseas-cost" },
      { id: "pg0201", label: "海外費用売上", path: "/app/master/overseas-sales" },
    ],
  },
  {
    id: "master-others",
    label: "マスタその他",
    icon: <Settings className="w-4 h-4" />,
    children: [
      { id: "pg1100", label: "発着地", path: "/app/master/destination" },
      { id: "pg1101", label: "発注者", path: "/app/master/orderer" },
      { id: "pg1102", label: "距離", path: "/app/master/distance" },
      { id: "pg1103", label: "都道府県", path: "/app/master/prefecture" },
      { id: "pg1104", label: "輸送手段", path: "/app/master/transport-method" },
      { id: "pg1105", label: "荷主販社", path: "/app/master/shipper" },
      { id: "pg3000", label: "業務区分", path: "/app/master/business-type" },
      { id: "pg3001", label: "車種", path: "/app/master/vehicle-type" },
      { id: "pg3005", label: "権限", path: "/app/master/authority" },
      { id: "pg9000", label: "過去データ退避", path: "/app/master/archive-data" },
    ],
  },
  {
    id: "search",
    label: "検索",
    icon: <Search className="w-4 h-4" />,
    children: [
      { id: "pa0201", label: "発着地検索", path: "/app/search/destination" },
      { id: "pa0202", label: "発注者検索", path: "/app/search/orderer" },
    ],
  },
];

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-0"
        } overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">原価管理システム</h2>
            <p className="text-xs text-gray-500 mt-1">Cost Management System</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-2">
            {menuItems.map((item) => (
              <div key={item.id} className="mb-1">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {expandedMenus.includes(item.id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {expandedMenus.includes(item.id) && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => child.path && navigate(child.path)}
                            className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                              location.pathname === child.path
                                ? "bg-blue-50 text-blue-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => item.path && navigate(item.path)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/app">メインメニュー</BreadcrumbLink>
                </BreadcrumbItem>
                {location.pathname !== "/app" && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {menuItems
                          .flatMap((m) => m.children || [])
                          .find((c) => c.path === location.pathname)?.label}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              <span className="text-gray-500">担当者:</span> 山田太郎
            </div>
            <div className="text-sm text-gray-700">
              <span className="text-gray-500">会社コード:</span> 0001
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              ログアウト
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1440px] mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer Status Bar */}
        <footer className="bg-gray-800 text-white px-4 py-2 text-xs flex items-center justify-between">
          <div>原価管理システム v2.1.0</div>
          <div>{new Date().toLocaleDateString("ja-JP")}</div>
        </footer>
      </div>
    </div>
  );
}