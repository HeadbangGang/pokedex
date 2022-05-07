import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.less'
import ProviderWrapper from './providers/provider-wrapper'
import RoutesController from './routes'

const root = createRoot(document.getElementById('pokedex'))

root.render(
    <ProviderWrapper>
        <RoutesController />
    </ProviderWrapper>
)
