import { IEmployeeVacationGrant, IEmailApi } from './interfaces';
import knexClient from './db/dbClient';

// We haved decided to grant bonus vacation to every employee, 1 day per year of experience
// we need to email them a notice
function EmailVacationGrant(
  emailApi: IEmailApi
) {
  // SELECT AddressBook.email, WorkHistory.name, WorkHistory.years, payroll.vacationDays 
  // from AddressBook 
  // JOIN WorkHistory ON (AddressBook.empNo = WorkHistory.empNo)
  // JOIN payroll ON (AddressBook.empNo = payroll.empNo);
  knexClient
    .select(
      'addressbook.email as email',
      'workhistory.empname as name',
      'workhistory.yearsemployeed as yearsEmployed',
      'payroll.vacationdays as vacationDays'
    )
    .from('workhistory')
    .join('addressbook', 'addressbook.empno', '=', 'workhistory.empno')
    .join('payroll', 'addressbook.empno', '=', 'payroll.empno')
    .then( (rows: any[]) => {
      rows.map( ({email, name, yearsEmployed, vacationDays}: IEmployeeVacationGrant) => {
        let newVacationBalance = yearsEmployed + vacationDays;
        let emailBody =  `Dear ${name},\n` +
          `based on your ${yearsEmployed} ${yearsEmployed === 1 ? 'year' : 'years'} of employment, you have been granted ${yearsEmployed} ${yearsEmployed === 1 ? 'day' : 'days'} of vacation, bringing your total to ${newVacationBalance}.`;
        
        emailApi.sendEmail(email, emailBody)
      })
    })
    .catch( (e: Error) => console.error(e))
    .finally(() => knexClient.destroy());
}

// Simple test
EmailVacationGrant({sendEmail: (email, body) => console.log(email, body)})

/*
assumptions:
  wh === workHistory in EmailVacationGrant for-loop
  EmailvacationGrant is supposed to be a function definition
  Defining payroll inside the EmailVacationGrant for-loop was an oversight, since that namespace is taken by the parameter 'payroll'
*/