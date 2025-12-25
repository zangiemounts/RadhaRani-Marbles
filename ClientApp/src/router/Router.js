// ** Router imports
import { lazy } from 'react'

// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '../utility/Utils'

// ** GetRoutes
import { getRoutes } from './routes'
import PrintBill from '../views/apps/invoice/print/PrintBill'
import ViewBill from '../views/apps/invoice/add/ViewBill'
import GetOneData from '../views/apps/user/list/GetOneData'
import Qrscanner from '../views/apps/DataCard/Qrscanner'
import EstimatePrint from '../views/apps/Marbals/estimatePrint'
import MesurementPrint from '../views/apps/Marbals/mesurementPrint'
import MarbelQRDownload from '../views/apps/Marbals/marbelQRDownload'
import MarbelQRSingleDownload from '../views/apps/Marbals/marbelQRSingleDownload'
import MarbelQRBlankDownload from '../views/apps/Marbals/marbelQRBlankDownload'

// ** Components
const Error = lazy(() => import('../views/pages/misc/Error'))
const Login = lazy(() => import('../views/pages/authentication/Login'))
const Home = lazy(() => import('../views/DynamicWebsite/Home'))
const About = lazy(() => import('../views/DynamicWebsite/About'))
const NotAuthorized = lazy(() => import('../views/pages/misc/NotAuthorized'))

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()

  const allRoutes = getRoutes(layout)
  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      return getHomeRouteForLoggedInUser(user.role)
    } else {
      return '/home'
    }
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Home /> }]
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
      },
      {
          path: '/estimatePrint',
          element: <EstimatePrint />,
          meta: {
              layout: 'blank'
          }
      },
      {
          path: '/mesurementPrint',
          element: <MesurementPrint />,
          meta: {
              layout: 'blank'
          }
      },
      {
          path: '/marbelQRDownload',
          element: <MarbelQRDownload />,
          meta: {
              layout: 'blank'
          }
      },
      {
          path: '/marbelQRSingleDownload',
          element: <MarbelQRSingleDownload />,
          meta: {
              layout: 'blank'
          }
      },
      {
          path: '/marbelQRMultipleDownload',
          element: <MarbelQRBlankDownload />,
          meta: {
              layout: 'blank'
          }
      },
      {
          element: <ViewBill />,
          path: '/apps/invoice/ViewBill'
      },
      {
          element: <About />,
          path: '/AboutUs'
      },
      {
          element: <GetOneData />,
          path: '/GetOneData'
      },
      {
          element: <Qrscanner />,
          path: '/qrscanner'
      },

    ...allRoutes
  ])

  return routes
}

export default Router
