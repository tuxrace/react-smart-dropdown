import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

const List = ({
  countries,
  hasMore,
  setHasMore,
  handleClick,
  handleLoadMore,
  pageSize,
}) => {
  const [countryData, setCountryData] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const searchString = e.target.value.toLowerCase();
    setSearch(e.target.value);

    if (searchString !== "") {
      const debounced = debounce(() => {
        const newCountryData = countries.filter((item) =>
          item.toLowerCase().includes(searchString)
        );
        setCountryData(newCountryData);
        setHasMore(false);
      }, 100);
      debounced();
    } else {
      setCountryData(countries);
      setHasMore(true);
    }
  };

  useEffect(() => {
    setCountryData(countries);
  }, [countries]);

  return (
    <div>
      <input
        type="text"
        placeholder={`🔍search`}
        onChange={handleChange}
        value={search}
      />
      <div>
        {countryData &&
          countryData.length > 0 &&
          countryData.slice(0, pageSize).map((country, idx) => {
            return (
              <div
                className="cursor"
                key={idx}
                onClick={() => handleClick(country)}
              >
                {country}
              </div>
            );
          })}
      </div>
      {countryData.length === 0 && (
        <div>
          <strong>{search}</strong> not found
        </div>
      )}
      <div className="cursor red hasMore" onClick={handleLoadMore}>
        {hasMore && countries.length - pageSize > 0 &&
          `${countries.length - pageSize} more...`
        }
      </div>
    </div>
  );
};

List.propTypes = {
  countries: PropTypes.arrayOf(String),
  hasMore: PropTypes.bool,
  handleClick: PropTypes.func,
  handleLoadMore: PropTypes.func,
  pageSize: PropTypes.number,
};

export default List;
