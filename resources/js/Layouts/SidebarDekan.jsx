import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { RiContactsBook2Line } from "react-icons/ri";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";

const SidebarDekan = ({ dosen }) => {
    return (
        <aside
            id="default-sidebar"
            class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-5 border-blue-500"
            aria-label="Sidebar"
        >
            <div className="container mx-auto py-[13px] bg-[#1EAADF]">
                <div className="flex justify-center items-center    ">
                    <a href="/dekan/dashboard">
                        <img
                            src="/logoundip.png"
                            style={{ width: "35px", height: "25px" }}
                        />
                    </a>
                    <a
                        href="/dekan/dashboard"
                        className="font-serif font-semibold text-xl text-white"
                    >
                        SIGMA UNDIP
                    </a>
                </div>
            </div>
            <div className="border-3 border-blue-500"></div>
            <div
                class="h-full px-3 py-2 overflow-y-auto bg-gray-50"
                style={{ backgroundColor: "#1EAADF" }}
            >
                <div className="flex flex-col p-2 mb-2">
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

                <div>
                    <div className="flex items-center gap-2 px-2 py-2 text-white font-medium">
                        <FaChalkboardTeacher style={{ fontSize: "24px" }} />
                        <span className="text-md">Dosen Menu</span>
                    </div>
                    <div className="space-y-1 ml-4">
                        <a
                            href="/dosen/dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <MdOutlineDashboard style={{ fontSize: "24px" }} />
                            <span className="text-sm">Dashboard</span>
                        </a>
                        <a
                            href="/dosen/perwalian"
                            className="flex items-center gap-2 px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <BsPeople style={{ fontSize: "24px" }} />
                            <span className="text-sm">Perwalian</span>
                        </a>
                        <a
                            href="/dosen/rekap-irs"
                            className="flex items-center gap-2 px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <RiContactsBook2Line style={{ fontSize: "24px" }} />
                            <span className="text-sm">Rekap IRS</span>
                        </a>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 px-2 py-2 text-white font-medium">
                        <HiOutlineAcademicCap style={{ fontSize: "24px" }} />
                        <span className="text-md">Dekan Menu</span>
                    </div>
                    <div className="space-y-1 ml-4">
                        <a
                            href="/dekan/dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <MdOutlineDashboard style={{ fontSize: "24px" }} />
                            <span className="text-sm">Dashboard</span>
                        </a>
                        <a
                            href="/dekan/setujui-ruang"
                            className="flex items-center gap-2 px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <SiGoogleclassroom style={{ fontSize: "24px" }} />
                            <span className="text-sm">Persetujuan Ruang</span>
                        </a>
                        <a
                            href="/dekan/setujui-jadwal"
                            className="flex items-center gap-2 px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <RiCalendarScheduleLine
                                style={{ fontSize: "24px" }}
                            />
                            <span className="text-sm">Persetujuan Jadwal</span>
                        </a>
                    </div>
                </div>

                <div className="mb-2">
                    <div className="flex items-center text-white font-medium space-y-1">
                        <a
                            href="/actionlogout"
                            className="flex items-center w-full gap-2 px-2 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <IoIosLogOut style={{ fontSize: "24px" }} />
                            <span className="text-md">Logout</span>
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SidebarDekan;
