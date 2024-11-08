import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import DekanLayout from "../../../Layouts/DekanLayout";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";

const SetujuiRuang = ({ ruangan }) => {
    const [data, setData] = useState([]);
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
        setData(ruangan);
    }, [ruangan]);

    const handleEditClick = (item) => {
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
                                <div className="relative overflow-x-auto mt-4 rounded-lg overflow-auto h-[530px] scrollbar-hide">
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
                                            {data.map((item, index) => (
                                                <tr
                                                    key={item.id_ruang}
                                                    className="bg-gray-100 border-b"
                                                >
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
                                                                handleEditClick(
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
