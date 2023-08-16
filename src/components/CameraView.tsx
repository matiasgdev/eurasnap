import {useEffect, useRef} from 'react';
import {View, Platform, ActivityIndicator, Dimensions} from 'react-native';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage';
import {useStore} from '../store/PhotoStore';
import {generateId} from '../lib/generateId';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {useAsync} from '../hooks/useAsync';
import {getLocation} from '../services/get-location';
import {getFileName} from '../lib/getFileName';
import {ANDROID_CAMERA_CONFIG, IOS_CAMERA_CONFIG} from '../const/camera-config';

interface CameraViewProps {
  renderButton: (props: {
    takePicture: () => void;
    disable: boolean;
  }) => JSX.Element;
}

export const CameraView: React.FC<CameraViewProps> = ({renderButton}) => {
  const {savePicture} = useStore();
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);

  const {run, status} = useAsync('', {
    onSuccess: async location => {
      if (camera.current !== null) {
        let photo: PhotoFile;

        if (Platform.OS === 'android') {
          photo = await camera.current.takeSnapshot(ANDROID_CAMERA_CONFIG);
        } else {
          photo = await camera.current.takePhoto(IOS_CAMERA_CONFIG);
        }

        const ref = storage().ref(getFileName(photo.path));
        await ref.putFile(photo.path);
        const uri = await ref.getDownloadURL();

        savePicture({id: generateId(), uri, location});

        navigation.goBack();
      }
    },
  });

  useEffect(() => {
    const checkGrantAccess = async () => {
      await Camera.requestCameraPermission();
      await Geolocation.requestAuthorization(
        () => {},
        () => {
          throw new Error(`Can't share your moment without location :(`);
        },
      );
    };
    checkGrantAccess();
  }, []);

  const takePicture = async () => {
    Geolocation.getCurrentPosition(info => {
      run(
        getLocation({
          latlng: `${info.coords.latitude},${info.coords.longitude}`,
        }),
      );
    });
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
      {renderButton({takePicture, disable: status === 'pending'})}
    </View>
  );
};
