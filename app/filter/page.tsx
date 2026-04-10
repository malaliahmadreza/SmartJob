'use client';

import { useMemo, useState } from 'react';

// List of job market skills
const allSkills = [
  'Financial statements', 'P&L', 'Balance sheet', 'Cash flow', 'Budgeting', 'Forecasting', 'Variance analysis', 'Financial modeling', 'Valuation', 'DCF',
  'Cost analysis', 'Cost structures', 'Profitability analysis', 'Pricing fundamentals', 'Revenue analysis', 'Financial reporting', 'Internal controls', 'Auditing', 'Compliance',
  'SQL (joins, aggregations, window functions)', 'Data analysis', 'Data exploration', 'Data cleaning', 'Data transformation', 'Statistical analysis', 'Hypothesis testing', 'A/B testing',
  'KPI definition', 'KPI tracking', 'Data visualization', 'Dashboard building', 'Reporting automation', 'Advanced Excel (pivot tables, Power Query, VBA basics)',
  'Power BI', 'Tableau', 'Looker', 'Python', 'pandas', 'numpy', 'R', 'Data modeling (star schema, normalization)', 'ETL', 'ELT', 'dbt', 'Airflow',
  'ERP systems', 'SAP', 'Oracle', 'NetSuite', 'Data warehouses', 'Snowflake', 'BigQuery', 'Redshift', 'Git', 'Version control',
  'Business performance analysis', 'KPI design', 'Unit economics', 'Market analysis', 'Competitive analysis', 'Pricing strategy', 'Revenue optimization', 'Scenario planning',
  'Strategic thinking', 'Business case development', 'Process analysis', 'Process improvement', 'Problem structuring', 'Root cause analysis', 'Critical thinking', 'Scenario analysis',
  'Quantitative reasoning', 'Data storytelling', 'Presentation skills', 'Stakeholder management', 'Business partnering', 'Translating business needs into analysis',
  'Requirements gathering', 'Data pipelines', 'Data engineering basics', 'Analytics engineering', 'Cross-functional collaboration', 'Bridging business & technical teams'
];

const euCities = [
  { name: 'Berlin', country: 'Germany' },
  { name: 'Hamburg', country: 'Germany' },
  { name: 'Munich', country: 'Germany' },
  { name: 'Cologne', country: 'Germany' },
  { name: 'Frankfurt', country: 'Germany' },
  { name: 'Stuttgart', country: 'Germany' },
  { name: 'Düsseldorf', country: 'Germany' },
  { name: 'Dortmund', country: 'Germany' },
  { name: 'Essen', country: 'Germany' },
  { name: 'Leipzig', country: 'Germany' },
  { name: 'Bremen', country: 'Germany' },
  { name: 'Dresden', country: 'Germany' },
  { name: 'Hannover', country: 'Germany' },
  { name: 'Nuremberg', country: 'Germany' },
  { name: 'Duisburg', country: 'Germany' },
  { name: 'Bochum', country: 'Germany' },
  { name: 'Wuppertal', country: 'Germany' },
  { name: 'Bielefeld', country: 'Germany' },
  { name: 'Bonn', country: 'Germany' },
  { name: 'Münster', country: 'Germany' },
  { name: 'Paris', country: 'France' },
  { name: 'Marseille', country: 'France' },
  { name: 'Lyon', country: 'France' },
  { name: 'Toulouse', country: 'France' },
  { name: 'Nice', country: 'France' },
  { name: 'Nantes', country: 'France' },
  { name: 'Strasbourg', country: 'France' },
  { name: 'Montpellier', country: 'France' },
  { name: 'Bordeaux', country: 'France' },
  { name: 'Lille', country: 'France' },
  { name: 'Rennes', country: 'France' },
  { name: 'Madrid', country: 'Spain' },
  { name: 'Barcelona', country: 'Spain' },
  { name: 'Valencia', country: 'Spain' },
  { name: 'Seville', country: 'Spain' },
  { name: 'Zaragoza', country: 'Spain' },
  { name: 'Málaga', country: 'Spain' },
  { name: 'Murcia', country: 'Spain' },
  { name: 'Palma', country: 'Spain' },
  { name: 'Bilbao', country: 'Spain' },
  { name: 'Rome', country: 'Italy' },
  { name: 'Milan', country: 'Italy' },
  { name: 'Naples', country: 'Italy' },
  { name: 'Turin', country: 'Italy' },
  { name: 'Palermo', country: 'Italy' },
  { name: 'Genoa', country: 'Italy' },
  { name: 'Bologna', country: 'Italy' },
  { name: 'Florence', country: 'Italy' },
  { name: 'Bari', country: 'Italy' },
  { name: 'Catania', country: 'Italy' },
  { name: 'Amsterdam', country: 'Netherlands' },
  { name: 'Rotterdam', country: 'Netherlands' },
  { name: 'The Hague', country: 'Netherlands' },
  { name: 'Utrecht', country: 'Netherlands' },
  { name: 'Eindhoven', country: 'Netherlands' },
  { name: 'Brussels', country: 'Belgium' },
  { name: 'Antwerp', country: 'Belgium' },
  { name: 'Ghent', country: 'Belgium' },
  { name: 'Charleroi', country: 'Belgium' },
  { name: 'Vienna', country: 'Austria' },
  { name: 'Graz', country: 'Austria' },
  { name: 'Warsaw', country: 'Poland' },
  { name: 'Kraków', country: 'Poland' },
  { name: 'Łódź', country: 'Poland' },
  { name: 'Wrocław', country: 'Poland' },
  { name: 'Poznań', country: 'Poland' },
  { name: 'Gdańsk', country: 'Poland' },
  { name: 'Szczecin', country: 'Poland' },
  { name: 'Bydgoszcz', country: 'Poland' },
  { name: 'Lublin', country: 'Poland' },
  { name: 'Prague', country: 'Czech Republic' },
  { name: 'Brno', country: 'Czech Republic' },
  { name: 'Budapest', country: 'Hungary' },
  { name: 'Bucharest', country: 'Romania' },
  { name: 'Cluj-Napoca', country: 'Romania' },
  { name: 'Timișoara', country: 'Romania' },
  { name: 'Iași', country: 'Romania' },
  { name: 'Sofia', country: 'Bulgaria' },
  { name: 'Plovdiv', country: 'Bulgaria' },
  { name: 'Varna', country: 'Bulgaria' },
  { name: 'Athens', country: 'Greece' },
  { name: 'Thessaloniki', country: 'Greece' },
  { name: 'Stockholm', country: 'Sweden' },
  { name: 'Gothenburg', country: 'Sweden' },
  { name: 'Malmö', country: 'Sweden' },
  { name: 'Copenhagen', country: 'Denmark' },
  { name: 'Helsinki', country: 'Finland' },
  { name: 'Espoo', country: 'Finland' },
  { name: 'Tampere', country: 'Finland' },
  { name: 'Dublin', country: 'Ireland' },
  { name: 'Lisbon', country: 'Portugal' },
  { name: 'Porto', country: 'Portugal' },
  { name: 'Riga', country: 'Latvia' },
  { name: 'Vilnius', country: 'Lithuania' },
  { name: 'Tallinn', country: 'Estonia' },
  { name: 'Bratislava', country: 'Slovakia' },
  { name: 'Ljubljana', country: 'Slovenia' }
];

