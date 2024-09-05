import IUser from "@/types/user"

export default interface IAction {
    id: number
    createdAt: Date
    updatedAt: Date
    ticketId: number
    description: string
    clientUserId: number
    clientUser: IUser
    userCreatorId: number
    userCreator: IUser
    isActive: boolean
}