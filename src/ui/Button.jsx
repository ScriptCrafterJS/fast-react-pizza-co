import { Link } from 'react-router-dom';

export default function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block rounded-full bg-yellow-400 font-semibold uppercase text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:py-2.5 md:px-5 text-xs',
    secondary:
      'inline-block text-sm rounded-full font-semibold uppercase text-stone-400 transition-colors duration-300  focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 border-2 border-stone-300 px-4 py-3 md:px-6 md:py-3.5 hover:bg-stone-500 hover:text-stone-100 hover:border-stone-500',
    round: base + ' px-2.5 py-1 md:py-2 md:px-3.5 text-sm',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
