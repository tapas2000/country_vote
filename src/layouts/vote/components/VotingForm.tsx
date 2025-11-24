import { FormEvent, useEffect, useState, useRef } from "react";
import { useVoteForm } from "../hooks/useVoteForm";
import Input from "../../../components/Input";
import { STRINGS } from "../../../constants/strings";
import { countryService } from "../../../services/countryService";
import { Country } from "../../../types";

interface VotingFormProps {
  onVoteSuccess?: () => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const VotingForm: React.FC<VotingFormProps> = ({ onVoteSuccess, showSuccess, showError }) => {
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [countryState, setCountryState] = useState({
    isLoading: true,
    search: "",
    isDropdownOpen: false,
    selectedName: "",
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const {
    formData,
    errors,
    isSubmitting,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit: submitForm,
  } = useVoteForm();

  // Fetch countries on mount and setup click outside handler
  useEffect(() => {
    const fetchCountries = async () => {
      setCountryState(prev => ({ ...prev, isLoading: true }));
      const result = await countryService.getTopCountries(100);
      if (result.success && result.data) {
        setAvailableCountries(result.data);
        setFilteredCountries(result.data);
      }
      setCountryState(prev => ({ ...prev, isLoading: false }));
    };
    
    fetchCountries();

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCountryState(prev => ({ ...prev, isDropdownOpen: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter countries based on search
  useEffect(() => {
    const filtered = countryState.search.trim()
      ? availableCountries.filter(country =>
          country.name.toLowerCase().includes(countryState.search.toLowerCase())
        )
      : availableCountries;
    
    setFilteredCountries(filtered);
  }, [countryState.search, availableCountries]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const result = await submitForm(e);

    if (result.success) {
      showSuccess(STRINGS.VOTE_FORM_SUCCESS_MESSAGE);
      // Clear country selection state
      setCountryState(prev => ({ ...prev, selectedName: '', search: '' }));
      // Notify parent to refresh countries
      if (onVoteSuccess) {
        onVoteSuccess();
      }
    } else {
      showError(result.error || STRINGS.VOTE_FORM_ERROR_MESSAGE);
    }
  };

  return (
    <div className="flex flex-col base_card min-h-32 no_gap">
        <h2 className="text-sm font-bold mb-3.5 text-gray-900">
          {STRINGS.VOTE_FORM_TITLE}
        </h2>
      <form onSubmit={handleSubmit} className="flex items-center sm:items-start flex-col sm:flex-row gap-4" noValidate>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={STRINGS.VOTE_FORM_NAME_PLACEHOLDER}
          error={errors.name}
        />

        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={STRINGS.VOTE_FORM_EMAIL_PLACEHOLDER}
          error={errors.email}
        />

        <div className="flex-1 relative" ref={dropdownRef}>
          {countryState.isLoading ? (
            <div className="w-full px-4 py-2.5 border border-gray-300 rounded-md">
              <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : (
            <>
              <input
                type="text"
                id="country-display"
                name="country-display"
                value={countryState.search || countryState.selectedName}
                onChange={(e) => {
                  const value = e.target.value;
                  setCountryState(prev => ({ ...prev, search: value, selectedName: '', isDropdownOpen: true }));
                  // Clear the form data country when user types
                  handleChange({
                    target: { name: 'country', value: '' }
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
                onFocus={() => setCountryState(prev => ({ ...prev, isDropdownOpen: true }))}
                placeholder={STRINGS.VOTE_FORM_COUNTRY_PLACEHOLDER}
                autoComplete="new-password"
                autoCorrect="off"
                spellCheck="false"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white"
              />
              <input type="hidden" id="country" name="country" value={formData.country} />
              {countryState.isDropdownOpen && filteredCountries.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredCountries.map((country) => (
                    <div
                      key={country.name}
                      onClick={() => {
                        // Send country code (cca2) to backend
                        const countryCode = country.cca2 || country.cca3;
                        console.log('Selected country:', country);
                        console.log('Sending code:', countryCode);
                        handleChange({
                          target: { name: 'country', value: countryCode }
                        } as React.ChangeEvent<HTMLInputElement>);
                        setCountryState(prev => ({ ...prev, selectedName: country.name, search: '', isDropdownOpen: false }));
                      }}
                      className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {country.name}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="px-6 py-2.5 bg-dark text-white rounded-md text-sm font-medium hover:bg-[#1f2137] disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {STRINGS.VOTE_FORM_SUBMIT_BUTTON}
        </button>
      </form>
    </div>
  );
};

export default VotingForm;
