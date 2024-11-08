// resources/js/Layouts/DosenLayout.jsx

import React from 'react';
import SidebarDosen from './SidebarDosen';
import MarginWithWrapper from './MarginWithWrapper';
import Header from './Header';
import PageWrapper from './PageWrapper';

const DosenLayout = ({ children, dosen }) => {
    return (
        <div className="bg-white">
            <div className="flex">
                <SidebarDosen dosen={dosen} />
                <main className="flex-1">
                    <MarginWithWrapper>
                        {/* <Header /> */}
                        <PageWrapper>{children}</PageWrapper>
                    </MarginWithWrapper>
                </main>
            </div>
        </div>
    );
};

export default DosenLayout;