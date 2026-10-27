import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Select from "react-select";
import { Loader2 } from "lucide-react"; // Import Loader2 icon

// Custom Loader Component using Lucide Loader2
const CustomLoader = (props) => {
  return (
    <div
      {...props.innerProps}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px',
        fontSize: '14px',
        color: '#666',
      }}
      className="text-gray-500"
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading suggestions...
    </div>
  );
};

// NoOptionsMessage component (can be customized if needed)
const NoOptionsMessage = (props) => {
  return (
    <div {...props.innerProps} style={{ padding: '8px 12px', textAlign: 'center', color: '#999' }}>
      No matching options
    </div>
  );
};


const PlacesInput = ({
  label,
  name,
  className,
  value,
  onChange,
  placeholder = 'Search Address...',
  ...rest
}) => {
  const [options, setOptions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(value || null);
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  // Fetch location suggestions from Nominatim
  const fetchPlaces = useCallback(async (input) => {
    if (!input) {
      setOptions([]); // Clear options if input is empty
      setIsLoading(false); // Not loading if no input
      return;
    }

    setIsLoading(true); // Set loading to true before starting API call

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: input,
          format: "json",
          addressdetails: 1,
          limit: 20,
        },
      });

      const formattedOptions = response.data.map((place) => ({
        value: { lat: place.lat, lon: place.lon, display_name: place.display_name, ...place },
        label: place.display_name,
      }));

      setOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching places from Nominatim:", error);
      setOptions([]); // Ensure options are cleared on error
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependencies array is empty as this component always fetches from Nominatim

  // Handler for when the user types into the input field
  const handleInputChange = useCallback((input) => {
    // Always use Nominatim for searching
    if (input) {
      // Only set loading state if there's actual input to search for.
      // The fetchPlaces function will handle setting/clearing isLoading internally.
      setIsLoading(true);
    } else {
      // If input is cleared, clear loading state and options.
      setIsLoading(false);
      setOptions([]);
    }
    fetchPlaces(input);
  }, [fetchPlaces]);


  const handleSelectChange = (selected) => {
    setSelectedPlace(selected);
    onChange && onChange(selected?.value); // Pass the selected place to the parent
  };

  // Effect to set the initial selected place based on 'value' prop
  useEffect(() => {
    if (!value) {
      setSelectedPlace(null);
    } else if (typeof value === "string") {
      setSelectedPlace({
        value: value,
        label: value,
      });
    } else if (value && value.display_name) { // Simplified: removed '|| value.label' since we only expect Nominatim structure now
      setSelectedPlace({
        value,
        label: value.display_name,
      });
    } else {
      setSelectedPlace(null);
    }
  }, [value]);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm">
          {label}
        </label>
      )}
      <Select
        name={name}
        id={name}
        className="mt-1 font-light cursorr-pointer"
        styles={{
          control: (provided, state) => ({
            ...provided,
            minHeight: '48px',
            height: 'auto',
            backgroundColor: 'transparent',
            borderColor: 'var(--firstlane-border)',
            boxShadow: 'none',
            borderRadius: '0.25rem',
            padding: '0 8px',
            '&:hover': {
              borderColor: 'var(--firstlane-border)',
            }
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: 'var(--firstlane-bg-currency)',
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: '0 8px',
          }),
          input: (provided, state) => ({
            ...provided,
            margin: '0',
            padding: '0',
            color: state.isSelected && 'var(--fistlane-text-color)',
          }),
          placeholder: (provided, state) => ({
            ...provided,
            margin: '0',
            color: state.isSelected && 'var(--fistlane-text-color)',
          }),
          singleValue: (provided) => ({
            ...provided,
            margin: '0',
            color: 'var(--fistlane-color) !important',
          }),
        }}
        value={selectedPlace}
        onInputChange={handleInputChange}
        onChange={handleSelectChange}
        options={options}
        isClearable
        placeholder={placeholder}
        isLoading={isLoading} // Tell react-select that we are loading
        components={{
          LoadingMessage: CustomLoader, // Use the custom Lucide Loader component
          NoOptionsMessage: NoOptionsMessage, // Show "No matching options" when not loading and no results
        }}
        {...rest}
      />
    </div>
  );
};

export default PlacesInput;