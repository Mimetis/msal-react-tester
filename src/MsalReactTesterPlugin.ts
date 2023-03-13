import { waitFor } from '@testing-library/react'

export interface ITestRunner {
    spyOn: Function,
    expect: Function,
    resetAllMocks: Function,
    waitingFor: Function
}

export class MsalReactTesterPlugin {

    public static TestRunner: ITestRunner = {
        spyOn: typeof jest !== 'undefined' ? jest.spyOn : () => { },
        expect: typeof jest !== 'undefined' ? expect : () => { },
        resetAllMocks: typeof jest !== 'undefined' ? jest.resetAllMocks : () => { },
        waitingFor: typeof jest !== 'undefined' ? waitFor : () => { }
    };


    public static init(testRunner: ITestRunner = null) {
        if (testRunner) {
            MsalReactTesterPlugin.TestRunner = testRunner;
        }
    }
}

