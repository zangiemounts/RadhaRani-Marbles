// ** Icons Import
import { Activity, Bell, CheckSquare, UserCheck, Zap, Circle, Truck, User, Settings, DownloadCloud, Home, HelpCircle } from 'react-feather'
import { BiWallet } from "react-icons/bi"
export default [
  {
      header: 'Dashboards'
  },
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Home size={12} />,
        navLink: '/dashboard'
    },
    {
        id: 'support',
        title: 'Support Ticket',
        icon: <HelpCircle size={20} />,
        navLink: '/supportTicket'

    },

    {
        header: 'Apps & Pages'
    },
  {
    id: 'users',
    title: 'Item',
    icon: <User size={20} />,
    navLink: '/ItemCard'
    },
    {
        id: 'pages',
        title: 'Account Settings',
        icon: <Settings size={20} />,
        navLink: '/pages/account-settings'
    },
    {
        id: 'Customer',
        title: 'Customer',
        icon: <Circle size={20} />,
        navLink: '/customer'
    },
    {
        id: 'Architect',
        title: 'Architect',
        icon: <CheckSquare size={20} />,
        navLink: '/architect'
    },
    {
        id: 'Employee',
        title: 'Employee',
        icon: <UserCheck size={20} />,
        navLink: '/employee'
    },
    {
        id: 'Quotations',
        title: 'Estimation',
        icon: <Activity size={20} />,
        navLink: '/quotations'
    },
    {
        id: 'mesurement',
        title: 'Mesurement',
        icon: <Zap size={20} />,
        navLink: '/mesurementData'
    },
    {
        id: 'vehicle',
        title: 'Vehicle details',
        icon: <Truck size={20} />,
        navLink: '/vehicle'
    },

    {
        id: 'Store',
        title: 'Store',
        icon: <Bell size={20} />,
        navLink: '/marbelstore'
    },
    {
        id: 'marbelQRDownload',
        title: 'QR Download',
        icon: <DownloadCloud size={20} />,
        navLink: '/marbelQRDownload'
    }
    
    /*{
        id: 'qrscanner',
        title: 'Qrscanner',
        icon: <Circle size={20} />,
        navLink: '/qrscanner'
    }*/

  /* 
    {
        id: 'pages',
        title: 'Plan',
        icon: <BiWallet size={20} />,
        navLink: '/price'
    },
    
    {
        id: 'Select',
        title: 'Website',
        icon: <BiWallet size={20} />,
        navLink: '/websiteform'
    }*/

   /* {
        id: 'Select',
        title: 'Select',
        icon: <BiWallet size={20} />,
        navLink: '/select'
    },*/
]
