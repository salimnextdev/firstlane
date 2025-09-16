import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import {
  useBankOptions,
  titleOptions,
  genderOptions,
  maritalStatusOptions,
  nextOfKinOptions,
  IDTypeOptions,
  accountTypeOptions,
  useLoanReasons,
  useLoanCollaterals,
  useLoanDurations,
  useLoanIntervals,
  useInvestmentIntervals,
  useLoanDropdowns,
} from '@/utils/dropdownOptions';
import * as redux from 'react-redux';
import {
  fetchBanks,
} from '@/modules/wallets/state/walletSlice';
import {
  fetchCollateral,
  fetchDuration,
  fetchInterval,
  fetchPurpose,
} from '@/modules/kyc/state/dropdownSlice';

// Mock the Redux store hooks
vi.mock('react-redux', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

describe('Dropdown Hooks', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    redux.useDispatch.mockReturnValue(mockDispatch);
  });

  describe('useBankOptions', () => {
    it('should dispatch fetchBanks on mount if banks are empty', () => {
      redux.useSelector.mockReturnValue({ banks: [], loading: false, error: null });
      renderHook(() => useBankOptions());
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should not dispatch fetchBanks if banks are already present', () => {
      redux.useSelector.mockReturnValue({ banks: [{ name: 'Bank A', code: '001' }], loading: false, error: null });
      renderHook(() => useBankOptions());
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should map banks to correct options format', () => {
      const mockBanks = [
        { name: 'Bank A', code: '001' },
        { name: 'Bank B', code: '002' },
      ];
      redux.useSelector.mockReturnValue({ banks: mockBanks, loading: false, error: null });
      const { result } = renderHook(() => useBankOptions());
      expect(result.current.bankOptions).toEqual([
        { label: 'Bank A', value: '001' },
        { label: 'Bank B', value: '002' },
      ]);
    });
  });

  describe('useLoanReasons', () => {
    it('should dispatch fetchPurpose on mount if data is empty', () => {
      redux.useSelector.mockReturnValue({ data: [], loading: false, error: null });
      renderHook(() => useLoanReasons());
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should map loan reasons to correct options format', () => {
      const mockData = [{ name: 'reason1' }, { name: 'reason2' }];
      redux.useSelector.mockReturnValue({ data: mockData, loading: false, error: null });
      const { result } = renderHook(() => useLoanReasons());
      expect(result.current.options).toEqual([
        { label: 'reason1', value: 'reason1' },
        { label: 'reason2', value: 'reason2' },
      ]);
    });
  });

  describe('useLoanCollaterals', () => {
    it('should dispatch fetchCollateral on mount if data is empty', () => {
      redux.useSelector.mockReturnValue({ data: [], loading: false, error: null });
      renderHook(() => useLoanCollaterals());
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should map collateral to correct options format', () => {
      const mockData = [{ name: 'collateral1', _id: 'id1' }, { name: 'collateral2', _id: 'id2' }];
      redux.useSelector.mockReturnValue({ data: mockData, loading: false, error: null });
      const { result } = renderHook(() => useLoanCollaterals());
      expect(result.current.options).toEqual([
        { label: 'collateral1', value: 'id1' },
        { label: 'collateral2', value: 'id2' },
      ]);
    });
  });

  describe('useLoanDurations', () => {
    it('should dispatch fetchDuration on mount if data is empty', () => {
      redux.useSelector.mockReturnValue({ data: [], loading: false, error: null });
      renderHook(() => useLoanDurations());
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should map duration to correct options format', () => {
      const mockData = [{ name: 'duration1' }, { name: 'duration2' }];
      redux.useSelector.mockReturnValue({ data: mockData, loading: false, error: null });
      const { result } = renderHook(() => useLoanDurations());
      expect(result.current.options).toEqual([
        { label: 'duration1', value: 'duration1' },
        { label: 'duration2', value: 'duration2' },
      ]);
    });
  });

  describe('useLoanIntervals', () => {
    it('should dispatch fetchInterval with "loan" on mount if data is empty', () => {
      redux.useSelector.mockReturnValue({ data: [], loading: false, error: null });
      renderHook(() => useLoanIntervals());
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should map loan intervals to correct options format', () => {
      const mockData = [{ name: 'interval1' }, { name: 'interval2' }];
      redux.useSelector.mockReturnValue({ data: mockData, loading: false, error: null });
      const { result } = renderHook(() => useLoanIntervals());
      expect(result.current.options).toEqual([
        { label: 'interval1', value: 'interval1' },
        { label: 'interval2', value: 'interval2' },
      ]);
    });
  });

  describe('useInvestmentIntervals', () => {
    it('should dispatch fetchInterval with "investment" on mount if data is empty', () => {
      redux.useSelector.mockReturnValue({ data: [], loading: false, error: null });
      renderHook(() => useInvestmentIntervals());
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should map investment intervals to correct options format', () => {
      const mockData = [{ name: 'invest1' }, { name: 'invest2' }];
      redux.useSelector.mockReturnValue({ data: mockData, loading: false, error: null });
      const { result } = renderHook(() => useInvestmentIntervals());
      expect(result.current.options).toEqual([
        { label: 'invest1', value: 'invest1' },
        { label: 'invest2', value: 'invest2' },
      ]);
    });
  });

  describe('useLoanDropdowns', () => {
    it('should return all loan-related hooks', () => {
      // Mock for all useSelector calls within the sub-hooks
      const mockState = {
        dropdownOptions: {
          purpose: { data: [{ name: 'reason' }], loading: false, error: null },
          duration: { data: [{ name: 'duration' }], loading: false, error: null },
          interval: { data: [{ name: 'interval' }], loading: false, error: null },
          collateral: { data: [{ name: 'collateral', _id: 'id' }], loading: false, error: null },
        },
      };

      redux.useSelector.mockImplementation((selector) => {
        return selector(mockState);
      });

      const { result } = renderHook(() => useLoanDropdowns());
      expect(result.current.loanReasons.options).toEqual([{ label: 'reason', value: 'reason' }]);
      expect(result.current.loanDurations.options).toEqual([{ label: 'duration', value: 'duration' }]);
      expect(result.current.loanIntervals.options).toEqual([{ label: 'interval', value: 'interval' }]);
      expect(result.current.loanCollaterals.options).toEqual([{ label: 'collateral', value: 'id' }]);
    });
  });

  describe('Constant Arrays', () => {
    it('should have correct title options', () => {
      expect(titleOptions).toEqual([
        { label: "Mr", value: "Mr" },
        { label: "Mrs", value: "Mrs" },
        { label: "Sir", value: "Sir" },
        { label: "Miss", value: "Miss" },
    ]);
    });

    it('should have correct gender options', () => {
      expect(genderOptions).toEqual([
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ]);
    });

    it('should have correct marital status options', () => {
      expect(maritalStatusOptions).toEqual([
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' },
      ]);
    });

    it('should have correct next of kin options', () => {
      expect(nextOfKinOptions).toEqual([
        { label: 'Father', value: 'father' },
        { label: 'Mother', value: 'mother' },
        { label: 'Brother', value: 'brother' },
        { label: 'Sister', value: 'sister' },
        { label: 'Uncle', value: 'uncle' },
        { label: 'Aunty', value: 'aunty' },
      ]);
    });

    it('should have correct ID type options', () => {
      expect(IDTypeOptions).toEqual([
        { label: 'Passport', value: 'passport' },
        { label: "Driver's License", value: 'drivers-license' },
        { label: 'National Identity Card(NIN)', value: 'nin' },
      ]);
    });

    it('should have correct account type options', () => {
      expect(accountTypeOptions).toEqual([
        { label: 'Savings', value: 'Savings' },
        { label: 'Current', value: 'Current' },
      ]);
    });
  });
});