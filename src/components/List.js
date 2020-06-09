import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

const List = ({countries, hasMore, handleClick, handleLoadMore, pageSize}) => {
    const [countryData, setCountryData] = useState([]);
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        const search = e.target.value;
        setSearch(e.target.value)

        if (search !== ''){
            const debounced = debounce(() => {
                const newCountryData = countryData.filter(item => item.includes(search));
                setCountryData(newCountryData);
            }, 300);
            debounced();
        } else {
            setCountryData(countries);
        }
    }

    useEffect(() => {
        setCountryData(countries)
    }, [countries]);

    return (
        <div>
            <input type="text" placeholder={`🔍`} onChange={handleChange} value={search}  />
            <div>{countryData && countryData.length > 0 && countryData.slice(0, pageSize).map((country, idx) => {
                    return <div className="cursor" key={idx} onClick={() => handleClick(country)}> {country} </div>
                })}
            </div>
            <span className="cursor red hasMore" onClick={handleLoadMore}> {hasMore && `${countries.length - pageSize} more...`} </span>
        </div>
    )
}

List.propTypes = {
    countries: PropTypes.arrayOf(String),
    hasMore: PropTypes.bool,
    handleClick: PropTypes.func,
    handleLoadMore: PropTypes.func,
    pageSize: PropTypes.number,
}

export default List;