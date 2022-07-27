import '@testing-library/jest-dom'
import { MsalReactTesterPlugin } from 'msal-react-tester'
import { vi, expect } from 'vitest'

MsalReactTesterPlugin.init({
  spyOn: vi.spyOn,
  expect: expect,
  resetAllMocks: vi.resetAllMocks
})