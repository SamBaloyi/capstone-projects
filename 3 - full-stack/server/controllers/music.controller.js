const express = require("express");
const axios = require('axios');
const { formatDate } = require('../utils/time');

const fetchMusicData = async (query) => {
  try {
    const iTunesAPIUrl = 'https://itunes.apple.com/search';

    const response = await axios.get(iTunesAPIUrl, {
      params: {
        term: query,
        media: 'music',
        entity: 'album',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const musicResults = response.data.results.map((result) => {
      const releaseDate = formatDate(result.releaseDate)
      return {
        albumName: result.collectionName,
        artistName: result.artistName,
        albumCover: result.artworkUrl100,
        releaseDate: releaseDate,
      };
    });

    return musicResults;
  } catch (error) {
    console.error('Error fetching music data:', error);
    throw error; // You may want to handle errors more gracefully in a production environment
  }
};

module.exports = {
  fetchMusicData,
};
