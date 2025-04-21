// server.js
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const querystring = require('querystring');
dotenv.config();

const app = express();
const port = 3001;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Similar artists page
app.get('/similar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/similar.html'));
});

// Redirect to Spotify authorization
app.get('/login', (req, res) => {
  const scope = 'user-top-read';
  const queryParams = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI
  });

  res.redirect('https://accounts.spotify.com/authorize?' + queryParams);
});

// Handle callback and get access token
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // redirect to front-end with token in query
  res.redirect('/?access_token=' + accessToken);
});

// Fetch top artists
app.get('/top-artists', async (req, res) => {
  const accessToken = req.query.access_token;

  try {
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=10', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching top artists:', error);
    res.status(500).json({ error: 'Failed to fetch top artists' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});