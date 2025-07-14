import { useState, useEffect } from 'react';
import { SessionData, PerformanceStats, UsePerformanceResult } from '@/types';
import { mockSessionData, mockTodayStats } from '@/data/mockData';

export function usePerformance(consultantId?: string): UsePerformanceResult {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [stats, setStats] = useState<PerformanceStats>(mockTodayStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPerformanceData();
  }, [consultantId]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPerformanceData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter sessions for specific consultant if provided
      let filteredSessions = mockSessionData;
      if (consultantId) {
        // In a real app, we'd filter by consultantId
        filteredSessions = mockSessionData.slice(0, 3);
      }
      
      setSessions(filteredSessions);
      setStats(mockTodayStats);
    } catch {
      setError('성과 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    loadPerformanceData();
  };

  // Calculate additional metrics
  const averageScore = sessions.length > 0 
    ? sessions.reduce((sum, session) => sum + session.finalScore, 0) / sessions.length 
    : 0;

  const enhancedStats: PerformanceStats = {
    ...stats,
    satisfactionScore: Math.round(averageScore * 10) / 10,
  };

  return {
    sessions,
    stats: enhancedStats,
    isLoading,
    error,
    refetch,
  };
} 