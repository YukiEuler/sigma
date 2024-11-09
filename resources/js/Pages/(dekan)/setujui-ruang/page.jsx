import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import DekanLayout from "../../../Layouts/DekanLayout";
import { Icon } from "@iconify/react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";
import { SiAwselasticloadbalancing } from "react-icons/si";

const SetujuiRuang = ({ ruangan }) => {
    const [data, setData] = useState([]);
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const [loading, setLoading] = useState(false);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = data.filter((room) =>
        room.nama_ruang.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectAll = (e) => {
        setSelectAll(e.target.checked);
        if (e.target.checked) {
            // Only select rooms that can be submitted (diajukan = 0 and disetujui = 0)
            const selectableRooms = data
                .filter((room) => room.diajukan === 1 && room.disetujui === 0)
                .map((room) => room.id_ruang);
            setSelectedRooms(selectableRooms);
        } else {
            setSelectedRooms([]);
        }
    };

    const handleSelectRoom = (id_ruang) => {
        setSelectedRooms((prev) => {
            if (prev.includes(id_ruang)) {
                return prev.filter((id) => id !== id_ruang);
            } else {
                return [...prev, id_ruang];
            }
        });
    };

    const handleSetujuiSelected = () => {
        if (selectedRooms.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Tidak ada ruangan yang dipilih!",
                text: "Pilih ruangan yang ingin disetujui.",
            });
            return;
        }

        setLoading(true);

        Inertia.post(
            `/dekan/setujui-ruang/setujui-multiple`,
            { room_ids: selectedRooms },
            {
                onSuccess: () => {
                    setLoading(false);
                    Swal.fire({
                        icon: "success",
                        title: "Pengajuan Ruang Disetujui!",
                        text: "Ruangan yang dipilih berhasil untuk disetujui.",
                    });

                    setData((prevData) =>
                        prevData.map((item) =>
                            selectedRooms.includes(item.id_ruang)
                                ? { ...item, disetujui: 1 }
                                : item
                        )
                    );
                    setSelectedRooms([]);
                    setSelectAll(false);
                    // setLoading(false);
                },
                onError: () => {
                    setLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Persetujuan Gagal!",
                        text: "Terjadi kesalahan saat menyetujui ruangan.",
                    });
                },
            }
        );
    };

    // const handleSetujuiSelected = (item) => {
    //     if (selectedRooms.length === 0) {
    //         Swal.fire({
    //             icon: "warning",
    //             title: "Tidak ada ruangan yang dipilih!",
    //             text: "Pilih ruangan yang ingin disetujui.",
    //         });
    //         return;
    //     }

    //     setLoading(true);

    //     Swal.fire({
    //         title: "Apakah Anda yakin menyetujui semua ruang yang dipilih?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yakin",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             Inertia.post(
    //                 `dekan/setujui-ruang/setujui-multiple`,
    //                 { room_ids: selectedRooms },
    //                 {
    //                     onSuccess: () => {
    //                         Swal.fire({
    //                             title: "Disetujui!",
    //                             text: "Ruangan telah disetujui.",
    //                             icon: "success",
    //                         });
    //                         setData(
    //                             data.map((d) =>
    //                                 selectedRooms.includes(d.id_ruang)
    //                                     ? { ...d, disetujui: 1 }
    //                                     : d
    //                             )
    //                         );
    //                         setSelectedRooms([]);
    //                         setSelectAll(false);
    //                         setLoading(false);
    //                     },
    //                     onError: () => {
    //                         Swal.fire({
    //                             title: "Gagal!",
    //                             text: "Terjadi kesalahan saat menyetujui ruangan.",
    //                             icon: "error",
    //                         });
    //                         setLoading(false);
    //                     },
    //                 }
    //             );
    //         }
    //     });
    // };

    useEffect(() => {
        setDosen(dosenData);
        setData(ruangan);
    }, [ruangan]);

    const handleSetujui = (item) => {
        Swal.fire({
            title: "Apakah Anda yakin menyetujui ruang ini?",
            text: "Ruang: " + item.nama_ruang + "\nProdi: " + item.nama_prodi,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yakin",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.get(`/dekan/setujui-ruang/${item.id_ruang}`, {
                    onSuccess: () => {
                        console.log("OKE");
                        Swal.fire(
                            "Disetujui!",
                            "Ruangan telah disetujui.",
                            "success"
                        );
                        setData(
                            data.map((d) =>
                                d.id_ruang === item.id_ruang
                                    ? { ...d, disetujui: 1 }
                                    : d
                            )
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat menyetujui ruangan.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <DekanLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Persetujuan Ruang
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 pb-4 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={handleSetujuiSelected}
                                        disabled={
                                            loading ||
                                            selectedRooms.length === 0
                                        }
                                        className={`${
                                            loading ||
                                            selectedRooms.length === 0
                                                ? "bg-gray-400"
                                                : "bg-green-500 hover:bg-green-600"
                                        } text-white px-4 py-2 rounded text-[14px] w-40`}
                                    >
                                        Setujui Semua
                                    </button>
                                    <div className="w-64">
                                        <div className="relative w-full">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Icon
                                                    icon="ri:search-line"
                                                    style={{ color: "gray" }}
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
                                                placeholder="Cari nama ruangan..."
                                                className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative overflow-x-auto mt-2 rounded-lg overflow-auto h-[500px] scrollbar-hide">
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
                                                            checked={selectAll}
                                                            onChange={
                                                                handleSelectAll
                                                            }
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
                                                    Nama Ruangan
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
                                                        width: "30%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredData.map((item, index) => (
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
                                                        {item.nama_ruang}
                                                    </td>{" "}
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {item.nama_prodi}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {item.diajukan === 0 &&
                                                        item.disetujui === 0
                                                            ? "Belum Diajukan"
                                                            : item.diajukan ===
                                                                  1 &&
                                                              item.disetujui ===
                                                                  0
                                                            ? "Sudah Diajukan"
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
                                            ))}
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

export default SetujuiRuang;
