import { useState, useMemo, useEffect } from 'react';
import { Consultant, FilterOptions, UseConsultantsResult } from '@/types';
import { mockConsultants } from '@/data/mockData';

export function useConsultants(initialData?: Consultant[]): UseConsultantsResult {
  const [consultants, setConsultants] = useState<Consultant[]>(initialData || []);
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

  // API에서 상담사 데이터 가져오기
  const fetchConsultants = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/consultants');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setConsultants(data);
    } catch (err) {
      console.error('상담사 데이터 조회 실패:', err);
      setError(err instanceof Error ? err.message : '데이터 로딩 실패');
      // API 실패 시 Mock 데이터 사용
      setConsultants(mockConsultants);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchConsultants();
  };

  // 컴포넌트 마운트 시 데이터 로딩
  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      fetchConsultants();
    }
  }, [initialData]);

  return {
    consultants: filteredAndSortedConsultants,
    isLoading,
    error,
    refetch,
    filter,
    sort,
  };
} 