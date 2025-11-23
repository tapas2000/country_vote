// Custom hook for fetching and managing countries data

import { useState, useEffect, ChangeEvent } from 'react';
import { countryService } from '../../../services/countryService';
import { Country } from '../../../types';

interface UseCountriesReturn {
  countries: Country[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  refreshCountries: () => void;
}

export const useCountries = (): UseCountriesReturn => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch countries on mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Filter countries when search term changes
  useEffect(() => {
    if (countries && countries.length > 0) {
      const filtered = countryService.filterCountries(countries, searchTerm);
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  const fetchCountries = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await countryService.getTopCountries();
      
      if (result.success) {
        setCountries(result.data || []);
        setFilteredCountries(result.data || []);
      } else {
        setError('Failed to fetch countries');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const refreshCountries = () => {
    fetchCountries();
  };

  return {
    countries: filteredCountries,
    searchTerm,
    isLoading,
    error,
    handleSearch,
    refreshCountries,
  };
};
