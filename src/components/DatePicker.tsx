import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMainState, setSelectedDate } from '../state/mainState';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from '@expo/vector-icons//MaterialIcons';

export default function DatePicker() {
  const selectedDate = useSelector((state: IMainState) => state.selectedDate);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const dispatch = useDispatch();

  const showDatePicker = useCallback(() => {
    setDatePickerVisible(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisible(false);
  }, []);

  const handleConfirm = useCallback(
    (date: Date) => {
      dispatch(setSelectedDate({ selectedDate: date.toISOString() }));
      hideDatePicker();
    },
    [hideDatePicker]
  );

  return (
    <TouchableWithoutFeedback onPress={showDatePicker}>
      <View style={styles.container}>
        <Text style={styles.pickerText}>
          {selectedDate.slice(0, 10)}
          <Icon name="arrow-drop-down" size={24} color={'#2A3356'} />
        </Text>
        <DateTimePickerModal
          date={new Date(selectedDate)}
          isVisible={datePickerVisible}
          mode="date"
          display="inline"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
          locale="en_GB"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  pickerText: {
    fontSize: 24,
    fontWeight: '500',
  },
});
