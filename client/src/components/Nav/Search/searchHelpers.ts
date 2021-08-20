import axios from "axios";


  const querySpotify = (query: string, access_token: string) => {
   return axios({
      url: `https://api.spotify.com/v1/search?q=${query}&type=track`,
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((data) => {
        return data.data.tracks.items;
    });
  }

  export default querySpotify;
