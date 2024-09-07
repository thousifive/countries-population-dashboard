import { useState, useEffect } from "react";
import { getCountries } from "../api/api";
import { Country } from "../types";

export const useCountriesData = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterByPopulation, setFilterByPopulation] = useState<number | string>(
    ""
  );

  const fetchCountries = async () => {
    const countryData = await getCountries();
    setCountries(countryData);
    setFilteredCountries(countryData);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const filterCountries = (name: string, population: string | number) => {
    let filtered = countries;

    if (name) {
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(name)
      );
    }

    if (population && population !== "all") {
      filtered = filtered.filter(
        (country) => country.population < Number(population)
      );
    }

    setFilteredCountries(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterByPopulation("");
    setFilteredCountries(countries);
  };

  return {
    searchTerm,
    filterByPopulation,
    filteredCountries,
    setSearchTerm,
    setFilterByPopulation,
    filterCountries,
    clearFilters,
  };
};
