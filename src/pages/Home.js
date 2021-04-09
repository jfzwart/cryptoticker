import React, { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const url = 'api.coingecko.com/api/v3'

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then((response) => {
            console.log(response)
        })
    }, []) 

    return (
        <div>home</div>
    )
}

export default Home