import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const SidebarDosen = ({ dosen }) => {
    useEffect(() => {
        console.log(dosen);
    }, [dosen]);
    return (
        <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-5 border-blue-500"
            aria-label="Sidebar"
        >
            <div className="container mx-auto py-[13px] bg-[#1EAADF]">
                <div className="flex justify-center items-center    ">
                    <a href="dashboard">
                        <img
                            src="/logoundip.png"
                            style={{ width: "35px", height: "25px" }}
                        />
                    </a>
                    <a
                        href="/dosen/dashboard"
                        className="font-serif font-semibold text-xl text-white"
                    >
                        SIGMA UNDIP
                    </a>
                </div>
            </div>
            <div className="border-3 border-blue-500"></div>
            <div
                className="h-full px-3 py-4 overflow-y-auto bg-gray-50"
                style={{ backgroundColor: "#1EAADF" }}
            >
                <ul className="space-y-2 font-medium">
                    <li>
                        <Icon
                            icon="gg:profile"
                            color="white"
                            width="150"
                            height="150"
                            className="mx-auto mt-4"
                        />
                        <div className="flex flex-col p-2 mb-3">
                            <span className="dark:text-white text-xl">
                                {dosen.nama}
                            </span>
                            <span className="dark:text-slate-300 text-l">
                                {dosen.nip}
                            </span>
                            <span className="dark:text-slate-300 text-m">
                                {dosen.nama_fakultas}
                            </span>
                        </div>
                    </li>
                    <li>
                        <a
                            href="dashboard"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <Icon
                                icon="ic:baseline-pie-chart"
                                width="24"
                                height="24"
                            />
                            <span className="ms-3">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/dosen/perwalian"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <Icon
                                icon="ic:baseline-people"
                                width="24"
                                height="24"
                            />
                            <span className="ms-3">Perwalian</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/dosen/nilai"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <Icon
                                icon="solar:notebook-bookmark-bold"
                                width="24"
                                height="24"
                            />
                            <span className="ms-3">Nilai</span>
                        </a>
                    </li>
                    <li>
                        {dosen.dekan === 1 && (
                            <a
                                href="/dekan/dashboard"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                            >
                                <Icon
                                    icon="vaadin:academy-cap"
                                    width="24"
                                    height="24"
                                />
                                <span className="ms-3">Dekan Page</span>
                            </a>
                        )}
                    </li>
                    <li>
                        {dosen.kaprodi === 1 && (
                            <a
                                href="/kaprodi/dashboard"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                            >
                                <Icon
                                    icon="vaadin:academy-cap"
                                    width="24"
                                    height="24"
                                />
                                <span className="ms-3">Kaprodi Page</span>
                            </a>
                        )}
                    </li>
                    <li>
                        <a
                            href="/actionlogout"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <Icon
                                icon="ri:logout-box-r-fill"
                                width="24"
                                height="24"
                            />
                            <span className="flex-1 ms-3 whitespace-nowrap">
                                Logout
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SidebarDosen;
