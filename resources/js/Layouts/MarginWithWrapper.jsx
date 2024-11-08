import React from "react";

const MarginWithWrapper = ({ children }) => {
    return (
        <div
            className="flex flex-col md:ml-64  min-h-screen"
            // style={{ minHeight: `calc(100vh - 4rem)`, overflow: "auto" }}
        >
            {children}
        </div>
    );
};

export default MarginWithWrapper;
