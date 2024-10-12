import React from "react";
import Header from "./Header";
import SidebarDekan from "./SidebarDekan";
import MarginWithWrapper from "./MarginWithWrapper";
import PageWrapper from "./PageWrapper";

const DekanLayout = ({ children }) => {
    return (
        <>
            <html lang="en">
                <body className="bg-white">
                    <div className="flex">
                        <SidebarDekan />
                        <main className="flex-1">
                            <MarginWithWrapper>
                                <Header />
                                <PageWrapper>{children}</PageWrapper>
                            </MarginWithWrapper>
                        </main>
                    </div>
                </body>
            </html>
        </>
    );
};

export default DekanLayout;
