import { useCountries } from '../hooks/useCountries';
import { STRINGS } from '../../../constants/strings';

const CountryTable: React.FC = () => {
  const { countries, isLoading } = useCountries();

  if (isLoading) {
    return (
      <div className="base_card">
        <div className="text-center py-8">
          <p className="text-gray-600">{STRINGS.LOADING_COUNTRIES}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="base_card">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                {STRINGS.TABLE_HEADER_COUNTRY}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                {STRINGS.TABLE_HEADER_CAPITAL_CITY}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                {STRINGS.TABLE_HEADER_REGION}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                {STRINGS.TABLE_HEADER_SUB_REGION}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                {STRINGS.TABLE_HEADER_VOTES}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {countries.length > 0 ? (
              countries.map((country, index) => (
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
                <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                  {STRINGS.NO_COUNTRIES_FOUND}
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  );
};

export default CountryTable;
