interface Payroll {
  empNo:         string;
  vacationDays:  number;
}
 
interface AddressBook {
  empNo:         string;
  email:         string;
}
 
interface WorkHistory {
  empNo:         string;
  name:          string;
  yearsEmployed: number;
}
 
interface EmailApi {
  sendEmail(email: string, body: string);
}

// We haved decided to grant bonus vacation to every employee, 1 day per year of experience
// we need to email them a notice
function EmailVacationGrant(
  emailApi: EmailApi,
  workHistory: WorkHistory[],
  addressBook: {},  // I'm still learning how to check the index signature of this object's properties
  payroll: {},      // I'm still learning how to check the index signature of this object's properties
) {
  for(let employee of workHistory) {

    let { empNo, name, yearsEmployed } = employee;
    let { email } = addressBook[empNo];
    let { vacationDays } = payroll[empNo];

    if (email === undefined || vacationDays === undefined) {
      console.log(`Records incomplete for ${employee}, email aborted.`);
      console.log(`email: ${email}, vacationDays: ${vacationDays}`);
      continue;
    }
    
    let newVacationBalance = yearsEmployed + vacationDays;
    let emailBody =  `Dear ${name}\n` +
    `based on your ${yearsEmployed} ${yearsEmployed === 1 ? 'year' : 'years'} of employment, you have been 
    granted ${yearsEmployed} ${yearsEmployed === 1 ? 'day' : 'days'} of vacation, bringing your total to ${newVacationBalance}`;
    
    emailApi.sendEmail(email, emailBody)
    
  }
}

// Create objects keyed by empNo for quick lookup of Payroll and AddressBook
let indexedAddressBook = addressBook.reduce((acc: {}, x: AddressBook) => {
  return {...acc, [x.empNo]: x}
}, {})
let indexPayroll = payroll.reduce((acc: {}, x: Payroll) => {
  return {...acc, [x.empNo]: x}
}, {})
EmailVacationGrant(EmailAPI, workHistory, indexedAddressBook, indexPayroll)

/*
assumptions:
  wh === workHistory in EmailVacationGrant for-loop
  EmailvacationGrant is supposed to be a function definition
  Defining payroll inside the EmailVacationGrant for-loop was an oversight, since that namespace is taken by the parameter 'payroll'
*/