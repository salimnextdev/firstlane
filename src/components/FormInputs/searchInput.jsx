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
const SearchInput = ({
    label,
    name,
    value,
    onChange,
    data = [], // Expect data in { value: '', label: '' } format
    placeholder = 'Search...',
    className = "",
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
                        minHeight: '48px', // Equivalent to h-12 (12 * 4 = 48px)
                        height: 'auto', // Allow height to adjust if content wraps
                        borderColor: '#e5e5e5', // Focus border and default border
                        boxShadow: 'none', // Remove default react-select shadow
                        borderRadius: '0.25rem', // Equivalent to rounded
                        padding: '0 8px', // Adjust padding to mimic px-5 from TextInput, but for select's internal structure
                        '&:hover': {
                            borderColor: '#e5e5e5', // Keep border consistent on hover
                        }
                    }),
                    valueContainer: (provided) => ({
                        ...provided,
                        padding: '0 8px', // Adjust internal padding
                    }),
                    input: (provided) => ({
                        ...provided,
                        margin: '0',
                        padding: '0',
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        margin: '0',
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        margin: '0',
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
                isClearable // Allows clearing the selected value
                placeholder={placeholder}
                {...rest} // Spread any additional props to react-select
            />
        </div>
    );
};

export default SearchInput;