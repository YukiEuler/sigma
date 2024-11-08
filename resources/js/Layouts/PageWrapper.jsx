import React from "react";

const PageWrapper = ({children}) => {
    return <div className="flex-col space-y-2 flex-grow mx-3 my-2">{children}</div>;
};

export default PageWrapper;
