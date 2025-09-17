'use client';

import React, { JSX, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconChevronDown } from '@tabler/icons-react';
import { useLocale } from 'next-intl';
import { Button, Center, Container, Group, Menu } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/atoms/color-scheme-toggle';
import { Image } from '@/components/atoms/image';
import logo from '@/public/logo.png';

export const Header: React.FC = (): JSX.Element => {
  const [locale, setLocale] = useState<string>(useLocale());
  const router = useRouter();

  const handleChangeLocale = (newLocale: string) => {
    setLocale(newLocale);
    document.cookie = `locale=${newLocale}; path=/`;
    router.refresh();
  };

  useLayoutEffect(() => {
    const storedLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('locale='))
      ?.split('=')[1];
    if (!storedLocale) {
      const browserLocale = navigator.language.split('-')[0];
      handleChangeLocale(browserLocale);
      return;
    }

    handleChangeLocale(storedLocale);
  }, [router]);

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
          <Menu width={100} transitionProps={{ transition: 'fade-down', duration: 300 }}>
            <Menu.Target>
              <Button
                variant={'transparent'}
                color={'light-dark(var(--mantine-color-black), var(--mantine-color-white))'}
              >
                {locale.toUpperCase()}
                <IconChevronDown size={14} stroke={1.5} />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => handleChangeLocale('en')}>EN</Menu.Item>
              <Menu.Item onClick={() => handleChangeLocale('vi')}>VI</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <ColorSchemeToggle />
        </Group>
      </Container>
    </header>
  );
};
