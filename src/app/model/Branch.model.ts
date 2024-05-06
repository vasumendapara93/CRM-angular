import IUser from "./User.model"

export default interface IBranch{
    branchName: string
    branchCode: string
    organizationId: string
    organization : IUser
    createDate: string
    updateDate: string
}