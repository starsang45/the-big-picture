//const NasaAuth = require('./nasaModel')


const NasaApiKey = 'k5Hkmgh4CmhCdPlUckSgnZyjDdNUw5yeXKSuK70X'
const nasaController = {
async getImageOfDay (req, res, next ){
    try{
       const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NasaApiKey}`)
         //const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)

        if(!response.ok){
            throw{
                log:'Error on fetching data',
                status: 400,
                message:{err: `NASA api error: ${response.status}`}
            }
        }
        const data = await response.json();
        res.locals.nasaData = {
            
                title :data.title,
                url: data.url,
                hdurl: data.hdurl,
                explanation: data.explanation,
                date: data.date,
                media_type: data.media_type,
                service_version: data.service_version
            };
        next()

    }catch(error){
        next(error)

    }

}
}

module.exports = nasaController;