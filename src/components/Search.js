import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PAGE_SIZE } from '../constants';
import List from './List';

const Search = () => {
    const [countries, setCountries] = useState([]);
    const [open, setOpen] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [selected, setSelected] = useState(null);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);

    useEffect(() => {
        const getData = async function() {
            const res = await axios.get('./db.json');
            const countriesData = res.data.countries
            setCountries(countriesData);
            if (countriesData.length > pageSize){
                setHasMore(true);
            }
        }
        getData();
    }, [pageSize]);

    const handleClick = (data) => {
        setSelected(data);
    }

    const handleLoadMore = () => {
        setPageSize(countries.length)
        setHasMore(false)
    }

    return (
        <div className="search">
        <h1>{selected}</h1>

        <div className="container cursor box" onClick={() => setOpen(!open)}> 
            <div className="item">Select a location </div> <div> ▼ </div> 
        </div>
        <div style={{visibility: open ? 'visible' : 'hidden'}} className="box">
            <List countries={countries} hasMore={hasMore} handleClick={handleClick} handleLoadMore={handleLoadMore} pageSize={pageSize} />
        </div>
        
    </div>
    )
}

export default Search