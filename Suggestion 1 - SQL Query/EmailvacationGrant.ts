import {Payroll, AddressBook, WorkHistory, EmailApi} from './interfaces';

// We haved decided to grant bonus vacation to every employee, 1 day per year of experience
// we need to email them a notice
export default function EmailVacationGrant(
  emailApi: EmailApi,
  workHistory: WorkHistory[],
  addressBook: AddressBook[],
  payroll: Payroll[],
) {
  // ------OLD METHOD--------
  // for(let i : number = 0; i < workHistory.length; ++i) {
  //   let employee = workHistory[i];
  //   let address = addressBook.find(x => x.empNo === employee.empNo);
  //   let empPayroll = payroll.find(x => x.empNo === employee.empNo);
    
  //   let newVacationBalance = employee.yearsEmployed + empPayroll.vacationDays;
  //   let emailBody =  `Dear ${employee.name}\n` +
  //   `based on your ${employee.yearsEmployed} ${employee.yearsEmployed === 1 ? 'year' : 'years'} of employment, you have been 
  //   granted ${employee.yearsEmployed} ${employee.yearsEmployed === 1 ? 'day' : 'days'} of vacation, bringing your total to ${newVacationBalance}`;
    
  //   emailApi.sendEmail(address.email, emailBody);
  // }

  // ------KNEX METHOD-------
  // SELECT AddressBook.email, WorkHistory.name, WorkHistory.years, payroll.vacationDays 
  // from AddressBook 
  // JOIN WorkHistory ON (AddressBook.empNo = WorkHistory.empNo)
  // JOIN payroll ON (AddressBook.empNo = payroll.empNo)
  knex
    .select(
      'AddressBook.email as email', 
      'WorkHistory.name as name', 
      'WorkHistory.yearsEmployed as yearsEmployed', 
      'payroll.vacationDays as vacationDays'
    )
    .from('WorkHistory')
    .join('WorkHistory', 'AddressBook.empNo', 'WorkHistory.empNo')
    .join('payroll', 'AddressBook.empNo', 'payroll.empNo')
    .then(rows => {
      // typechecking the destructed properties could be accomplished with a new
      // interface containing email, name, yearsEmployed, vacationDays
      rows.map( ({email, name, yearsEmployed, vacationDays}: any) => {
        let newVacationBalance = yearsEmployed + vacationDays;
        let emailBody =  `Dear ${name}\n` +
          `based on your ${yearsEmployed} ${yearsEmployed === 1 ? 'year' : 'years'} of employment, you have been 
          granted ${yearsEmployed} ${yearsEmployed === 1 ? 'day' : 'days'} of vacation, bringing your total to ${newVacationBalance}`;
        
        emailApi.sendEmail(email, emailBody)
      })
    })
    .catch(e => console.error(e))
    .finally(() => knex.destroy());
}

/*
assumptions:
  wh === workHistory in EmailVacationGrant for-loop
  EmailvacationGrant is supposed to be a function definition
  Defining payroll inside the EmailVacationGrant for-loop was an oversight, since that namespace is taken by the parameter 'payroll'
*/