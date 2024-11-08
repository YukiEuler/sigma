import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import BagianAkademikLayout from "../../../Layouts/BagianAkademikLayout";
import Chart from "react-apexcharts";
// import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const DashboardBagianAkademik = ({ ruangan }) => {
    const [data, setData] = useState([]);
    const { props } = usePage();
    const bagian_akademikData = props.bagian_akademik;
    const [bagian_akademik, setBagian_akademik] = useState(bagian_akademikData);

    const totalRuang = ruangan.length;
    const totalRuangBelumDiajukan = ruangan.filter(
        (r) => r.diajukan === 0 && r.disetujui === 0
    ).length;
    const totalRuangSudahDiajukan = ruangan.filter(
        (r) => r.diajukan === 1 && r.disetujui === 0
    ).length;
    const totalRuangSudahDisetujui = ruangan.filter(
        (r) => r.diajukan === 1 && r.disetujui === 1
    ).length;

    useEffect(() => {
        setData(ruangan);
        setBagian_akademik(bagian_akademikData);
    }, [ruangan, bagian_akademikData]);

    return (
        <BagianAkademikLayout bagian_akademik={bagian_akademik}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Dashboard
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Jumlah Ruang Kuliah
                                </span>
                                <span className="text-lg font-semibold">
                                    {totalRuang}
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Ruang Kuliah Belum Diajukan
                                </span>
                                <span className="text-lg font-semibold">
                                    {totalRuangBelumDiajukan}
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Ruang Kuliah Sudah Diajukan
                                </span>
                                <span className="text-lg font-semibold">
                                    {totalRuangSudahDiajukan}
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
                <div className="grid grid-cols-1 gap-5 mt-6 lg:grid-cols-1">
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
                                                totalRuangBelumDiajukan,
                                                totalRuangSudahDiajukan,
                                                totalRuangSudahDisetujui,
                                            ]}
                                            options={{
                                                labels: [
                                                    "Sudah Disetujui",
                                                    "Belum Disetujui",
                                                ],
                                                colors: ["#03045e", "#0077b6", "#00b4d8"],
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
        </BagianAkademikLayout>
    );
};

export default DashboardBagianAkademik;
