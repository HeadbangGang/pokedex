import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loading from './components/loading/loading'
import { PAGE_URL, SPINNER_DEFAULT } from './helpers/constants'
import PageTemplate from './components/page-template/page-template'

const PageNotFound = React.lazy(() => Promise.all([
    import('./components/page-not-found/page-not-found'),
    new Promise(resolve => setTimeout(resolve, SPINNER_DEFAULT))
]).then(([moduleExports]) => moduleExports))

const Homepage = React.lazy(() => Promise.all([
    import('./components/homepage/homepage'),
    new Promise(resolve => setTimeout(resolve, SPINNER_DEFAULT))
]).then(([moduleExports]) => moduleExports))

const ROUTES = [
    { element: <Homepage />, path: PAGE_URL.HOME_PAGE },
    { element: <PageNotFound />, path: '*'}
]

const renderRoutes = () => {
    return ROUTES.map((routeData, idx) => (
        <Route key={ idx }  { ...routeData } />
    ))
}

const RoutesController = () => {
    return (
        <BrowserRouter basename={ PAGE_URL.HOME_PAGE }>
            <PageTemplate>
                <Suspense fallback={ <Loading /> }>
                    <Routes>
                        { renderRoutes() }
                    </Routes>
                </Suspense>
            </PageTemplate>
        </BrowserRouter>
    )
}

export default RoutesController
