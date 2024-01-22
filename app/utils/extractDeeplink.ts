import {HomeTabParamList, RootStackParamList} from '../routes/types.ts';

const extractDeeplink = (
  link: string,
): [
  keyof RootStackParamList | keyof HomeTabParamList | undefined,
  string | undefined,
] => {
  const [_appdomain, path] = link.split('//');
  const [routeName, id] = path.split('/');

  switch (routeName) {
    case 'group-invitation':
      return ['Group', id];
    default:
      return ['Home', undefined];
  }
};

export default extractDeeplink;
