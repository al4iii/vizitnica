import { useState } from 'react';
import { useSelector } from 'react-redux';
import { defaultToken } from '../../api/api';
import { userAPI } from '../../api/userApi';
import { APIStatus } from '../../lib/axiosAPI';
import { recordScreenActionCreators } from '../../slices/recordScreenSlice';
import { verificationActionCreators } from '../../slices/verificationSlice';
import { useGetBusinessCards } from '../CreateBusinessCard/hooks/useGetBusinessCards';

export const useGetSpecialistCard = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { getUserCard } = userAPI();
  const { setNewCard } = recordScreenActionCreators();
  const currentToken = useSelector(state => state.verification.token);
  const token = currentToken || defaultToken;
  const { addBusinessCard, setAvatarPicId } = verificationActionCreators();
  const { fetch: fetchAllCards } = useGetBusinessCards();

  const fetch = body => {
    setStatus(APIStatus.Loading);
    getUserCard({
      token,
      payload: body,
      onSuccess: resp => {
        const normalizedData = {
          color: {
            activity_kind: resp.data?.activity_kind || null,
            card: resp.data?.color?.card ? resp.data.color.card : null,
          },
          address: resp.data?.address || null,
          backgroundImage: resp.data?.background_image,
          share: resp.data?.share || null,
          name: resp.data?.name,
          surname: resp.data?.surname,
          phoneNumber: resp.data?.phone || resp.data?.phone_number,
          speciality: resp.data?.activity_kind?.label || resp.data?.title,
          id: resp.data.id,
          floor: resp.data?.floor || null,
          placement: resp.data?.placement || null,
          coordinates: resp.data?.coordiantes || null,
          description: resp.data?.about,
          avatar: resp.data?.activity_kind
            ? resp.data?.avatar.url
            : resp.data?.avatar,
          tiktokAccount: resp.data?.tiktok_account,
          vkAccount: resp.data?.vk_account,
          youtubeAccount: resp.data?.youtube_account,
          gradientColor: resp.data?.gradientColor || null,
          textColor: resp.data?.textColor || null,
          buttonsColor: resp.data?.buttonsColor || null,
          isDummy: typeof resp.data?.activity_kind !== 'object',
        };
        addBusinessCard(normalizedData);
        setNewCard(resp.data);
        fetchAllCards();
        addBusinessCard(resp.data);
        setAvatarPicId(null);
        setStatus(APIStatus.Success);
      },
      onError: err => console.log(err, 'err in getCard'),
    });
  };
  return { fetch, status };
};
