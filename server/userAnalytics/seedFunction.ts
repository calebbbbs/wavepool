import SpotifyWebApi from "spotify-web-api-node";
import { archiveHistory } from "./Seedhelpers";
import axios from "axios";


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri:
    `${process.env.HOST}/auth/spotify/callback`,
});

const getHistoryPlayed: any = async (access_token: string, user_id: string, offset: number, loop: number, next: string) => {
  let url: string = '';
  if(loop > 10) {
    return;
  } if (!offset) {
    url = `https://api.spotify.com/v1/me/player/recently-played?limit=25`;
  } else {
    url = `https://api.spotify.com/v1/me/player/recently-played?limit=25&before=${offset}`;
    //url = next;
  }

  spotifyApi.setAccessToken(access_token);
    return await axios({
      url: url,
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })
    .then(async (data: any) => {
      console.log(data.data.next)
      console.log(data.data.cursors)
      archiveHistory(data, user_id, access_token);
      // Output items
      console.log(`offset ${offset}`)
      console.log(`loop # ${loop} data`, data.data);
      return await setTimeout(() => {getHistoryPlayed(access_token, user_id, data.data.cursors.after, (loop + 1), data.data.next)}, 1000);
    })
    .catch((error) => {
      console.log("Error from getHistory", error);
    });
};

export default getHistoryPlayed
