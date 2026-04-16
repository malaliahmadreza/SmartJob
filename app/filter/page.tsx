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

const timeOptions = ['Last 1hr', 'Last 6hr', 'Last 12hr', 'Last 24hr', 'Last 7 days', 'Last 10 days', 'Last 30 days'];

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: 'Senior Data Analyst',
    company: 'TechCorp GmbH',
    city: 'Berlin',
    description: 'We are looking for a Senior Data Analyst to join our team. You will work with large datasets, create dashboards, and provide insights to drive business decisions. Experience with SQL, Python, and Tableau required.',
    skills: ['SQL (joins, aggregations, window functions)', 'Data analysis', 'Data visualization', 'Python', 'Tableau'],
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    url: 'https://www.linkedin.com/jobs/view/senior-data-analyst-at-techcorp-gmbh-1234567890',
  },
  {
    id: 2,
    title: 'Financial Analyst',
    company: 'Finance Solutions Ltd',
    city: 'London',
    description: 'Join our finance team as a Financial Analyst. Responsibilities include financial modeling, budgeting, forecasting, and variance analysis. Strong Excel skills required.',
    skills: ['Financial modeling', 'Budgeting', 'Forecasting', 'Variance analysis', 'Advanced Excel (pivot tables, Power Query, VBA basics)'],
    postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    url: 'https://www.linkedin.com/jobs/view/financial-analyst-at-finance-solutions-ltd-1234567891',
  },
  {
    id: 3,
    title: 'Business Intelligence Developer',
    company: 'Data Insights Inc',
    city: 'Amsterdam',
    description: 'We need a BI Developer to create reports and dashboards. Experience with Power BI, SQL, and data warehousing is essential.',
    skills: ['Power BI', 'SQL (joins, aggregations, window functions)', 'Data warehouses', 'Data visualization', 'Dashboard building'],
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    url: 'https://www.linkedin.com/jobs/view/business-intelligence-developer-at-data-insights-inc-1234567892',
  },
  {
    id: 4,
    title: 'Data Engineer',
    company: 'BigData Corp',
    city: 'Paris',
    description: 'Looking for a Data Engineer to build and maintain data pipelines. Experience with ETL, Python, and cloud platforms required.',
    skills: ['ETL', 'Python', 'Data pipelines', 'Data engineering basics', 'SQL (joins, aggregations, window functions)'],
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    url: 'https://www.linkedin.com/jobs/view/data-engineer-at-bigdata-corp-1234567893',
  },
  {
    id: 5,
    title: 'Product Analyst',
    company: 'E-commerce Plus',
    city: 'Berlin',
    description: 'Join our product team as an Analyst. You will analyze user behavior, run A/B tests, and provide recommendations for product improvements.',
    skills: ['Data analysis', 'A/B testing', 'KPI tracking', 'SQL (joins, aggregations, window functions)', 'Data visualization'],
    postedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    url: 'https://www.linkedin.com/jobs/view/product-analyst-at-e-commerce-plus-1234567894',
  },
  {
    id: 6,
    title: 'Financial Controller',
    company: 'Global Finance Group',
    city: 'Frankfurt',
    description: 'Senior Financial Controller position available. Responsible for financial reporting, internal controls, and compliance.',
    skills: ['Financial reporting', 'Internal controls', 'Compliance', 'Financial statements', 'Auditing'],
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    url: 'https://www.linkedin.com/jobs/view/financial-controller-at-global-finance-group-1234567895',
  },
  {
    id: 7,
    title: 'Data Scientist',
    company: 'AI Solutions GmbH',
    city: 'Munich',
    description: 'We are seeking a Data Scientist to work on machine learning projects. Experience with Python, statistical analysis, and hypothesis testing required.',
    skills: ['Python', 'Statistical analysis', 'Hypothesis testing', 'Data analysis', 'Machine learning'],
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    url: 'https://www.linkedin.com/jobs/view/data-scientist-at-ai-solutions-gmbh-1234567896',
  },
  {
    id: 8,
    title: 'Business Analyst',
    company: 'Consulting Partners',
    city: 'Vienna',
    description: 'Business Analyst role focusing on process improvement and requirements gathering. Experience in stakeholder management and business case development.',
    skills: ['Process analysis', 'Requirements gathering', 'Stakeholder management', 'Business case development', 'Strategic thinking'],
    postedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    url: 'https://www.linkedin.com/jobs/view/business-analyst-at-consulting-partners-1234567897',
  },
];

