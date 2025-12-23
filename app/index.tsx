import { ClockPicker } from '@/components/clock-picker';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const handleTimeChange = (time: Date) => {
    console.log('Alarm set for:', time);
    // TODO: Save alarm time and set up alarm notification
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ClockPicker onTimeChange={handleTimeChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
