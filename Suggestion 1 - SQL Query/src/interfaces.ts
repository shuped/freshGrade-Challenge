export interface IPayroll {
  empNo:         string;
  vacationDays:  number;
}
 
export interface IAddressBook {
  empNo:         string;
  email:         string;
}
 
export interface IWorkHistory {
  empNo:         string;
  name:          string;
  yearsEmployed: number;
}

export interface IEmployeeVacationGrant {
  email:         string;
  name:          string;
  yearsEmployed: number;
  vacationDays:  number;
}

export interface IEmailApi {
  sendEmail(email: string, body: string): any;
}