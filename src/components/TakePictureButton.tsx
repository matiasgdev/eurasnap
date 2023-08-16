import {useNavigation} from '@react-navigation/native';
import {darkColors} from '@tamagui/themes';
import {Camera} from 'lucide-react-native';
import {Button} from 'tamagui';

export function TakePictureButton() {
  const {navigate} = useNavigation();

  return (
    <Button
      size="$4"
      width={48}
      alignItems="center"
      shadowColor={darkColors.gray1}
      shadowOffset={{width: 4, height: 4}}
      shadowOpacity={0.7}
      elevate
      borderRadius={14}
      backgroundColor={darkColors.orange10}
      icon={<Camera color="#fff" size={24} />}
      onPress={async () => {
        navigate('TakePicture');
      }}
    />
  );
}
