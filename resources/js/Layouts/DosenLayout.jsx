import React from "react";
import Header from "./Header";
import SidebarDosen from "./SidebarDosen";
import MarginWithWrapper from "./MarginWithWrapper";
import PageWrapper from "./PageWrapper";

const DosenLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className="bg-white">
                <div className="flex">
                    <SidebarDosen />
                    <main className="flex-1">
                        <MarginWithWrapper>
                            <Header />
                            <PageWrapper>{children}</PageWrapper>
                        </MarginWithWrapper>
                    </main>
                </div>
            </body>
        </html>
    );
};

export default DosenLayout;
