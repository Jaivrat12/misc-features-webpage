import { imgAPI, musicAPI, videoAPI } from './domElems.js';

// APIs
// IMAGE API, generates new images
const ImageAPI = (function() {
    
    const _updateImage = async () => {
        
        const reqURL = 'https://picsum.photos/400/';
        const response = await fetch(reqURL);

        imgAPI.img.attr('src', response.url);
    };

    return {

        updateImage() {
            
            imgAPI.imgLoader.fadeIn(200);
            _updateImage().then(() => imgAPI.imgLoader.fadeOut(200));
        }
    }
})();

// MUSIC [SPOTIFY] API, search for tracks on SPOTIFY
// using WEB API provided by SPOTIFY
const SpotifyAPI = (function() {

    const APISearchURL = 'https://api.spotify.com/v1/search?';
    let type = 'track';
    let market = 'IN';

    const spotifyEmbedURL = 'https://open.spotify.com/embed/track/';

    const getTrackID = async (searchItem, token) => {

        const reqURL = `${APISearchURL}q=${searchItem}&type=${type}&market=${market}&limit=1&offset=0`;
        const response = await fetch(reqURL, {

            method: "GET",
            headers: {
    
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        if(response.status !== 200)
            throw new Error(`${response.status}. Cannot Fetch the Data`);
        
        const data = await response.json();
        return data.tracks.items[0].id;
    };

    return {

        get spotifyEmbedURL() {

            return spotifyEmbedURL;
        },
        async getTrackURL(searchItem, token) {

            const trackID = await getTrackID(searchItem, token)
                                    .catch(error => console.log(error));

            return spotifyEmbedURL + trackID;
        },
        putLoader() {

            musicAPI.icon.hide();
            musicAPI.loaderWrapper.css('display', 'block');
            musicAPI.musicLoader.fadeIn(200);
        }
    };
})();

// VIDEO [YOUTUBE] API, search for youtube on YOUTUBE
// using WEB API provided by Google Developers
const YoutubeAPI = (function() {

    const APISearchURL = 'https://www.googleapis.com/youtube/v3/search?';
    const ytEmbedURL = 'https://www.youtube.com/embed/';
    
    const getVideoID = async (searchItem, key) => {

        const reqURL = `${APISearchURL}q=${searchItem}&key=${key}`;
        const response = await fetch(reqURL);

        if(response.status !== 200)
            throw new Error(`${response.status}. Cannot Fetch the Data`);
        
        const data = await response.json();

        for(let item of data.items) {

            if(item.id.kind == 'youtube#video')
                return item.id.videoId;
        }
    };

    return {

        get ytEmbedURL() {

            return ytEmbedURL;
        },
        async getVideoURL(searchItem, key) {

            const videoID = await getVideoID(searchItem, key)
                                    .catch(error => console.log(error));

            return ytEmbedURL + videoID;
        },
        putLoader() {

            if(!videoAPI.vidLoadAnim.hasClass('d-flex'))
                videoAPI.vidLoadAnim.addClass('d-flex');
            videoAPI.videoLoader.fadeIn(200);
        }
    }
})();

// List of IDs of Songs and Videos
const trackIDs = [
    
    '6zAiRKvAMlXHxEtyO4yxIO', '6KMgPewrVRxzeFzRwkFa0M', '0Lu9pdU9sOqI2jFwxfztCb',
    '4VgGx1cQlHB7Ls1Ukt0H7H', '5C0ivQMxes2lWuOANhvVAm', '2Y9v6F9vFK9Z8KAoFwAj9Z',
    '28tufPkTcXmdNqTvi9hsoG', '1ffXf7HjLCHvNZngkQpGTR', '3dPtXHP0oXQ4HCWHsOA9js',
    '1vtGx2fyS5yHOdSwkjpiVi'
];
const videoIDs = [

    '_lFlmFoGhjc', 'S3C9vwyTkhA', 'fzQ6gRAEoy0', '3Fi1f-PJdco', 'Wwz21EwtzeA',
    'v8bZVdTgXoY', 'U03y7rjEEKw', '0Vwwr3VGsYg', 'jhYg5NrN-r8', '9pjkgmmalkE'
];

export {

    trackIDs, videoIDs,
    ImageAPI, SpotifyAPI, YoutubeAPI
};