import React from "react";
import Header from "./Header";
import SidebarMahasiswa from "./SidebarMahasiswa";
import MarginWithWrapper from "./MarginWithWrapper";
import PageWrapper from "./PageWrapper";

const MahasiswaLayout = ({ children, mahasiswa }) => {
    return (
        <html lang="en">
            <body className="bg-white">
                <div className="flex">
                    <SidebarMahasiswa mahasiswa={mahasiswa} />
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

export default MahasiswaLayout;
