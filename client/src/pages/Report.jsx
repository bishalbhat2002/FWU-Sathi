import FixPageLayout from "../layouts/FixPageLayout";
import { ReportHeader } from "../components/reportComponents/ReportHeader";
import {ReportLink} from "../components/reportComponents/ReportLink"
import { Outlet } from "react-router-dom";

const Report = () => {
  return (
    <FixPageLayout>
      {/* Notes Header.... */}
      <div className="pb-2 h-[99%] w-full max-w-160 bg-gray-200 mx-auto shadow mt-2 rounded-md flex flex-col gap-2 shadow items-start rounded overflow-hidden">
        <ReportHeader />

        {/* Code for displaying the Reports resolve options... Only for admin....*/}
        {true && <Outlet />}

        <div className="w-full px-5 flex flex-col gap-2 overflow-auto hide-scrollbar">
          {/* Render Notifications here... */}
          <ReportLink />
          <ReportLink />
          <ReportLink />
          <ReportLink />
          <ReportLink />
          <ReportLink />
          <ReportLink />
          <ReportLink />
          <ReportLink />
          <ReportLink />
          <ReportLink />
          <ReportLink />

          <p className="text-center font-medium text-gray-700 mt-1 animate-pulse">
            Getting older Notifications...
          </p>
        </div>
      </div>
    </FixPageLayout>
  );
};

export default Report;


