import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { PieChart } from "@mui/x-charts/PieChart";
import DosenLayout from "../../../Layouts/DosenLayout";

const DashboardDosen = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <DosenLayout dosen={dosen}>
            <main
                className="flex-1 px-5 pb-5 pt-4"
                style={{ minHeight: `calc(100vh - 6.5rem)`, overflow: "auto" }}
            >
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Dashboard
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6 lg:grid-cols-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Mahasiswa Perwalian
                                </span>
                                <span className="text-lg font-semibold">
                                    100
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Mahasiswa Belum IRS
                                </span>
                                <span className="text-lg font-semibold">
                                    40
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6 lg:grid-cols-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Mahasiswa Sudah PKL
                                </span>
                                <span className="text-lg font-semibold">
                                    10
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
                                    Status IRS Mahasiswa
                                </h2>
                                <div className="py-6 grid place-items-center px-2">
                                    <PieChart
                                        colors={["#2c2a4a", "#4f518c", "#907ad6", "#dabfff"]}
                                        series={[
                                            {
                                                data: [
                                                    {
                                                        id: 0,
                                                        value: 60,
                                                        label: "IRS Sudah Disetujui",
                                                        color: "#2c2a4a",
                                                    },
                                                    {
                                                        id: 1,
                                                        value: 20,
                                                        label: "IRS Belum Disetujui",
                                                        color: "#4f518c",
                                                    },
                                                    {
                                                        id: 2,
                                                        value: 20,
                                                        label: "Belum IRS",
                                                        color: "#907ad6",
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
        </DosenLayout>
    );
};

export default DashboardDosen;
