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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit vote');
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error submitting vote:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  },
};
