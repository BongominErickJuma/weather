import React, {useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoOptions, geoUrl } from "../api";

const Search = ({ onSearchChange }) => {

  const [ search, setSearch] = useState(null)

const handleOnChange = searchInput => {
  setSearch(searchInput)
  onSearchChange(searchInput)
}


const loadOptions = searchInput => {

  return(
    fetch(`${geoUrl}/cities?&namePrefix=${searchInput}`, geoOptions)
    .then((res)=> (res.json()))
    .then((res) => {

      return{
        options: res.data.map((city) => {
          return{
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          }
        })
      }
    })
    .catch((err)=> console.error(err))
  );
  
}

  return (
    <div className="search">
      <AsyncPaginate 
      placeholder="search for city"
      value={search}
      onChange={handleOnChange}
      debounceTimeout={600}
      loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
