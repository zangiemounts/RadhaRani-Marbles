import { lazy } from 'react'
import Failur from '../../views/pages/pricing/Failur'
import Success from '../../views/pages/pricing/Success'

const Error = lazy(() => import('../../views/pages/misc/Error'))

const ComingSoon = lazy(() => import('../../views/pages/misc/ComingSoon'))
const Maintenance = lazy(() => import('../../views/pages/misc/Maintenance'))
const AccountSettings = lazy(() => import('../../views/pages/account-settings'))
const NotAuthorized = lazy(() => import('../../views/pages/misc/NotAuthorized'))

const PagesRoutes = [

    {
        path: '/pages/account-settings',
        element: <AccountSettings />
    },
    {
        path: '/success',
        element: <Success />
    },
    {
        path: '/failur',
        element: <Failur />
    },
    {
        path: '/misc/coming-soon',
        element: <ComingSoon />,
        meta: {
            publicRoute: true,
            layout: 'blank'
        }
    },
    {
        path: '/misc/not-authorized',
        element: <NotAuthorized />,
        meta: {
            publicRoute: true,
            layout: 'blank'
        }
    },
    {
        path: '/misc/maintenance',
        element: <Maintenance />,
        meta: {
            publicRoute: true,
            layout: 'blank'
        }
    },
    {
        path: '/misc/error',
        element: <Error />,
        meta: {
            publicRoute: true,
            layout: 'blank'
        }
    
  }
]

export default PagesRoutes
