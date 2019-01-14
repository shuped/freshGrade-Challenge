export interface IPayroll {
  empNo:         string;
  vacationDays:  number;
}

export interface IPayrollMap {
  [indexer: string] : IPayroll
}

export interface IAddressBook {
  empNo:         string;
  email:         string;
}
 
export interface IAddressBookMap {
  [indexer: string] : IAddressBook
}

export interface IWorkHistory {
  empNo:         string;
  name:          string;
  yearsEmployed: number;
}

export interface IEmailApi {
  sendEmail(email: string, body: string) : any;
}