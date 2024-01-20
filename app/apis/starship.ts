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

export const getStarship = (id: string): Promise<Starship | null> => {
  return new Promise(async resolve => {
    const response = await fetchWithTimeout(
      `https://swapi.dev/api/starships/${id}`,
    );
    if (!response?.ok || !response) {
      resolve(null);
    } else {
      const responseJson: Starship = await response?.json();
      if (responseJson) {
        resolve(null);
      }
      resolve(responseJson);
    }
  });
};
