import { STRINGS } from '../../../constants/strings';
import { Country } from '../../../types';
import SkeletonLoader from '../../../components/SkeletonLoader';

interface CountryTableProps {
  countries: Country[];
  isLoading: boolean;
}

const CountryTable: React.FC<CountryTableProps> = ({ countries, isLoading }) => {

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="base_card base_card__no__x_padding">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="table_header">
                {STRINGS.TABLE_HEADER_COUNTRY}
              </th>
              <th className="table_header">
                {STRINGS.TABLE_HEADER_CAPITAL_CITY}
              </th>
              <th className="table_header">
                {STRINGS.TABLE_HEADER_REGION}
              </th>
              <th className="table_header">
                {STRINGS.TABLE_HEADER_SUB_REGION}
              </th>
              <th className="table_header">
                {STRINGS.TABLE_HEADER_VOTES}
              </th>
            </tr>
          </thead>
          <tbody className="">
            {countries.length > 0 ? (
              countries.map((country, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="table_cell">
                    {country.name}
                  </td>
                  <td className="table_cell">
                    {Array.isArray(country.capital) ? country.capital.join(', ') : country.capital}
                  </td>
                  <td className="table_cell">
                    {country.region}
                  </td>
                  <td className="table_cell">
                    {country.subRegion}
                  </td>
                  <td className="table_cell">
                    {country.votes}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="table_cell text-center">
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
