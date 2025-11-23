// Validation utilities
import { Vote, ValidationErrors } from '../types';
import { STRINGS } from '../constants/strings';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name && name.trim().length > 0;
};

export const validateCountry = (country: string): boolean => {
  return country && country.trim().length > 0;
};

export const validateForm = (formData: Vote): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!validateName(formData.name)) {
    errors.name = STRINGS.NAME_REQUIRED;
  }
  
  if (!formData.email.trim()) {
    errors.email = STRINGS.EMAIL_REQUIRED;
  } else if (!validateEmail(formData.email)) {
    errors.email = STRINGS.INVALID_EMAIL;
  }
  
  if (!validateCountry(formData.country)) {
    errors.country = STRINGS.COUNTRY_REQUIRED;
  }
  
  return errors;
};
