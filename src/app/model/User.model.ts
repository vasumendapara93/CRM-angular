export default interface IUser{
    id :string
    name : string
    image? : string  
    contactPerson? : string
    phoneNumber : string
    email : string
    abstractddress? : string,
    roleId : string,
    role:{
        roleName:string
    },
    isActive : boolean
    organizationId : string
    branchId : string
    subscriptionStartDate : string
    subscriptionEndDate : string
}