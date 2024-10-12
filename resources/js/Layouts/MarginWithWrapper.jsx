import React from "react";

const MarginWithWrapper = ({children}) => {
    return (
        <div className="flex flex-col md:ml-64 min-h-screen">
            {children}
        </div>
    );
};

export default MarginWithWrapper;
