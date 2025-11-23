// Validation utilities
import { Vote, ValidationErrors } from '../types';

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
    errors.name = 'Name is required';
  }
  
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email';
  }
  
  if (!validateCountry(formData.country)) {
    errors.country = 'Please select a country';
  }
  
  return errors;
};
