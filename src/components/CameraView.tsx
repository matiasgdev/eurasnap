import {useEffect, useRef} from 'react';
import {View, Platform, ActivityIndicator} from 'react-native';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage';

interface CameraViewProps {
  renderButton: (props: {takePicture: () => void}) => JSX.Element;
}

export const CameraView: React.FC<CameraViewProps> = ({renderButton}) => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);

  useEffect(() => {
    const checkCameraPermission = async () => {
      await Camera.requestCameraPermission();
    };
    checkCameraPermission();
  }, []);

  const takePicture = async () => {
    try {
      if (camera.current !== null) {
        let photo: PhotoFile;
        if (Platform.OS === 'android') {
          photo = await camera.current.takeSnapshot({
            quality: 80,
            skipMetadata: true,
          });
        } else {
          photo = await camera.current.takePhoto({
            qualityPrioritization: 'balanced',
            skipMetadata: true,
          });
        }
        const reference = storage().ref(photo.path.split('/').at(-1));
        await reference.putFile(photo.path);
        console.log(await reference.getDownloadURL());
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (typeof device === 'undefined') return <ActivityIndicator />;

  return (
    <View style={{flex: 1}}>
      <Camera
        ref={camera}
        style={{flex: 1, justifyContent: 'flex-end'}}
        device={device}
        photo={true}
        isActive={true}
      />
      {renderButton({takePicture})}
    </View>
  );
};
