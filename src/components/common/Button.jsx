const VARIANTS = {
  primary: 'bg-[#4640DE] text-white hover:bg-[#3730c4] active:bg-[#2e27a8]',
  outline: 'border border-[#4640DE] text-[#4640DE] bg-transparent hover:bg-[#4640DE] hover:text-white',
  ghost: 'bg-transparent text-[#25324B] hover:text-[#4640DE]',
};

const Button = ({ children, variant = 'primary', onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        font-semibold transition-colors duration-200 cursor-pointer
        ${VARIANTS[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
