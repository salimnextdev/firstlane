import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanks } from '@/modules/wallets/state/walletSlice';

export const useBankOptions = () => {
  const dispatch = useDispatch();
  const { banks: banks, loading: loading, error: error } = useSelector((state) => state.wallet);
  useEffect(() => {
    // Only dispatch if banks haven't been loaded yet and we're not already loading
    if (!banks || banks.length === 0 && !loading && !error) { // Add checks to prevent unnecessary dispatches
      dispatch(fetchBanks());
    }
  }, [dispatch, banks, loading, error]);

  // Memoize the options to prevent unnecessary re-renders of components that use this hook
  const bankOptions = useMemo(() => {
    if (!banks) return []; // Return empty array if banks is null/undefined
    return banks.map((bank) => ({
      label: bank.name,
      value: bank.code,
    }));
  }, [banks]);
  
  return { bankOptions, loading, error };
};

export const titleOptions = [
  { value: 'mr', label: 'Mr' },
  { value: 'mrs', label: 'Mrs'},
]

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
  { label: "Father", value: "father" },
  { label: "Mother", value: "mother" },
  { label: "Brother", value: "brother" },
  { label: "Sister", value: "sister" },
  { label: "Uncle", value: "uncle" },
  { label: "Aunty", value: "aunty" },
];

export const IDTypeOptions = [
    { label: "Passport", value: "passport" },
    { label: "Driver's License", value: "drivers-license" },
    { label: "National Identity Card(NIN)", value: "nin" },
];

export const accountTypeOptions = [
  { label: "Savings", value: "Savings" },
  { label: "Current", value: "Current" },
];


