import React from "react";
import Header from "./Header";
import SidebarBagianAkademik from "./SidebarBagianAkademik";
import MarginWithWrapper from "./MarginWithWrapper";
import PageWrapper from "./PageWrapper";

const BagianAkademikLayout = ({ children, bagian_akademik }) => {
    return (
        <html lang="en">
            <body className="bg-white">
                <div className="flex">
                    <SidebarBagianAkademik bagian_akademik={bagian_akademik}/>
                    <main className="flex-1">
                        <MarginWithWrapper>
                            {/* <Header /> */}
                            <PageWrapper>{children}</PageWrapper>
                        </MarginWithWrapper>
                    </main>
                </div>
            </body>
        </html>
    );
};

export default BagianAkademikLayout;
