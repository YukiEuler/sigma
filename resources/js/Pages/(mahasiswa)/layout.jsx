import React from "react";
import Header from "../../Components/header";
import MarginWidthWrapper from "../../Components/margin-with-wrapper";
import PageWrapper from "../../Components/page-wrapper";
import SidebarBagianAkademik from "../../Components/sidebar-bagian-akademik";

const Layout = ({ children }) => {
    <html lang="en">
        <body className="bg-white">
            <div className="flex">
                <SidebarKaryawan />
                <main className="flex-1">
                    <MarginWidthWrapper>
                        <Header />
                        <PageWrapper>{children}</PageWrapper>
                    </MarginWidthWrapper>
                </main>
            </div>
        </body>
    </html>;
};

export default Layout;
