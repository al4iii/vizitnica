import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { defaultToken } from '../../../api/api';
import { businessCardsApi } from '../../../api/businessCardsApi';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationActionCreators } from '../../../slices/verificationSlice';

export const useFetchUploadImage = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { uploadImage } = businessCardsApi();
  const { setImage } = verificationActionCreators();

  const currentToken = useSelector(state => state.verification.token);
  const token = currentToken || defaultToken;
  const { setAvatarUrl, setAvatarPicId } = verificationActionCreators();
  const fetch = useCallback((selectedPhoto, isAvatar = false) => {
    const formData = new FormData();
    formData.append('image', {
      uri: selectedPhoto?.path,
      type: selectedPhoto?.mime,
      name: 'image',
    });
    console.log(token, formData, '1111111111111111111');
    setStatus(APIStatus.Loading);

    uploadImage({
      onSuccess: response => {
        if (isAvatar) {
          setAvatarPicId(response?.data.id);
          setAvatarUrl(response?.data.url);
        } else {
          setImage(response.data);
        }
      },
      onError: err => {
        console.log(err, 'err');
      },
      payload: formData,
      token,
    });
  });

  return { fetch, status };
};
