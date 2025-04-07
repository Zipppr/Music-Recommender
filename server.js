// server.js
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3001;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to get top 3 artists
app.get('/get-top-artists', async (req, res) => {
  try {
    const topArtists = [
      {
        id: 'artist1',
        name: 'Radiohead',
        monthlyListeners: '31,391,981',
        imageUrl: 'https://i.scdn.co/image/ab67616100005174a03696716c9ee605006047fd',
        spotifyLink: 'https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb',
        recommendations: [
          {
            name: 'The Smashing Pumpkins',
            link: 'https://open.spotify.com/artist/0feDAfIFpP6HANKOrjNQoq',
            imageUrl: 'https://www.bankplusamphitheater.com/assets/img/Smashing-Pumpkins-d7449afcb9.jpg'
          },
          {
            name: 'Coldplay',
            link: 'https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU',
            imageUrl: 'https://www.rollingstone.com/wp-content/uploads/2019/11/Coldplay-002-credit-Tim-Saccenti.jpg?w=1581&h=1054&crop=1'
          },
          {
            name: 'The Cure',
            link: 'https://open.spotify.com/artist/3yY2gUcIsjMr8hjo51PoJ8',
            imageUrl: 'https://i.iheart.com/v3/catalog/artist/32153?ops=fit(720%2C720)'
          }
        ]
      },
      {
        id: 'artist2',
        name: 'Elliott Smith',
        monthlyListeners: '2,604,764',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb079739b801ab3f105866b76f',
        spotifyLink: 'https://open.spotify.com/artist/2ApaG60P4r0yhBoDCGD8YG',
        recommendations: [
          {
            name: 'Jeff Buckley',
            link: 'https://open.spotify.com/artist/3xJ0RY7c4EKOcSiyQ9MRTy',
            imageUrl: 'https://media.npr.org/assets/img/2016/01/12/jeff-buckley_-c-david-gahr_wide-551d823982a692c25afdc0f23963ce53556efed6.jpeg'
          },
          {
            name: 'Alex G',
            link: 'https://open.spotify.com/artist/4MXUO7sVCaFgFjoTI5ox5c',
            imageUrl: 'https://thefader-res.cloudinary.com/private_images/w_1440,c_limit,f_auto,q_auto:best/DSC03165_mymmbu/alex-g-is-trying-to-tell-you-something.jpg'
          },
          {
            name: 'Bob Dylan',
            link: 'https://open.spotify.com/artist/74ASZWbe4lXaubB36ztrGX',
            imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb791742524609864273747ef5'
          }
        ]
      },
      {
        id: 'artist3',
        name: 'Kendrick Lamar',
        monthlyListeners: '104,843,144',
        imageUrl: 'https://cdn-images.dzcdn.net/images/artist/be0a7c550567f4af0ed202d7235b74d6/1900x1900-000000-80-0-0.jpg',
        spotifyLink: 'https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg',
        recommendations: [
          {
            name: 'J. Cole',
            link: 'https://open.spotify.com/artist/6l3HvQ5sa6mXTsMTB19rO5',
            imageUrl: 'https://charts-static.billboard.com/img/2009/12/j-cole-9on-344x344.jpg'
          },
          {
            name: 'Pusha T',
            link: 'https://open.spotify.com/artist/1Ffb6ejR6Fe5IamqA5oRUF',
            imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebc5b88a3924d8318f25f20594'
          },
          {
            name: 'OutKast',
            link: 'https://open.spotify.com/artist/1G9G7WwrXka3Z1r7aIDjI7',
            imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb0cb3f95b9f8f7337e135a925'
          }
        ]
      }
    ];

    res.json(topArtists);
  } catch (error) {
    console.error('Error fetching top artists:', error);
    res.status(500).json({ error: 'Failed to fetch top artists' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
