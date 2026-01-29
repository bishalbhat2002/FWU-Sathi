import { useNavigate } from 'react-router-dom'
import FixPageLayout from '../layouts/FixPageLayout'
import { csitNotes } from '../constants/csitNotes'

const Notes = () => {
  return (
    <FixPageLayout >
      {/* Notes Header.... */}
      <div className='pb-6 w-full max-w-160 bg-gray-200 mx-auto shadow mt-2 rounded-md flex flex-col gap-2 shadow items-start rounded overflow-hidden'>
        <Header />

        <div className='w-full px-5 mt-2 flex flex-col gap-2'>
        
        {/* Render Notes and other materials here... */}
        {
          csitNotes.map((note, index)=>(

            <SemesterNote key={index} note={note} />
          ))
        }

        </div>

      </div>

    </FixPageLayout>
  )
}

export default Notes



function Header(){
  return(
      <div className='bg-gray-800 h-10 w-full flex justify-center items-center'>
        <h2 className='text-2xl font-extrabold text-white'>
          FWU-CSIT Notes
        </h2>
    </div>
  )
}


    
function SemesterNote({note}){
  const navigate = useNavigate();
  return(
    <a href={note.link} target='_blank' className="notes-individual w-full h-11 text-xs sm:text-sm md:text-md lg:text-lg shadow-notes p-2 px-4 rounded-sm hover-scale-sm font-bold  flex items-center text-zinc-600 bg-white">
      {note.label}
    </a>
  )
}