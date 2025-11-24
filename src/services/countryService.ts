// Country Service - handles all country-related API calls

import { API_ENDPOINTS, HTTP_METHODS } from '../utils/api';
import { Country, ServiceResponse } from '../types';

// Mock data for development (fallback if API fails)
const MOCK_COUNTRIES: Country[] = [
  {
    name: 'Pakistan',
    capital: ['Islamabad'],
    region: 'Asia',
    subRegion: 'Southern Asia',
    votes: 982
  },
  {
    name: 'Samoa',
    capital: ['Apia'],
    region: 'Oceania',
    subRegion: 'Polynesia',
    votes: 839
  },
  {
    name: 'Djibouti',
    capital: ['Djibouti'],
    region: 'Africa',
    subRegion: 'Eastern Africa',
    votes: 730
  },
  {
    name: 'Ireland',
    capital: ['Dublin'],
    region: 'Europe',
    subRegion: 'Northern Europe',
    votes: 645
  },
  {
    name: 'Denmark',
    capital: ['Copenhagen'],
    region: 'Europe',
    subRegion: 'Northern Europe',
    votes: 560
  },
  {
    name: 'Christmas Island',
    capital: ['Flying Fish Cove'],
    region: 'Oceania',
    subRegion: 'Australia and New Zealand',
    votes: 472
  },
  {
    name: 'Namibia',
    capital: ['Windhoek'],
    region: 'Africa',
    subRegion: 'Southern Africa',
    votes: 432
  },
  {
    name: 'French Polynesia',
    capital: ['Papeete'],
    region: 'Oceania',
    subRegion: 'Polynesia',
    votes: 307
  },
  {
    name: 'North Macedonia',
    capital: ['Skopje'],
    region: 'Europe',
    subRegion: 'Southeast Europe',
    votes: 215
  },
  {
    name: 'Eritrea',
    capital: ['Asmara'],
    region: 'Africa',
    subRegion: 'Eastern Africa',
    votes: 215
  }
];

export const countryService = {
  /**
   * Get all countries for dropdown selection
   */
  async getAllCountries(): Promise<ServiceResponse<Country[]>> {
    try {
      // Use top countries endpoint with large limit to get all countries
      const url = `${API_ENDPOINTS.TOP_COUNTRIES}?limit=250`;
      const response = await fetch(url, {
        method: HTTP_METHODS.GET,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch all countries');
      }

      const result = await response.json();
      // Sort alphabetically by name
      const sortedCountries = (result.data || []).sort((a: Country, b: Country) => 
        a.name.localeCompare(b.name)
      );
      return { success: true, data: sortedCountries };
    } catch (error) {
      console.error('Error fetching all countries:', error);
      // Return empty array if API fails
      return { success: true, data: [] };
    }
  },

  /**
   * Get top countries with optional limit
   */
  async getTopCountries(limit: number = 10): Promise<ServiceResponse<Country[]>> {
    try {
      const url = `${API_ENDPOINTS.TOP_COUNTRIES}?limit=${limit}`;
      const response = await fetch(url, {
        method: HTTP_METHODS.GET,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }

      const result = await response.json();
      return { success: true, data: result.data || [] };
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
    return countries.filter(country => {
      const capitalStr = Array.isArray(country.capital) 
        ? country.capital.join(', ') 
        : country.capital;
      
      return country.name.toLowerCase().includes(term) ||
        capitalStr.toLowerCase().includes(term) ||
        country.region.toLowerCase().includes(term) ||
        country.subRegion.toLowerCase().includes(term) ||
        country.votes.toString().includes(term);
    });
  },
};
