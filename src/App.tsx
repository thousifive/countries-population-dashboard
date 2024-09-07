import React from "react";
import PopulationTable from "./components/PopulationTable";
import { useCountriesData } from "./hooks/useCountriesData";
import "./App.css";

const App: React.FC = () => {
  const {
    searchTerm,
    filterByPopulation,
    filteredCountries,
    setSearchTerm,
    setFilterByPopulation,
    filterCountries,
    clearFilters,
  } = useCountriesData();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterCountries(term, filterByPopulation);
  };

  const handlePopulationFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const population = e.target.value;
    setFilterByPopulation(population);
    filterCountries(searchTerm, population);
  };

  return (
    <div className="App">
      <h1>Countries Info</h1>
      <div className="action-container">
        <div className="input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Country Name"
          />
          <select
            className="population-select"
            value={filterByPopulation}
            onChange={handlePopulationFilter}
          >
            <option value="all">Population</option>
            <option value="1000000">{`< 1M`}</option>
            <option value="5000000">{`< 5M`}</option>
            <option value="10000000">{`< 10M`}</option>
          </select>
          <button className="clear-cta" onClick={clearFilters}>
            Clear
          </button>
        </div>
        <button
          className="show-all"
          onClick={() => {
            clearFilters();
          }}
        >
          Show all Countries
        </button>
      </div>
      <PopulationTable countries={filteredCountries} />
    </div>
  );
};

export default App;
