import "./Loading.scss";

export const Loading = ({ show = false }) => {
  return (
    <>
      {show && (
        <div className="mb-loading-container">
          <div className="mb-loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};