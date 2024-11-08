import React from "react";
import { Icon } from "@iconify/react";

const SidebarMahasiswa = ({ mahasiswa }) => {
    return (
        <aside
            id="default-sidebar"
            class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-5 border-blue-500"
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
                        href="dashboard"
                        className="font-serif font-semibold text-xl text-white"
                    >
                        SIGMA UNDIP
                    </a>
                </div>
            </div>
            <div className="border-3 border-blue-500"></div>
            <div
                class="h-full px-3 py-4 overflow-y-auto bg-gray-50"
                style={{ backgroundColor: "#1EAADF" }}
            >
                <ul class="space-y-2 font-medium">
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
                                {mahasiswa.nama}
                            </span>
                            <span className="dark:text-slate-300 text-l">
                                {mahasiswa.nim}
                            </span>
                            <span className="dark:text-slate-300 text-m">
                                {mahasiswa.nama_prodi}
                            </span>
                        </div>
                    </li>
                    <li>
                        <a
                            href="/mahasiswa/dashboard"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <Icon
                                icon="ic:baseline-pie-chart"
                                width="24"
                                height="24"
                            />
                            <span class="ms-3">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/mahasiswa/registrasi"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <Icon
                                icon="ic:round-app-registration"
                                width="24"
                                height="24"
                            />
                            <span class="ms-3">Registrasi</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/mahasiswa/biaya"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <Icon
                                icon="ic:round-monetization-on"
                                width="24"
                                height="24"
                            />
                            <span class="ms-3">Biaya Kuliah</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/mahasiswa/akademik"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <Icon
                                icon="ic:round-library-books"
                                width="24"
                                height="24"
                            />
                            <span class="ms-3">Akademik</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/actionlogout"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <Icon
                                icon="ri:logout-box-r-fill"
                                width="24"
                                height="24"
                            />
                            <span class="flex-1 ms-3 whitespace-nowrap">
                                Logout
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SidebarMahasiswa;
