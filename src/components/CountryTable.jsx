import { useState, useEffect } from 'react';

function CountryTable() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.subRegion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  const fetchCountries = async () => {
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('http://localhost:3000/api/countries/top');
      if (response.ok) {
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } else {
        console.error('Failed to fetch countries');
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Mock data for development matching Figma design
      const mockData = [
        {
          name: 'Pakistan',
          capital: 'Islamabad',
          region: 'Asia',
          subRegion: 'Southern Africa',
          votes: 982
        },
        {
          name: 'Samoa',
          capital: 'Apia',
          region: 'Oceania',
          subRegion: 'Polynesia',
          votes: 839
        },
        {
          name: 'Djibouti',
          capital: 'Djibouti',
          region: 'Africa',
          subRegion: 'Eastern Africa',
          votes: 730
        },
        {
          name: 'Ireland',
          capital: 'Dublin',
          region: 'Europe',
          subRegion: 'Nothern Europe',
          votes: 645
        },
        {
          name: 'Denmark',
          capital: 'Copenhagen',
          region: 'Europe',
          subRegion: 'Nothern Europe',
          votes: 560
        },
        {
          name: 'Christmas Island',
          capital: 'Flying Fish Cove',
          region: 'Oceania',
          subRegion: 'Australia and...',
          votes: 472
        },
        {
          name: 'Namibia',
          capital: 'Windhoek',
          region: 'Africa',
          subRegion: 'Southern Africa',
          votes: 432
        },
        {
          name: 'French Polinesia',
          capital: 'Papeete',
          region: 'Oceania',
          subRegion: 'Polynesia',
          votes: 307
        },
        {
          name: 'North Macedonia',
          capital: 'Skopje',
          region: 'Europe',
          subRegion: 'Southeast Europe',
          votes: 215
        },
        {
          name: 'Eritrea',
          capital: 'Asmara',
          region: 'Africa',
          subRegion: 'Eastern Africa',
          votes: 215
        }
      ];
      setCountries(mockData);
      setFilteredCountries(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-8">
        <div className="text-center py-8">
          <p className="text-gray-600">Loading countries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Top 10 Most Voted Countries</h2>
        <div className="relative max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Country, Capital City, Region or Subregion"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                Country
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                Capital City
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                Region
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                Sub Region
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                Votes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {country.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {country.capital}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {country.region}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {country.subRegion}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {country.votes}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                  No countries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CountryTable;
