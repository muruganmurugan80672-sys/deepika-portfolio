import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  target?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  href,
  target,
  className = '',
  ...props
}) => {
  const btnClass = variant === 'primary' ? 'btn-primary-custom' : 'btn-secondary-custom';

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={`${btnClass} ${className}`}>
        {children}
        {icon && <span className="ms-1">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={`${btnClass} ${className}`} {...props}>
      {children}
      {icon && <span className="ms-1">{icon}</span>}
    </button>
  );
};
