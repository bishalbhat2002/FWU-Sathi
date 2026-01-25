const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes("jpg")) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next(err);
};