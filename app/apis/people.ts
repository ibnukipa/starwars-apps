import {fetchWithTimeout} from '../utils';

export interface People {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  starships?: Array<string>;
}

export const searchPeopleApi = (key: string): Promise<People | null> => {
  return new Promise(async resolve => {
    const response = await fetchWithTimeout(
      `https://swapi.dev/api/people/?search=${key}`,
    );
    if (!response?.ok || !response) {
      resolve(null);
    } else {
      const responseJson: {results: Array<People>} = await response?.json();
      if (responseJson.results.length === 0) {
        return null;
      }
      resolve(responseJson.results[0]);
    }
  });
};
