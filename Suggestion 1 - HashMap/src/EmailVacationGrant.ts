import { IPayroll, IPayrollMap, IAddressBook, IAddressBookMap, IWorkHistory, IEmailApi } from './interfaces';

// We haved decided to grant bonus vacation to every employee, 1 day per year of experience
// we need to email them a notice
export function EmailVacationGrant(
  emailApi: IEmailApi,
  workHistorys: IWorkHistory[],
  addressBooks: IAddressBook[],
  payrolls: IPayroll[]
) {
  // Create hashmaps of addressBook and payroll, indexed by empNo for quick lookup
  let indexedAddressBooks: IAddressBookMap = {}; let indexedPayrolls: IPayrollMap = {};
  for (let i = 0; i < workHistorys.length; i++) {
    indexedAddressBooks[addressBooks[i].empNo] = addressBooks[i];
    indexedPayrolls[payrolls[i].empNo] = payrolls[i];
  }

  // I wanted to use the below code for the hashmaps, but for some reason its orders of magnitude slower for large input.
  // I am still investigating why, I suspect its to do with the typescript compile settings
  // let indexedAddressBooks: IAddressBookMap = addressBooks.reduce((acc: {}, addressBook: IAddressBook) => {
  //   return { ...acc, [addressBook.empNo]: addressBook }
  // }, {});
  // let indexedPayrolls: IPayrollMap = payrolls.reduce((acc: {}, payroll: IPayroll) => {
  //   return { ...acc, [payroll.empNo]: payroll }
  // }, {});

  for (let employee of workHistorys) {
    let { empNo, name, yearsEmployed } = employee;
    let { email } = indexedAddressBooks[empNo];
    let { vacationDays } = indexedPayrolls[empNo];

    if (email === undefined || vacationDays === undefined) {
      console.log(`Records incomplete for ${employee}, email aborted.`);
      console.log(`email: ${email}, vacationDays: ${vacationDays}`);
      continue;
    }
    
    let newVacationBalance = yearsEmployed + vacationDays;
    let emailBody =  `Dear ${name}\n` +
    `based on your ${yearsEmployed} ${yearsEmployed === 1 ? 'year' : 'years'} of employment, you have been granted ${yearsEmployed} ${yearsEmployed === 1 ? 'day' : 'days'} of vacation, bringing your total to ${newVacationBalance}`;
    
    emailApi.sendEmail(email, emailBody)
  }
  return
}

/*
assumptions:
  wh === workHistory in EmailVacationGrant for-loop
  EmailvacationGrant is supposed to be a function definition
  Defining payroll inside the EmailVacationGrant for-loop was an oversight, since that namespace is taken by the parameter 'payroll'
*/