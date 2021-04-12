import React, { useState, useEffect } from 'react';
import Coin from '../components/Coin'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
    },
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
    list: {
        
    },
    data: {
        display: 'flex',
        textAlign: 'start',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        width: 150      
    }, 
    price: {
        width: 150
    }
}));

const Home = () => {
    const classes = useStyles();
    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('')
    //TODO:
    //Create a search field
    //Create a coin list component
    //List coins after initial render
    //List one coin after search

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=250&page=1&sparkline=false')
        .then(response => {
            setCoins(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleChange = e => {
        setSearch(e.target.value)
    }

    return (
        <div className={classes.root}>
            <div>
                <h1>Search a currency</h1>
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Currency" variant="outlined" onChange={handleChange}/>
                </form>
            </div>
            <div>
                {filteredCoins.map(coin => {
                    return(
                        <List className={classes.coin} >
                            <ListItem button className={classes.data}>
                                <Avatar alt={coin.name} src={coin.image} className={classes.symbol}/>
                                <ListItemText className={classes.name}>{coin.name}</ListItemText>
                                <ListItemText className={classes.price}>{coin.current_price}</ListItemText>
                                {coin.price_change_percentage_24h < 0 ? (<ListItemText style={{color: 'red'}}>{coin.price_change_percentage_24h.toFixed(2)}</ListItemText>) : (<ListItemText style={{color: 'green'}}>{coin.price_change_percentage_24h.toFixed(2)}</ListItemText>) }
                                <ListItemText>{coin.market_cap}</ListItemText>
                                <ListItemText>{coin.total_volume.toLocaleString()}</ListItemText>
                            </ListItem>
                            <Divider />
                        </List>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;