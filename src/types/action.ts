import IUser from "@/types/user"
import GenericType from "./genericType"

export default interface IAction extends GenericType {
    ticketId: number
    description: string
    clientUserId: number
    clientUser: IUser
    userCreatorId: number
    userCreator: IUser
    isActive: boolean
}