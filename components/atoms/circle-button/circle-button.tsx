import { ActionIcon, ActionIconProps } from '@mantine/core';

export interface ICircleButtonProps
  extends ActionIconProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ActionIconProps> {
  sizes?: number | string;
}

export const CircleButton = (props: ICircleButtonProps) => {
  const { children, sizes = '70px', ...rest } = props;
  return (
    <ActionIcon
      variant={'outline'}
      style={(theme) => ({
        boxShadow: theme.shadows.md,
        borderColor: 'light-dark(#f0f0f0, var(--mantine-color-body))',
      })}
      bg={'light-dark(var(--mantine-color-body), #2C2C2E)'}
      radius={'50%'}
      w={sizes}
      h={sizes}
      {...rest}
    >
      {children}
    </ActionIcon>
  );
};
