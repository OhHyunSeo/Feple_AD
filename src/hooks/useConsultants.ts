import { useState, useMemo } from 'react';
import { Consultant, FilterOptions, UseConsultantsResult } from '@/types';
import { mockConsultants } from '@/data/mockData';

export function useConsultants(initialData?: Consultant[]): UseConsultantsResult {
  const [consultants] = useState<Consultant[]>(initialData || mockConsultants);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortField, setSortField] = useState<keyof Consultant>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedConsultants = useMemo(() => {
    let result = [...consultants];

    // Apply filters
    if (filters.department && filters.department !== 'all') {
      result = result.filter(consultant => consultant.team === filters.department);
    }

    if (filters.status) {
      result = result.filter(consultant => consultant.status === filters.status);
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      return 0;
    });

    return result;
  }, [consultants, filters, sortField, sortDirection]);

  const filter = (options: FilterOptions) => {
    setFilters(options);
  };

  const sort = (field: keyof Consultant, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  };

  const refetch = () => {
    setIsLoading(true);
    setError(null);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return {
    consultants: filteredAndSortedConsultants,
    isLoading,
    error,
    refetch,
    filter,
    sort,
  };
} 