// Vote Service - handles all vote-related API calls

import { API_ENDPOINTS, HTTP_METHODS } from '../utils/api';
import { Vote, ServiceResponse } from '../types';

export const voteService = {
  /**
   * Submit a vote
   */
  async submitVote(voteData: Vote): Promise<ServiceResponse<Vote>> {
    try {
      const response = await fetch(API_ENDPOINTS.VOTES, {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors (400)
        if (result.errors && Array.isArray(result.errors)) {
          return { 
            success: false, 
            error: result.errors[0]?.message || 'Validation failed',
            errors: result.errors 
          };
        }
        // Handle duplicate email (409) or other errors
        if (result.error?.message) {
          return { success: false, error: result.error.message };
        }
        return { success: false, error: result.message || 'Failed to submit vote' };
      }

      return { success: true, data: result.data };
    } catch (error) {
      console.error('Error submitting vote:', error);
      const errorMessage = error instanceof Error ? error.message : 'Network error. Please try again.';
      return { success: false, error: errorMessage };
    }
  },
};
