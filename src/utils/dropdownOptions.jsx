import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanks } from '@/modules/wallets/state/walletSlice';
import {
  fetchCollateral,
  fetchDuration,
  fetchInterval,
  fetchPurpose,
} from '@/modules/kyc/state/dropdownSlice';

export const useBankOptions = () => {
  const dispatch = useDispatch();
  const { banks, loading, error } = useSelector((state) => state.wallet);

  useEffect(() => {
    if (!banks || banks.length === 0 && !loading && !error) {
      dispatch(fetchBanks());
    }
  }, [dispatch, banks, loading, error]);

  const bankOptions = useMemo(() => {
    if (!banks) return [];
    return banks.map((bank) => ({
      label: bank.name,
      value: bank.code,
    }));
  }, [banks]);

  return { bankOptions, loading, error };
};

export const titleOptions = [
  { value: 'mr', label: 'Mr' },
  { value: 'mrs', label: 'Mrs' },
];

export const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const maritalStatusOptions = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
];

export const nextOfKinOptions = [
  { label: 'Father', value: 'father' },
  { label: 'Mother', value: 'mother' },
  { label: 'Brother', value: 'brother' },
  { label: 'Sister', value: 'sister' },
  { label: 'Uncle', value: 'uncle' },
  { label: 'Aunty', value: 'aunty' },
];

export const IDTypeOptions = [
  { label: 'Passport', value: 'passport' },
  { label: "Driver's License", value: 'drivers-license' },
  { label: 'National Identity Card(NIN)', value: 'nin' },
];

export const accountTypeOptions = [
  { label: 'Savings', value: 'Savings' },
  { label: 'Current', value: 'Current' },
];

// --------- NEW HOOKS FOR DROPDOWN DATA FROM API -------- //

export const useLoanReasons = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dropdownOptions.purpose);

  useEffect(() => {
    if (data.length === 0 && !loading && !error) {
      dispatch(fetchPurpose());
    }
  }, [dispatch, data, loading, error]);

  const options = useMemo(() => {
    return data.map((item) => ({
      label: item.name,
      value: item.name,
    }));
  }, [data]);

  return { options, loading, error };
};

export const useLoanCollaterals = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dropdownOptions.collateral);

  useEffect(() => {
    if (data.length === 0 && !loading && !error) {
      dispatch(fetchCollateral());
    }
  }, [dispatch, data, loading, error]);

  const options = useMemo(() => {
    return data.map((item) => ({
      label: item.name,
      value: item.name,
    }));
  }, [data]);

  return { options, loading, error };
};

export const useLoanDurations = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dropdownOptions.duration);

  useEffect(() => {
    if (data.length === 0 && !loading && !error) {
      dispatch(fetchDuration());
    }
  }, [dispatch, data, loading, error]);

  const options = useMemo(() => {
    return data.map((item) => ({
      label: item.name,
      value: item.name,
    }));
  }, [data]);

  return { options, loading, error };
};

export const useLoanIntervals = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dropdownOptions.interval);

  useEffect(() => {
    if (data.length === 0 && !loading && !error) {
      dispatch(fetchInterval());
    }
  }, [dispatch, data, loading, error]);

  const options = useMemo(() => {
    return data.map((item) => ({
      label: item.name,
      value: item.name,
    }));
  }, [data]);

  return { options, loading, error };
};


export const useLoanDropdowns = () => {
  return {
    loanReasons: useLoanReasons(),
    loanDurations: useLoanDurations(),
    loanIntervals: useLoanIntervals(),
    loanCollaterals: useLoanCollaterals(),
  };
};
