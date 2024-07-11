import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Agenda() {
  const markedDates = {
    '2024-07-10': { marked: true, dotColor: 'red' },
    '2024-07-15': { marked: true, dotColor: 'green' },
    '2024-07-20': { marked: true, dotColor: 'blue' },
  };

  const handleDayPress = (day) => {
    console.log('Dia selecionado:', day);
    // Adicione aqui a lógica para lidar com o dia selecionado, se necessário
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#0071db',
          selectedDayBackgroundColor: '#41a56d',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#41a56d',
          dayTextColor: '#111',
          textDisabledColor: '#ccc',
          dotColor: '#41a56d',
          selectedDotColor: '#ffffff',
          arrowColor: '#41a56d',
          monthTextColor: '#41a56d',
          textDayFontSize: 18,
          textMonthFontSize: 22,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#41a56d',
    height: 400,
    width: 300,
    borderRadius: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
