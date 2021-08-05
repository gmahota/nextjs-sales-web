import React from "react";

const WorkscheduleForm = ({ workschedule }) => {
  return (
    <>
      <div className="table-row-group">
        <div className="table-row">
          <div className="table-cell whitespace-nowrap px-2 text-sm">
            <b>ID</b>
          </div>
          <div className="table-cell px-2 whitespace-normal">
            {workschedule.id}
          </div>
        </div>

        <div className="table-row">
          <div className="table-cell whitespace-nowrap px-2 text-sm">
            <b>Name</b>
          </div>
          <div className="table-cell px-2 whitespace-normal">
            {workschedule.name}
          </div>
        </div>

        <div className="table-row">
          <div className="table-cell whitespace-nowrap px-2 text-sm">
            <b>Type</b>
          </div>
          <div className="table-cell px-2 whitespace-normal">
            {workschedule.type}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkscheduleForm;
