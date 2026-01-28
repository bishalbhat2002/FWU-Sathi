const ScrollPageLayout = ({ children, className}) => {
  return (
    <div className={`max-w-screen min-h-screen px-3 pt-15 ${className}`}>
      {children}
    </div>
  );
};

export default ScrollPageLayout;