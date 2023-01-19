import {useSelector} from 'react-redux';

export default function usePhotoList() {
  return useSelector<Record<string, string>>(state => state.photoList);
}