export default function FilterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedTime, setSelectedTime] = useState('Last 1hr');
  const [continueMessage, setContinueMessage] = useState('');
  const [showSkills, setShowSkills] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<typeof mockJobs>([]);

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

  const getTimeThreshold = (timeOption: string) => {
    const now = new Date();
    switch (timeOption) {
      case 'Last 1hr': return new Date(now.getTime() - 1 * 60 * 60 * 1000);
      case 'Last 6hr': return new Date(now.getTime() - 6 * 60 * 60 * 1000);
      case 'Last 12hr': return new Date(now.getTime() - 12 * 60 * 60 * 1000);
      case 'Last 24hr': return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case 'Last 7 days': return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'Last 10 days': return new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
      case 'Last 30 days': return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default: return new Date(0);
    }
  };

  const handleContinue = () => {
    const timeThreshold = getTimeThreshold(selectedTime);
    
    const filtered = mockJobs.filter(job => {
      // Check posting time
      if (job.postedAt < timeThreshold) return false;
      
      // Check skills (AND logic - job must have ALL selected skills)
      if (selectedSkills.length > 0) {
        const hasAllSkills = selectedSkills.every(skill => 
          job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()) || 
                                    skill.toLowerCase().includes(jobSkill.toLowerCase()))
        );
        if (!hasAllSkills) return false;
      }
      
      // Check locations
      if (selectedCities.length > 0 && !selectedCities.includes(job.city)) return false;
      
      return true;
    });
    
    setFilteredJobs(filtered);
    setShowResults(true);
    setShowSkills(false); // Minimize filters
    setShowLocation(false);
    setContinueMessage(`${filtered.length} job${filtered.length === 1 ? '' : 's'} found matching your filters.`);
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
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Continue with all filters</h2>
              <p className="mt-2 text-sm text-slate-500">Define Skills, Location, and Time of ad, then use Continue to apply the full filter set.</p>
            </div>
            <button
              onClick={handleContinue}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition hover:bg-slate-800"
            >
              Continue
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">Skills</p>
              <p className="mt-2 text-sm text-slate-500">{selectedSkills.length} selected</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">Locations</p>
              <p className="mt-2 text-sm text-slate-500">{selectedCities.length} selected</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">Time of ad</p>
              <select
                value={selectedTime}
                onChange={e => setSelectedTime(e.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              >
                {timeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {continueMessage && (
            <div className="mt-5 rounded-3xl bg-slate-900/5 px-5 py-4 text-sm text-slate-700 ring-1 ring-slate-200">
              {continueMessage}
            </div>
          )}
        </section>
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-300/40 ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Skill Planner</h2>
                <p className="mt-2 text-sm text-slate-500">Search, select, and preview the top skills for your job filters.</p>
              </div>
              <button
                onClick={() => setShowSkills(prev => !prev)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
              >
                <span className={`transition-transform ${showSkills ? 'rotate-90' : ''}`}>▶</span>
                {showSkills ? 'Collapse' : 'Expand'}
              </button>
            </div>

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

              {showSkills && (
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
              )}

              <div className="flex flex-wrap gap-3">
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
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-300/40 ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Location Filter</h2>
                <p className="mt-2 text-sm text-slate-500">Filter by EU cities or auto-select whole countries.</p>
              </div>
              <button
                onClick={() => setShowLocation(prev => !prev)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
              >
                <span className={`transition-transform ${showLocation ? 'rotate-90' : ''}`}>▶</span>
                {showLocation ? 'Collapse' : 'Expand'}
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
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
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
          </section>

          {showResults && (
            <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-300/40 ring-1 ring-slate-200">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-slate-900">Job Results</h2>
                <p className="mt-2 text-sm text-slate-500">{continueMessage}</p>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-slate-600">No jobs found matching your criteria. Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map(job => (
                    <a
                      key={job.id}
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-slate-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                          <p className="mt-1 text-sm text-slate-500">{job.company} • {job.city}</p>
                          <p className="mt-3 text-sm text-slate-700 line-clamp-3">{job.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {job.skills.slice(0, 5).map((skill, index) => (
                              <span key={index} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 5 && (
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                                +{job.skills.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
