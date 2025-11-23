// Vote Layout - Main component that orchestrates the voting feature

import { useState } from 'react';
import VotingForm from './components/VotingForm';
import CountryTable from './components/CountryTable';

const VoteLayout: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const handleVoteSuccess = () => {
    // Trigger a refresh of the country table
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <VotingForm onVoteSuccess={handleVoteSuccess} />
      <CountryTable key={refreshTrigger} />
    </div>
  );
};

export default VoteLayout;
