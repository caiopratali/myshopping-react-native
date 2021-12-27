import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';

import { Container, PhotoInfo } from './styles';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';
import { File, FileProps } from '../../components/File';

export function Receipts() {

  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = useState('');
  const [photoInfo, setPhotoInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetPhotos = async () => {
    try {
      const files: FileProps[] = [];

      const result = await storage().ref('/images').list();

      result.items.forEach(file => {
        files.push({
          name: file.name,
          path: file.fullPath
        });
      });

      setPhotos(files);
    } catch (error) {
      console.error(error);
    }
  }

  const handleShowImage = async (path: string) => {
    try {
      setLoading(true);

      const urlImage = await storage().ref(path).getDownloadURL();

      setPhotoSelected(urlImage);

      const info = await storage().ref(path).getMetadata();

      setPhotoInfo(`Imagem selecionada: ${info.name}`)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteImage = async (path: string) => {
    try {
      await storage().ref(path).delete();

      await handleGetPhotos();

      Alert.alert('Imagem deletada com sucesso!')
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetPhotos();
  }, []);

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo text='Nenhuma foto selecionada' uri={photoSelected} loading={loading} />

      <PhotoInfo>
        { photoInfo ? photoInfo : 'Informações da foto' }
      </PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  );
}
