
// Function to get working URL of an image.... 
export const getImageUrl = (image)=>{
  const url = `${import.meta.env.VITE_SERVER_URL}/${image}`;
  // console.log("actual url:", url)
  return url;
}
