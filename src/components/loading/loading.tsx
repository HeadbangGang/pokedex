import React, {useEffect, useState} from 'react'
import { Alert, Button } from 'react-bootstrap'
import { TIMEOUT_DEFAULT } from '../../helpers/constants'
import './loading.less'

const Loading = ({ spinner }: { spinner?: boolean}) => {
    const [showTimeoutError, setShowTimeoutError] = useState<boolean>(false)

    useEffect(() => {
        if (spinner) {
            setTimeout(() => {
                setShowTimeoutError(true)
            }, TIMEOUT_DEFAULT)
        }
    }, [])

    if (showTimeoutError) {
        return (
            <Alert variant="danger">
                <Alert.Heading>OOPS! Something went wrong!</Alert.Heading>
                <hr />
                <div className="alert__content">
                    <p>Please refresh the page and try again!</p>
                    <Button onClick={() => location.reload() } variant="light">Refresh Page</Button>
                </div>
            </Alert>
        )
    }

    if (spinner) {
        return (
            <div className="loading__spinner">
                <img src="/assets/media/pixel-spinning-pokeball.gif" alt="" />
                <div>Loading . . .</div>
            </div>
        )
    }

    return (
        <div className="loading__dot-stretching"></div>
    )
}

Loading.defaultProps = {
    spinner: true
}

export default Loading
