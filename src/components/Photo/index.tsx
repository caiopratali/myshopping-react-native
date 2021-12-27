import React from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Container, EmptyPhotoContainer, Image, EmptyPhotoText } from './styles';

type Props = TouchableOpacityProps & {
  uri?: string;
  text: string;
  loading?: boolean;
}

export function Photo({ uri, text, loading = false, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      <Container>
        {
          uri ? <Image source={{ uri }} /> : (
            <EmptyPhotoContainer>
              {
                loading ?
                <ActivityIndicator color='#000' size="large"  /> :
                <EmptyPhotoText>
                  { text }
                </EmptyPhotoText>
              }
            </EmptyPhotoContainer >
          )
        }
      </Container>
    </TouchableOpacity>
  )
}