// quotes.js
const mongoose = require('mongoose');
const { Quote } = require('./server/nasaModel.cjs');

// DB connect URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scratch-project-axolotl';

// connect Mong DB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quotes = [
  {
    quote: "The cosmos is within us. We are made of star-stuff.",
    author: "Carl Sagan"
  },
  {
    quote: "You – you alone will have the stars as no one else has them.",
    author: "Antoine de Saint-Exupéry"
  },
  {
    quote: "Space is big. Really big. You just won’t believe how vastly, hugely, mind-bogglingly big it is.",
    author: "Douglas Adams"
  },
  {
    quote: "Look up at the stars and not down at your feet.",
    author: "Stephen Hawking"
  },
  {
    quote: "We are all in the gutter, but some of us are looking at the stars.",
    author: "Oscar Wilde"
  },
  {
    quote: "In one of the stars I shall be living. In one of them I shall be laughing.",
    author: "Antoine de Saint-Exupéry"
  },
  {
    quote: "The universe is under no obligation to make sense to you.",
    author: "Neil deGrasse Tyson"
  },
  {
    quote: "The ships hung in the sky in much the same way that bricks don’t.",
    author: "Douglas Adams"
  },
  {
    quote: "Somewhere, something incredible is waiting to be known.",
    author: "Carl Sagan"
  },
  {
    quote: "What makes the desert beautiful is that somewhere it hides a well.",
    author: "Antoine de Saint-Exupéry"
  },
  {
    quote: "In the beginning the universe was created. This has made a lot of people very angry and has been widely regarded as a bad move.",
    author: "Douglas Adams"
  },
  {
    quote: "Even the darkest night will end and the sun will rise.",
    author: "Victor Hugo"
  },
  {
    quote: "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood... were made in the interiors of collapsing stars.",
    author: "Carl Sagan"
  },
  {
    quote: "Not only is the Universe stranger than we think, it is stranger than we can think.",
    author: "Werner Heisenberg"
  },
  {
    quote: "To confine our attention to terrestrial matters would be to limit the human spirit.",
    author: "Stephen Hawking"
  }
];

// 5. insertMany array insert
Quote.insertMany(quotes)
  .then(() => {
    console.log('✅ Quotes inserted successfully!');
    mongoose.connection.close(); // DB connect end
  })
  .catch((err) => {
    console.error(' Error inserting quotes:', err);
  });