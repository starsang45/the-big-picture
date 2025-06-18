// nasaController.cjs

// one
const getImageOfDay = async (req, res, next) => {
  try {
    const apiKey = 'k5Hkmgh4CmhCdPlUckSgnZyjDdNUw5yeXKSuK70X';
    const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    const response = await fetch(nasaUrl);
    const data = await response.json();

    res.locals.nasaData = data;
    return next();
  } catch (error) {
    console.error('Error fetching today\'s NASA APOD:', error.message);
    return res.status(500).json({ success: false, error: 'Failed to fetch today\'s APOD' });
  }
};

// prev
const getApodLast10Days = async (req, res, next) => {
  try {
    const apiKey = 'k5Hkmgh4CmhCdPlUckSgnZyjDdNUw5yeXKSuK70X';
    const today = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 9);

    const startDate = tenDaysAgo.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

    const response = await fetch(nasaUrl);
    const data = await response.json();

    res.locals.apodArray = data;
    return next();
  } catch (error) {
    console.error('Error fetching APOD history:', error.message);
    return res.status(500).json({ success: false, error: 'Failed to fetch APOD history' });
  }
};

module.exports = {
  getImageOfDay,
  getApodLast10Days
};
