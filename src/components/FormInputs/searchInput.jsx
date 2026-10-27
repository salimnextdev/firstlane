import { Loader2 } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";

/**
 * A generic searchable input component using react-select.
 * It filters the provided 'data' prop based on user input.
 *
 * @param {object} props - The component props.
 * @param {string} [props.label] - The label for the input field.
 * @param {string} props.name - The name attribute for the input, used in the onChange event.
 * @param {any} props.value - The currently selected value (controlled component).
 * @param {function} props.onChange - Callback function when the selected value changes.
 * @param {Array<{value: any, label: string}>} [props.data=[]] - The array of options to display and search through.
 * @param {string} [props.placeholder='Search...'] - The placeholder text for the input.
 * @param {string} [props.className=''] - Additional CSS classes for the container div.
 * @param {object} rest - Any other props to pass directly to the react-select component.
 */

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

const SearchInput = ({
    label,
    name,
    value,
    onChange,
    data = [], // Expect data in { value: '', label: '' } format
    placeholder = 'Search...',
    className = "",
    loading,
    ...rest
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [filteredOptions, setFilteredOptions] = useState([]);

    // Effect to initialize filteredOptions with the full data prop
    // when the component mounts or the 'data' prop changes.
    useEffect(() => {
        if (Array.isArray(data)) {
            setFilteredOptions(data);
        } else {
            // Log a warning if data is not an array, as it's required for this component's functionality
            //   console.warn("SearchInput: 'data' prop must be an array of {label, value} objects. Received:", data);
            setFilteredOptions([]);
        }
    }, [data]);

    // Effect to manage the selected value for react-select when the 'value' prop changes.
    // This ensures the component is properly controlled by its parent.
    useEffect(() => {
        if (value !== null && value !== undefined) {
            // Find the corresponding option object from the original 'data' prop
            const foundOption = (Array.isArray(data) ? data : []).find(
                option => option.value === value
            );
            setSelectedOption(foundOption || null);
        } else {
            setSelectedOption(null);
        }
    }, [value, data]); // Depend on data too, in case the data list itself changes and affects finding the option

    // Handles filtering the 'data' prop based on user input in the search field.
    const handleInputChange = useCallback((input) => {
        if (Array.isArray(data)) {
            const newFilteredOptions = data.filter(item =>
                item.label.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredOptions(newFilteredOptions);
        }
    }, [data]); // Dependency: 'data' prop for filtering logic

    // Handles selection change from the dropdown.
    // It updates the internal state and calls the parent's onChange handler.
    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
        // Mimic the event object structure of a native input for consistency with form libraries
        onChange && onChange({ target: { name, value: selected?.value } });
    };

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
                className="mt-1 text-sm font-light cursor-pointer"
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
                        backgroundColor: 'var(--fistlane-bg-currency)',
                    }),
                    input: (provided) => ({
                        ...provided,
                        margin: '0',
                        padding: '0',
                        color: 'var(--fistlane-color) !important',
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        margin: '0',
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        margin: '0',
                        color: 'var(--fistlane-color) !important',
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected && '#D8D9EA',
                        color: state.isSelected && '#3E4095'
                    }),
                }}
                value={selectedOption} // The currently selected option object for react-select
                onInputChange={handleInputChange} // Callback for when user types in the search box
                onChange={handleSelectChange} // Callback for when user selects an item from the dropdown
                options={filteredOptions} // The list of options to display in the dropdown (filtered by input)
                components={{
                    LoadingMessage: CustomLoader, // Use the custom Lucide Loader component
                    NoOptionsMessage: NoOptionsMessage, // Show "No matching options" when not loading and no results
                }}
                isLoading={loading} // Tell react-select that we are loading
                isClearable // Allows clearing the selected value
                placeholder={placeholder}
                {...rest} // Spread any additional props to react-select
            />
        </div>
    );
};

export default SearchInput;