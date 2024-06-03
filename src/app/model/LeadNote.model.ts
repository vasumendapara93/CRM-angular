import ILead from "./Lead.model"
import IUser from "./User.model"

export default interface ILeadNote{
    id :string
    title : string
    desciption :string
    leadId : string
    lead : ILead
    createdById : string
    createdBy :IUser
    updatedById : string
    updatedBy : IUser
    createDate : string
    upadteDate : string
}