// Country Service - handles all country-related API calls

import { API_ENDPOINTS, HTTP_METHODS } from '../utils/api';
import { Country, ServiceResponse } from '../types';

// Mock data for development
const MOCK_COUNTRIES: Country[] = [
  {
    name: 'Pakistan',
    capital: 'Islamabad',
    region: 'Asia',
    subRegion: 'Southern Africa',
    votes: 982
  },
  {
    name: 'Samoa',
    capital: 'Apia',
    region: 'Oceania',
    subRegion: 'Polynesia',
    votes: 839
  },
  {
    name: 'Djibouti',
    capital: 'Djibouti',
    region: 'Africa',
    subRegion: 'Eastern Africa',
    votes: 730
  },
  {
    name: 'Ireland',
    capital: 'Dublin',
    region: 'Europe',
    subRegion: 'Nothern Europe',
    votes: 645
  },
  {
    name: 'Denmark',
    capital: 'Copenhagen',
    region: 'Europe',
    subRegion: 'Nothern Europe',
    votes: 560
  },
  {
    name: 'Christmas Island',
    capital: 'Flying Fish Cove',
    region: 'Oceania',
    subRegion: 'Australia and...',
    votes: 472
  },
  {
    name: 'Namibia',
    capital: 'Windhoek',
    region: 'Africa',
    subRegion: 'Southern Africa',
    votes: 432
  },
  {
    name: 'French Polinesia',
    capital: 'Papeete',
    region: 'Oceania',
    subRegion: 'Polynesia',
    votes: 307
  },
  {
    name: 'North Macedonia',
    capital: 'Skopje',
    region: 'Europe',
    subRegion: 'Southeast Europe',
    votes: 215
  },
  {
    name: 'Eritrea',
    capital: 'Asmara',
    region: 'Africa',
    subRegion: 'Eastern Africa',
    votes: 215
  }
];

export const countryService = {
  /**
   * Get top 10 countries
   */
  async getTopCountries(): Promise<ServiceResponse<Country[]>> {
    try {
      const response = await fetch(API_ENDPOINTS.TOP_COUNTRIES, {
        method: HTTP_METHODS.GET,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Return mock data if API fails
      return { success: true, data: MOCK_COUNTRIES, isMockData: true };
    }
  },

  /**
   * Search/filter countries
   */
  filterCountries(countries: Country[], searchTerm: string): Country[] {
    if (!countries || countries.length === 0) {
      return [];
    }

    if (!searchTerm.trim()) {
      return countries;
    }

    const term = searchTerm.toLowerCase();
    return countries.filter(country =>
      country.name.toLowerCase().includes(term) ||
      country.capital.toLowerCase().includes(term) ||
      country.region.toLowerCase().includes(term) ||
      country.subRegion.toLowerCase().includes(term)
    );
  },
};
