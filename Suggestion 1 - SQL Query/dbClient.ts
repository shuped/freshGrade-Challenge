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