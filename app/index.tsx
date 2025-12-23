import { ClockPicker } from '@/components/clock-picker';
import { SelectSong } from '@/components/select-song';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const handleTimeChange = (time: Date) => {
    console.log('Alarm set for:', time);
    // TODO: Save alarm time and set up alarm notification
  };

  const handleSongsChange = (songs: string[]) => {
    console.log('Selected songs:', songs);
    // TODO: Save selected songs
  };

  return (
    <View style={styles.container}>
      <ClockPicker onTimeChange={handleTimeChange} />
      <SelectSong onSongsChange={handleSongsChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
