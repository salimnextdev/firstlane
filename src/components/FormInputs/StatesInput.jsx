import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStates } from '@/modules/kyc/state/kycSlice';
import SearchInput from './searchInput';
import { toast } from 'sonner';

const StatesInput = ({ value, onChange, ...props }) => {
  const dispatch = useDispatch();
  const [states_loading, setStatesLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchStateOptions = async () => {
      setStatesLoading(true);
      try {
        const resultAction = await dispatch(fetchStates());
        if (fetchStates.fulfilled.match(resultAction)) {
          const areas = resultAction.payload.data;
          setOptions(areas.map((state) => ({ label: state, value: state })));
        } else {
          toast.error(resultAction.payload?.message || "Failed to fetch States");
          setOptions([]);
        }
      } catch (err) {
        toast.error("An unexpected error occurred while fetching States");
        setOptions([]);
      } finally {
        setStatesLoading(false);
      }
    };

    fetchStateOptions();
  }, [dispatch]);

  return (
    <SearchInput
      label="State"
      name="state"
      className="text-sm"
      value={value}
      onChange={onChange}
      data={options}
      placeholder="Select State"
      loading={states_loading}
      {...props}
    />
  );
};

export default StatesInput;