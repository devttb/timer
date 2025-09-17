'use client';

import { useState } from 'react';
import { IconHourglass, IconStopwatch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { FloatingIndicator, Tabs, Text } from '@mantine/core';
import { Countdown } from '@/components/organisms/count-down';
import { Stopwatch } from '@/components/organisms/stop-watch';
import classes from './timers.module.css';

export function Timers() {
  const t = useTranslations('homePage');
  const tabs = [
    {
      key: 'stopwatch',
      name: t('tabs.stopwatch'),
      // name: 'asd',
      icon: <IconStopwatch width={30} height={30} />,
      component: <Stopwatch />,
    },
    {
      key: 'countdown',
      name: t('tabs.countdown'),
      // name: 'asw',
      icon: <IconHourglass width={30} height={30} />,
      component: <Countdown />,
    },
  ];

  const [tabValue, setTabValue] = useState<string | null>(tabs[0].key);
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const handleControlRefs = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };
  return (
    <Tabs variant="none" value={tabValue} onChange={setTabValue}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        {tabs.map(({ key, name, icon }, index) => (
          <Tabs.Tab key={index} value={key} ref={handleControlRefs(key)} className={classes.tab}>
            {icon}
            <Text>{name}</Text>
          </Tabs.Tab>
        ))}
        <FloatingIndicator
          target={tabValue ? controlsRefs[tabValue] : null}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>

      {tabs.map(({ key, component }, index) => (
        <Tabs.Panel key={index} value={key}>
          {component}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
