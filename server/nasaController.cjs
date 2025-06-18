const { NasaAuth, Quote }  = require('./nasaModel.cjs')
const Favorite = require('./favoriteModel.cjs'); 


const NasaApiKey = process.env.NASA_API_KEY || 'k5Hkmgh4CmhCdPlUckSgnZyjDdNUw5yeXKSuK70X';

//image request
const nasaController = {
//Get NASA Picture of the Day(APOD) for today
 async getImageOfDay (req, res, next ){
    try{
       const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NasaApiKey}`)
         //const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)

        if(!response.ok){
            throw {
                log:'Error on fetching data',
                status: 400,
                message:{err: `NASA api error: ${response.status}`}
            }
        }

        const data = await response.json();

        //store relevant data in res.locals for use in the response
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
    } catch (error) {
        console.error('NASA Controller Error:', error);
        next(error);
    };
},

// saved favorite image to the database
async saveFavorites(req,res,next){
    try {
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
            // create and save new favorite in the database
            const newFavorite = await Favorite.create({
                userId: req.session.userId,
                title,
                url,
                hdurl: hdurl || url,
                explanation,
                date,
                media_type: media_type || 'image',
                username: req.session.username,
                savedAt: new Date()
            })
            res.locals.favoriteData = newFavorite;
            next();        
        } catch (error) {
            console.error('NASA Controller Save Favorite Error:', error);
            next(error);
        }
},

// Retrieve a user's saved favorites
    async getFavorites(req, res, next) {
        try {
            if (!req.session?.userId) {
                throw {
                    log: 'User not authenticated',
                    status: 401,
                    message: { err: 'Authentication required to view favorites' }
                };
            }
        // Find favorites for the logged-in user, sorted by date
        const favorites = await Favorite.find({userId: req.session.userId}).sort({ savedAt:-1 });

            // For now, return empty favorites (you can implement database storage later)
            res.locals.favoritesData = {
                userId: req.session.userId,
                username: req.session.username,
                favorites,
                count: favorites.length
            };

            next();

        } catch (error) {
            console.error('NASA Controller Get Favorites Error:', error);
            next(error);
        }
    },

//Fetch apod from the last 10 days from NASA API
    async getApodLast10Days(req, res, next) {
    try {
      const today = new Date();
      const tenDaysAgo = new Date(today);
      tenDaysAgo.setDate(today.getDate() - 10);

      // Format dates to 'YYYY-MM-DD'
      const formatDate = (date) => date.toISOString().split('T')[0];
      const start_date = formatDate(tenDaysAgo);
      const end_date = formatDate(today);

      // Make request to NASA API for range of dates
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NasaApiKey}&start_date=${start_date}&end_date=${end_date}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`NASA API error ${response.status}`);
      }

      const data = await response.json(); // Returns array of APODs
      res.locals.apodArray = data;
      next();
    } catch (error) {
      console.error('NASA Controller Get APOD Last 10 Days Error:', error);
      next(error);
    }
  }

};

// const { Quote } = require('./nasaModel.cjs');

// Controller to return a random quote
const getRandomQuote = async (req, res, next) => {
  try {
    const count = await Quote.countDocuments();
    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: 'No quotes found in the database.'
      });
    }

    const randomIndex = Math.floor(Math.random() * count);
    const randomQuote = await Quote.findOne().skip(randomIndex);

    res.locals.quoteData = {
      quote: randomQuote.quote,
      author: randomQuote.author
    };

    return next();
  } catch (err) {
    return next({
      log: 'Error in getRandomQuote controller',
      status: 500,
      message: { err: 'Failed to retrieve quote of the day.' }
    });
  }
};

// module.exports = {
//   ...module.exports,
//   getRandomQuote
// };


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

nasaController.getRandomQuote = getRandomQuote;
module.exports = nasaController;