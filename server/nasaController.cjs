const NasaAuth = require('./models/nasaModel')


const NasaApiKey = process.env.NASA_API_KEY || 'k5Hkmgh4CmhCdPlUckSgnZyjDdNUw5yeXKSuK70X';

//image request
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
                service_version: data.service_version,
                copyright: data.copyright,
                 user: req.session?.userId ? {
                    id: req.session.userId,
                    username: req.session.username
                } : null
            };
        next()
    }catch(error){
         console.error('NASA Controller Error:', error);
        next(error)
    }
},
// saved favorites
async saveFavorites(req,res,next){
    try{
        if (!req.session?.userId) {
                throw {
                    log: 'User not authenticated',
                    status: 401,
                    message: { err: 'Authentication required to save favorites' }
                };
            }
            
            const { title, url, hdurl, explanation, date, media_type } = req.body;
            
            if (!url || !title || !date) {
                throw {
                    log: 'Missing required favorite data',
                    status: 400,
                    message: { err: 'Title, URL, and date are required' }
                };
            }
            
            res.locals.favoriteData = {
                userId: req.session.userId,
                title,
                url,
                hdurl: hdurl || url,
                explanation,
                date,
                media_type: media_type || 'image',
                username: req.session.username,
                savedAt: new Date().toISOString(),
            };
            
            next();
            
        } catch (error) {
            console.error('NASA Controller Save Favorite Error:', error);
            next(error);
        }
},
// get favorites 
    async getFavorites(req, res, next) {
        try {
            if (!req.session?.userId) {
                throw {
                    log: 'User not authenticated',
                    status: 401,
                    message: { err: 'Authentication required to view favorites' }
                };
            }

            // For now, return empty favorites (you can implement database storage later)
            res.locals.favoritesData = {
                userId: req.session.userId,
                username: req.session.username,
                favorites: [],
                count: 0
            };

            next();

        } catch (error) {
            console.error('NASA Controller Get Favorites Error:', error);
            next(error);
        }
    },


// dont need this did it on the server file
//  async createUser(req, res, next) {
//         try {
//             const { username, password } = req.body;

//             if (!username || !password) {
//                 throw {
//                     log: 'Missing required fields',
//                     status: 400,
//                     message: { err: 'Username and password are required' }
//                 };
//             }
//             const newUser = new NasaAuth({ 
//                 password
//             });

//             const savedUser = await newUser.save(); 
//             res.locals.user = {
//                 id: savedUser._id,
//                 username: savedUser.username
//             };

//             next(); 

//         } catch (error) {
//             console.error('Create user error:', error);
//             next({
//                 log: 'Error occurred in createUser controller',
//                 status: 500,
//                 message: { err: 'User creation failed' }
//             });
//         }
//     }
};
module.exports = nasaController;