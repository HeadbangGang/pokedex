import React, { Suspense } from 'react'
import Loading from './components/loading/loading'
import { SPINNER_DEFAULT } from './helpers/constants'
import PageTemplate from './components/page-template/page-template'

const Homepage = React.lazy(() => Promise.all([
    import('./components/homepage/homepage'),
    new Promise(resolve => setTimeout(resolve, SPINNER_DEFAULT))
]).then(([moduleExports]) => moduleExports))

const LandingPage = () => {
    return (
        <PageTemplate>
            <Suspense fallback={ <Loading /> }>
                <Homepage />
            </Suspense>
        </PageTemplate>
    )
}

export default LandingPage
