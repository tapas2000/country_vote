// Custom hook for fetching and managing countries data

import { useReducer, useEffect, ChangeEvent } from 'react';
import { countryService } from '../../../services/countryService';
import { Country } from '../../../types';

interface CountriesState {
  allCountries: Country[];
  filteredCountries: Country[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}

type CountriesAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Country[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'FILTER_COUNTRIES'; payload: Country[] };

const initialState: CountriesState = {
  allCountries: [],
  filteredCountries: [],
  searchTerm: '',
  isLoading: true,
  error: null,
};

const countriesReducer = (state: CountriesState, action: CountriesAction): CountriesState => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        allCountries: action.payload,
        filteredCountries: action.payload,
        isLoading: false,
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'FILTER_COUNTRIES':
      return {
        ...state,
        filteredCountries: action.payload,
      };
    default:
      return state;
  }
};

interface UseCountriesReturn {
  countries: Country[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  refreshCountries: () => void;
}

export const useCountries = (): UseCountriesReturn => {
  const [state, dispatch] = useReducer(countriesReducer, initialState);

  // Fetch countries on mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Filter countries when search term changes
  useEffect(() => {
    if (state.allCountries && state.allCountries.length > 0) {
      const filtered = countryService.filterCountries(state.allCountries, state.searchTerm);
      dispatch({ type: 'FILTER_COUNTRIES', payload: filtered });
    }
  }, [state.searchTerm, state.allCountries]);

  const fetchCountries = async () => {
    dispatch({ type: 'FETCH_START' });
    
    try {
      const result = await countryService.getTopCountries();
      
      if (result.success) {
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data || [] });
      } else {
        dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch countries' });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const refreshCountries = () => {
    fetchCountries();
  };

  return {
    countries: state.filteredCountries,
    searchTerm: state.searchTerm,
    isLoading: state.isLoading,
    error: state.error,
    handleSearch,
    refreshCountries,
  };
};
