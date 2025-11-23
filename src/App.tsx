import VoteLayout from './layouts/vote'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <header className="bg-white px-12 py-6 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4L16 12L24 4L28 8L16 20L4 8L8 4Z" fill="#E91E63"/>
              <path d="M8 16L16 24L24 16L28 20L16 32L4 20L8 16Z" fill="#E91E63"/>
            </svg>
            <span className="text-xl font-bold text-gray-900">loopstudio</span>
          </div>
          <span className="text-sm text-gray-600">Frontend Developer Challenge</span>
        </header>

        {/* Main Content */}
        <div className="px-12 py-8">
          <VoteLayout />
        </div>
      </div>
    </div>
  );
};

export default App;
