import {darkColors} from '@tamagui/themes';
import React, {ActivityIndicator, SafeAreaView} from 'react-native';
import {Button} from 'tamagui';
import {CameraView} from '../components/CameraView';

export const TakePictureScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CameraView
        renderButton={({takePicture, disable}) => (
          <Button
            onPress={takePicture}
            disabled={disable}
            position="absolute"
            bottom={0}
            backgroundColor={disable ? darkColors.red9 : darkColors.red8}
            borderColor="white"
            borderWidth={2}
            width={80}
            height={80}
            borderRadius={40}
            marginBottom={24}
            alignSelf="center">
            {disable ? <ActivityIndicator color="white" /> : ''}
          </Button>
        )}
      />
    </SafeAreaView>
  );
};
