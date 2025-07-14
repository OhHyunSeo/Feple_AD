import { useState, useCallback } from 'react';
import { FilterOptions, SortOptions } from '@/types';
import { DEFAULT_VALUES } from '@/constants';

export function useFilters() {
  const [filters, setFilters] = useState<FilterOptions>({
    period: DEFAULT_VALUES.FILTER_PERIOD as '1',
    department: DEFAULT_VALUES.FILTER_DEPARTMENT,
  });

  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: DEFAULT_VALUES.SORT_FIELD,
    direction: DEFAULT_VALUES.SORT_DIRECTION,
  });

  const updateFilter = useCallback((key: keyof FilterOptions, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateMultipleFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      period: DEFAULT_VALUES.FILTER_PERIOD as '1',
      department: DEFAULT_VALUES.FILTER_DEPARTMENT,
    });
  }, []);

  const updateSort = useCallback((field: string, direction: 'asc' | 'desc') => {
    setSortOptions({
      field,
      direction,
    });
  }, []);

  const resetSort = useCallback(() => {
    setSortOptions({
      field: DEFAULT_VALUES.SORT_FIELD,
      direction: DEFAULT_VALUES.SORT_DIRECTION,
    });
  }, []);

  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== 'all' && value !== DEFAULT_VALUES.FILTER_PERIOD
  );

  return {
    filters,
    sortOptions,
    updateFilter,
    updateMultipleFilters,
    clearFilters,
    updateSort,
    resetSort,
    hasActiveFilters,
  };
} 