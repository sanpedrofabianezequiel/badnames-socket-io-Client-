import React from 'react'
import HomePage from '../pages/HomePage'
import { SocketProvider } from './SocketContext'

export const BandNamesApp = () => {
    return (
        <SocketProvider>
            <HomePage/>
        </SocketProvider>
    )
}
