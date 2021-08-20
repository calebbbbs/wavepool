import axios from 'axios';



const getUsersCurrentPlayback = ({ access_token }) => {
const getCurrentPlayback: any = {
  method: 'get',
  url: 'https://api.spotify.com/v1/me/player',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  }
};

axios(getCurrentPlayback)
.then((response) =>{
  console.log(JSON.stringify(response.data));
})
.catch((error) =>{
  console.log(error);
});
};


const startOrResumePlayback = ({access_token, track_uri}) => {

  const data = JSON.stringify({
    "context_uri": `${track_uri}`,
    "offset": {
      "position": 5
    },
    "position_ms": 0
  });

const startOrResume: any = {
  method: 'put',
  url: 'https://api.spotify.com/v1/me/player/play',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  data : data
};

axios(startOrResume)
.then((response) =>{
  console.log(JSON.stringify(response.data));
})
.catch((error) =>{
  console.log(error);
});
};

const addToQueue = ({access_token, track_uri}) => {
const toQueue: any = {
  method: 'post',
  url: `https://api.spotify.com/v1/me/player/queue?${track_uri}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  }
};

axios(toQueue)
.then((response) =>{
  console.log(JSON.stringify(response.data));
})
.catch((error) =>{
  console.log(error);
});
};

module.exports.getUsersCurrentPlayback = getUsersCurrentPlayback;
module.exports.startOrResumePlayback = startOrResumePlayback;
module.exports.addToQueue = addToQueue;




// get current user's playback, recommended before making any playback api calls
// curl -X "GET" "https://api.spotify.com/v1/me/player" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQBu_P3vhcbBSpbLHCjyIph_cFJRVe9cz7Pyjlrfqqfnc_u5zbBRyDSgASfiZF6Ah1c7zLawF4aKmuHr08qeiqO7X-saw5fuHrA3cmLPFjtYSFoGGYjnvCYzYaCUs4RUWanwawFpPOH6Xqno0KcNxcU-Ynxamw"


// for Start/resume a user's playback
// curl -X "PUT" "https://api.spotify.com/v1/me/player/play" --data "{\"context_uri\":\"spotify:album:5ht7ItJgpBH7W6vJ5BqpPr\",\"offset\":{\"position\":5},\"position_ms\":0}" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQBu_P3vhcbBSpbLHCjyIph_cFJRVe9cz7Pyjlrfqqfnc_u5zbBRyDSgASfiZF6Ah1c7zLawF4aKmuHr08qeiqO7X-saw5fuHrA3cmLPFjtYSFoGGYjnvCYzYaCUs4RUWanwawFpPOH6Xqno0KcNxcU-Ynxamw"

// for add item to end of queue
// curl -X "POST" "https://api.spotify.com/v1/me/player/queue?uri=spotify%3Atrack%3A4iV5W9uYEdYUVa79Axb7Rh&device_id=a7deb70cb0a55a46ce524476515b1fe894107798" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQCz4DTOvVT9t0y0pycxOWhOGLdukezSWgGRsoehgu_OmMqaCdtF_IXPMn0kfeKfFhgVqTr86VWmRWgTVfwp04rLpryf02eYPkIfJC3PiGm-JKt2LHqusyjLLc1l13xUoKr1IkLWnXMrQsNRlQw0MFKCS8Zlyw"