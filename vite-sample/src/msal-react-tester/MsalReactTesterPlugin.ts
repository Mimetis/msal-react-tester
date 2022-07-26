import { expect as viExpect, vi } from "vitest";

export class GlobalOptions {
    public static TestRunner: "vitest" | "jest" = "vitest"
}

export interface ITestRunner {
    spyOn: Function,
    expect: Function,
    resetAllMocks : Function
}

export const getTestRunner = (): ITestRunner => {
    if (GlobalOptions.TestRunner === "jest")
        return {
            spyOn: jest.spyOn,
            expect: expect,
            resetAllMocks : jest.resetAllMocks
        };
    else
        return {
            spyOn: vi.spyOn,
            expect: viExpect,
            resetAllMocks: vi.resetAllMocks
        }
} 
