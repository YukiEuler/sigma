import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import DekanLayout from "../../../Layouts/DekanLayout";
import { Icon } from "@iconify/react";
import { usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";

const SetujuiJadwal = ({}) => {
    const [data, setData] = useState([]);
    const { props } = usePage();
    const dosenData = props.dosen;
    const programStudiList = props.programStudiList;
    const [dosen, setDosen] = useState(dosenData);
    const [loading, setLoading] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProdi, setSelectedProdi] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    console.log(programStudiList);
    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <DekanLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Persetujuan Jadwal
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100 mb-3">
                        <div className="justify-between px-4 pb-3 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <div className="flex justify-between items-center mt-4">
                                    {/* Search Input */}
                                    <div className="w-64">
                                        <div className="relative w-full"></div>
                                    </div>
                                </div>
                                <div className="relative overflow-x-auto mt-2 rounded-lg overflow-auto h-[530px] scrollbar-hide">
                                    <style jsx>{`
                                        .scrollbar-hide::-webkit-scrollbar {
                                            display: none;
                                        }
                                        .scrollbar-hide {
                                            -ms-overflow-style: none;
                                            scrollbar-width: none;
                                        }
                                    `}</style>
                                    <table className="w-full text-sm text-left rounded-lg text-gray-500 sticky-header">
                                        <thead
                                            className="text-xs text-white uppercase bg-gray-50 dark:text-gray-400 sticky top-0"
                                            style={{
                                                backgroundColor: "#1EAADF",
                                            }}
                                        >
                                            <tr>
                                                <th
                                                    className="px-4 py-3"
                                                    style={{ width: "5%" }}
                                                >
                                                    <div className="flex items-center justify-center"></div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "1%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "59%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Program Studi
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "20%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Detail
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "20%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {programStudiList.map(
                                                (prodi, index) => (
                                                    <tr
                                                        key={prodi.id_prodi}
                                                        className="bg-gray-100 border-b"
                                                    >
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center justify-center"></div>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            {prodi.nama_prodi}
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            {prodi.disetujui ===
                                                            0 ? (
                                                                <span>
                                                                    Not Approved
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    Approved
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <a
                                                                href={`/dekan/setujui-jadwal/detail/${prodi.id_prodi}`}
                                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-[14px]"
                                                            >
                                                                Detail
                                                            </a>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <button
                                                                disabled={
                                                                    prodi.disetujui !==
                                                                    0
                                                                }
                                                                onClick={() => {
                                                                    Inertia.post(
                                                                        `/dekan/setujui-jadwal${prodi.id_prodi}`,
                                                                        null,
                                                                        {
                                                                            onSuccess:
                                                                                () => {
                                                                                    Swal.fire(
                                                                                        {
                                                                                            icon: "success",
                                                                                            title: "Berhasil",
                                                                                            text: "Jadwal berhasil disetujui",
                                                                                        }
                                                                                    );
                                                                                },
                                                                        }
                                                                    );
                                                                }}
                                                                className={`${
                                                                    prodi.disetujui !==
                                                                    0
                                                                        ? "bg-gray-400"
                                                                        : "bg-green-500 hover:bg-green-600"
                                                                } text-white px-2 py-1 rounded text-[14px] text-center w-16`}
                                                            >
                                                                Setujui
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DekanLayout>
    );
};

export default SetujuiJadwal;
