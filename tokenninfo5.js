const express = require('express');
const axios = require('axios');

const app = express();
const port = 3005; // You can change this port as needed

//catch error and keep terminal open
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);

});
  //Get pool information
  app.use('/token/:currencyAddress' ,async(req , res , next) =>{

    const apiUrl = 'https://api.geckoterminal.com/api/v2/search/pools';
    const  currencyAddress  = req.params.currencyAddress;

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
    req.part1 = response.data
    const err = new Error()
    if(err){
      next()
    }
    });
  
 

  app.use('/token/:currencyAddress', async(req,res,next ) =>{
              //Get media information when entry Token Currency Address
              const  currencyAddress  = req.params.currencyAddress;
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

              req.part2 = { Token_Currency:currencyAddress,
                Token_Symbol:id ,
                Token_Website: getWebsite ,
                Token_Discord: getDiscord ,
                Token_Telegram: TelegramUrl ,
                Token_Twitter:  TwitterUrl,
                    }
                //Get pool response
                //Collecate Token Name and Media Data

      
              //Get Token Exchanges
              const response3 = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/contract/${currencyAddress}`)
              const getData2 = response3.data
              //console.log(getData2)
                //Get pool response
                //Collecate Token Name and Media Data
                getData2.forEach(item =>{
                    const getMarket = item.getMarket
                    console.log(getMarket)
                })




                req.part3 = getData2['tickers']
                        const err2 = new Error()
                        if(err2){
                          next()
                        }
 
  });
    app.get('/token/:currencyAddress', async(req,res) =>{
        res.json({Token_pool:req.part1 ,
          Token_Info:req.part2 ,
          Token_inf_tickers:req.part3 ,
          
        }) 
    })

   



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



