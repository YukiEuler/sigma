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
    const [dosen, setDosen] = useState(dosenData);
    const [loading, setLoading] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProdi, setSelectedProdi] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const prodiList = [...new Set(data.map((jadwal) => jadwal.nama_prodi))];

    const statusOptions = [
        { value: "", label: "Semua Status" },
        { value: "belum_disetujui", label: "Belum Disetujui" },
        { value: "sudah_disetujui", label: "Sudah Disetujui" },
    ];

    const filteredData = data.filter((jadwal) => {
        const matchesSearch = jadwal.nama_ruang
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesProdi =
            selectedProdi === "" || jadwal.nama_prodi === selectedProdi;
        const matchesStatus =
            selectedStatus === "" ||
            (selectedStatus === "belum_disetujui" &&
                jadwal.diajukan === 1 &&
                jadwal.disetujui === 0) ||
            (selectedStatus === "sudah_disetujui" && jadwal.disetujui === 1);
        return matchesSearch && matchesProdi && matchesStatus;
    });

    const totalJadwal = filteredData.length;

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
                                <div className="mt-3">
                                    <div>
                                        {/* Program Studi Filter */}
                                        <span className="mr-[1rem]">
                                            Program Studi
                                        </span>
                                        <select
                                            value={selectedProdi}
                                            onChange={(e) =>
                                                setSelectedProdi(e.target.value)
                                            }
                                            className="px-2 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
                                        >
                                            <option value="">
                                                Semua Prodi
                                            </option>
                                            {prodiList.map((prodi) => (
                                                <option
                                                    key={prodi}
                                                    value={prodi}
                                                >
                                                    {prodi}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-2">
                                        <span className="mr-[4.5rem]">
                                            Status
                                        </span>
                                        {/*Status Filter*/}
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) =>
                                                setSelectedStatus(
                                                    e.target.value
                                                )
                                            }
                                            className="px-2 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
                                        >
                                            {statusOptions.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                    // onClick={handleSetujuiSelected}
                                    disabled={
                                        loading ||
                                        selectedJadwal.length === 0
                                    }
                                    className={`${
                                        loading ||
                                        selectedJadwal.length === 0
                                            ? "bg-gray-400"
                                            : "bg-green-500 hover:bg-green-600"
                                    } text-white px-4 py-2 rounded text-[14px] w-40`}
                                    >
                                        Setujui Semua
                                    </button>
                                    {/* Search Input */}
                                    <div className="w-64">
                                        <div className="relative w-full">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Icon
                                                    icon="ri:search-line"
                                                    style={{
                                                        color: "gray",
                                                    }}
                                                />
                                            </span>
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) =>
                                                    setSearchTerm(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Cari jadwal..."
                                                className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-3 pr-3">
                                        <span className="font-semibold">
                                            Total Ruang: {totalJadwal}
                                        </span>
                                    </div>
                                </div>
                                <div className="relative overflow-x-auto mt-2 rounded-lg overflow-auto h-[385px] scrollbar-hide">
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
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            // checked={
                                                            //     selectAll
                                                            // }
                                                            // onChange={
                                                            //     handleSelectAll
                                                            // }
                                                            className="w-4 h-4 mr-2"
                                                        />
                                                        <span>Semua</span>
                                                    </div>
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
                                                        width: "29%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Jadwal
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "30%",
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
                                        {/* <tbody>
                                                {filteredData.map(
                                                    (item, index) => (
                                                        <tr
                                                            key={item.id_ruang}
                                                            className="bg-gray-100 border-b"
                                                        >
                                                            <td className="px-4 py-2 flex justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedRooms.includes(
                                                                        item.id_ruang
                                                                    )}
                                                                    onChange={() =>
                                                                        handleSelectRoom(
                                                                            item.id_ruang
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        // item.diajukan ===
                                                                        //     1 ||
                                                                        item.disetujui ===
                                                                        1
                                                                    }
                                                                    className="w-4 h-4"
                                                                />
                                                            </td>
                                                            <td className="px-4 py-2 text-[14px] text-center">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-4 py-2 text-[14px] text-center">
                                                                {
                                                                    item.nama_ruang
                                                                }
                                                            </td>
                                                            <td className="px-4 py-2 text-[14px] text-center">
                                                                {item.kuota}
                                                            </td>
                                                            <td className="px-4 py-2 text-[14px] text-center">
                                                                {
                                                                    item.nama_prodi
                                                                }
                                                            </td>
                                                            <td className="px-4 py-2 text-[14px] text-center">
                                                                {item.diajukan ===
                                                                    0 &&
                                                                item.disetujui ===
                                                                    0
                                                                    ? "Belum Diajukan"
                                                                    : item.diajukan ===
                                                                          1 &&
                                                                      item.disetujui ===
                                                                          0
                                                                    ? "Belum Disetujui"
                                                                    : "Sudah Disetujui"}
                                                            </td>
                                                            <td className="px-4 py-2 flex justify-center">
                                                                <button
                                                                    onClick={() =>
                                                                        handleSetujui(
                                                                            item
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        item.disetujui ===
                                                                        1
                                                                    }
                                                                    className={`${
                                                                        item.disetujui ===
                                                                        1
                                                                            ? "bg-gray-400"
                                                                            : "bg-green-500 hover:bg-green-600"
                                                                    } text-white px-2 py-1 rounded text-[14px] text-center w-20`}
                                                                >
                                                                    {item.disetujui ===
                                                                    1
                                                                        ? "Disetujui"
                                                                        : "Setujui"}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody> */}
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
