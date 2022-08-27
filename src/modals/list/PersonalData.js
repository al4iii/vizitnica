import React from 'react';
import { ScrollView, Text } from 'react-native';
import { FONTS, SIZES } from '../../constants';

const PersonalData = () => {
  return (
    <ScrollView>
      <Text style={{ ...FONTS.body1, marginHorizontal: SIZES.padding * 1.6 }}>
        Персона́льные данные (сокр. ПД) или личностные данные — сведения,
        относящиеся к прямо или косвенно определённому или определяемому
        физическому лицу (субъекту персональных данных), которые могут быть
        предоставлены другим лицам[1]. Хотя концепция персональных данных
        довольно стара, развитие сетей связи и автоматизированного анализа
        данных позволило централизованно собирать и массово продавать данные о
        человеке. В некоторых случаях, даже воровать. Эти данные помогают
        выследить человека, спланировать преступление против него или
        постороннему выдать себя за другого; более мирное применение таким
        персональным данным — реклама. Персональные данные — это юридическое, а
        не техническое понятие, тем не менее современные технологии анализа
        данных позволяют отличить одного человека от другого по косвенным
        признакам.
      </Text>
    </ScrollView>
  );
};

export default PersonalData;
