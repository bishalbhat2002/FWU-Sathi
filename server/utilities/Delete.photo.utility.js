import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deletePhoto = (photoPath) => {
     try {

          if(!photoPath) {
               return;               // return if photoPath doesnt exist
          }

          const fullPath = path.join(__dirname, "..", photoPath);

          // Check if the file exists before trying to delete it
          if (fs.existsSync(fullPath)) {
               console.log("Deleting photo: ", fullPath);
               
               if(fullPath.includes("profile-boy.jpeg") || fullPath.includes("profile-girl.jpg") || fullPath.includes("profile-other.png") || fullPath.includes("defaultCoverLink.jpg")) {
                    return;                  // Dont delete default profile and cover photos.
               }

               fs.unlinkSync(fullPath);                     // Delete the file from storage.

               console.log("Post image deleted successfully...");
          }
     } catch (error) {
          console.error("Error deleting photo:", error.message);
     }
}




/**
 * 
 * 1. We need "path" beacuse it helps safely build file paths (words on windows, linux, Mac.) as all these have different way of writing file path.
 *
 * 2. 'fileURLtoPath' is needed because ES modules dont have __dirname and __filename by default, so we recreate them using this function.
 * 
 * 3. const __filename = fileURLToPath(import.meta.url);  --> This converts the module's URL to a file path.
 * 
 * 4. const __dirname = path.dirname(__filename);  --> This gets the directory name of the current module file.
 * 
 * 5. __dirname => This is the directory of the current file, which we can use to build paths to other files (like photos) in our project.
 * 
 * 6. deletePhoto function takes a photoPath stored on database as an argument, which is the path to the photo we want to delete.
 *    Example: uploads/posts/2309hfoifiewjlfwe.png
 * 
 * 7. if(!filePath) return;  --> This checks if the photoPath is not provided, if its not provided we simply return and do nothing.
 * 
 * 
 * 8. const fullPath = path.join(__dirname, "..", photoPath);  --> This builds the full path to the photo by joining the current directory (__dirname), going one level up (".."), and then adding the photoPath. This ensures we get the correct path to the photo regardless of the operating system. I.e. __dirname contains the path to the current file (Delete.photo.utility.js), we go one level up to reach the root of the project [i.e. server folder in this case], and then add the photoPath [uploads/posts/2309hfoifiewjlfwe.png] to reach the photo we want to delete.
 * 
 * 
 * 
 * 9. fs.existsSync(fullPath) --> This checks if the file at the fullPath exists before trying to delete it. This is important to avoid errors when trying to delete a file that doesn't exist.
 * 
 * 
 * 10. fs.unlinkSync(fullPath) --> This deletes the file at the fullPath from the storage.
 * 
 * 
 */