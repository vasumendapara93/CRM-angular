import { BranchFields } from "./BranchFields";
import { UserFields } from "./UserFields";

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
}
