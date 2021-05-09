$(() => {

    // IMAGE API, generates new images
    const ImageAPI = (function() {

        const imgAPI = $('#img-api');
        const img = $(imgAPI.find('.media > img'));
        const imgLoader = imgAPI.find('.img-loader');
        
        const _updateImage = async () => {
            
            const reqURL = 'https://picsum.photos/400/';
            const response = await fetch(reqURL);

            img.attr('src', response.url);
        };

        return {

            updateImage() {
             
                imgLoader.fadeIn(200);
                _updateImage().then(() => imgLoader.fadeOut(200));
            }
        }
    })();

    $('#img-api span').on('click', () => {
    
        $('#img-api .load-anim').css('display', 'block');
        ImageAPI.updateImage();
    });


    // MUSIC [SPOTIFY] API, search for tracks on SPOTIFY
    // using WEB API provided by SPOTIFY
    const SpotifyAPI = (function() {

        let userAccessToken = '';
        const APISearchURL = 'https://api.spotify.com/v1/search?';
        let type = 'track';
        let market = 'IN';
    
        const spotifyEmbedURL = 'https://open.spotify.com/embed/track/';
    
        const getTrackID = async (searchItem) => {
    
            const reqURL = `${APISearchURL}q=${searchItem}&type=${type}&market=${market}&limit=1&offset=0`;
            const response = await fetch(reqURL, {
    
                method: "GET",
                headers: {
        
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userAccessToken}`
                }
            });
    
            if(response.status !== 200)
                throw new Error(`${response.status}. Cannot Fetch the Data`);
            
            const data = await response.json();
    
            return data['tracks']['items'][0]['id'];
        };

        return {

            async getTrackURL(searchItem) {

                const trackID = await getTrackID(searchItem)
                                        .catch(error => console.log(error));

                return spotifyEmbedURL + trackID;
            }
        }
    })();

    $('#search-track').on('click', () => {

        $('#music-api .icon').hide();
        $('#music-api .load').css('visibility', 'visible');

        const musicLoader = $('.music-loader');
        musicLoader.fadeIn(200);

        const searchItem = $('#search-track-input')[0].value;
        const iframe = $('#music-api iframe');
        SpotifyAPI.getTrackURL(searchItem)
                    .then(trackURL => {

                        $(iframe).attr('src', trackURL);
                        setTimeout(() => musicLoader.fadeOut(200), 800);
                    });
    });


    // VIDEO [YOUTUBE] API, search for youtube on YOUTUBE
    // using WEB API provided by Google Developers
    const YoutubeAPI = (function() {

        const APISearchURL = 'https://www.googleapis.com/youtube/v3/search?';
        const key = '';
        const ytEmbedURL = 'https://www.youtube.com/embed/';
        
        const getVideoID = async (searchItem) => {

            const reqURL = `${APISearchURL}q=${searchItem}&key=${key}`;
            const response = await fetch(reqURL);

            if(response.status !== 200)
                throw new Error(`${response.status}. Cannot Fetch the Data`);
            
            const data = await response.json();

            for(item of data.items) {

                if(item.id.kind == 'youtube#video')
                    return item.id.videoId;
            }
        };

        return {

            async getVideoURL(searchItem) {

                const videoID = await getVideoID(searchItem)
                                        .catch(error => console.log(error));

                return ytEmbedURL + videoID;
            }
        }
    })();

    $('#search-video').on('click', () => {

        const videoLoader = $('.video-loader');
        videoLoader.find('.load-anim').css('display', 'grid');
        videoLoader.fadeIn(200);

        const searchItem = $('#search-video-input')[0].value;
        const iframe = $('#video-api iframe');
        YoutubeAPI.getVideoURL(searchItem)
                    .then(videoURL => {
                    
                        $(iframe).attr('src', videoURL);
                        setTimeout(() => videoLoader.fadeOut(200), 800);
                    });
    });
});
