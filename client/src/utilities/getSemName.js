const semesterName = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

export const getSemesterName = (sem)=>{
     sem = Number(sem);
     
     if(sem && sem >= 1 && sem <= 9){
          return semesterName[sem-1]
     }
     return null;
}