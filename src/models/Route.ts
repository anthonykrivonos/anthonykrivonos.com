import { ReactNode } from 'react'

export interface Route {
    name: string
    path: string
    component: ReactNode
}