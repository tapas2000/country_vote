import VotingForm from './components/VotingForm'
import CountryTable from './components/CountryTable'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-900">
            CountryVote
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Vote for your favorite country and see the top choices
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <VotingForm />
        </div>
        
        <CountryTable />
      </div>
    </div>
  )
}

export default App
