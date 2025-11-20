const express = require('express');
const axios = require('axios');

const app = express();
const port = 3005; // You can change this port as needed

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

    const response2 = await axios.get(`https://api.geckoterminal.com/api/v2/networks/eth/tokens/${currencyAddress}/info`)

    const getData = response2.data

    const getAttributes = getData.data.attributes

    const getDiscord = getAttributes.discord_url

    const getTelegram = getAttributes.telegram_handle

    const getTwitter = getAttributes.twitter_handle

    const TokenMediaData = { Token_Currency:currencyAddress,
      Token_Discord: getDiscord,
      Token_Telegram: getTelegram,
      Token_Twitter: getTwitter,
    }


    // Send the response data as JSON
    res.json({TokenInfo : response.data , TokenMedia: TokenMediaData
     });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

