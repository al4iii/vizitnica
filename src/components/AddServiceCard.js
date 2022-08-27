import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Hr from './Hr';

const AddServiceCard = ({
  item,
  isDash = true,
  isThisCountPrice,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>{item?.title}</Text>
      </View>
      <View style={styles.bodyCard}>
        {isThisCountPrice ? (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.price}>{`${item?.price} ₽`}</Text>
            <Text style={styles.textThisCountPrice}>
              {`${item?.thisCountPrice?.label} ₽ /`}
            </Text>
          </View>
        ) : (
          <Text style={styles.text}>{`${item?.price} ₽ /`}</Text>
        )}
        <Text style={styles.textTime}>{`${
          item?.time?.hours ? item?.time?.hours + ' ч.' : ''
        } ${item?.time?.minutes ? item?.time?.minutes + ' мин.' : ''}`}</Text>
      </View>
      {isDash && <Hr />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginTop: 0,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#1C1C1E',
    fontSize: 15,
    lineHeight: 18,
  },
  bodyCard: {
    marginTop: 4,
    flexDirection: 'row',
    marginBottom: 16,
  },
  price: {
    textDecorationLine: 'line-through',
    color: '#787880',
  },
  textThisCountPrice: {
    marginLeft: 4,
    color: '#BB3D39',
  },
  textTime: {
    marginLeft: 4,
    color: '#787880',
  },
  text: {
    color: '#787880',
  },
});

export default AddServiceCard;
