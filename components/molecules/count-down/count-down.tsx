import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-react';
import { Box, Flex, Group, Stack, Text } from '@mantine/core';
import { CircleButton } from '@/components/atoms/circle-button';
import { WheelPicker, WheelPickerWrapper } from '@/components/molecules/wheel-picker';
import { createArray } from '@/ultis/create-array';
import { formatTime } from '@/ultis/format-time';

interface ITimePicker {
  hour: number;
  minute: number;
  second: number;
}

const hoursOption = createArray(24);
const minutesOption = createArray(60);
const secondsOption = createArray(60);

export const Countdown = () => {
  const [duration, setDuration] = useState<number>(0);
  const [timePicker, setTimePicker] = useState<ITimePicker>({ hour: 0, minute: 0, second: 0 });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(duration);

  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const handlePickDuration = useCallback(
    (type: keyof ITimePicker, value: number) => {
      const newTime = {
        ...timePicker,
        [type]: value,
      } as ITimePicker;
      setTimePicker(newTime);
      const total = newTime.hour * 3600000 + newTime.minute * 60000 + newTime.second * 1000;
      setDuration(total);
    },
    [timePicker, setTimePicker]
  );

  const stopAnimationFrame = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const countdownTime = useCallback(() => {
    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    const timeLeft = Math.max(duration - elapsed, 0);
    setRemainingTime(timeLeft);

    if (timeLeft <= 0) {
      setIsRunning(false);
      stopAnimationFrame();
      return;
    }
    rafRef.current = requestAnimationFrame(countdownTime);
  }, [duration, stopAnimationFrame]);

  const controls = {
    pick: () => {
      if (duration <= 0) {
        return;
      }
      setRemainingTime(duration);
      controls.start();
    },
    start: () => {
      const shouldReset = remainingTime <= 0;
      const initRemaining = shouldReset ? duration : remainingTime;

      setRemainingTime(initRemaining);
      startTimeRef.current = performance.now() - (duration - initRemaining);
      setIsRunning(true);
      rafRef.current = requestAnimationFrame(countdownTime);
    },
    pause: () => {
      stopAnimationFrame();
      setIsRunning(false);
    },
    reset: () => {
      controls.pause();
      setRemainingTime(0);
    },
  };

  const isShowTimePicker = useMemo(() => !isRunning && !remainingTime, [isRunning, remainingTime]);

  useEffect(() => {
    return () => stopAnimationFrame();
  }, []);

  return (
    <Box>
      {isShowTimePicker ? (
        <Stack gap={'md'} align={'center'}>
          <Group wrap={'nowrap'} w={'100%'} maw={'500px'} mih={'500px'}>
            <WheelPickerWrapper>
              <WheelPicker
                value={timePicker.hour}
                options={hoursOption}
                onValueChange={(value) => handlePickDuration('hour', value)}
                optionItemHeight={80}
                infinite
              />
            </WheelPickerWrapper>
            <WheelPickerWrapper>
              <WheelPicker
                value={timePicker.minute}
                options={minutesOption}
                onValueChange={(value) => handlePickDuration('minute', value)}
                optionItemHeight={80}
                infinite
              />
            </WheelPickerWrapper>
            <WheelPickerWrapper>
              <WheelPicker
                value={timePicker.second}
                options={secondsOption}
                onValueChange={(value) => handlePickDuration('second', value)}
                optionItemHeight={80}
                infinite
              />
            </WheelPickerWrapper>
          </Group>

          <CircleButton>
            <IconPlayerPlayFilled width={33} height={33} onClick={controls.pick} />
          </CircleButton>
        </Stack>
      ) : (
        <Stack>
          <Flex mih={'500px'}>
            <Text
              fz={'6xl'}
              fw={400}
              c={'light-dark(var(--mantine-color-black), var(--mantine-color-white))'}
              ta={'center'}
              m={'auto'}
            >
              {formatTime(remainingTime)}
            </Text>
          </Flex>

          <Flex justify="center" gap="xl">
            <CircleButton onClick={controls.reset}>
              <IconPlayerStopFilled width={33} height={33} />
            </CircleButton>
            <CircleButton onClick={isRunning ? controls.pause : controls.start}>
              {isRunning ? (
                <IconPlayerPauseFilled width={33} height={33} />
              ) : (
                <IconPlayerPlayFilled width={33} height={33} />
              )}
            </CircleButton>
          </Flex>
        </Stack>
      )}
    </Box>
  );
};
