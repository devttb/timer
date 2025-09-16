'use client';

import { useState } from 'react';
import { IconHourglass, IconStopwatch } from '@tabler/icons-react';
import { FloatingIndicator, Tabs, Text } from '@mantine/core';
import { Countdown } from '@/components/molecules/count-down';
import { Stopwatch } from '@/components/molecules/stop-watch';
import classes from './timers.module.css';

const tabs = [
  { name: 'Stopwatch', icon: <IconStopwatch width={30} height={30} />, component: <Stopwatch /> },
  { name: 'Countdown', icon: <IconHourglass width={30} height={30} />, component: <Countdown /> },
];

export function Timers() {
  const [tabValue, setTabValue] = useState<string | null>(tabs[0].name);
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const handleControlRefs = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs variant="none" value={tabValue} onChange={setTabValue}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        {tabs.map(({ name, icon }, index) => (
          <Tabs.Tab key={index} value={name} ref={handleControlRefs(name)} className={classes.tab}>
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

      {tabs.map(({ name, component }, index) => (
        <Tabs.Panel key={index} value={name}>
          {component}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
