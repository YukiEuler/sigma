import React from "react";
import Header from "./Header";
import SidebarKaprodi from "./SidebarKaprodi";
import MarginWithWrapper from "./MarginWithWrapper";
import PageWrapper from "./PageWrapper";

const DekanLayout = ({ children, kaprodi }) => {
    return (
        <>
            <html lang="en">
                <body className="bg-white">
                    <div className="flex">
                        <SidebarKaprodi kaprodi={kaprodi} />
                        <main className="flex-1">
                            <MarginWithWrapper>
                                {/* <Header /> */}
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
