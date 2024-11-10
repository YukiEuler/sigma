import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import BagianAkademikLayout from "../../../Layouts/BagianAkademikLayout";

const KelolaRuangan = ({ ruangan, programStudiList }) => {
    const [data, setData] = useState([]);
    const { props } = usePage();
    const bagian_akademikData = props.bagian_akademik;
    const [bagian_akademik, setBagian_akademik] = useState(bagian_akademikData);
    const [loading, setLoading] = useState(false);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProdi, setSelectedProdi] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const statusOptions = [
        { value: "", label: "Semua Status" },
        { value: "belum_diajukan", label: "Belum Diajukan" },
        { value: "belum_disetujui", label: "Belum Disetujui" },
        { value: "sudah_disetujui", label: "Sudah Disetujui" },
    ];

    const filteredData = data.filter((room) => {
        const matchesSearch = room.nama_ruang
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesProdi =
            selectedProdi === "" || room.id_prodi === selectedProdi;
        const matchesStatus =
            selectedStatus === "" ||
            (selectedStatus === "belum_diajukan" &&
                room.diajukan === 0 &&
                room.disetujui === 0) ||
            (selectedStatus === "belum_disetujui" &&
                room.diajukan === 1 &&
                room.disetujui === 0) ||
            (selectedStatus === "sudah_disetujui" && room.disetujui === 1);
        return matchesSearch && matchesProdi && matchesStatus;
    });

    const handleSelectAll = (e) => {
        setSelectAll(e.target.checked);
        if (e.target.checked) {
            // Only select rooms that can be submitted (diajukan = 0 and disetujui = 0)
            const selectableRooms = data
                .filter(
                    (room) =>
                        room.diajukan === 0 &&
                        room.disetujui === 0 &&
                        (selectedProdi === "" ||
                            room.id_prodi === selectedProdi)
                )
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

    const handleAjukanSelected = () => {
        if (selectedRooms.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Tidak ada ruangan yang dipilih!",
                text: "Pilih ruangan yang ingin diajukan.",
            });
            return;
        }

        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Ruangan yang dipilih akan diajukan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, ajukan!",
            cancelButtonText: "Tidak, batalkan!",
            reverseButtons: true,
            customClass: {
                confirmButton: "btn btn-success mr-2",
                cancelButton: "btn btn-danger ml-2",
                actions: "gap-2",
            },
            buttonsStyling: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                Inertia.post(
                   "/bagian-akademik/atur-ruang/ajukan-multiple",
                    { room_ids: selectedRooms },
                    {
                        onSuccess: () => {
                            setLoading(false);
                            Swal.fire({
                                title: "Diajukan!",
                                text: "Ruangan yang dipilih berhasil untuk diajukan.",
                                icon: "success",
                                customClass: {
                                    confirmButton: "btn btn-success",
                                    cancelButton: "btn btn-danger",
                                },
                                buttonsStyling: false,
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
                        },
                        onError: () => {
                            setLoading(false);
                            Swal.fire({
                                title: "Gagal!",
                                text: "Terjadi kesalahan saat mengajukan ruangan.",
                                icon: "error",
                                customClass: {
                                    confirmButton: "btn btn-success",
                                    cancelButton: "btn btn-danger",
                                },
                                buttonsStyling: false,
                            });
                        },
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Dibatalkan",
                    text: "Pengajuan ruangan dibatalkan",
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-success",
                        cancelButton: "btn btn-danger",
                    },
                    buttonsStyling: false,
                });
            }
        });
    };

    const handleAjukan = (item) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            html: `Untuk mengajukan:<br>
                  <b>Ruang:</b> ${item.nama_ruang}<br>
                  <b>Prodi:</b> ${item.nama_prodi}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, ajukan!",
            cancelButtonText: "Tidak, batalkan!",
            reverseButtons: true,
            customClass: {
                confirmButton: "btn btn-success mr-2",
                cancelButton: "btn btn-danger ml-2",
                actions: "gap-2",
            },
            buttonsStyling: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.visit(
                    `/bagian-akademik/atur-ruang/ajukan/${item.id_ruang}`,
                    {
                        method: "post",
                        onSuccess: () => {
                            console.log("OKE");
                            Swal.fire({
                                title: "Diajukan!",
                                text: "Ruangan telah berhasil diajukan",
                                icon: "success",
                                customClass: {
                                    confirmButton: "btn btn-success",
                                    cancelButton: "btn btn-danger",
                                },
                            });
                            setData(
                                data.map((item) =>
                                    item.id_ruang === id_ruang
                                        ? { ...item, diajukan: 1 }
                                        : item
                                )
                            );
                        },
                        onError: () => {
                            Swal.fire({
                                title: "Gagal!",
                                text: "Terjadi kesalahan saat mengajukan ruangan.",
                                icon: "error",
                                customClass: {
                                    confirmButton: "btn btn-success",
                                    cancelButton: "btn btn-danger",
                                },
                            });
                        },
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Dibatalkan",
                    text: "Pengajuan ruangan dibatalkan",
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-success",
                        cancelButton: "btn btn-danger",
                    },
                });
            }
        });
    };

    const handleBatalkan = (id_ruang) => {
        setLoading(true);

        Inertia.post(
            `/bagian-akademik/atur-ruang/batalkan/${id_ruang}`,
            {},
            {
                onSuccess: () => {
                    setLoading(false);
                    Swal.fire({
                        icon: "success",
                        title: "Pembatalan Berhasil",
                        text: "Pengajuan ruangan berhasil dibatalkan",
                    });

                    setData((prevData) =>
                        prevData.map((item) =>
                            item.id_ruang === id_ruang
                                ? { ...item, diajukan: 0 }
                                : item
                        )
                    );
                },
                onError: () => {
                    setLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Pembatalan Gagal",
                        text: "Terjadi kesalahan saat membatalkan pengajuan ruangan",
                    });
                },
            }
        );
    };

    useEffect(() => {
        setData(ruangan);
        setBagian_akademik(bagian_akademikData);
    }, [ruangan, bagian_akademikData]);

    return (
        <BagianAkademikLayout bagian_akademik={bagian_akademik}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Kelola Ruangan
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
                                            name="id_prodi"
                                            value={selectedProdi}
                                            onChange={(e) =>
                                                setSelectedProdi(e.target.value)
                                            }
                                            className="px-2 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
                                        >
                                            <option value="">
                                                Semua Program Studi
                                            </option>
                                            {programStudiList.map(
                                                (item, index) => (
                                                    <option
                                                        key={index}
                                                        value={item.id_prodi}
                                                    >
                                                        {item.nama_prodi}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div className="mt-2">
                                        <span className="mr-[4.5rem]">
                                            Status
                                        </span>
                                        {/* Status Filter */}
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
                                <div className="flex justify-start items-center mt-4 gap-72">
                                    <button
                                        onClick={handleAjukanSelected}
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
                                        Ajukan Semua
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
                                                        width: "5%",
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
                                                        width: "25%",
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
                                                        width: "25%",
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
                                                                item.diajukan ===
                                                                    1 ||
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
                                                    </td>
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
                                                                (window.location.href = `/bagian-akademik/atur-ruang/edit/${item.id_ruang}`)
                                                            }
                                                            disabled={
                                                                item.diajukan ===
                                                                    1 || loading
                                                            }
                                                            className={`${
                                                                item.diajukan ===
                                                                1
                                                                    ? "bg-gray-400"
                                                                    : "bg-blue-500 hover:bg-blue-600"
                                                            } text-white px-2 py-1 mr-2 rounded text-[14px] text-center w-20`}
                                                        >
                                                            Edit
                                                        </button>
                                                        {item.disetujui ===
                                                        1 ? (
                                                            <button
                                                                disabled={true}
                                                                className="bg-gray-400 text-white px-2 py-1 rounded text-[14px] text-center w-20"
                                                            >
                                                                Batalkan
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    item.diajukan ===
                                                                    1
                                                                        ? handleBatalkan(
                                                                              item.id_ruang
                                                                          )
                                                                        : handleAjukan(
                                                                              item
                                                                          )
                                                                }
                                                                disabled={
                                                                    loading
                                                                }
                                                                className={`${
                                                                    item.diajukan ===
                                                                    1
                                                                        ? "bg-red-500 hover:bg-red-600"
                                                                        : "bg-green-500 hover:bg-green-600"
                                                                } text-white px-2 py-1 rounded text-[14px] text-center w-20`}
                                                            >
                                                                {item.diajukan ===
                                                                1
                                                                    ? "Batalkan"
                                                                    : "Ajukan"}
                                                            </button>
                                                        )}
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
        </BagianAkademikLayout>
    );
};

export default KelolaRuangan;
