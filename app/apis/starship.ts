import {fetchWithTimeout} from '../utils';

export interface Starship {
  MGLT?: string;
  cargo_capacity?: string;
  consumables?: string;
  cost_in_credits?: string;
  created?: string;
  crew?: string;
  edited?: string;
  hyperdrive_rating?: string;
  length?: string;
  manufacturer?: string;
  max_atmosphering_speed?: string;
  model?: string;
  name?: string;
  passengers?: string;
  starship_class?: string;
}

export const searchStarshipApi = (key: string): Promise<Starship | null> => {
  return new Promise(async resolve => {
    const response = await fetchWithTimeout(
      `https://swapi.dev/api/starships/?search=${key}`,
    );
    if (!response?.ok || !response) {
      resolve(null);
    } else {
      const responseJson: {results: Array<Starship>} = await response?.json();
      if (responseJson.results.length === 0) {
        resolve(null);
      }
      resolve(responseJson.results[0]);
    }
  });
};
