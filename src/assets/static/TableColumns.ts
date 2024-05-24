import { BranchFields } from "./BranchFields";
import { UserFields } from "./UserFields";

export class TableColumns {
    static BranchColumns  = [
        BranchFields.BranchName,
        BranchFields.BranchCode,
        BranchFields.CreateDate
    ]
    static OrganizationColumns = [
        UserFields.IsActive,
        UserFields.Image,
        UserFields.Name,
        UserFields.Email,
        UserFields.PhoneNumber,
        UserFields.ContactPerson
    ]
}