// Vote Layout - Main component that orchestrates the voting feature

import VotingForm from "./components/VotingForm";
import CountryTable from "./components/CountryTable";
import SearchInput from "../../components/SearchInput";
import Toast from "../../components/Toast";
import { STRINGS } from "../../constants/strings";
import { useCountries } from "./hooks/useCountries";
import { useToast } from "../../hooks/useToast";

const VoteLayout: React.FC = () => {
  const { countries, searchTerm, isLoading, handleSearch, refreshCountries } =
    useCountries();
  const { toast, showSuccess, showError, hideToast } = useToast();

  const handleVoteSuccess = () => {
    // Refresh the country data after successful vote
    refreshCountries();
  };

  return (
    <div className="w-full flex flex-col justify-center md:max-w-[1062px] md:mx-auto space-y-12">
      <div className="min-h-32">
        {toast.isVisible ? (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        ) : (
          <VotingForm
            onVoteSuccess={handleVoteSuccess}
            showSuccess={showSuccess}
            showError={showError}
          />
        )}
      </div>

      <div className="w-full">
        <div className="mb-6">
          <h2 className="font-bold mb-6 text-gray-900 text-[32px] leading-6">
            {STRINGS.TOP_TEN_COUNTRIES}
          </h2>
          <SearchInput
            value={searchTerm}
            onChange={handleSearch}
            placeholder={STRINGS.SEARCH_PLACEHOLDER}
          />
        </div>

        <CountryTable countries={countries} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default VoteLayout;
