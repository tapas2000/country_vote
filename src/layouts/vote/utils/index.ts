// Vote-specific utility functions

/**
 * Format country name for display
 */
export const formatCountryName = (name: string): string => {
  return name.trim();
};

/**
 * Format vote count with comma separator
 */
export const formatVoteCount = (count: number): string => {
  return count.toLocaleString();
};

/**
 * Get country flag emoji (placeholder for future implementation)
 */
export const getCountryFlag = (countryCode: string): string => {
  // Placeholder - can be enhanced with actual flag logic
  return '';
};
