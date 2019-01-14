# freshGrade Code Challenge
## Suggestion 1 - HashMap

### Introduction

Given the pseudo-code 
``` js 
interface Payroll {
  empNo: string;
  vacationDays: number;
}
 
interface AddressBook {
  empNo: string;
  email: string;
}
 
interface WorkHistory {
  empNo: string;
  name: string;
  yearsEmployed: number;
}
 
interface EmailApi {
  sendEmail(email: string, body: string);
}
 
// We haved decided to grant bonus vacation to every employee, 1 day per year of experience
// we need to email them a notice
EmailVacationGrant(
  emailApi: EmailApi,
  workHistory: WorkHistory[],
  addressBook: AddressBook[],
  payroll: Payroll[],
) {
  for(int i=0; i<workHistory.length; ++i) {
    let employee = wh[i];
    let address = addressBook.find(x => x.empNo==employee.empNo);
    let payroll = payroll.find(x => x.empNo==employee.empNo);
 
    let newVacationBalance = employee.yearsEmployed + payroll.vacationDays;
    emailApi.sendEmail(
      address.email,
      `Dear ${employee.name}\n` +
      `based on your ${employee.yearsEmployed} years of employment, you have been granted ${employee.yearsEmployed} days of vacation, bringing your total to ${newVacationBalance}`);
  }
}
```
improvements can be immediately realized by replacing the array.prototype.find redundancy inside the for-loop. Since this method searches linearly through the array and we expect payroll, workHistory and addressBook to be of similar if not equal length, the methods are searching many redundant elements on each iteration.

By replacing the arrays with hashmaps indexed by the property we are searching on, we can turn the variable length computation within the for loop to a constant time operation of a single object lookup. Given that the payroll and addressBook are of similar length (say, `n`) to workHistory, this turns one n-length loop with two `n / 2` operations on each iteration (on average, assuming matching `empNo`'s in each array, each iteration searches half the array) into three n-length iterations consisting of constant time operations.

### Conclusion

This simple implementation difference reduces the time complexity from `O(n^2)` to `O(n)`. Further consideration could be relevent depending on the confidence of above assumptions around payroll, addressBook and workHistory similarities.