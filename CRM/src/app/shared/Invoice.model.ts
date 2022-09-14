export class Invoice {
    ID: number;
    UserCreated?: number;
    DateCreated?: Date;
    UserUpdated?: number;
    DateUpdated?: Date;
    ParentID?: number;
    Note?: string;
    Active?: boolean;
    ContractID?: number;
    DateInvoice?: Date;
    Total?: number;
    Year?: number;
    Month?: number;
    MembershipID?: number;
    PaymentCode?: string;
    FullName?: string;
    MembershipCode?: string;
    TaxCode?: string;
    Email?: string;
    Phone?: string;
    Address?: string;
}
