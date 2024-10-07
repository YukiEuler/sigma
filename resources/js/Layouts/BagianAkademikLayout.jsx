import React from "react";

const BagianAkademikLayout = ({ children }) => {
    return (
        <>
            <header className="bg-black/60 py-20">
                <div className="container mx-auto">
                    <h2>Nav</h2>
                </div>
            </header>
            <main>
                <div className="container mx-auto">
                    {children}
                </div>
            </main>
        </>
    );
};

export default BagianAkademikLayout;