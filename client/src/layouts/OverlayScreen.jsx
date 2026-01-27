import MainLayout from "./MainLayout";

const OverlayScreen = ({ children }) => {
  return (
    <>
      {/* For Background Blur */}
      <div className="absolute inset-0 flex justify-center items-center backdrop-blur-xs z-50 fixed"></div>

      {/* For displaying the children */}
      <div className="absolute inset-0 flex justify-center items-center px-3 z-55 fixed">
        {children}
      </div>
    </>
  );
};

export default OverlayScreen;
