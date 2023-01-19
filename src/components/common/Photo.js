import FastImage from 'react-native-fast-image';

const Photo = ({height, width, image}) => {
  return (
    <FastImage
      style={{height, width}}
      justifyContent="center"
      source={
        typeof image === 'string'
          ? {
              uri: image,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }
          : image
      }
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default Photo;
