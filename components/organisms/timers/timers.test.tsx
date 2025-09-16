import { render, screen } from '@/test-utils';
import { Timers } from './timers';

describe('Timers component', () => {
  it('has correct Next.js theming section link', () => {
    render(<Timers />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/next/'
    );
  });
});