const allCountries = Array.from(new Set(euCities.map(city => city.country))).sort();

export default function FilterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showSkills, setShowSkills] = useState(true);
  const [showLocation, setShowLocation] = useState(true);

  const filteredSkills = useMemo(
    () => allSkills.filter(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm]
  );

  const filteredCities = useMemo(
    () => euCities.filter(city =>
      city.name.toLowerCase().includes(citySearch.toLowerCase()) ||
      city.country.toLowerCase().includes(citySearch.toLowerCase())
    ),
    [citySearch]
  );

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 10) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleCityToggle = (cityName: string) => {
    if (selectedCities.includes(cityName)) {
      setSelectedCities(selectedCities.filter(name => name !== cityName));
    } else {
      setSelectedCities([...selectedCities, cityName]);
    }
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    if (!country) {
      return;
    }

    const countryCities = euCities
      .filter(city => city.country === country)
      .map(city => city.name);

    setSelectedCities(prev => Array.from(new Set([...prev, ...countryCities])));
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Skill Filtering Plan</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Select Your Skills (up to 10)</h2>
            <button
              onClick={() => setShowSkills(prev => !prev)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showSkills ? 'Hide' : 'Show'} skills
            </button>
          </div>

          {showSkills ? (
            <>
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {filteredSkills.map(skill => (
                  <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      disabled={!selectedSkills.includes(skill) && selectedSkills.length >= 10}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Selected Skills ({selectedSkills.length}/10):</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.length === 0 && (
                    <span className="text-sm text-gray-500">No skills selected yet.</span>
                  )}
                  {selectedSkills.map(skill => (
                    <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                      <button
                        onClick={() => handleSkillToggle(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">Skill selection is hidden. Click show to expand the list.</p>
          )}
        </div>

        <div className="text-center">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
            disabled={selectedSkills.length === 0}
          >
            Continue with Selected Skills
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Location Filter</h2>
            <button
              onClick={() => setShowLocation(prev => !prev)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showLocation ? 'Hide' : 'Show'} locations
            </button>
          </div>

          {showLocation ? (
            <>
              <div className="grid gap-4 mb-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Search cities or countries</label>
                  <input
                    type="text"
                    placeholder="Search cities or countries..."
                    value={citySearch}
                    onChange={e => setCitySearch(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Select a country</label>
                  <select
                    value={selectedCountry}
                    onChange={e => handleCountrySelect(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose a country</option>
                    {allCountries.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedCountry && (
                <p className="mb-4 text-sm text-gray-600">
                  All cities in <strong>{selectedCountry}</strong> are selected.
                </p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                {filteredCities.map(city => (
                  <label key={city.name} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCities.includes(city.name)}
                      onChange={() => handleCityToggle(city.name)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{city.name}, {city.country}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Selected Locations:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCities.length === 0 && (
                    <span className="text-sm text-gray-500">No locations selected yet.</span>
                  )}
                  {selectedCities.map(city => (
                    <span key={city} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {city}
                      <button
                        onClick={() => handleCityToggle(city)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">Location selection is hidden. Click show to expand city filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}