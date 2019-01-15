import { IPayroll, IAddressBook, IWorkHistory, IEmailApi } from '../src/interfaces'
import { EmailVacationGrant } from '../src/EmailVacationGrant';
import { EmailVacationGrant as originalCode } from '../src/originalCode';
import { expect } from 'chai';
import * as sinon from 'sinon';
import testData from '../src/data/data';
import 'mocha';

const testEmailApi: IEmailApi= {
  sendEmail: () => {}
};

describe('EmailVacationGrant function', () => {
  it('should call sendEmail for each workHistory', () => {
    const spy = sinon.spy(testEmailApi, 'sendEmail');
    const result = EmailVacationGrant(
      testEmailApi,
      testData.workHistory,
      testData.addressBook,
      testData.payroll
    );
    expect(spy.callCount).to.equal(testData.workHistory.length);
    sinon.restore();
  });

  it('should run faster than originalCode.ts', function () {
    this.timeout(0);

    let newRunTimeTotal = 0;
    let originalRunTimeTotal = 0;
    let samples = 100;
    for (let i = 0; i < samples; i++) {
      // This all run synchronously for now. Returning a promise may be a valuable feature in the future.
      const startOfEmailVacationGrant = Date.now()
      EmailVacationGrant(
        testEmailApi,
        testData.workHistory,
        testData.addressBook,
        testData.payroll
      );
      const startOfOriginalCode = Date.now();
      originalCode(
        testEmailApi,
        testData.workHistory,
        testData.addressBook,
        testData.payroll
      );
      originalRunTimeTotal += Date.now() - startOfOriginalCode;
      newRunTimeTotal += startOfOriginalCode - startOfEmailVacationGrant;
    }
    const relativeImprovementPercent = (originalRunTimeTotal - newRunTimeTotal) / originalRunTimeTotal * 100;
    console.log(`Original run time avg: ${originalRunTimeTotal / samples}ms`);
    console.log(`New run time avg: ${newRunTimeTotal / samples}ms`);
    console.log(`Realative improvement: ${Math.round(relativeImprovementPercent)}%`);
    expect(relativeImprovementPercent).to.be.greaterThan(0);
    sinon.restore();
  });
});


