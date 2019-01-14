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

  it('should run faster than originalCode.ts', () => {
    const startOfEmailVacationGrant = Date.now()
    const result = EmailVacationGrant(
      testEmailApi,
      testData.workHistory,
      testData.addressBook,
      testData.payroll
    );
    const startOfOriginalCode = Date.now();
    const orignalResult = originalCode(
      testEmailApi,
      testData.workHistory,
      testData.addressBook,
      testData.payroll
    );
    const now = Date.now();
    const originalRunTime = now - startOfOriginalCode;
    const newRunTime = startOfOriginalCode - startOfEmailVacationGrant;
    const relativeImprovementPercent = (originalRunTime - newRunTime) / originalRunTime * 100;
    console.log(`Original run time: ${originalRunTime}ms, New run time: ${newRunTime}ms, Realative improvement: ${Math.round(relativeImprovementPercent)}%`);
    expect(relativeImprovementPercent).to.be.greaterThan(0);
    sinon.restore();
  });
});


