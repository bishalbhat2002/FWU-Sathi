const FixPageLaout = ({ children, className }) => {
  return (
    <div
      className={`w-screen h-screen px-3 pt-15 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default FixPageLaout;
