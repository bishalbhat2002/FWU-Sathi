export const validateImage = (file) => {
  if (!file) return {valid:true};          // return as photo upload is optional...

  // Allowed formats
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: "Only PNG, JPG, and JPEG images are allowed.",
    };
  }

  // Max size: 2MB          --> for testing make it 10 because no low quality photo was available.........
  const maxSize = 10 * 1024 * 1024;            // In production make it to 2MB

  if (file.size > maxSize) {
    return {
      valid: false,
      message: "Image size must be less than 10MB.",
    };
  }

  return { valid: true };
};
