import React from "react";

const Header = () => {
    return (
        <>
            <header className="fixed top-0 left-0 right-0 text-white py-2 md:ml-64" style={{ backgroundColor: "#1EAADF" }}>
                <div className="container mx-auto">
                    <div className="flex justify-center items-center">
                        <a href="dashboard">
                            <img
                                src="/logoundip.png"
                                style={{ width: "50px", height: "40px" }}
                            />
                        </a>
                        <a
                            href="dashboard"
                            className="font-serif font-semibold text-2xl text-white"
                        >
                            SIGMA UNDIP
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
