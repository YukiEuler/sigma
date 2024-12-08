import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";
import Chart from "react-apexcharts";

const DashboardDosen = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const stats = props.mahasiswaStats;
    const allStudents = props.allstudent;
    console.log (props.allstudent)

    // State for selected year filter
    const [selectedYear, setSelectedYear] = useState("all");

    // Get unique years for filter dropdown
    const years = ["all", ...new Set(allStudents.map((s) => s.angkatan))]
        .sort()
        .reverse();

    // Filter students based on selected year
    const students =
        selectedYear === "all"
            ? allStudents
            : allStudents.filter((s) => s.angkatan === selectedYear);

    // Calculate statistics
    // const totalStudents = students.filter(s => s.status === "Aktif").length
    // const notFilledIRS = students.filter(
    //     (s) => s.is_verified === null || s.diajukan === 0
    // ).length;
    // const notVerifiedIRS = students.filter(
    //     (s) => s.is_verified === 0 && s.diajukan === 1
    // ).length;
    // const verifiedIRS = students.filter(
    //     (s) => s.is_verified === 1 && s.diajukan === 1
    // ).length;

    const totalStudents = stats.total_aktif;
    const notFilledIRS = stats.belum_isi_irs;
    const notVerifiedIRS = stats.belum_disetujui;
    const verifiedIRS = stats.sudah_disetujui;

    

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <DosenLayout dosen={dosen}>
             <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Dashboard
                    </h1>
                </div>
                <div className="flex items-center space-x-4 mt-3">
                    <label
                        htmlFor="yearFilter"
                        className="text-sm font-medium text-gray-900"
                    >
                        Angkatan:
                    </label>
                    <select
                        id="yearFilter"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year === "all"
                                    ? "Semua Angkatan"
                                    : `Angkatan ${year}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-2 lg:grid-cols-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400 text-md">
                                    Mahasiswa Aktif {""}
                                    {selectedYear !== "all"
                                        ? `(Angkatan ${selectedYear})`
                                        : "(Semua Angkatan)"}
                                </span>
                                <span className="text-lg font-semibold">
                                    {totalStudents}
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400 text-md">
                                    Belum Mengisi IRS {""}
                                    {selectedYear !== "all"
                                        ? `(Angkatan ${selectedYear})`
                                        : "(Semua Angkatan)"}
                                </span>
                                <span className="text-lg font-semibold">
                                    {notFilledIRS}
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-2 lg:grid-cols-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400 text-md">
                                    IRS Sudah Disetujui {""}
                                    {selectedYear !== "all"
                                        ? `(Angkatan ${selectedYear})`
                                        : "(Semua Angkatan)"}
                                </span>
                                <span className="text-lg font-semibold">
                                    {verifiedIRS}
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400 text-md">
                                    IRS Belum Disetujui {""}
                                    {selectedYear !== "all"
                                        ? `(Angkatan ${selectedYear})`
                                        : "(Semua Angkatan)"}
                                </span>
                                <span className="text-lg font-semibold">
                                    {notVerifiedIRS}
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 mt-3">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="p-2 border rounded-lg shadow-lg bg-white">
                            <div className="mt-2 mb-2">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                                    Status Mahasiswa{" "}
                                    {selectedYear !== "all"
                                        ? `(Angkatan ${selectedYear})`
                                        : "(Semua Angkatan)"}
                                </h2>
                                <div className="py-3 grid place-items-center px-2">
                                    <div className="h-full">
                                        <Chart
                                            type="pie"
                                            width={350}
                                            height={350}
                                            series={[
                                                notFilledIRS,
                                                notVerifiedIRS,
                                                verifiedIRS,
                                            ]}
                                            options={{
                                                labels: [
                                                    "Belum Mengisi IRS",
                                                    "Belum Disetujui IRS",
                                                    "Sudah Disetujui IRS",
                                                ],
                                                colors: [
                                                    "#03045e",
                                                    "#0077b6",
                                                    "#00b4d8",
                                                ],
                                                legend: {
                                                    show: true,
                                                    position: "right",
                                                },
                                            }}
                                        ></Chart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DosenLayout>
    );
};

export default DashboardDosen;
