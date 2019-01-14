// Original code provided  by freshGrade

import { IPayroll, IAddressBook, IWorkHistory, IEmailApi } from './interfaces';

// We haved decided to grant bonus vacation to every employee, 1 day per year of experience
// we need to email them a notice
export function EmailVacationGrant(
  emailApi: IEmailApi,
  workHistory: IWorkHistory[],
  addressBook: IAddressBook[],
  payroll: IPayroll[]
) {
  for(let i = 0; i<workHistory.length; ++i) {
    let employee = workHistory[i];
    let address = addressBook.find(x => x.empNo==employee.empNo);
    let empPayroll = payroll.find(x => x.empNo==employee.empNo);
    
    if (address === undefined || empPayroll === undefined) {
      console.log(`Records incomplete for ${employee}, email aborted.`);
      console.log(`address: ${address}, payroll: ${empPayroll}`);
      continue;
    }

    let newVacationBalance = employee.yearsEmployed + empPayroll.vacationDays;
    let emailBody =  `Dear ${employee.name}\n` +
    `based on your ${employee.yearsEmployed} ${employee.yearsEmployed === 1 ? 'year' : 'years'} of employment, you have been granted ${employee.yearsEmployed} ${employee.yearsEmployed === 1 ? 'day' : 'days'} of vacation, bringing your total to ${newVacationBalance}`;

    emailApi.sendEmail(address.email, emailBody)
  }
  return
}