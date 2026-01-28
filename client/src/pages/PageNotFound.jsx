import FixPageLayout from "../layouts/FixPageLayout"

const PageNotFound = () => {
  return (
     <FixPageLayout >
    <div className="w-full px-10 md:px-20 mt-[30dvh] text-4xl md:5xl  xl:text-7xl text-center font-extrabold flex justify-center items-center bg-gradient-to-r from-violet-600 to-green-500 bg-clip-text text-transparent">
     Sorry, The requested page Couldnt be Found!!!
    </div>
     </FixPageLayout>
  )
}

export default PageNotFound