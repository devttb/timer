import { Box } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/atoms/color-scheme-toggle/color-scheme-toggle';
import { Timers } from '@/components/organisms/timers';

export default function HomePage() {
  return (
    <Box>
      <ColorSchemeToggle />
      <Timers />
    </Box>
  );
}
