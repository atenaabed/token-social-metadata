const express = require('express');
const axios = require('axios');

const app = express();
const port = 3004; // You can change this port as needed

app.get('/token/:currencyAddress', async (req, res) => {

    const apiUrl = 'https://api.geckoterminal.com/api/v2/search/pools';
    const { currencyAddress } = req.params;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        query: currencyAddress,
        page: 1,
      },
      headers: {
        'accept': 'application/json',
      },
    });

    //Get pool response
    const responsedata = response.data
    const responsedata2 = responsedata !== null ? responsedata : null 


    //Get media information when entry Token Currency Address
    const response2 = await axios.get(`https://api.geckoterminal.com/api/v2/networks/eth/tokens/${currencyAddress}/info`)
    const getData = response2.data
    const getAttributes = getData.data.attributes

    //Get Website
    const getWebsite = getAttributes.websites

    //Get Discord
    const getDiscord = getAttributes.discord_url

    //Get Telegram
    const getTelegram = getAttributes.telegram_handle
    const TelegramUrl = getTelegram !== null ? `https://t.me/${getTelegram}` : null
    
    
    //Get Twitter
    const getTwitter = getAttributes.twitter_handle
    const TwitterUrl = getTwitter !== null ? `https://twitter.com/${getTwitter}` : null

    //Get the symbol of Token 
    const id = getAttributes.symbol
    

    //Collecate Token Name and Media Data
    const TokenMediaData = { Token_Currency:currencyAddress,
      Token_Symbol:id ,
      Token_Website: getWebsite ,
      Token_Discord: getDiscord ,
      Token_Telegram: TelegramUrl ,
      Token_Twitter:  TwitterUrl,
    }

    const TokenMediaData2 = TokenMediaData !== null ? TokenMediaData : null

    

    
    //Get Token Exchanges
    const response3 = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/contract/${currencyAddress}`)
    const getData2 = response3.data
    //console.log(getData2)

    //Get tickers Data related to exchang information
    const ExchangeData = getData2['tickers']
    const ExchangeData2 = ExchangeData !== null ? ExchangeData : null

    // Send the response data as JSON
   
    res.json({TokenInfo: responsedata , TokenMedia: TokenMediaData , TokenExchanges: ExchangeData});

  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


