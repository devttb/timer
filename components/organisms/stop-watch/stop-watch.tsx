'use client';

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-react';
import { Flex, Stack, Text } from '@mantine/core';
import { CircleButton } from '@/components/atoms/circle-button';
import { formatTime } from '@/ultis/format-time';

export const Stopwatch: React.FC = () => {
  const [elapsed, setElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const stopAnimationFrame = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const updateTime = useCallback(() => {
    const now = performance.now();
    setElapsed(now - startTimeRef.current);
    animationFrameRef.current = requestAnimationFrame(updateTime);
  }, []);

  const controls = {
    start: () => {
      startTimeRef.current = performance.now() - elapsed;
      animationFrameRef.current = requestAnimationFrame(updateTime);
      setIsRunning(true);
    },
    pause: () => {
      stopAnimationFrame();
      setIsRunning(false);
    },
    reset: () => {
      controls.pause();
      setElapsed(0);
    },
  };

  useLayoutEffect(() => {
    return () => stopAnimationFrame();
  }, []);

  return (
    <Stack>
      <Flex mih={'500px'}>
        <Text
          fz={'6xl'}
          fw={400}
          c={'light-dark(var(--mantine-color-black), var(--mantine-color-white))'}
          ta={'center'}
          m={'auto'}
        >
          {formatTime(elapsed)}
        </Text>
      </Flex>
      <Flex justify="center" gap="xl">
        {!!elapsed ? (
          <CircleButton onClick={controls.reset}>
            <IconPlayerStopFilled width={33} height={33} />
          </CircleButton>
        ) : null}
        <CircleButton onClick={isRunning ? controls.pause : controls.start}>
          {isRunning ? (
            <IconPlayerPauseFilled width={33} height={33} />
          ) : (
            <IconPlayerPlayFilled width={33} height={33} />
          )}
        </CircleButton>
      </Flex>
    </Stack>
  );
};
