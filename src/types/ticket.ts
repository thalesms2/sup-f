import IAction from '@/types/action'
import IUser from '@/types/user'

interface Action {
    id: number
    description: string
}

interface ITicket {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    description: string
    actions: Array<Action>
    userCreatorId: number
    companyId: number
    status: string
    priority: number
    public: boolean
}

export type {
    ITicket
}