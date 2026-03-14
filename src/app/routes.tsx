import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { SplashScreen } from "./pages/frmPG0000_Splash";
import { LoginScreen } from "./pages/frmPG0001_Login";
import { MainMenu } from "./pages/frmPG0002_MainMenu";
import { TransportCostImport } from "./pages/import/frmPG0110_TransportCostImport";
import { TransportCostInvoiceImport } from "./pages/import/frmPG0111_TransportCostInvoiceImport";
import { IndividualCargoStorageCostDataCreation } from "./pages/import/frmPG0150_IndividualCargoStorageCostDataCreation";
import { OverseasCostImport } from "./pages/import/frmPG0210_OverseasCostImport";
import { SAPDataImport } from "./pages/import/frmPG0211_SAPDataImport";
import { TemporaryTransportCostImport } from "./pages/import/frmPG0310_TemporaryTransportCostImport";
import { TemporaryOverseasCostImport } from "./pages/import/frmPG0311_TemporaryOverseasCostImport";
import { TemporaryTransportCostPriceComparison } from "./pages/import/frmPG0320_TemporaryTransportCostPriceComparison";
import { TemporaryTransportCostSalesComparison } from "./pages/import/frmPG0321_TemporaryTransportCostSalesComparison";
import { TemporaryOverseasCostPriceComparison } from "./pages/import/frmPG0322_TemporaryOverseasCostPriceComparison";
import { TemporaryOverseasCostSalesComparison } from "./pages/import/frmPG0323_TemporaryOverseasCostSalesComparison";
import { TransportCostMonthlyInput } from "./pages/input/frmPG0120_TransportCostMonthlyInput";
import { TransportCostVehicleInput } from "./pages/input/frmPG0121_TransportCostVehicleInput";
import { TransportCostIndividualInput } from "./pages/input/frmPG0122_TransportCostIndividualInput";
import { TransportCostRouteInput } from "./pages/input/frmPG0123_TransportCostRouteInput";
import { TransportCostSearch } from "./pages/input/frmPG0124_TransportCostSearch";
import { SalesInquiry } from "./pages/input/frmPG0140_SalesInquiry";
import { OverseasCostInput } from "./pages/input/frmPG0220_OverseasCostInput";
import { OtherProcessingInput } from "./pages/input/frmPG0520_OtherProcessingInput";
import { DeliveryRequestInput } from "./pages/input/frmPG1000_DeliveryRequestInput";
import { TransportCostComparison } from "./pages/comparison/frmPG0130_TransportCostComparison";
import { TransportCostSalesComparison } from "./pages/comparison/frmPG0131_TransportCostSalesComparison";
import { OverseasCostPriceComparison } from "./pages/comparison/frmPG0230_OverseasCostPriceComparison";
import { DrayageComparison } from "./pages/comparison/frmPG0231_DrayageComparison";
import { PaymentConfirmation } from "./pages/comparison/frmPG2000_PaymentConfirmation";
import { InvoiceConfirmation } from "./pages/comparison/frmPG2001_InvoiceConfirmation";
import { PaymentConfirmationCancellation } from "./pages/comparison/frmPG2100_PaymentConfirmationCancellation";
import { PaymentDetailsOutput } from "./pages/reports/frmPG4000_PaymentDetailsOutput";
import { TransportCostMaster } from "./pages/master/frmPG0100_TransportCostMaster";
import { DestinationMaster } from "./pages/master/frmPG1100_DestinationMaster";
import { PlaceholderScreen } from "./pages/PlaceholderScreen";
import { ErrorPage } from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainMenu /> },
      
      // Import routes
      { path: "import/transport-cost", element: <TransportCostImport /> },
      { path: "import/transport-invoice", element: <TransportCostInvoiceImport /> },
      { path: "import/cargo-storage-cost", element: <IndividualCargoStorageCostDataCreation /> },
      { path: "import/overseas-cost", element: <OverseasCostImport /> },
      { path: "import/sap-data", element: <SAPDataImport /> },
      { path: "import/other-cost", element: <PlaceholderScreen /> },
      
      // Temporary Import routes
      { path: "import/temporary-transport-cost", element: <TemporaryTransportCostImport /> },
      { path: "import/temporary-overseas-cost", element: <TemporaryOverseasCostImport /> },
      { path: "import/temporary-transport-cost-price", element: <TemporaryTransportCostPriceComparison /> },
      { path: "import/temporary-transport-cost-sales", element: <TemporaryTransportCostSalesComparison /> },
      { path: "import/temporary-overseas-cost-price", element: <TemporaryOverseasCostPriceComparison /> },
      { path: "import/temporary-overseas-cost-sales", element: <TemporaryOverseasCostSalesComparison /> },
      
      // Input routes
      { path: "input/transport-cost-monthly", element: <TransportCostMonthlyInput /> },
      { path: "input/transport-cost-vehicle", element: <TransportCostVehicleInput /> },
      { path: "input/transport-cost-individual", element: <TransportCostIndividualInput /> },
      { path: "input/transport-cost-route", element: <TransportCostRouteInput /> },
      { path: "input/transport-cost-search", element: <TransportCostSearch /> },
      { path: "input/sales-inquiry", element: <SalesInquiry /> },
      { path: "input/overseas-cost", element: <OverseasCostInput /> },
      { path: "input/other-processing", element: <OtherProcessingInput /> },
      { path: "input/delivery-request", element: <DeliveryRequestInput /> },
      
      // Comparison routes
      { path: "comparison/transport-cost", element: <TransportCostComparison /> },
      { path: "comparison/transport-sales", element: <TransportCostSalesComparison /> },
      { path: "comparison/overseas-cost", element: <OverseasCostPriceComparison /> },
      { path: "comparison/drayage", element: <DrayageComparison /> },
      { path: "comparison/air-freight", element: <PlaceholderScreen /> },
      { path: "comparison/overseas-sales", element: <PlaceholderScreen /> },
      { path: "comparison/payment-confirm", element: <PaymentConfirmation /> },
      { path: "comparison/invoice-confirm", element: <InvoiceConfirmation /> },
      { path: "comparison/payment-cancel", element: <PaymentConfirmationCancellation /> },
      
      // Reports routes
      { path: "reports/payment-details", element: <PaymentDetailsOutput /> },
      { path: "reports/invoice-details", element: <PlaceholderScreen /> },
      { path: "reports/transport-details", element: <PlaceholderScreen /> },
      { path: "reports/trade-details", element: <PlaceholderScreen /> },
      { path: "reports/sap-data-list", element: <PlaceholderScreen /> },
      { path: "reports/invoice-summary", element: <PlaceholderScreen /> },
      { path: "reports/db-extract", element: <PlaceholderScreen /> },
      { path: "reports/co2-output", element: <PlaceholderScreen /> },
      
      // Master routes
      { path: "master/transport-cost", element: <TransportCostMaster /> },
      { path: "master/transport-sales", element: <PlaceholderScreen /> },
      { path: "master/transport-cost-search", element: <PlaceholderScreen /> },
      { path: "master/overseas-cost", element: <PlaceholderScreen /> },
      { path: "master/overseas-sales", element: <PlaceholderScreen /> },
      { path: "master/destination", element: <DestinationMaster /> },
      { path: "master/orderer", element: <PlaceholderScreen /> },
      { path: "master/distance", element: <PlaceholderScreen /> },
      { path: "master/prefecture", element: <PlaceholderScreen /> },
      { path: "master/transport-method", element: <PlaceholderScreen /> },
      { path: "master/shipper", element: <PlaceholderScreen /> },
      { path: "master/business-type", element: <PlaceholderScreen /> },
      { path: "master/vehicle-type", element: <PlaceholderScreen /> },
      { path: "master/authority", element: <PlaceholderScreen /> },
      { path: "master/archive-data", element: <PlaceholderScreen /> },
      
      // Search routes
      { path: "search/destination", element: <PlaceholderScreen /> },
      { path: "search/orderer", element: <PlaceholderScreen /> },
    ],
  },
]);