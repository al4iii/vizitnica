import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  AddBusinessCard,
  CreateBusinessCard,
  EditProfilePage,
  EditProfileStep,
  EnterPhoneStep,
  Onboarding,
  ProfilePage,
  StoryPage,
} from '../screens';
import BusinessCardPage from '../screens/BusinessCardPage/BusinessCardPage';
import Share from '../screens/BusinessCardPage/Share';
import Map from '../screens/BusinessCardPage/Map';
import { ContactImports } from '../screens/ContactImports/ContactImports';
import EditBusinessCard from '../screens/EditBusinessCard/EditBusinessCard';
import AddService from '../screens/RecordsScreen/AddService/AddService';
import RecordScreen from '../screens/RecordsScreen/RecordScreen';
import SupportPage from '../screens/SupportPage/SupportPage';
import HistoryPageSpecialist from '../screens/BusinessCardPage/HistorySpecialist/HistoryPageSpecialist';

export const Route = () => {
  const Stack = createStackNavigator();
  const shouldShow = useSelector(
    ({ verification }) => verification.shouldShowOnboarding,
  );
  const isClientExists = useSelector(
    ({ verification }) => verification.isClientExists,
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {shouldShow && <Stack.Screen name="Onboarding" component={Onboarding} />}
      {shouldShow && (
        <Stack.Screen name="EnterPhoneStep" component={EnterPhoneStep} />
      )}
      <Stack.Screen name="CreateBusinessCard" component={CreateBusinessCard} />
      <Stack.Screen name="AddBusinessCard" component={AddBusinessCard} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
      <Stack.Screen name="EditBusinessCard" component={EditBusinessCard} />
      <Stack.Screen name="StoryPage" component={StoryPage} />
      <Stack.Screen name="RecordScreen" component={RecordScreen} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="ContactImports" component={ContactImports} />
      <Stack.Screen name="BusinessCardPage" component={BusinessCardPage} />
      <Stack.Screen name="HistoryPageSpecialist" component={HistoryPageSpecialist} />
      <Stack.Screen name="Share" component={Share} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="SupportPage" component={SupportPage} />
      {!isClientExists && (
        <Stack.Screen name="EditProfileStep" component={EditProfileStep} />
      )}
    </Stack.Navigator>
  );
};
