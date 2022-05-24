import React from "react";

const MovieLoading = () => {
  return (
    <div>
      <div className="p-3 bg-slate-800 rounded-2xl flex flex-col mx-auto">
        <div className="pb-10 h-[300px] w-full">
          <LoadingSkeleton radius="12px"></LoadingSkeleton>
        </div>
        <div className="px-5 flex flex-1 flex-col">
          <h3 className="pb-4">
            <LoadingSkeleton height="20px"></LoadingSkeleton>
          </h3>
          <div className="pb-6">
            <LoadingSkeleton height="10px"></LoadingSkeleton>
            <div className="h-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

function LoadingSkeleton(props) {
  return (
    <div
      className="skeleton"
      style={{
        width: props.width || "100%",
        height: props.height || "100%",
        borderRadius: props.radius,
      }}
    ></div>
  );
}

export default MovieLoading;
