import React, { useState, useCallback } from 'react';
import { ChevronDown, MoveRight, X } from 'lucide-react';

import { ReactComponent as Filter } from '@/assets/icons/filter.svg';

const TableFilter = ({ filterOptions, filters, onFilterChange, onClearFilters }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    loanType: false,
    paymentType: false,
    status: false,
    datePeriod: false,
    currencyPair: false,
  });

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  // MODIFIED: This function now handles single selection per filter type using checkboxes
  const toggleFilter = useCallback(
    (filterType, value) => {
      const isCurrentlySelected = filters[filterType] === value;
      onFilterChange({
        ...filters,
        [filterType]: isCurrentlySelected ? '' : value, // If currently selected, deselect; otherwise, select new value
      });
    },
    [filters, onFilterChange]
  );

  const handleDatePeriodChange = useCallback(
    (period) => {
      onFilterChange({
        ...filters,
        datePeriod: (filters.datePeriod ?? '') === period ? '' : period,
      });
    },
    [filters, onFilterChange]
  );

  const removeFilter = useCallback(
    (filterType) => {
      onFilterChange({
        ...filters,
        [filterType]: '',
      });
    },
    [filters, onFilterChange]
  );

  const hasActiveFilters =
    (filters.types ?? '') !== '' ||
    (filters.paymentTypes ?? '') !== '' ||
    (filters.statuses ?? '') !== '' ||
    (filters.currencyPairs ?? '') !== '' ||
    (filters.datePeriod ?? '') !== '';

  const hasFilterOptions =
    (filterOptions?.types?.length > 0) ||
    (filterOptions?.paymentTypes?.length > 0) ||
    (filterOptions?.statuses?.length > 0) ||
    (filterOptions?.currencyPairs?.length > 0) ||
    (filterOptions?.datePeriods?.length > 0);

  if (!hasFilterOptions) return null;

  return (
    <div className="relative flex justify-center items-center">
      {hasActiveFilters && (
        <div className="hidden md:flex flex-wrap gap-2">
          {(filters.statuses) && (
            <div key={filters.statuses} className="flex items-center h-10 bg-white rounded-md border border-gray-200 px-2 font-light cursor-pointer">
              <span className="text-sm">Status: <span className='font-normal'>{filters.statuses}</span></span>
              <button onClick={() => removeFilter('statuses')} className="ml-2 text-gray-500 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
          )}

          {(filters.types) && (
            <div key={filters.types} className="flex items-center h-10 bg-white rounded-md border border-gray-200 px-2 font-light cursor-pointer">
              <span className="text-sm">Loan type: <span className='font-normal'>{filters.types} loan</span></span>
              <button onClick={() => removeFilter('types')} className="ml-2 text-gray-500 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
          )}

          {(filters.paymentTypes) && (
            <div key={filters.paymentTypes} className="flex items-center h-10 bg-white rounded-md border border-gray-200 px-2 font-light cursor-pointer">
              <span className="text-sm">Payment type: <span className='font-normal'>{filters.paymentTypes}</span></span>
              <button onClick={() => removeFilter('paymentTypes')} className="ml-2 text-gray-500 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
          )}

          {(filters.currencyPairs) && (
            <div key={filters.currencyPairs} className="flex items-center h-10 bg-white rounded-md border border-gray-200 px-2 font-light cursor-pointer">
              <span className="text-sm">Currency Pairs: <span className='font-normal'>{filters.currencyPairs}</span></span>
              <button onClick={() => removeFilter('currencyPairs')} className="ml-2 text-gray-500 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
          )}

          {(filters.datePeriod) && (
            <div className="flex items-center h-10 bg-white rounded-md border border-gray-200 px-2 font-light cursor-pointer">
              <span className="text-sm">Date: <span className='font-normal'>{filters.datePeriod}</span></span>
              <button onClick={() => removeFilter('datePeriod')} className="ml-2 text-gray-500 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
          )}

          <button
            onClick={() => {
              onClearFilters();
              setShowFilter(false);
            }}
            className="flex items-center h-10 bg-white rounded-md border border-gray-200 px-2 text-sm cursor-pointer">
            Clear filter
            <X size={14} className="ml-2" />
          </button>
        </div>
      )}

      <button
        className={`flex items-center gap-2 h-8 md:h-10 px-2 md:px-3 text-sm border rounded-lg md:rounded-md cursor-pointer
                    ${hasActiveFilters ? 'ml-2 text-primary bg-[#D8D9EA] border-[#667185]' : 'border-gray-200'}`}
        onClick={() => setShowFilter(!showFilter)}>
        <Filter />
        <span className='hidden md:block'>Filter</span>
      </button>

      {showFilter && (
        <div className="absolute right-0 top-10 md:top-12 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="p-4">
            {filterOptions?.types?.length > 0 && (
              <div className="mb-3">
                <button
                  className="flex items-center justify-between w-full text-left font-light"
                  onClick={() => toggleSection('loanType')}>
                  <span className="text-sm">Type</span>
                  {expandedSections.loanType ? <ChevronDown size={16} /> : <MoveRight size={16} />}
                </button>
                {expandedSections.loanType && (
                  <div className="mt-2 space-y-2">
                    {filterOptions.types.map(type => (
                      <div key={type} className="flex items-center font-light">
                        <input
                          type="checkbox" // Kept as checkbox
                          id={`type-${type}`}
                          checked={(filters.types ?? '') === type} // Check against single value
                          onChange={() => toggleFilter('types', type)}
                          className="h-4 w-4 accent-[#3E4095] rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`type-${type}`} className="ml-2 text-sm cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {filterOptions?.paymentTypes?.length > 0 && (
              <div className="mb-3">
                <button
                  className="flex items-center justify-between w-full text-left font-light"
                  onClick={() => toggleSection('paymentType')}>
                  <span className="text-sm">Payment Type</span>
                  {expandedSections.paymentType ? <ChevronDown size={16} /> : <MoveRight size={16} />}
                </button>
                {expandedSections.paymentType && (
                  <div className="mt-2 space-y-2">
                    {filterOptions.paymentTypes.map(type => (
                      <div key={type} className="flex items-center font-light">
                        <input
                          type="checkbox" // Kept as checkbox
                          id={`paymentType-${type}`}
                          checked={(filters.paymentTypes ?? '') === type}
                          onChange={() => toggleFilter('paymentTypes', type)}
                          className="h-4 w-4 accent-[#3E4095] rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`paymentType-${type}`} className="ml-2 text-sm cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {filterOptions?.currencyPairs?.length > 0 && (
              <div className="mb-3">
                <button
                  className="flex items-center justify-between w-full text-left font-light"
                  onClick={() => toggleSection('currencyPair')}>
                  <span className="text-sm">Currency pair</span>
                  {expandedSections.currencyPair ? <ChevronDown size={16} /> : <MoveRight size={16} />}
                </button>
                {expandedSections.currencyPair && (
                  <div className="mt-2 space-y-2">
                    {filterOptions.currencyPairs.map(pair => (
                      <div key={pair} className="flex items-center font-light">
                        <input
                          type="checkbox" // Kept as checkbox
                          id={`pair-${pair}`}
                          checked={(filters.currencyPairs ?? '') === pair}
                          onChange={() => toggleFilter('currencyPairs', pair)}
                          className="h-4 w-4 accent-[#3E4095] rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`pair-${pair}`} className="ml-2 text-sm cursor-pointer">
                          {pair}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {filterOptions?.statuses?.length > 0 && (
              <div className="mb-3">
                <button
                  className="flex items-center justify-between w-full text-left font-light"
                  onClick={() => toggleSection('status')}>
                  <span className="text-sm">Status</span>
                  {expandedSections.status ? <ChevronDown size={16} /> : <MoveRight size={16} />}
                </button>
                {expandedSections.status && (
                  <div className="mt-2 space-y-2">
                    {filterOptions.statuses.map(status => (
                      <div key={status} className="flex items-center font-light">
                        <input
                          type="checkbox" // Kept as checkbox
                          id={`status-${status}`}
                          checked={(filters.statuses ?? '') === status}
                          onChange={() => toggleFilter('statuses', status)}
                          className="h-4 w-4 accent-[#3E4095] rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`status-${status}`} className="ml-2 text-sm cursor-pointer">
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {filterOptions?.datePeriods?.length > 0 && (
              <div>
                <button
                  className="flex items-center justify-between w-full text-left font-light"
                  onClick={() => toggleSection('datePeriod')}>
                  <span className="text-sm">Date period</span>
                  {expandedSections.datePeriod ? <ChevronDown size={16} /> : <MoveRight size={16} />}
                </button>
                {expandedSections.datePeriod && (
                  <div className="mt-2 space-y-2">
                    {filterOptions.datePeriods.map(period => (
                      <div key={period} className="flex items-center font-light">
                        <input
                          type="checkbox"
                          id={`period-${period}`}
                          checked={(filters.datePeriod ?? '') === period}
                          onChange={() => handleDatePeriodChange(period)}
                          className="h-4 w-4 accent-[#3E4095] rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`period-${period}`} className="ml-2 text-sm cursor-pointer">
                          {period}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFilter;