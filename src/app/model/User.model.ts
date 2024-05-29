import { Gender } from "src/assets/static/Gender"
import IBranch from "./Branch.model"

export default interface IUser{
    id :string
    name : string
    image? : string  
    contactPerson? : string
    phoneNumber? : string
    email : string
    abstractddress? : string,
    roleId : string,
    role:{
        roleName:string
    },
    gender : Gender
    isActive : boolean
    isAccountActivated : boolean
    organizationId : string
    branchId : string
    branch : IBranch
    address : string,
    joiningDate : string
    subscriptionStartDate : string
    subscriptionEndDate : string,
    createDate : string,
}