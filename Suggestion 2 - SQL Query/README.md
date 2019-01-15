# freshGrade Code Challenge
## Suggestion 2 - SQL Query

### Introduction

Although it was stated the Data Models represented by the interfaces come from an external database and cannot be changed, this implementation is just a simple proof-of-concept of an improved database query should the external database be query-able. It relies on Knex.js, a popular js framework for SQL query building that is agnostic of the underlying sequel language. I created a barebones PSQL database with minimal seeding to test the query and its output.


Given the pseudo-code 
``` js 
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
it is clear the majority of the computation is spent searching the data models for a particular ID. The greatest improvement would be to query the database and return a data model that allows for immediate computation of the desired operation (i.e. `sendEmail`). This is of course dependent on the time it takes to connect to the external database, but for very large input this method will show the greatest improvement.

This method may not be consistent with existing design patterns or available infastructure, and as such is included in this submission for exemplary purposes only. In production, the query building could be done with higher order functions and more modularity by way of abstract helper functions that are used throughout the code base, perhaps with an in-house framework built on top of pg directly instead of knex. 

### Conclusion

Implementing a data-driven approach would of course solve the root of the problem, but may not be reconcilable with existing code. This trivial solution is for exemplary purposes only.
