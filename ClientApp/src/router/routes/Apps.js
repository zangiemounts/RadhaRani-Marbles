// ** React Imports
import { lazy } from "react"
import { Navigate } from "react-router-dom"
import ViewBill from "../../views/apps/invoice/add/ViewBill"
import InvoiceEditCard from "../../views/apps/invoice/edit/EditCard"
import PrintBill from "../../views/apps/invoice/print/PrintBill"
import WebsiteForm from "../../views/DynamicWebsite/WebsiteForm"
import Pricing from "../../views/pages/pricing/index"
import Select from "../../views/pages/select/index"
import Home from "../../views/DynamicWebsite/Home"
import About from "../../views/DynamicWebsite/About"
import GetOneData from "../../views/apps/user/list/GetOneData"
import DataShowCard from "../../views/apps/DataCard/DataShowCard"
import ShowUser from "../../views/apps/DataCard/ShowUser"
import Qrscanner from "../../views/apps/user/list/Qrscanner"
import SalesExcutive from "../../views/apps/DataCard/SalesExcutive"
import EstimationSheet from "../../views/apps/DataCard/EstimationSheet"
import Employee from "../../views/apps/Marbals/employee"
import Customer from "../../views/apps/Marbals/customer"
import Estimate from "../../views/apps/Marbals/estimate"
import Mesurement from "../../views/apps/Marbals/mesurement"
import MarbelStore from "../../views/apps/Marbals/MarbelStore"
import Quotations from "../../views/apps/Marbals/quotations"
import EstimateView from "../../views/apps/Marbals/estimateView"
import EstimatePrint from "../../views/apps/Marbals/estimatePrint"
import Vehicle from "../../views/apps/Marbals/vehicle"
import MesurementData from "../../views/apps/Marbals/mesurementData"
import MesurementView from "../../views/apps/Marbals/mesurementView"
import MesurementPrint from "../../views/apps/Marbals/mesurementPrint"
import Images from "../../views/apps/Marbals/images/images"
import Architect from "../../views/apps/Marbals/Architect"
import VehicleContractor from "../../views/apps/Marbals/vehicleContractor"
import VehicleName from "../../views/apps/Marbals/vehicleName"
import SupportTicket from "../../views/apps/Marbals/supportTicket"

const InvoiceAdd = lazy(() => import("../../views/apps/invoice/add"))
const InvoiceList = lazy(() => import("../../views/apps/invoice/list"))
const InvoiceEdit = lazy(() => import("../../views/apps/invoice/edit"))
const InvoicePrint = lazy(() => import("../../views/apps/invoice/print"))
const InvoicePreview = lazy(() => import("../../views/apps/invoice/preview"))
const ShowCard = lazy(() => import("../../views/apps/showDataCard/index"))
const CreateCart = lazy(() => import("../../views/apps/Marbals/createCart/index"))
const ItemCard = lazy(() => import("../../views/apps/Marbals/item/index"))

const UserList = lazy(() => import("../../views/apps/user/list"))
const UserView = lazy(() => import("../../views/apps/user/view"))
const DashboardEcommerce = lazy(() =>  import("../../views/apps/Marbals/ecommerce"))

const AppRoutes = [
  {
    element: <InvoiceList />,
    path: "/apps/invoice/list"
  },
  {
    path: "/dashboard",
    element: <DashboardEcommerce />
  },
  {
    element: <InvoicePreview />,
    path: "/apps/invoice/preview/:id"
  },
  {
    element: <ViewBill />,
    path: "/apps/invoice/ViewBill"
  },
  {
    path: "/apps/invoice/preview",
    element: <Navigate to="/apps/invoice/preview/4987" />
  },
  {
    element: <InvoiceEdit />,
    path: "/apps/invoice/edit/:id"
  },
  {
    path: "/apps/invoice/edit",
    element: <InvoiceEditCard />
  },
  {
    element: <InvoiceAdd />,
    path: "/apps/invoice/add"
  },
  {
    path: "/apps/invoice/print",
    element: <InvoicePrint />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/apps/invoice/printBill",
    element: <PrintBill />,
    meta: {
      layout: "blank"
    }
  },

  {
    element: <UserList />,
    path: "/apps/user/list"
  },
  {
    path: "/apps/user/view",
    element: <Navigate to="/apps/user/view/1" />
  },
  {
    element: <UserView />,
    path: "/apps/user/view/:id"
  },
  {
    element: <Pricing />,
    path: "/price"
  },
  {
    element: <Select />,
    path: "/select"
  },
  {
    element: <WebsiteForm />,
    path: "/websiteform"
  },
  {
    element: <Home />,
    path: "/home"
  },
  {
    element: <About />,
    path: "/AboutUs"
  },
  {
    element: <GetOneData />,
    path: "/GetOneData"
  },
  {
    element: <DataShowCard />,
    path: "/Data"
  },
  {
    element: <ShowUser />,
    path: "/showUser"
  },
  {
    element: <Images />,
    path: "/images"
  },
  {
    element: <SalesExcutive />,
    path: "/salesExcutive"
  },
  {
    element: <Employee />,
    path: "/employee"
  },
  {
    element: <Customer />,
    path: "/customer"
  },
  {
    element: <Estimate />,
    path: "/estimate"
  },
  {
    element: <EstimateView />,
    path: "/estimateView"
  },
  {
    element: <VehicleContractor />,
    path: "/vehicleContractor"
  },
  {
    element: <EstimatePrint />,
    path: "/estimatePrint"
  },
  {
    element: <MesurementPrint />,
    path: "/mesurementPrint"
  },
  {
    element: <Vehicle />,
    path: "/vehicle"
  },
  {
    element: <VehicleName />,
    path: "/vehicleName"
  },
  {
    element: <MesurementData />,
    path: "/mesurementData"
  },

  {
    element: <Mesurement />,
    path: "/mesurement"
  },
  {
    element: <MesurementView />,
    path: "/mesurementView"
  },
  {
    element: <SupportTicket />,
    path: "/supportTicket"
  },
  /*{
        element: <MarbelQRBlankDownload />,
        path: '/marbelQRMultipleDownload'
    },*/
  /* {
        element: <MarbelQRDownload />,
        path: '/marbelQRDownload'
    },*/

  {
    element: <CreateCart />,
    path: "/createcart",
    meta: {
      className: "ecommerce-application"
    }
  },
  {
    element: <EstimationSheet />,
    path: "/estimation"
  },
  /* {
        element: <MesurementSheet />,
        path: '/mesurement'
    },*/

  {
    element: <Architect />,
    path: "/architect"
  },
  {
    element: <Quotations />,
    path: "/quotations"
  },
  {
    element: <MarbelStore />,
    path: "/marbelstore"
  },
  {
    element: <ShowCard />,
    path: "/showUsers",
    meta: {
      className: "ecommerce-application"
    }
  },
  {
    element: <ItemCard />,
    path: "/ItemCard",
    meta: {
      className: "ecommerce-application"
    }
  },
  {
    element: <Qrscanner />,
    path: "/qrscanner"
  }
]

export default AppRoutes
