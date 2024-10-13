import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const SidebarBagianAkademik = ({ bagian_akademik }) => {
    return (
        <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
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
                                {bagian_akademik.nama}
                            </span>
                            <span className="dark:text-slate-300 text-l">
                                {bagian_akademik.nip}
                            </span>
                            <span className="dark:text-slate-300 text-m">
                                {bagian_akademik.nama_fakultas}
                            </span>
                        </div>
                    </li>
                    <li>
                        <a
                            href="dashboard"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
                            href="/actionlogout"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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

export default SidebarBagianAkademik;