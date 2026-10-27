import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLGA } from '@/modules/kyc/state/kycSlice';
import SearchInput from './searchInput';
import { toast } from 'sonner';

const LGAInput = ({ stateValue, value, onChange, fetch = true, ...props }) => {
  const dispatch = useDispatch();
  const [lga_loading, setLgaLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!fetch || !stateValue || stateValue === 'others') {
      setOptions([]);
      return;
    }

    const fetchLGAOptions = async () => {
      if (!stateValue) {
        setOptions([]);
        return;
      }

      setLgaLoading(true);
      try {
        const resultAction = await dispatch(fetchLGA(stateValue));
        if (fetchLGA.fulfilled.match(resultAction)) {
          const areas = resultAction.payload.data;
          setOptions(areas.map((area) => ({ label: area, value: area })));
        } else {
          toast.error(resultAction.payload?.message || "Failed to fetch LGAs");
          setOptions([]);
        }
      } catch (err) {
        toast.error("An unexpected error occurred while fetching LGAs");
        setOptions([]);
      } finally {
        setLgaLoading(false);
      }
    };

    fetchLGAOptions();
  }, [stateValue, dispatch, value, fetch]);

  return (
    <SearchInput
      label="LGA"
      name="lga"
      className="text-sm"
      value={value}
      onChange={onChange}
      data={options}
      placeholder="Select LGA"
      loading={lga_loading}
      {...props}
    />
  );
};

export default LGAInput;