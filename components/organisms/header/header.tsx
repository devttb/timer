'use client';

import React, { JSX } from 'react';
import { Container, Group } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/atoms/color-scheme-toggle';
import { Image } from '@/components/atoms/image';
import logo from '@/public/logo.png';

export const Header: React.FC = (): JSX.Element => {
  return (
    <header>
      <Container
        display={'flex'}
        style={{
          justifyContent: 'space-between',
          borderBottom: 'solid 1px',
          borderColor: '#242424',
          zIndex: 3,
        }}
        bg={'light-dark(var(--mantine-color-white), #242424)'}
        mih={'64px'}
        maw={'100%'}
        w={'100%'}
        pos={'fixed'}
        top={0}
      >
        <Group>
          <Image src={logo} width={70} height={50} alt="logo" />
        </Group>

        <Group>
          <Group ml={50} gap={5} visibleFrom="sm"></Group>
          <ColorSchemeToggle />
        </Group>
      </Container>
    </header>
  );
};
