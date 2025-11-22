import { useState } from 'react';

function VotingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    
    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('http://localhost:3000/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Vote submitted successfully!');
        setFormData({ name: '', email: '', country: '' });
        setErrors({});
        // TODO: Refresh country list
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to submit vote');
      }
    } catch (error) {
      alert('Error submitting vote. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.country;

  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-lg font-semibold mb-6 text-gray-900">Vote your Favourite Country</h2>
      <form onSubmit={handleSubmit} className="flex items-start gap-4">
        <div className="flex-1">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            placeholder="Name"
          />
        </div>

        <div className="flex-1 relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-1 ${
              errors.email 
                ? 'border-error focus:ring-error focus:border-error' 
                : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'
            }`}
            placeholder="Email"
          />
          {errors.email && (
            <>
              <svg className="absolute right-3 top-3 w-5 h-5 text-error" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="mt-1 text-xs text-error">{errors.email}</p>
            </>
          )}
        </div>

        <div className="flex-1">
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 appearance-none bg-white"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            <option value="">Country</option>
            <option value="Argentina">Argentina</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Samoa">Samoa</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Ireland">Ireland</option>
            <option value="Denmark">Denmark</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="px-6 py-2.5 bg-gray-200 text-gray-500 rounded-md text-sm font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Vote
        </button>
      </form>
    </div>
  );
}

export default VotingForm;
