import React from "react";

const BagianAkademikLayout = ({ children }) => {
    return (
        <>
            <header className="bg-indigo-500 text-white py-2">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center">
                        <img
                            src="/logoundip.png"
                            style={{ width: "50px", height: "40px" }}
                        />
                        <span className="font-semibold text-2xl text-black ">
                            SIGMA UNDIP
                        </span>
                    </div>
                </div>
            </header>
            <main>
                <div className="container mx-auto py-2">{children}</div>
            </main>
        </>
    );
};

export default BagianAkademikLayout;
