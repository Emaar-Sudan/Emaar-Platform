import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axios';

interface DashboardStats {
  successRate: number;
  totalValue: number;
  tenderBids: number;
  auctionBids: number;
  jobApplications: number;
}

export const useStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        // const { data } = await api.get('/dashboard/stats');
        
        // Simulated API response
        const data = {
          successRate: 92,
          totalValue: 750000,
          tenderBids: 25,
          auctionBids: 15,
          jobApplications: 8
        };

        setStats(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return { stats, isLoading, error };
};