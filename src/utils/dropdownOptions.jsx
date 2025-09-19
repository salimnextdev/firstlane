import React, { useEffect, useMemo, useState } from 'react';
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
  const [hasTriedFetching, setHasTriedFetching] = useState(false);

  useEffect(() => {
    if (!banks || banks.length === 0 && !loading && !error && !hasTriedFetching) {
      dispatch(fetchBanks());
      setHasTriedFetching(true);
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
  { label: "Mr", value: "Mr" },
  { label: "Mrs", value: "Mrs" },
  { label: "Sir", value: "Sir" },
  { label: "Miss", value: "Miss" },
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
      dispatch(fetchDuration('loan'));
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
      dispatch(fetchInterval('loan'));
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

export const useInvestmentIntervals = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dropdownOptions.interval);

  useEffect(() => {
    if (data.length === 0 && !loading && !error) {
      dispatch(fetchInterval('investment'));
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
