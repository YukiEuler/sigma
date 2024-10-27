import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import BagianAkademikLayout from "../../../Layouts/BagianAkademikLayout";
import { PieChart } from "@mui/x-charts/PieChart";

const DashboardBagianAkademik = () => {
    const { props } = usePage();
    const bagian_akademikData = props.bagian_akademik;
    const [bagian_akademik, setBagian_akademik] = useState(bagian_akademikData);

    useEffect(() => {
        setBagian_akademik(bagian_akademikData);
    }, [bagian_akademikData]);

    return (
        <BagianAkademikLayout bagian_akademik={bagian_akademik}>
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
                                    Ruang Kuliah Tersedia
                                </span>
                                <span className="text-lg font-semibold">
                                    10
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Ruang Kuliah Tidak Tersedia
                                </span>
                                <span className="text-lg font-semibold">
                                    20
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
                                    <PieChart
                                        colors={["#6366F1", "#A855F7"]}
                                        series={[
                                            {
                                                data: [
                                                    {
                                                        id: 0,
                                                        value: 10,
                                                        label: "Ruang Tersedia",
                                                        color: "#A855F7",
                                                    },
                                                    {
                                                        id: 1,
                                                        value: 20,
                                                        label: "Ruang Tidak Tersedia",
                                                        color: "#6366F1",
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
        </BagianAkademikLayout>
    );
};

export default DashboardBagianAkademik;
