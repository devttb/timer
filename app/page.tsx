import { Box } from '@mantine/core';
import { Timers } from '@/components/templates/timers';

export default function HomePage() {
  return (
    <Box mt="64px" py={'lg'}>
      <Timers />
    </Box>
  );
}
