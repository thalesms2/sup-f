import IAction from '@/types/action'
import IUser from '@/types/user'

export default interface ITicket {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    description: string
    actions: Array<IAction>
    userCreatorId: number
    userCreator: IUser
    companyId: number
    public: boolean
}