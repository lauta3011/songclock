import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type SongListProps = {
  songs?: string[];
};

export function SongList({ songs = [] }: SongListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Songs</Text>
      {songs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No songs picked
          </Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {songs.map((song, index) => (
            <View
              key={index}
              style={styles.songItem}>
              <Text style={styles.songText}>{song}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#FFFFFF',
  },
  emptyContainer: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  listContainer: {
    gap: 8,
  },
  songItem: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#1F2937',
  },
  songText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

