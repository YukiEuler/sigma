import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { PiNotePencilDuotone } from "react-icons/pi";
import { MdOutlineNoteAdd } from "react-icons/md";
import { SiHtmlacademy } from "react-icons/si";
import { CgNotes } from "react-icons/cg";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiNotebook } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";

const SidebarMahasiswa = ({ mahasiswa }) => {
    return (
        <aside
            id="default-sidebar"
            class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-5 border-blue-500"
            aria-label="Sidebar"
        >
            <div className="container mx-auto py-[13px] bg-[#1EAADF]">
                <div className="flex justify-center items-center    ">
                    <a href="/mahasiswa/dashboard">
                        <img
                            src="/logoundip.png"
                            style={{ width: "35px", height: "25px" }}
                        />
                    </a>
                    <a
                        href="/mahasiswa/dashboard"
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
                        {mahasiswa.nama}
                    </span>
                    <span className="dark:text-slate-300 text-l">
                        {mahasiswa.nim}
                    </span>
                    <span className="dark:text-slate-300 text-m">
                        {mahasiswa.nama_prodi}
                    </span>
                </div>
                <div className="mb-2">
                    <div className="flex items-center text-white font-medium space-y-1">
                        <a
                            href="/mahasiswa/dashboard"
                            className="flex items-center w-full gap-2 px-2 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <MdOutlineDashboard style={{ fontSize: "24px" }} />
                            <span className="text-md">Dashboard</span>
                        </a>
                    </div>
                </div>
                <div className="mb-2">
                    <div className="flex items-center text-white font-medium space-y-1">
                        <a
                            href="/mahasiswa/registrasi"
                            className="flex items-center w-full gap-2 px-2 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <PiNotePencilDuotone style={{ fontSize: "24px" }} />
                            <span className="text-md">Registrasi</span>
                        </a>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 px-2 py-2 text-white font-medium">
                        <SiHtmlacademy style={{ fontSize: "24px" }} />
                        <span className="text-md">Akademik</span>
                    </div>
                    <div className="space-y-1 ml-4">
                        <a
                            href="/mahasiswa/akademik/buat-irs"
                            className="flex items-center gap-2 px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <MdOutlineNoteAdd style={{ fontSize: "24px" }} />
                            <span className="text-sm">Buat IRS</span>
                        </a>
                        <a
                            href="/mahasiswa/akademik/irs"
                            className="flex items-center gap-2 px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <CgNotes style={{ fontSize: "24px" }} />
                            <span className="text-sm">IRS</span>
                        </a>
                        <a
                            href="/mahasiswa/akademik/khs"
                            className="flex items-center gap-2 px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white group"
                        >
                            <HiOutlineDocumentReport
                                style={{ fontSize: "24px" }}
                            />
                            <span className="text-sm">KHS</span>
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

export default SidebarMahasiswa;
