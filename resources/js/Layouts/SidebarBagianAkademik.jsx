import React, { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { MdMeetingRoom } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

const SidebarBagianAkademik = ({ bagian_akademik }) => {
    return (
        <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-5 border-[#1EAADF]"
            aria-label="Sidebar"
        >
            <div className="container mx-auto py-[13px] bg-[#1EAADF]">
                <div className="flex justify-center items-center    ">
                    <a href="/bagian-akademik/dashboard">
                        <img
                            src="/logoundip.png"
                            style={{ width: "35px", height: "25px" }}
                        />
                    </a>
                    <a
                        href="/bagian-akademik/dashboard"
                        className="font-serif font-semibold text-xl text-white"
                    >
                        SIGMA UNDIP
                    </a>
                </div>
            </div>
            <div className="border-3 border-[#1EAADF]"></div>
            <div
                className="h-full px-3 py-2 overflow-y-auto bg-gray-50"
                style={{ backgroundColor: "#1EAADF" }}
            >
                <div className="flex flex-col p-2 mb-2">
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
                <div>
                    <div className="mb-2">
                        <div className="space-y-1 font-medium">
                            <a
                                href="/bagian-akademik/dashboard"
                                className="flex items-center gap-2 px-2 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                            >
                                <MdOutlineDashboard
                                    style={{ fontSize: "24px" }}
                                />
                                <span className="text-md">Dashboard</span>
                            </a>
                            <a
                                href="/bagian-akademik/atur-ruang"
                                className="flex items-center gap-2 px-2 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                            >
                                <MdMeetingRoom style={{ fontSize: "24px" }} />
                                <span className="text-md">Atur Ruang</span>
                            </a>
                            <a
                                href="/actionlogout"
                                className="flex items-center gap-2 px-2 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                            >
                                <IoIosLogOut style={{ fontSize: "24px" }} />
                                <span className="text-md">Logout</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SidebarBagianAkademik;
