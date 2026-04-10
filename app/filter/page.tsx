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
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 px-8 py-10 text-white shadow-2xl shadow-slate-900/15 ring-1 ring-white/10 sm:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-100/80">SmartJob filter</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Build polished skill and location filters in seconds.
              </h1>
              <p className="mt-4 max-w-2xl text-sky-100/90 text-base leading-7">
                Use the latest UI flow for selecting LinkedIn-ready skills and European cities, with search, country grouping, and a crisp card-based layout.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/10 px-5 py-6 ring-1 ring-white/20 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.24em] text-sky-100/80">Skills selected</p>
                <p className="mt-3 text-4xl font-semibold">{selectedSkills.length}</p>
              </div>
              <div className="rounded-3xl bg-white/10 px-5 py-6 ring-1 ring-white/20 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.24em] text-sky-100/80">Locations selected</p>
                <p className="mt-3 text-4xl font-semibold">{selectedCities.length}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-300/40 ring-1 ring-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Skill Planner</h2>
                <p className="mt-2 text-sm text-slate-500">Search, select, and preview the top skills for your job filters.</p>
              </div>
              <button
                onClick={() => setShowSkills(prev => !prev)}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
              >
                {showSkills ? 'Hide' : 'Show'} skills
              </button>
            </div>

            {showSkills ? (
              <div className="mt-6 space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <label className="block text-sm font-medium text-slate-700">Search skills</label>
                  <input
                    type="text"
                    placeholder="e.g. Financial modeling, Power BI, SQL"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredSkills.map(skill => {
                    const selected = selectedSkills.includes(skill);
                    return (
                      <label
                        key={skill}
                        className={`cursor-pointer rounded-full border px-4 py-3 text-sm font-medium transition ${selected ? 'bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-600/10' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'}`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => handleSkillToggle(skill)}
                          disabled={!selected && selectedSkills.length >= 10}
                          className="sr-only"
                        />
                        {skill}
                      </label>
                    );
                  })}
                </div>

                <div className="rounded-[1.75rem] bg-slate-50 p-5 border border-slate-200">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Selected {selectedSkills.length} / 10</span>
                    <p className="text-sm text-slate-500">Tap a tag to remove it.</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {selectedSkills.length === 0 ? (
                      <span className="text-sm text-slate-500">No skills selected yet.</span>
                    ) : (
                      selectedSkills.map(skill => (
                        <button
                          key={skill}
                          onClick={() => handleSkillToggle(skill)}
                          className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-900 transition hover:bg-sky-200"
                        >
                          {skill}
                          <span className="rounded-full bg-sky-200 px-2 py-0.5 text-xs">×</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                Skill selection is hidden. Click show to expand the choice panel.
              </div>
            )}

            <button
              className="mt-8 w-full rounded-full bg-slate-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={selectedSkills.length === 0}
            >
              Continue with selected skills
            </button>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-300/40 ring-1 ring-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Location Filter</h2>
                <p className="mt-2 text-sm text-slate-500">Filter by EU cities or auto-select whole countries.</p>
              </div>
              <button
                onClick={() => setShowLocation(prev => !prev)}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
              >
                {showLocation ? 'Hide' : 'Show'} locations
              </button>
            </div>

            {showLocation ? (
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                    <label className="block text-sm font-medium text-slate-700">Search cities or countries</label>
                    <input
                      type="text"
                      placeholder="Search cities or countries..."
                      value={citySearch}
                      onChange={e => setCitySearch(e.target.value)}
                      className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                    />
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                    <label className="block text-sm font-medium text-slate-700">Select a country</label>
                    <select
                      value={selectedCountry}
                      onChange={e => handleCountrySelect(e.target.value)}
                      className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
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
                  <div className="rounded-3xl border border-cyan-200 bg-cyan-50 px-4 py-4 text-sm text-cyan-800">
                    All cities in <strong>{selectedCountry}</strong> are selected.
                  </div>
                )}

                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">City selection</p>
                      <p className="text-sm text-slate-500">Tap a city to select or unselect it.</p>
                    </div>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{filteredCities.length} visible</span>
                  </div>

                  <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {filteredCities.map(city => {
                        const selected = selectedCities.includes(city.name);
                        return (
                          <button
                            key={city.name}
                            type="button"
                            onClick={() => handleCityToggle(city.name)}
                            className={`text-left rounded-2xl border px-4 py-3 text-sm transition ${selected ? 'border-cyan-600 bg-cyan-600/10 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
                          >
                            <span className="font-medium">{city.name}</span>
                            <span className="block text-xs text-slate-500">{city.country}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-900">{selectedCities.length} selected</span>
                    <p className="text-sm text-slate-500">Selected cities appear as removable tags.</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {selectedCities.length === 0 ? (
                      <span className="text-sm text-slate-500">No locations selected yet.</span>
                    ) : (
                      selectedCities.map(city => (
                        <button
                          key={city}
                          onClick={() => handleCityToggle(city)}
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-200"
                        >
                          {city}
                          <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-xs">×</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                Location selection is hidden. Click show to expand city filters.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
