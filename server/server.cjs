require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session'); 
const MongoStore = require('connect-mongo')
const nasaController = require('./nasaController.cjs');
const {NasaAuth}  = require('./nasaModel.cjs');
const app = express();
const PORT = process.env.PORT || 3000;
//connectin to mongoo
// mongoose.connect('mongodb://localhost:27017/scratch-project-axolotl', {
// });

const ourURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scratch-project-axolotl';

mongoose.connect(ourURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


//sessionconfiguration 
app.use(session({
    secret: process.env.SESSION_SECRET || 'nasa-app-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: ourURI,
        collectionName: 'sessions'
    }),
    // not sure about these cookies
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}));

app.use(express.static('./dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


console.log('nasaController:', nasaController);
console.log('getImageOfDay:', typeof nasaController.getImageOfDay);

const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        return res.status(401).json({ 
            error: 'Authentication required',
            message: 'Please login to access this resource'
        });

    }
};

const optionalAuth = (req, res, next) => {
    if (req.session.userId) {
        req.user = { id: req.session.userId, username: req.session.username };
    }
    next();
};

app.get('/login',(req, res)=>{
  if(req.session.userId){
    return res.redirect('/dashboard')
  }res.render('login',{
    error: req.session.error,
    message: req.session.message
  })
});

//for login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Username and password are required'
            });
        }
        
        const user = await NasaAuth.findByCredentials(username, password);
        req.session.userId = user._id;
        req.session.username = user.username;
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username
            }
        });
        
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(401).json({
            success: false,
            error: error.message || 'Login failed'
        });
    }
});





//porting registration creating ur and pass for users
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password} = req.body;
        
        if (!username || !password ) {
            return res.status(400).json({
                success: false,
                error: 'username and password are required'
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 6 characters long'
            });
        }
        //declaring new user and saving
        const newUser = new NasaAuth({
            username,
            password
        });
        
        await newUser.save();
        
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: {
                id: newUser._id,
                username: newUser.username,
              
            }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        
        let errorMessage = 'Registration failed';
        res.status(400).json({
            success: false,
            error: errorMessage
        });
    }
});
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({
                success: false,
                error: 'Logout failed'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    });
});







//get today's NASA apod all data, new endpoint here !!
app.get('/api/nasa/one', nasaController.getImageOfDay, (req, res) =>
  res.status(200).json({
    success:true,
    log:'Today Nasa apod data fetch succesfully',
    data: res.locals.nasaData
  })
);

//get only today's image URL
app.get('/api/nasa/apod/image', nasaController.getImageOfDay, (req, res) =>
  res.status(200).json({
    success: true,
    message: 'NASA image URL fetched successfully',
    imageUrl: res.locals.nasaData.url // Just the image URL
  })
);



// app.post('/api/nasa/apod', nasaController.getImageOfDay,(req,res)=>
// res.status(200).json({data: res.locals.data}))

// post to save favorites depending on number of favorite to a numberi give .
//rout to request the length of favortire images and actial image.
//look to stash from the past in mango db
//get favorites

//Get apod from the last 10 days
app.get('/api/apod/prev', nasaController.getApodLast10Days, (req, res) =>
  res.status(200).json({
    success: true,
    message: 'Last 10 days of NASA APODs fetched successfully',
    data: res.locals.apodArray
  })
);

//save favorites
app.post('/api/nasa/favorites', requireAuth, nasaController.saveFavorites, (req, res) => {
    res.status(201).json({
        success: true,
        message: 'Favorite saved successfully',
        data: res.locals.favoriteData
    });
});

//Get saved favorite image (requires login)
app.get('/api/nasa/favorites', requireAuth, nasaController.getFavorites, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Favorites retrieved successfully',
        data: res.locals.favoritesData
    });
});

//dashboard router

app.get('/dashboard', requireAuth, async (req, res) => {
    try {
        const user = await NasaAuth.findById(req.session.userId).select('-password');
        res.render('dashboard', { 
            user: user,
            username: user.username
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.redirect('/login');
    }
});

// Get a random quote for sign-in page
app.get('/api/quote', nasaController.getRandomQuote, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Random quote fetched successfully',
    data: res.locals.quoteData
  });
});


//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
} else {
  module.exports = app;
}
