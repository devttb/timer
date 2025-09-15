import { ActionIcon, ActionIconProps } from '@mantine/core';

export interface ICircleButtonProps
  extends ActionIconProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ActionIconProps> {
  sizes?: number | string;
}

export const CircleButton = (props: ICircleButtonProps) => {
  const { children, sizes = '60px', ...rest } = props;
  return (
    <ActionIcon
      variant={'outline'}
      style={(theme) => ({
        boxShadow: theme.shadows.md,

        background: { base: '#000', sm: '#fff' },
      })}
      bd={'rgb(238,238,238)'}
      radius={'50%'}
      w={sizes}
      h={sizes}
      {...rest}
    >
      {children}
    </ActionIcon>
  );
};
