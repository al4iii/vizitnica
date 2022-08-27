import Contacts from 'react-native-contacts'
import {
  FlatList, Image, Text, View,StatusBar
} from 'react-native'

import React, { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import Icons from '../../assets/icons/svgIcons/Icons'
import CustomCheckBox from '../../components/CheckBox'

import Header from '../../components/Header'
import SearchInput from '../../components/SearchInput'
import { COLORS, SIZES } from '../../constants'

import { MainLayouts } from '../../layouts'
import WrapperAsyncRequest from '../../layouts/WrapperAsyncRequest'
import { APIStatus } from '../../lib/axiosAPI'
import { specialistActionCreators } from '../../slices/specialistSlice'
import { useCreateCardsMass } from '../hooks/useCreateCardsMass'


export const ContactImports = ({ navigation }) => {
  const { setContacts } = specialistActionCreators()
  const contacts = useSelector(state => state.specialistData.contacts)
  const [getContactStatus, setGetContactStatus] = useState(APIStatus.Initial)

  const [isOpen, setIsOpen] = useState(true)

  const [allSelected, setAllSelected] = useState(false)
  const [chooseAllClientState, setChooseAllClientState] = useState(false)

  const [dataToRender, setData] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])

  const setDataToRender = (items) => {
    if (!items) return
    setData(items)
  }

  const normalizePhone = (phoneNumber) => {
    return phoneNumber?.split('')?.
      filter(item => (!isNaN(item) && item.trim())).
      join('')
  }

  const { fetch, status } = useCreateCardsMass()

  useEffect(() => {
    setGetContactStatus(APIStatus.Loading)

    Contacts.getAll().then(res => {
      const normalizedData = res.reduce((acc, item) => {
        const set = [...new Set(item.phoneNumbers.map(el => el.number))]
        const numbers = set.map(num => {

          return ({
            givenName: item.givenName,
            familyName: item.familyName,
            thumbnailPath: item.hasThumbnail ? item.thumbnailPath : null,
            recordID: item.recordID,
            phoneNumber: normalizePhone(num),
          })

        })

        return acc.concat(numbers)

      }, [])
      setContacts(normalizedData)
      setDataToRender(normalizedData)

      setGetContactStatus(APIStatus.Success)

    }).catch(err => console.log(err, 'error getting contacts'))
  }, [])

  useEffect(() => {
    if (status === APIStatus.Success) {
      navigation.goBack()
    }
  }, [status])

  const closeModal = (bool) => {
    setIsOpen(bool)
  }

  const onSubmit = () => {
    const normalizedData = selectedContacts.map(item => ({
      name: item.name,
      surname: item.surname,
      phone_number: item.phone_number,
    }))

    fetch(normalizedData)
  }

  useEffect(() => {
    if (!isOpen) {
      navigation.goBack()
    }

  }, [isOpen])

  const handleOnChange = useCallback(
    (item, checked) => {

      if (checked) {
        setSelectedContacts([
          ...selectedContacts,
          {
            recordID: item.recordID,
            name: item.givenName,
            surname: item.familyName,
            phone_number: item.phoneNumber.substr(0, 1) != "+" && item.phoneNumber.substr(0, 1) != "8" ? `+${item.phoneNumber}` : item.phoneNumber,
          },
        ])
      } else
        setSelectedContacts(
          selectedContacts.filter(
            (client) => client?.recordID !== item.recordID,
          ),
        )
    },
    [selectedContacts],
  )

  const handleCheckAllClients = useCallback(
    (item, checked) => {

      const selectedPhoneNumber = item.phoneNumber

      if (checked)
        setSelectedContacts((selectedContacts) => [
          ...selectedContacts,
          {
            recordID: item.recordID,
            name: item.givenName,
            surname: item.familyName,
            phone_number: selectedPhoneNumber,
          },
        ])
      else setSelectedContacts([])

    },
    [selectedContacts],
  )

  const handleToggleSelectAllContacts = () => {
    const mappedContacts = dataToRender?.map(
      cont => ({ ...cont, isChecked: !allSelected }))

    setDataToRender(mappedContacts)
  }

  const handleSearch = (searchValue) => {
    if (searchValue.trim() === '') {
      setDataToRender(contacts)
      return
    }
    const filteredContacts = contacts?.filter(item => {
      return (item.familyName + item.givenName +
        item.phoneNumber).toLowerCase().
        trim().
        includes(searchValue.toLowerCase().trim())
    })

    setDataToRender(filteredContacts)
  }

  return (
    <MainLayouts customContainerStyle={{
      paddingHorizontal: 15,
      backgroundColor: COLORS.white,
      paddingTop: StatusBar.currentHeight -6,
    }}>

      <Header navigation={navigation} toggleModal={closeModal}
              buttonText={'Готово'}
              colorReady={COLORS.primary}
              onSubmit={onSubmit}
              emptyReady={!!selectedContacts.length}
              header={'Добавить специалиста'}
              customContainerStyle={{
                paddingHorizontal: 0,
              }}
              customHeaderStyle={{
                marginLeft: 0,
              }}
      />

      <View style={{
        paddingBottom: 28,
        paddingTop: 22,
      }}>

        <SearchInput getInputData={handleSearch}
                     placeholder={'Имя или телефон'}/>
      </View>

      <CustomCheckBox
        onPress={checked => {
          setAllSelected(!allSelected)
          handleToggleSelectAllContacts()
          dataToRender?.map(item => {
              handleCheckAllClients(item, checked)
              setChooseAllClientState(!chooseAllClientState)
            },
          )
        }}

        renderText={() => (
          <Text
            style={{
              fontSize: SIZES.h5,
              lineHeight: 14.32,
              color: COLORS.gray,
            }}>
            Выделить всех
          </Text>
        )}
        customCheckboxStyle={{
          marginRight: SIZES.margin * 1.6,
          borderRadius: 99,
          borderWidth: 1,
          width: 22,
          height: 22,
        }}
        customContainerStyle={{
          borderBottomWidth: 1,
          borderColor: COLORS.lightGray,
          paddingBottom: SIZES.padding * 2,
          marginBottom: SIZES.margin * 1.4,
        }}

      />

      <WrapperAsyncRequest status={status}>

        <WrapperAsyncRequest status={getContactStatus}>

          <FlatList
            data={dataToRender}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CustomCheckBox
                    isChecked={item.isChecked}
                    onPress={checked => handleOnChange(item, checked)}
                    renderText={() => (
                      <>
                        <View
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 99,
                            marginRight: SIZES.margin * 1.6,
                            display: 'flex',
                            justifyContent: 'center',

                          }}>
                          {!item.thumbnailPath ? <Icons.Avatar
                            styles={{ width: 42, height: 42 }}/> : <Image
                            style={{ width: 42, height: 42, borderRadius: 99 }}
                            source={{ uri: item.thumbnailPath }}/>}

                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              marginBottom: SIZES.padding * 0.4,
                              fontSize: SIZES.h4,
                              color: COLORS.black,
                              fontWeight: '400',
                            }}>
                            {item.givenName} {item.familyName}
                          </Text>
                          <Text
                            style={{
                              fontSize: SIZES.body3,
                              color: COLORS.gray,
                              fontWeight: '400',
                              lineHeight: 14,
                            }}>
                            {item.phoneNumber.substr(0, 1) != "+" && item.phoneNumber.substr(0, 1) != "8" ? `+${item.phoneNumber}` : item.phoneNumber}
                          </Text>
                        </View>
                      </>
                    )}
                    customCheckboxStyle={{
                      marginRight: SIZES.margin * 1.6,
                      borderRadius: 99,
                      borderWidth: 1,
                      width: 22,
                      height: 22,
                    }}
                    customContainerStyle={{
                      borderBottomWidth: 1,
                      paddingVertical: 17,
                      borderColor: COLORS.lightGray,
                    }}

                  />

                </View>)
            }}
          />

        </WrapperAsyncRequest>
      </WrapperAsyncRequest>


    </MainLayouts>
  )

}
