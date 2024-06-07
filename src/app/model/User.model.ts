import { Gender } from "src/assets/static/Gender"
import IBranch from "./Branch.model"

export default interface IUser{
    id : number
    name : string
    phoneNumber? : string
    email : string
    password : string
    roleId : number
    isAccountActivate : boolean
    organizationId : string
    createDate : string
    updateDate : string
}
