export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
  };
  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: '',
    lg: 'text-base px-6 py-3',
  };
  return (
    <button
      className={`${variants[variant]} ${sizes[size]} inline-flex items-center gap-2 min-h-[44px] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
