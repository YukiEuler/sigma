import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import Chart from "react-apexcharts";
import KaprodiLayout from "../../../Layouts/KaprodiLayout";

const DashboardKaprodi = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const dosenData = props.dosen;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <KaprodiLayout kaprodi={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Dashboard Kaprodi
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-6 lg:grid-cols-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Total Mahasiswa
                                </span>
                                <span className="text-lg font-semibold">
                                    {mahasiswa.total}
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Mahasiswa Aktif
                                </span>
                                <span className="text-lg font-semibold">
                                    {mahasiswa.aktif}
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-6 lg:grid-cols-3">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Mahasiswa Cuti
                                </span>
                                <span className="text-lg font-semibold">
                                    {mahasiswa.cuti}
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
                                    {mahasiswa.do}
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
                                    {mahasiswa.lulus}
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
                                    <Chart
                                        type="pie"
                                        width={350}
                                        height={350}
                                        series={[
                                            mahasiswa.aktif,
                                            mahasiswa.cuti,
                                            mahasiswa.do,
                                            mahasiswa.lulus,
                                        ]}
                                        options={{
                                            labels: [
                                                "Mahasiswa Aktif",
                                                "Mahasiswa Cuti",
                                                "Mahasiswa DO",
                                                "Mahasiswa Lulus",
                                            ],
                                            colors: [
                                                "#03045e",
                                                "#0077b6",
                                                "#00b4d8",
                                                "#90e0ef",
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
            </main>
        </KaprodiLayout>
    );
};

export default DashboardKaprodi;
