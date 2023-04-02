import axios from "axios";
import { useQuery } from 'react-query';
function getGames() {
  let url = "https://unseen-servant.digitaldemiplane.com/api/games/";
  return axios.get(url);
}

export const timeSlots = [
  { value: 0, text: "Midnight-4AM" },
  { value: 1, text: "4AM-8AM" },
  { value: 2, text: "8AM-Noon" },
  { value: 3, text: "Noon-4PM" },
  { value: 4, text: "4PM-8PM" },
  { value: 5, text: "8PM-Midnight" },
]

/* yes, this hook recreates a tiny portion of react-query, and frankly should move to that lib
if needs get even an iota more compgit pulex or if we want that sweet, sweet, client side cache */
export function useGames() {

  const { data, error, isLoading } = useQuery(
    ["games"], async () => {
      const games = await getGames();
      return games.data.map(game => {
        return {
          ...game,
          datetime: new Date(game.datetime),
          slot: Math.floor(new Date(game.datetime).getHours() / 4),
          datetime_open_release: game.datetime_open_release === null ? null : new Date(game.datetime_open_release),
          datetime_release: game.datetime_release === null ? null : new Date(game.datetime_release)
        }
      }).sort((a, b) => {
        return a.datetime - b.datetime;
      });
  }, {
      onError: (err) => {
        console.warn("Error loading games", err);
        }
      });
  return { 
    isLoading,
    data,
    error
  }
}

export function useUserDetails() {
  const url = "https://unseen-servant.digitaldemiplane.com/auth/user_details/";


  const { data, error, isLoading } = useQuery(
    ["userdetails"], async () => {
      return await (await axios.get(url, { withCredentials: true })).data;
    }, {
    staleTime: 30000,
    onError: (err) => {
      console.warn(err);
    }
  });
  
  return {
    isLoading,
    data,
    error
  }
}
