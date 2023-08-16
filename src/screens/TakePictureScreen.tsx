import {darkColors} from '@tamagui/themes';
import React, {SafeAreaView} from 'react-native';
import {Button, Paragraph} from 'tamagui';
import {CameraView} from '../components/CameraView';

export const TakePictureScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CameraView
        renderButton={({takePicture}) => (
          <Button
            onPress={takePicture}
            position="absolute"
            bottom={0}
            backgroundColor={darkColors.red9}
            borderColor="white"
            borderWidth={2}
            width={80}
            height={80}
            borderRadius={40}
            marginBottom={24}
            alignSelf="center"
          />
        )}
      />
    </SafeAreaView>
  );
};
