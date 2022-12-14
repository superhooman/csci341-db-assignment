import React, { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import { Loader } from '../Loader';

import cls from './Button.module.scss';

interface Props extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'primary' | 'ghost';
  disabled?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  type?: 'submit' | 'button' | 'reset';
  size?: 'default' | 'large';
  fullWidth?: boolean;
  color?: 'error';
  href?: string;
  target?: string;
}

export const Button = React.forwardRef<unknown, Props>(
  ({ className, children, variant = 'default', loading, icon, disabled, type = 'button', size = 'default', fullWidth, href, color, ...props }, ref) => {
    const Element = href ? 'a' : 'button';
    const elementRef = (ref as any) || React.createRef<HTMLElement>();
    return (
      <Element
        className={clsx(className, cls.root, { [cls.fullWidth!]: fullWidth, [cls.error!]: color === 'error' })}
        ref={elementRef}
        data-type={variant}
        data-loading={loading}
        data-size={size}
        disabled={loading || disabled}
        type={type}
        href={href}
        {...props}
      >
        {icon ? (
          <span className={cls.icon}>
            {icon}
          </span>
        ) : null}
        <span>{children}</span>
        {loading ? (
          <div className={cls.loading}>
            <Loader />
          </div>
        ) : null}
      </Element>
    );
  }
);

Button.displayName = 'Button';
