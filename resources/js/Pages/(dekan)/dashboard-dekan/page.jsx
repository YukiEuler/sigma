import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DekanLayout from "../../../Layouts/DekanLayout";
import Chart from "react-apexcharts";

const DashboardDekan = ({ ruangan }) => {
    const [data, setData] = useState([]);
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    const totalRuang = ruangan.length;
    const totalRuangBelumDiajukan = ruangan.filter(
        (r) => r.diajukan === 0 && r.disetujui === 0
    ).length;
    const totalRuangBelumDisetujui = ruangan.filter(
        (r) => r.diajukan === 1 && r.disetujui === 0
    ).length;
    const totalRuangSudahDisetujui = ruangan.filter(
        (r) => r.diajukan === 1 && r.disetujui === 1
    ).length;

    useEffect(() => {
        setData(ruangan);
        setDosen(dosenData);
    }, [ruangan, dosenData]);

    return (
        <DekanLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Dashboard
                    </h1>
                </div>

                <div className="grid grid-cols-1 gap-3 mt-6 lg:grid-cols-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Ruang Kuliah Belum Disetujui
                                </span>
                                <span className="text-lg font-semibold">
                                    {totalRuangBelumDisetujui}
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Ruang Kuliah Sudah Disetujui
                                </span>
                                <span className="text-lg font-semibold">
                                    {totalRuangSudahDisetujui}
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-3 lg:grid-cols-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Jadwal Kuliah Belum Disetujui
                                </span>
                                <span className="text-lg font-semibold">0</span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Jadwal Kuliah Sudah Disetujui
                                </span>
                                <span className="text-lg font-semibold">0</span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-3 lg:grid-cols-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-center justify-center p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2 items-center">
                                <h2 className="text-gray-400">
                                    Status Ruang Kuliah
                                </h2>
                                <div className="py-6 grid place-items-center px-2">
                                    <div className="h-full">
                                        <Chart
                                            type="pie"
                                            width={350}
                                            height={350}
                                            series={[
                                                totalRuangBelumDisetujui,
                                                totalRuangSudahDisetujui,
                                            ]}
                                            options={{
                                                labels: [
                                                    "Belum Disetujui",
                                                    "Sudah Disetujui",
                                                ],
                                                colors: [
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
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-center justify-center p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2 items-center">
                                <h2 className="text-gray-400">
                                    Status Jadwal Kuliah
                                </h2>
                                <div className="py-6 grid place-items-center px-2">
                                    <div className="h-full">
                                        <Chart
                                            type="pie"
                                            width={350}
                                            height={350}
                                            series={[
                                                0,
                                                0,
                                            ]}
                                            options={{
                                                labels: [
                                                    "Belum Disetujui",
                                                    "Sudah Disetujui",
                                                ],
                                                colors: [
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
        </DekanLayout>
    );
};

export default DashboardDekan;
