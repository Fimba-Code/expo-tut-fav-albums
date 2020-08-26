import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableWithoutFeedback, Modal } from 'react-native';
import { getAlbums } from './firebase';

const IMAGE_SIZE = Dimensions.get('screen').width / 3

export default function App() {
  const [albums, setAlbums] = React.useState([])
  const [isVisible, setIsVisible] = React.useState(false)
  const [selectedAlbum, setSelectedAlbum] = React.useState({})

  const initData = async () => {
    const { albums: data } = await getAlbums()

    // Array com albums
    data.forEach((album) => {
      console.log(album.data())
      setAlbums(prev => [{ ...album.data() }, ...prev])
    });
  }


  React.useEffect(() => {
    // effect = new info
    initData()
    return () => {
      // clean up
      setAlbums([])
    }
  }, [])

  const closeModal = () => {
    setIsVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }} style={{ flex: 1 }}>
        {albums.map((album) =>
          <TouchableWithoutFeedback
            key={album.title}
            onPress={() => {
              setSelectedAlbum(album)
              setIsVisible(true)
            }} >
            <Image
              source={{ uri: album.cover }}
              style={{ backgroundColor: '#ddd', width: IMAGE_SIZE, height: IMAGE_SIZE }}
            />
          </TouchableWithoutFeedback>
        )}
      </ScrollView>

      <Modal
        animationType={"slide"}
        onRequestClose={closeModal}
        visible={isVisible}
      >
        <View style={{ flex: 1, backgroundColor: '#010022', justifyContent: 'center', alignItems: 'center' }} onTouchEnd={closeModal}>
          <Image
            resizeMethod="auto"
            resizeMode="contain"
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').width,
              marginBottom: 20
            }}
            source={{
              uri: selectedAlbum.cover,
            }}
          />
          <Text style={{ color: '#fff', fontWeight: 'bold', lineHeight: 40, fontSize: 20 }}>{selectedAlbum.title}</Text>
          <Text style={{ color: '#fff', fontWeight: '100' }}>{selectedAlbum.author}</Text>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
