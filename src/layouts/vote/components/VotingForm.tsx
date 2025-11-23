import { FormEvent } from 'react';
import { useVoteForm } from '../hooks/useVoteForm';
import Input from '../../../components/Input';

interface VotingFormProps {
  onVoteSuccess?: () => void;
}

const VotingForm: React.FC<VotingFormProps> = ({ onVoteSuccess }) => {
  const {
    formData,
    errors,
    isSubmitting,
    isFormValid,
    handleChange,
    handleSubmit: submitForm,
  } = useVoteForm();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const result = await submitForm(e);
    
    if (result.success) {
      alert('Vote submitted successfully!');
      // Notify parent to refresh countries
      if (onVoteSuccess) {
        onVoteSuccess();
      }
    } else {
      alert(result.error || 'Failed to submit vote. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-lg font-semibold mb-6 text-gray-900">Vote your Favourite Country</h2>
      <form onSubmit={handleSubmit} className="flex items-start gap-4">
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          error={errors.name}
        />

        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email}
        />

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
};

export default VotingForm;
