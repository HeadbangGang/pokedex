import React from 'react'
import { createRoot } from 'react-dom/client'
import ProviderWrapper from './providers/provider-wrapper'
import LandingPage from './landing-page'
import './index.less'

const root = createRoot(document.getElementById('pokedex'))

root.render(
    <ProviderWrapper>
        <LandingPage />
    </ProviderWrapper>
)
