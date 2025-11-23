// Vote Layout - Main component that orchestrates the voting feature

import { useState } from 'react';
import VotingForm from './components/VotingForm';
import CountryTable from './components/CountryTable';
import SearchInput from '../../components/SearchInput';
import { STRINGS } from '../../constants/strings';
import { useCountries } from './hooks/useCountries';

const VoteLayout: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const { searchTerm, handleSearch } = useCountries();

  const handleVoteSuccess = () => {
    // Trigger a refresh of the country table
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-12 px-[173px]">
      <VotingForm onVoteSuccess={handleVoteSuccess} />
      
      <div className="max-w-[1062px]">
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
        
        <CountryTable key={refreshTrigger} />
      </div>
    </div>
  );
};

export default VoteLayout;
