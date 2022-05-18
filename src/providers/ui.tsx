import React, { createContext, useState } from 'react'

export const UIContext = createContext(null)
UIContext.displayName = 'UI'

const UI = ({ children }) => {
    const [isSmallView, setIsSmallView] = useState(window.innerWidth < 992)

    const handleWindowResize = () => {
        if ((isSmallView && window.innerWidth > 992) || (!isSmallView && window.innerWidth < 992)) {
            setIsSmallView(!isSmallView)
        }
    }

    window.addEventListener('resize', handleWindowResize)

    return (
        <UIContext.Provider value={{ isSmallView }}>
            { children }
        </UIContext.Provider>
    )
}
export default UI