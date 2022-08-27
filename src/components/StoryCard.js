import React from 'react';
import Icons from '../assets/icons/svgIcons/Icons';
import { Hr } from '../components';
import { COLORS, SIZES } from '../constants';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import ModalStory from '../modals/ModalStory';
import { getAppointmentStatus } from '../utils/getStatus';
import Avatar from './Avatar';
import moment from 'moment';

const StoryCard = ({ navigation, name, status, surname, handleDelete, idService, avatar,
  services, date, statusFetch, isOver, setOrderNumber, orderNumberItem, setId}) => {

  const [isModalVisible, setModalVisible] = React.useState(false);

  const accumulatedPrice = services?.reduce((accum, item) => {
    return accum + item.price.value;
  }, 0);
  
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        marginTop: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
        }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              width: 42,
              height: 42,
              borderRadius: 100,
            }}>
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                resizeMode="cover"
                resizeMethod="scale"
                style={{ width: '100%', height: '100%', borderRadius: 100 }}
              />
            ) : (
              <Avatar isTouchableOpacity={false} width={42} height={42} />
            )}
          </View>
          <View>
            <View
              style={{
                marginLeft: 10,
              }}>
              <Text
                style={{
                  fontSize: SIZES.body3,
                  color: COLORS.black,
                  fontWeight: '600',
                }}>{`${name} ${surname ?? ''}`}</Text>
              <Text
                style={{
                  fontSize: SIZES.body3,
                  marginTop: 2,
                  color: COLORS.gray,
                }}>{`${moment(date, true).format(
                'DD.MM.YYYY',
              )},  ${`${services[0]?.start} - ${services.length > 1 ? services[services.length - 1]?.end : services[0]?.end}`}`}</Text>
            </View>
          </View>
        </View>
        {isOver ? (
          <TouchableOpacity
            onPress={() => {
              setOrderNumber(orderNumberItem);
              setId(idService);
            }}>
            <Icons.Restore />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!isModalVisible);
              setOrderNumber(orderNumberItem);
            }}>
            <Icons.CloseButton color={COLORS.red} />
          </TouchableOpacity>
        )}
      </View>
      {getAppointmentStatus(status)}
      <Hr />
      <View style={{ padding: 16 }}>
        <FlatList
          data={services}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 8,
                }}>
                <View style={{ width: '80%' }}>
                  <Text
                    style={{
                      fontSize: SIZES.body3,
                      lineHeight: 14,
                      color: COLORS.gray,
                    }}>
                    {item.title}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: SIZES.body3,
                      lineHeight: 14,
                      color: COLORS.gray,
                    }}>
                    {item.price.value + ' ₽'}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ marginBottom: 0 }}>
            <Text
              style={{
                fontSize: SIZES.body3,
                color: COLORS.black,
                lineHeight: 14,
              }}>
              {'Суммарная стоимость:'}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: SIZES.body3,
                color: COLORS.black,
                lineHeight: 14,
              }}>
              {accumulatedPrice + ' ₽'}
            </Text>
          </View>
        </View>
      </View>
      <ModalStory
        visible={isModalVisible}
        setModalVisible={setModalVisible}
        header={'Вы действительно хотите отменить запись:'}
        message={`${moment(date, true).format('DD.MM.YYYY')}, ${`${services[0]?.start} - ${services.length > 1 ? services[services.length - 1]?.end : services[0]?.end}`} ?`}
        leftButtonText={'Закрыть'}
        rightButtonText={'Отменить'}
        goTo={'StoryPage'}
        navigation={navigation}
        id={orderNumberItem}
        handleDelete={handleDelete}
        status={statusFetch}
      />
    </View>
  );
};

export default StoryCard;
