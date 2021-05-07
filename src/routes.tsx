import React, {
  Suspense,
  Fragment,
  ElementType,
} from 'react'
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import HomeView from './views/Home'
import DashboardView from './views/Dashboard'

type RouteR = {
  exact?: boolean;
  path?: string;
  component?: any;
  layout?: ElementType,
  routes?: Array<RouteR>,
  guard?: ElementType
}

export const renderRoutes = (routes: Array<RouteR> = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment
        const Layout = route.layout || Fragment
        const Component = route.component

        return (
          <Route
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>

                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}

                </Layout>
              </Guard>
            )}
          />
        )
      })}
    </Switch>
  </Suspense>
)

const routes = [
  {
    exact: true,
    path: '/',
    component: HomeView
  },
  {
    exact: true,
    path: '/dashboard',
    component: DashboardView
  },
  {
    path: '*',
    routes: [
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
]

export default routes
