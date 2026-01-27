const MainLayout = ({ children }) => {
  return (
    <div className="h-screen px-3 md:px-10 py-15">
      {children}
    </div>
  );
};

export default MainLayout;