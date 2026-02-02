import { useState } from "react";

// Header component for Notifications
export const ReportHeader = () => {
  const [activeReportNav, setActiveReportNav] = useState({
    all: true,
    post: false,
    comment: false,
    message: false,
  });
  const [activeReportStatus, setActiveReportStatus] = useState({
    pending: false,
    resolved: false,
    rejected: false,
  });

  function handleReportNavChange(navName) {
    setActiveReportNav({
      all: false,
      post: false,
      comment: false,
      message: false,
    });
    setActiveReportNav((prev) => ({
      ...prev,
      [navName]: true,
    }));
  }

  function handleActiveReportStatusChange(navName) {
    alert(navName);
    setActiveReportNav({
      pending: false,
      resolved: false,
      rejected: false,
    });

    setActiveReportStatus((prev) => ({
      ...prev,
      [navName]: true,
    }));
  }

  return (
    <>
      <div className="bg-gray-800 h-12 w-full flex justify-center items-center py-1">
        <h2 className="text-2xl font-extrabold text-white">All Reports</h2>
      </div>
      <div className="w-full px-5 py-1 flex justify-between gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => handleReportNavChange("all")}
            className={`${activeReportNav.all ? "report-nav-active" : "report-nav"}`}
          >
            All
          </button>
          <button
            onClick={() => handleReportNavChange("post")}
            className={`${activeReportNav.post ? "report-nav-active" : "report-nav"}`}
          >
            Post
          </button>
          <button
            onClick={() => handleReportNavChange("comment")}
            className={`${activeReportNav.comment ? "report-nav-active" : "report-nav"}`}
          >
            Comment
          </button>
          <button
            onClick={() => handleReportNavChange("message")}
            className={`${activeReportNav.message ? "report-nav-active" : "report-nav"}`}
          >
            Message
          </button>
        </div>

          <select 
          name="reportStatus" 
          onChange={(e) => handleActiveReportStatusChange(e.target.value)}
          className="font-bold text-gray-700 text-[0.8rem]">
            <option value="pending" >Pending</option>
            <option value="resolved" >Resolved</option>
            <option value="rejected" >Rejected</option>
            <option value="" disabled={true} selected={true} >Select Status</option>
          </select>

      </div>
    </>
  );
};
