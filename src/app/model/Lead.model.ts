import IBranch from "./Branch.model"
import ILeadNote from "./LeadNote.model"
import IUser from "./User.model"

export default interface ILead{
    id:string
    dataEnteryOpratorId :string
    dataEnteryOprator : IUser
    assignerId : string
    assigner : IUser
    salesPersonId :string
    salesPerson : IUser
    organizationId :string
    organization :IUser
    branchId : string
    branch : IBranch
    image : string,
    nameTitle :string,
    firstName : string
    lastName: string
    company :string
    title : string
    email : string
    phone : string
    leadSource : string
    status : string
    street : string
    city : string
    state : string
    zipCode : string
    Country : string
    description : string
    createdDate : string
    updatedDate : string
    notes : ILeadNote[]
}