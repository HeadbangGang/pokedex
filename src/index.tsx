import React from 'react'
import { createRoot } from 'react-dom/client'
import Homepage from './components/homepage'

const root = createRoot(document.getElementById('portfolio'))

root.render(
	<Homepage/>
)
