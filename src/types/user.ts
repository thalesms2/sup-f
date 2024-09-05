import ICompany from '@/types/company'

export default interface IUser {
    id: number
    createdAt: Date
    updatedAt: Date
    username: string
    isActive: boolean
    companyId: number
    company: ICompany
}
