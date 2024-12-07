import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Icon } from "@iconify/react";
import { FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";
import BagianAkademikLayout from "../../../Layouts/BagianAkademikLayout";

const KelolaRuangan = ({ programStudiList }) => {
    const [data, setData] = useState([]);
    const { props } = usePage();
    const ruanganData = props.ruangan;
    const bagian_akademikData = props.bagian_akademik;
    const [bagian_akademik, setBagian_akademik] = useState(bagian_akademikData);
    const [ruangan, setRuangan] = useState(ruanganData);
    const [loading, setLoading] = useState(false);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProdi, setSelectedProdi] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [showEditRoomModal, setShowEditRoomModal] = useState(false);
    const [allApproved, setAllApproved] = useState(false);
    const [newRoom, setNewRoom] = useState({
        id_ruang: "",
        nama_ruang: "",
        kuota: "",
        id_prodi: "",
    });
    const [editRoom, setEditRoom] = useState({
        nama_ruang: ruangan.nama_ruang,
        kuota: ruangan.kuota,
        status: ruangan.status,
        nama_fakultas: ruangan.nama_fakultas,
        id_prodi: "",
    });

    const statusOptions = [
        { value: "", label: "Semua Status" },
        { value: "belum_diajukan", label: "Not Submitted" },
        { value: "belum_disetujui", label: "Not Approved" },
        { value: "sudah_disetujui", label: "Approved" },
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

    const totalRooms = filteredData.length;

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
            text: `${selectedRooms.length} ruangan yang dipilih akan diajukan!`,
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
                            }).then(() => {
                                // Refresh halaman setelah Sweet Alert ditutup
                                window.location.reload();
                            });
                            setData((prevData) =>
                                prevData.map((item) =>
                                    selectedRooms.includes(item.id_ruang)
                                        ? { ...item, diajukan: 1 }
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
                axios
                    .post(`/bagian-akademik/atur-ruang/ajukan/${item.id_ruang}`)
                    .then((response) => {
                        if (response.data.success) {
                            Swal.fire({
                                title: "Diajukan!",
                                text: response.data.message,
                                icon: "success",
                                customClass: {
                                    confirmButton: "btn btn-success",
                                },
                            }).then(() => {
                                window.location.reload(); // Reload halaman untuk memperbarui data
                            });
                        }
                    })
                    .catch((error) => {
                        const errorMessage =
                            error.response?.data?.error ||
                            "Terjadi kesalahan saat mengajukan ruangan.";
                        Swal.fire({
                            title: "Gagal!",
                            text: errorMessage,
                            icon: "error",
                            customClass: {
                                confirmButton: "btn btn-danger",
                            },
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Dibatalkan",
                    text: "Pengajuan ruangan dibatalkan",
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-danger",
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

    const handleAddRoom = () => {
        if (!newRoom.nama_ruang || !newRoom.kuota || !newRoom.id_prodi) {
            Swal.fire({
                title: "Error!",
                text: "Semua field harus diisi",
                icon: "error",
                customClass: {
                    confirmButton: "btn btn-danger",
                },
            });
            return;
        }
    
        // Check if all rooms for selected program study are approved
        const prodiRooms = data.filter(room => room.id_prodi === newRoom.id_prodi);
        const allApproved = prodiRooms.length > 0 && prodiRooms.every(room => room.disetujui === 1);
    
        if (allApproved) {
            Swal.fire({
                title: "Tidak dapat menambahkan ruangan!",
                text: "Semua ruangan untuk program studi ini telah disetujui, Tidak dapat menambahkan ruangan baru.",
                icon: "warning",
                customClass: {
                    confirmButton: "btn btn-warning",
                },
            });
            return;
        }
    
        Swal.fire({
            title: "Tambah Ruang Baru",
            html: `Apakah Anda yakin ingin menambahkan ruang berikut?<br><br>
                <b>Nama Ruang:</b> ${newRoom.nama_ruang}<br>
                <b>Kuota:</b> ${newRoom.kuota}<br>
                <b>Program Studi:</b> ${
                    programStudiList.find(
                        (p) => p.id_prodi === newRoom.id_prodi
                    )?.nama_prodi
                }`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Tambahkan",
            cancelButtonText: "Batal",
            reverseButtons: true,
            customClass: {
                confirmButton: "btn btn-success mr-2",
                cancelButton: "btn btn-danger ml-2",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/bagian-akademik/atur-ruang/tambah-ruang", newRoom)
                    .then((response) => {
                        setShowAddRoomModal(false);
                        setNewRoom({
                            id_ruang: "",
                            nama_ruang: "",
                            kuota: "",
                            id_prodi: "",
                        });
                        Swal.fire({
                            title: "Berhasil!",
                            text: "Ruang berhasil ditambahkan",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                        }).then(() => {
                            window.location.reload();
                        });
                    })
                    .catch((error) => {
                        const errorMessage =
                            error.response?.data?.error || "Terjadi kesalahan";
                        Swal.fire({
                            title: "Gagal!",
                            text: errorMessage,
                            icon: "error",
                            customClass: {
                                confirmButton: "btn btn-danger",
                            },
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Dibatalkan",
                    text: "Penambahan ruangan dibatalkan",
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

    const handleEditRoom = () => {
        if (!editRoom.nama_ruang || !editRoom.kuota || !editRoom.id_prodi) {
            Swal.fire({
                title: "Error!",
                text: "Semua field harus diisi",
                icon: "error",
                customClass: {
                    confirmButton: "btn btn-danger",
                },
            });
            return;
        }
    
        // Check if the program study is being changed
        const isProdiChanged = editRoom.id_prodi !== ruangan.id_prodi;
    
        if (isProdiChanged) {
            // Check if all rooms for the new selected program study are approved
            const prodiRooms = data.filter(room => room.id_prodi === editRoom.id_prodi);
            const allApproved = prodiRooms.length > 0 && prodiRooms.every(room => room.disetujui === 1);
    
            if (allApproved) {
                Swal.fire({
                    title: "Tidak dapat mengubah program studi!",
                    text: "Tidak dapat memindahkan ruangan ke program studi ini karena semua ruangan pada program studi tersebut telah disetujui.",
                    icon: "warning",
                    customClass: {
                        confirmButton: "btn btn-warning",
                    },
                });
                return;
            }
        }
    
        Swal.fire({
            title: "Edit Ruang",
            html: `Apakah Anda yakin ingin mengubah ruang berikut?<br><br>
                <b>Nama Ruang:</b> ${editRoom.nama_ruang}<br>
                <b>Kuota:</b> ${editRoom.kuota}<br>
                <b>Program Studi:</b> ${
                    programStudiList.find(
                        (p) => p.id_prodi === editRoom.id_prodi
                    )?.nama_prodi
                }`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Ubah",
            cancelButtonText: "Batal",
            reverseButtons: true,
            customClass: {
                confirmButton: "btn btn-success mr-2",
                cancelButton: "btn btn-danger ml-2",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/bagian-akademik/atur-ruang/update", {
                        id_ruang: editRoom.id_ruang,
                        id_prodi: editRoom.id_prodi,
                        nama_ruang: editRoom.nama_ruang,
                        kuota: editRoom.kuota,
                    })
                    .then((response) => {
                        setShowEditRoomModal(false);
                        setEditRoom({
                            nama_ruang: ruangan.nama_ruang,
                            kuota: ruangan.kuota,
                            status: ruangan.status,
                            nama_fakultas: ruangan.nama_fakultas,
                            id_prodi: "",
                        });
                        Swal.fire({
                            title: "Berhasil!",
                            text: "Ruang berhasil diubah",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                        }).then(() => {
                            window.location.reload();
                        });
                    })
                    .catch((error) => {
                        const errorMessage =
                            error.response?.data?.error || "Terjadi kesalahan";
                        Swal.fire({
                            title: "Gagal!",
                            text: errorMessage,
                            icon: "error",
                            customClass: {
                                confirmButton: "btn btn-danger",
                            },
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Dibatalkan",
                    text: "Perubahan ruangan dibatalkan",
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

    const handleOpenAddRoomModal = () => {
        setShowAddRoomModal(true);
    };

    const handleOpenEditRoomModal = (room) => {
        setEditRoom(room);
        setShowEditRoomModal(true);
    };

    useEffect(() => {
        // Set axios headers ketika komponen dimount
        axios.defaults.headers.common["X-CSRF-TOKEN"] = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
    }, []);

    useEffect(() => {
        setData(ruangan);
        setBagian_akademik(bagian_akademikData);

        const allApproved = ruangan.every((ruangan) => ruangan.diajukan === 1);
        setAllApproved(allApproved);
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
                                    <div className="mt-2 mb-2">
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
                                <div>
                                    <button
                                        onClick={handleOpenAddRoomModal}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-[14px] w-40 flex items-center transition-colors"
                                    >
                                        <FaPlus
                                            className="mx-auto text-white"
                                            style={{
                                                fontSize: "20px",
                                            }}
                                        />
                                        Tambah Ruang
                                    </button>
                                </div>
                                <div className="flex justify-between items-center">
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
                                    <div className="pt-3 pr-3">
                                        <span className="font-semibold">
                                            Total Ruang: {totalRooms}
                                        </span>
                                    </div>
                                </div>
                                <div className="relative overflow-x-auto mt-2 rounded-lg overflow-auto h-[345px] scrollbar-hide">
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
                                                            disabled={
                                                                allApproved
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
                                                        width: "20%",
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
                                                        width: "5%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Kuota
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
                                                        {item.kuota}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {item.diajukan === 0 &&
                                                        item.disetujui === 0
                                                            ? "Not Submitted"
                                                            : item.diajukan ===
                                                                  1 &&
                                                              item.disetujui ===
                                                                  0
                                                            ? "Submitted"
                                                            : "Approved"}
                                                    </td>
                                                    <td className="px-4 py-2 flex justify-center">
                                                        <button
                                                            // onClick={() =>
                                                            //     (window.location.href = `/bagian-akademik/atur-ruang/edit/${item.id_ruang}`)
                                                            // }
                                                            onClick={() =>
                                                                handleOpenEditRoomModal(
                                                                    item
                                                                )
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
                {showAddRoomModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-xl font-semibold mb-4">
                                Tambah Ruang Baru
                            </h2>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nama Ruang
                                </label>
                                <input
                                    type="text"
                                    value={newRoom.nama_ruang}
                                    onChange={(e) =>
                                        setNewRoom({
                                            ...newRoom,
                                            nama_ruang: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                    placeholder="Masukkan nama ruang"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Kuota
                                </label>
                                <input
                                    type="number"
                                    value={newRoom.kuota}
                                    onChange={(e) =>
                                        setNewRoom({
                                            ...newRoom,
                                            kuota: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                    placeholder="Masukkan kuota ruang"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Program Studi
                                </label>
                                <select
                                    value={newRoom.id_prodi}
                                    onChange={(e) =>
                                        setNewRoom({
                                            ...newRoom,
                                            id_prodi: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                >
                                    <option value="">
                                        Pilih Program Studi
                                    </option>
                                    {programStudiList.map((prodi) => (
                                        <option
                                            key={prodi.id_prodi}
                                            value={prodi.id_prodi}
                                        >
                                            {prodi.nama_prodi}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowAddRoomModal(false)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleAddRoom}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                >
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showEditRoomModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-xl font-semibold mb-4">
                                Edit Ruang {editRoom.nama_ruang}
                            </h2>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nama Ruang
                                </label>
                                <input
                                    type="text"
                                    value={editRoom.nama_ruang}
                                    onChange={(e) =>
                                        setEditRoom({
                                            ...editRoom,
                                            nama_ruang: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                    placeholder="Masukkan nama ruang"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Kuota
                                </label>
                                <input
                                    type="number"
                                    value={editRoom.kuota}
                                    onChange={(e) =>
                                        setEditRoom({
                                            ...editRoom,
                                            kuota: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                    placeholder="Masukkan kuota ruang"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Program Studi
                                </label>
                                <select
                                    value={editRoom.id_prodi}
                                    onChange={(e) =>
                                        setEditRoom({
                                            ...editRoom,
                                            id_prodi: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                >
                                    <option value="">
                                        Pilih Program Studi
                                    </option>
                                    {programStudiList.map((prodi) => (
                                        <option
                                            key={prodi.id_prodi}
                                            value={prodi.id_prodi}
                                        >
                                            {prodi.nama_prodi}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowEditRoomModal(false)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleEditRoom}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </BagianAkademikLayout>
    );
};

export default KelolaRuangan;
