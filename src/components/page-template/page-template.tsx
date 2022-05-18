import React from 'react'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
import './page-template.less'

const PageTemplate = ({ children }) => {
    return (
        <div className='page-template'>
            <Navbar />
            <div className='page-template__main-content'>
                { children }
            </div>
            <Footer />
        </div>
    )
}

export default PageTemplate
