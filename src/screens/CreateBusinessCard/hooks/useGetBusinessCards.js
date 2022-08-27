import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { defaultToken } from '../../../api/api'
import { businessCardsApi } from '../../../api/businessCardsApi'
import { APIStatus } from '../../../lib/axiosAPI'
import { verificationActionCreators } from '../../../slices/verificationSlice'


export const useGetBusinessCards = () => {
  const [status, setStatus] = useState(APIStatus.Initial)
  const { getBusinessCards } = businessCardsApi()
  const { setBusinessCards } = verificationActionCreators()

  const currentToken = useSelector(state => state.verification.token)
  const token = currentToken || defaultToken

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading)

    getBusinessCards({
      onSuccess: (response) => {
        const businessCards = response?.data.map(item => {
          // console.log(item.card && item.card[0].url, 'item card')
          // return ({
          //   id: item?.id,
          //   photo: item?.avatar,
          //   name: item?.name,
          //   surname: item?.surname,
          //   phoneNumber: item?.phone_number,
          //   speciality: item?.title,
          //   description: item?.about,
          //   background_image: item?.card
          //     ? item?.card[0].url
          //     : null,
          //   color: item ?? item?.colors[0],
          // })

          return {
            color: {
              activity_kind: item?.activity_kind || null,
            },
            address: item?.address || null,
            backgroundImage: item?.background_image
              ? item?.background_image.url
              : 'https://dev.vzt.bz/storage/images/card_backgrounds/default.jpg',
            share: item?.share || null,
            name: item?.name,
            surname: item?.surname,
            phoneNumber: item?.phone || item?.phone_number,
            speciality: item?.activity_kind?.value === 8 ? item?.title : item?.activity_kind?.label,           
            id: item.id,
            floor: item?.floor || null,
            placement: item?.placement || null,
            coordinates: item?.coordiantes || null,
            description: item?.about,
            avatar: item?.activity_kind ? item?.avatar.url : item?.avatar,
            tiktokAccount: item?.tiktok_account,
            vkAccount: item?.vk_account,
            youtubeAccount: item?.youtube_account,
            gradientColor: item?.gradientColor || null,
            textColor: item?.textColor || null,
            buttonsColor: item?.buttonsColor || null,
            isDummy: typeof item?.activity_kind !== 'object',
            card: item?.card || null,
            title: item?.title || null,
          }
        })

        setStatus(APIStatus.Success)

        setBusinessCards(businessCards)
      },
      onError: (err) => {
        console.log(err, 'err')
        setStatus(APIStatus.Failure)

      },
      token: token,
    })

  })

  return { fetch, status }
}
