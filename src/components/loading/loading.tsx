import React from 'react'
import './loading.less'

const Loading = ({ spinner }: { spinner?: boolean}) => {
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
