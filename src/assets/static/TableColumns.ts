import { BranchFields } from "./ModelFields/BranchFields";
import { LeadFields } from "./ModelFields/LeadFields";
import { UserFields } from "./ModelFields/UserFields";

export class TableColumns {
    static BranchColumns = [
        BranchFields.BranchName,
        BranchFields.BranchCode,
        BranchFields.CreateDate
    ]
    static OrganizationColumns = [
        UserFields.IsAccountActivated,
        UserFields.Name,
        UserFields.Email,
        UserFields.PhoneNumber,
        UserFields.ContactPerson
    ]

    static LeadColumns = [
        LeadFields.Status,
        LeadFields.LeadName,
        LeadFields.Email,
        LeadFields.Phone,
        LeadFields.LeadSource,
        LeadFields.DataEnteryOprator,
        LeadFields.Assigner,
        LeadFields.SalesPerson,
    ]
}