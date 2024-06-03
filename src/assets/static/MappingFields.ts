import { BranchFields } from "./ModelFields/BranchFields";
import { LeadFields } from "./ModelFields/LeadFields";
import { UserFields } from "./ModelFields/UserFields";

export class MappingFields {
  static BranchFields = [
    BranchFields.BranchName,
    BranchFields.BranchCode
  ]

  static OrganizationFields = [
    UserFields.Name,
    UserFields.Email,
    UserFields.PhoneNumber,
    UserFields.ContactPerson,
  ]

  static LeadFields = [
    LeadFields.NameTitle,
    LeadFields.FirstName,
    LeadFields.LastName,
    LeadFields.LeadTitle,
    LeadFields.Company ,
    LeadFields.Email,
    LeadFields.Phone ,
    LeadFields.LeadSource ,
    LeadFields.Street ,
    LeadFields.City ,
    LeadFields.State,
    LeadFields.ZipCode ,
    LeadFields.Country ,
    LeadFields.Description ,
    LeadFields.BranchId
  ]
}
