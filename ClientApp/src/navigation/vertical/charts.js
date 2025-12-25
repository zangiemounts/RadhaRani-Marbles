import { Activity, Bell, CheckSquare, UserCheck, Zap, Circle, Truck, DownloadCloud, Settings } from 'react-feather'

export default [
  {
    header: 'Apps & Pages'
    },
    {
        id: 'pages',
        title: 'Account Settings',
        icon: <Settings size={20} />,
        navLink: '/pages/account-settings'
    },
    {
        id: 'Architect',
        title: 'Architect',
        icon: <CheckSquare size={20} />,
        navLink: '/architect'
    },
   /* {
        id: 'Employee',
        title: 'Employee',
        icon: <UserCheck size={20} />,
        navLink: '/employee'
    },*/
    {
        id: 'Customer',
        title: 'Customer',
        icon: <Circle size={20} />,
        navLink: '/customer'
    },
    {
        id: 'mesurement',
        title: 'Mesurement',
        icon: <Zap size={20} />,
        navLink: '/mesurementData'
    },
    {
        id: 'Quotations',
        title: 'Estimation',
        icon: <Activity size={20} />,
        navLink: '/quotations'
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
  
]
