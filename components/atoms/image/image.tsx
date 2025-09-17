import React from 'react';
import NextImage from 'next/image';
import { Image as MantineImage } from '@mantine/core';

type NextImageProps = React.ComponentProps<typeof NextImage>;

interface IImageProps extends NextImageProps {}
export function Image(props: IImageProps) {
  return <MantineImage component={NextImage} {...props} />;
}
