type PropTypes = {
  className?: string;
};

export default function PlusIcon({ className }: PropTypes) {
  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 5v14m-7-7h14' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}
