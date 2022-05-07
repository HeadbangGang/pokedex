import React, {createContext, useState} from 'react'

export const ErrorsContext = createContext(null)
ErrorsContext.displayName = 'Errors'

const Errors = ({ children }) => {
    const [errors, setErrors] = useState<any[]>([])


    return (
        <ErrorsContext.Provider value={{ errors, setErrors }}>
            { children }
        </ErrorsContext.Provider>
    )
}

export default Errors
