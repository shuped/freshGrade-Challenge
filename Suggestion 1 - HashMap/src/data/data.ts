// Create random but static employee numbers
let numberOfEmployees = 1000;
let empNos = [];
for (let i = 0; i < numberOfEmployees; i++) {
  empNos.push(Math.random().toString())
}

// Create payrolls, addressBooks and workHistorys arrays for testing
export default {
  payroll: (() => {
    let payroll = [];
    for (let i = 0; i < numberOfEmployees; i++) {
      payroll.push({
        empNo: empNos[i],
        vacationDays: Math.ceil(Math.random() * 10)
      })
    }
    return payroll;
  })(),

  addressBook: (() => {
    let addressBook = [];
    for (let i = 0; i < numberOfEmployees; i++) {
      addressBook.push({
        empNo: empNos[i],
        email: 'email' + Math.random()
      })
    }
    return addressBook;
  })(),

  workHistory: (() => {
    let workHistory = [];
    for (let i = 0; i < numberOfEmployees; i++) {
      workHistory.push({
        empNo: empNos[i],
        name: 'name' + Math.random(),
        yearsEmployed: Math.ceil(Math.random() * 10)
      })
    }
    return workHistory;
  })()
}