
const OverlayScreen = ({ children }) => {
  return (
    <>
      {/* For Background Blur */}
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs z-50 "></div>

      {/* For displaying the children */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        {children}
      </div>
    </>
  );
};

export default OverlayScreen;
