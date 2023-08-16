import {useNavigation} from '@react-navigation/native';
import {Button} from 'tamagui';

export function TakePictureButton() {
  const {navigate} = useNavigation();

  return (
    <Button
      marginTop={16}
      minWidth={110}
      onPress={() => {
        navigate('TakePicture');
      }}></Button>
  );
}
