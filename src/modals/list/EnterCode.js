import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text, Button, Platform } from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useSelector } from 'react-redux'
import { COLORS, FONTS, SIZES } from '../../constants'
import {
  useGetBusinessCards
} from '../../screens/CreateBusinessCard/hooks/useGetBusinessCards'
import {
  useFetchCurrentUserData
} from '../../screens/hooks/useFetchCurrentUserData'
import {
  useVerifyNewDevice,
} from '../../screens/ProfilePage/hooks/useVerifyNewDevice'

import {
  useFetchSMSCode,
} from '../../screens/Verification/hooks/useFetchSMSCode'
import {
  useSendPassword,
} from '../../screens/Verification/hooks/useSendPassword'
import { useSignIn } from '../../screens/Verification/hooks/useSignIn'

import {
  useVerification,
} from '../../screens/Verification/hooks/useVerification'
import { useInterval } from './interval'
import DeviceInfo from 'react-native-device-info'


const EnterCode = ({ navigation, closeModal }) => {
  const { status, fetch } = useFetchSMSCode()
  const phoneNumber = useSelector(state => state.verification.phoneNumber)
  const SMSCode = useSelector(state => state.verification.SMSCode)
  const countryCode = useSelector(
    ({ verification }) => verification.selectedCountry.code)
  const [value, setValue] = React.useState('')
  const [submit, setSubmit] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [timer, setTimer] = React.useState(60)
  const [loader, setLoader] = React.useState(false)
  const [isNew, setIsNew] = React.useState(false)
  const [deviceId, setDeviceId] = React.useState(null)
  const ref = useBlurOnFulfill({ value, cellCount: 4 })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  const {token } = useSelector(({verification}) => verification)

  const {getCurrentUser: fetchUserInfo } = useFetchCurrentUserData()
  const {fetch: fetchAllCards } = useGetBusinessCards()


  const { fetch: signIn } = useSignIn()

  const { fetch: verification, status: verificationStatus } = useVerification()
  const { fetch: fetchVerifyNewDevice } = useVerifyNewDevice()

  const isClientExists = useSelector(state => state.verification.isClientExists)
  const phoneUnmask = (countryCode + phoneNumber + '').split(' ').join('')

  useInterval(() => {
    if (timer === 0) {
      setIsNew(true)
      setTimer(60)
    }
    if (isNew) {
      return
    }
    setTimer(prev => prev - 1)
  }, 1000)

  const userExistInfo = useSelector(
    ({ verification }) => verification.userExistsInfo)

  const { client, device, user } = userExistInfo

  const checkOnSuccess = React.useCallback(newValue => {

    setValue(newValue)

    if (newValue.length === 4) {

      if (SMSCode !== newValue) {
        setSubmit(true)
        setIsError(true)
        setValue('')
        setTimeout(() => {
          setIsError(false)
        }, 500)

        return
      } else {

        if (client && !device && user) {
          fetchVerifyNewDevice({
            phone_number: phoneUnmask,
            device_id: deviceId,
            verification_code: newValue,
          }, () => {
            signIn({
              payload: {
                phone_number: phoneUnmask,
                device_id: deviceId,
              },
            })
          })
        }

        if (!user) {
          verification({
            phone_number: phoneUnmask,
            verification_code: newValue,
            device_id: deviceId,
          }, () => {
            navigation.navigate('EditProfileStep')
          })
        }
      }

      setLoader(true)
      setLoader(false)
    }
  })

  useEffect(() => {
    if (!!token) {
      fetchUserInfo(null)
      fetchAllCards()

      navigation.navigate('CreateBusinessCard')
    }

  }, [token])

  React.useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setDeviceId(uniqueId)
    })
  }, [])

  const handleNew = () => {
    if (!isClientExists) {
      fetch(phoneUnmask)
    } else {
      const signInBody = {
        phone_number: phoneUnmask,
        type: 'client',
      }

      signIn({ payload: signInBody })
    }
    setIsNew(false)
  }

  return (

    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: SIZES.padding * 0.8,
        opacity: loader ? 0.5 : 1,
      }}>
      {loader && (
        <ActivityIndicator
          size="large"
          color="#38B8E0"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: '50%',
          }}
        />
      )}
      <View>
        <Text
          style={{
            ...FONTS.body1,
            marginBottom: SIZES.padding * 6.8,
            textAlign: 'center',
            color: COLORS.gray,
            fontSize: SIZES.body2
          }}
        >
         {`На номер ${countryCode} ${phoneNumber} отправлено СМС с кодом
          подтверждения`}
        </Text>
        <CodeField

          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          autoFocus={false}
          cellCount={4}
          value={value}
          onChangeText={value => checkOnSuccess(value)}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          rootStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              style={{
                width: 56,
                height: 56,
                lineHeight: 38,
                fontSize: 24,
                paddingVertical: Platform.OS === 'android' ? 0 : 10,
                backgroundColor: isError ? '#FBEDEC' : '#F0F2F4',
                borderRadius: 8,
                textAlign: 'center',
                textAlignVertical: 'center',
                marginRight: 10,
                color: isError ? 'red' : 'grey',
                ...FONTS.h1,
              }}>
              {symbol || (isFocused ? <Cursor/> : null)}
            </Text>
          )}
        />
      </View>
      {isError ? (
        <Text
          style={{
            ...FONTS.body1,
            marginTop: SIZES.padding * 6.8,
            textAlign: 'center',
            color: '#D64641',
            fontSize: SIZES.body2
          }}>
          Неверный код
        </Text>
      ) : (
        <Text
          style={{
            ...FONTS.body1,
            marginTop: SIZES.padding * 6.8,
            textAlign: 'center',
          }}>
          {isNew ? (
            <Text
              onPress={handleNew}
              style={{
                ...FONTS.body1,
                marginTop: SIZES.padding * 6.8,
                textAlign: 'center',
                color: '#38B8E0',
                fontSize: SIZES.body2
              }}>
              Запросить СМС повторно
            </Text>
          ) : (
            <Text
              style={{
                ...FONTS.body1,
                marginTop: SIZES.padding * 6.8,
                textAlign: 'center',
                color: COLORS.gray,
              }}>
              Повторное СМС возможно через {timer} сек.
            </Text>
          )}
        </Text>
      )}
    </View>
  )
}

export default EnterCode
