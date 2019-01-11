export interface Payroll {
  empNo:         string;
  vacationDays:  number;
}
 
export interface AddressBook {
  empNo:         string;
  email:         string;
}
 
export interface WorkHistory {
  empNo:         string;
  name:          string;
  yearsEmployed: number;
}
 
export interface EmailApi {
  sendEmail(email: string, body: string);
}