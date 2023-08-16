import {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage';

export const CameraView = () => {
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
          photo = await camera.current?.takePhoto({
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Camera
          ref={camera}
          style={{flex: 1, justifyContent: 'flex-end'}}
          device={device}
          photo={true}
          isActive={true}
        />
        <TouchableOpacity
          onPress={() => {
            takePicture();
          }}
          style={{
            padding: 8,
            backgroundColor: 'white',
            width: 150,
            marginBottom: 24,
            alignSelf: 'center',
          }}>
          <Text style={{textAlign: 'center'}}>Capture</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
