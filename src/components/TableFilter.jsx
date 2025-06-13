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

  const toggleFilter = useCallback(
    (filterType, value) => {
      const currentFilters = [...(filters[filterType] ?? [])];
      const index = currentFilters.indexOf(value);

      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }

      onFilterChange({
        ...filters,
        [filterType]: currentFilters,
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

  const removeStatusFilter = useCallback(
    (status) => {
      onFilterChange({
        ...filters,
        statuses: (filters.statuses ?? []).filter(s => s !== status),
      });
    },
    [filters, onFilterChange]
  );

  const removeCurrencyFilter = useCallback(
    (currency) => {
      onFilterChange({
        ...filters,
        currencyPairs: (filters.currencyPairs ?? []).filter(c => c !== currency),
      });
    },
    [filters, onFilterChange]
  );

  const removeTypeFilter = useCallback(
    (type) => {
      onFilterChange({
        ...filters,
        types: (filters.types ?? []).filter(t => t !== type),
      });
    },
    [filters, onFilterChange]
  );

  const removeDatePeriodFilter = useCallback(() => {
    onFilterChange({
      ...filters,
      datePeriod: '',
    });
  }, [filters, onFilterChange]);

  const hasActiveFilters =
    (filters.types ?? []).length > 0 ||
    (filters.paymentTypes ?? []).length > 0 ||
    (filters.statuses ?? []).length > 0 ||
    (filters.currencyPairs ?? []).length > 0 ||
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
          {(filters.statuses ?? []).map(status => (
            <div key={status} className="flex items-center h-10 bg-white rounded-md border border-gray-200 px-2 font-light cursor-pointer">
              <span className="text-sm">Status: <span className='font-normal'>{status}</span></span>
              <button onClick={() => removeStatusFilter(status)} className="ml-2 text-gray-500 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
          ))}

          {(filters.types ?? []).map(type => (
            <div key={type} className="flex items-center h-10 bg-white rounded-md border border-gray-200 px-2 font-light cursor-pointer">
              <span className="text-sm">Loan type: <span className='font-normal'>{type}</span></span>
              <button onClick={() => removeTypeFilter(type)} className="ml-2 text-gray-500 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
          ))}

          {(filters.paymentTypes ?? []).map(type => (
            <div key={type} className="flex items-center h-10 bg-white rounded-md border border-gray-200 px-2 font-light cursor-pointer">
              <span className="text-sm">Payment type: <span className='font-normal'>{type}</span></span>
              <button onClick={() => removeTypeFilter(type)} className="ml-2 text-gray-500 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
          ))}

          {(filters.currencyPairs ?? []).map(pair => (
            <div key={pair} className="flex items-center h-10 bg-white rounded-md border border-gray-200 px-2 font-light cursor-pointer">
              <span className="text-sm">Currency Pairs: <span className='font-normal'>{pair}</span></span>
              <button onClick={() => removeCurrencyFilter(pair)} className="ml-2 text-gray-500 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
          ))}

          {(filters.datePeriod ?? '') && (
            <div className="flex items-center h-10 bg-white rounded-md border border-gray-200 px-2 font-light cursor-pointer">
              <span className="text-sm">Date: <span className='font-normal'>{filters.datePeriod}</span></span>
              <button onClick={removeDatePeriodFilter} className="ml-2 text-gray-500 hover:text-gray-700">
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

      {true && (
        <button
          className={`flex items-center gap-2 h-8 md:h-10 px-2 md:px-3 text-sm border rounded-lg md:rounded-md cursor-pointer
          ${hasActiveFilters ? 'ml-2 text-primary bg-[#D8D9EA] border-[#667185]' : 'border-gray-200'}`}
          onClick={() => setShowFilter(!showFilter)}>
          <Filter />
          <span className='hidden md:block'>Filter</span>
        </button>
      )}

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
                          type="checkbox"
                          id={`type-${type}`}
                          checked={(filters.types ?? []).includes(type)}
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
                          type="checkbox"
                          id={`type-${type}`}
                          checked={(filters.paymentTypes ?? []).includes(type)}
                          onChange={() => toggleFilter('paymentTypes', type)}
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
                          type="checkbox"
                          id={`pair-${pair}`}
                          checked={(filters.currencyPairs ?? []).includes(pair)}
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
                          type="checkbox"
                          id={`status-${status}`}
                          checked={(filters.statuses ?? []).includes(status)}
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
                          type="radio"
                          id={`period-${period}`}
                          name="datePeriod"
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