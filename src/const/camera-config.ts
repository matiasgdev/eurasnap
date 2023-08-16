import type {
  TakePhotoOptions,
  TakeSnapshotOptions,
} from 'react-native-vision-camera';

export const ANDROID_CAMERA_CONFIG: TakeSnapshotOptions = {
  quality: 80,
  skipMetadata: true,
};

export const IOS_CAMERA_CONFIG: TakePhotoOptions = {
  qualityPrioritization: 'balanced',
  skipMetadata: true,
};
