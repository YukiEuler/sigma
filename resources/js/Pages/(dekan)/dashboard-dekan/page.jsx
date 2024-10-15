import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { PieChart } from "@mui/x-charts/PieChart";
import DekanLayout from "../../../Layouts/DekanLayout";

const DashboardDekan = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <DekanLayout dosen={dosen}>
            <main
                className="flex-1 px-5 pb-5 pt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
                style={{ minHeight: `calc(100vh - 6.5rem)`, overflow: "auto" }}
            >
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-white">
                        Dashboard
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6 lg:grid-cols-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">Mahasiswa</span>
                                <span className="text-lg font-semibold">
                                    3052
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">Dosen</span>
                                <span className="text-lg font-semibold">
                                    213
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-6 lg:grid-cols-4">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Mahasiswa Aktif
                                </span>
                                <span className="text-lg font-semibold">
                                    305
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Mahasiswa Cuti
                                </span>
                                <span className="text-lg font-semibold">
                                    51
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Mahasiswa DO
                                </span>
                                <span className="text-lg font-semibold">
                                    35
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Mahasiswa Lulus
                                </span>
                                <span className="text-lg font-semibold">
                                    150
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6 lg:grid-cols-1">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-center justify-center p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2 items-center">
                                <h2 className="text-gray-400">
                                    Status Mahasiswa
                                </h2>
                                <div className="py-6 grid place-items-center px-2">
                                    <PieChart
                                        colors={[
                                            "#8E7AB5",
                                            "#B784B7",
                                            "#E493B3",
                                            "#EEA5A6",
                                        ]}
                                        series={[
                                            {
                                                data: [
                                                    {
                                                        id: 0,
                                                        value: 305,
                                                        label: "Mahasiswa Aktif",
                                                        color: "#8E7AB5",
                                                    },
                                                    {
                                                        id: 1,
                                                        value: 51,
                                                        label: "Mahasiswa Cuti",
                                                        color: "#B784B7",
                                                    },
                                                    {
                                                        id: 2,
                                                        value: 35,
                                                        label: "Mahasiswa DO",
                                                        color: "#E493B3",
                                                    },
                                                    {
                                                        id: 3,
                                                        value: 150,
                                                        label: "Mahasiswa Lulus",
                                                        color: "#EEA5A6",
                                                    },
                                                ],
                                            },
                                        ]}
                                        width={600}
                                        height={200}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DekanLayout>
    );
};

export default DashboardDekan;
