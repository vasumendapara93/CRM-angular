import IUser from "./User.model"

export default interface ILoginResponseDTO {
    User: IUser
    token: string
}