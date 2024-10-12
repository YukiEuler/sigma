import React from "react";

const Header = () => {
    return (
        <>
            <header className="dark:bg-gray-800 text-white py-2">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center">
                        <img
                            src="/logoundip.png"
                            style={{ width: "50px", height: "40px" }}
                        />
                        <span className="font-serif font-semibold text-2xl text-white ">
                            SIGMA UNDIP
                        </span>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
