const axios = require('axios');

//Get Media information -- Discoard,Telegram,Twitter
try{
    async function getTokenMedial() {
        const tokenAddress = '0xe6b27c5fd0e83ee1b1e35e71fd4a03814535e138'
        const response = await axios.get(`https://api.geckoterminal.com/api/v2/networks/eth/tokens/${tokenAddress}/info`)
        const getData = response.data
        const getAttributes = getData.data.attributes
        const getDiscord = getAttributes.discord_url
        const getTelegram = getAttributes.telegram_handle
        const getTwitter = getAttributes.twitter_handle
        
    }

    getTokenMedial();

}catch(error){
    console.log('this is error:' , error)
}
