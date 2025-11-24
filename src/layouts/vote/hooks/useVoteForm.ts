// Custom hook for managing vote form state and submission

import { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { voteService } from '../../../services/voteService';
import { validateForm, validateEmail, validateName } from '../../../utils/validation';
import { Vote, ValidationErrors } from '../../../types';
import { STRINGS } from '../../../constants/strings';

interface UseVoteFormReturn {
  formData: Vote;
  errors: ValidationErrors;
  isSubmitting: boolean;
  isFormValid: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<{ success: boolean; error?: string }>;
}

export const useVoteForm = (): UseVoteFormReturn => {
  const [formData, setFormData] = useState<Vote>({
    name: '',
    email: '',
    country: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validate field on blur
    if (name === 'email' && value.trim()) {
      if (!validateEmail(value)) {
        setErrors(prev => ({
          ...prev,
          email: STRINGS.INVALID_EMAIL
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          email: ''
        }));
      }
    } else if (name === 'name' && value.trim()) {
      if (!validateName(value)) {
        setErrors(prev => ({
          ...prev,
          name: STRINGS.NAME_REQUIRED
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          name: ''
        }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return { success: false };
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await voteService.submitVote(formData);
      
      if (result.success) {
        // Reset form on success
        setFormData({ name: '', email: '', country: '' });
        setErrors({});
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Boolean(
    formData.name.trim() && 
    formData.email.trim() && 
    formData.country &&
    !errors.name &&
    !errors.email &&
    !errors.country
  );

  return {
    formData,
    errors,
    isSubmitting,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
