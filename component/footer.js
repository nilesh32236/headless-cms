import React from "react";

export default () => {
  return (
    <>
      <div id="ast-scroll-top" className="ast-scroll-top-icon ast-scroll-to-top-right">
        <span className="ast-icon icon-arrow">
          <svg className="ast-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="26px" height="16.043px" viewBox="57 35.171 26 16.043" enableBackground="new 57 35.171 26 16.043" xmlSpace="preserve">
            <path d="M57.5,38.193l12.5,12.5l12.5-12.5l-2.5-2.5l-10,10l-10-10L57.5,38.193z"></path>
          </svg>
        </span>
        <span className="screen-reader-text">Scroll to Top</span>
      </div>
    </>
  );
};