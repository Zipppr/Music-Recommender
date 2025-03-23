const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3001;

// Serve static files (like images) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to get top artists (only 3 artists for now)
app.get('/get-top-artists', async (req, res) => {
  try {
    // Example API response with top 3 artists, you can replace this with an actual Spotify API request
    const topArtists = [
      {
        id: 'artist1',
        name: 'Radiohead',
        monthlyListeners: '31,391,981',
        imageUrl: 'https://i.scdn.co/image/ab67616d0000b2737d8312180a2e2d6f58f3e55b',
        spotifyLink: 'https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb',
      },
      {
        id: 'artist2',
        name: 'Elliott Smith',
        monthlyListeners: '2,604,764',
        imageUrl: 'https://i.scdn.co/image/ab67616d0000b2737d831718832c7e9c4c736156',
        spotifyLink: 'https://open.spotify.com/artist/2ApaG60P4r0yhBoDCGD8YG',
      },
      {
        id: 'artist3',
        name: 'Kendrick Lamar',
        monthlyListeners: '104,843,144',
        imageUrl: 'https://i.scdn.co/image/ab67616d0000b273f17975f3e8b465cdb735ec3',
        spotifyLink: 'https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg',
      },
    ];

    // Send the top artists data as a response
    res.json(topArtists);
  } catch (error) {
    console.error('Error fetching top artists:', error);
    res.status(500).json({ error: 'Failed to fetch top artists' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
