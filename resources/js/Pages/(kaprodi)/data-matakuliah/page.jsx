import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import KaprodiLayout from "@/Layouts/KaprodiLayout";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

const DataMataKuliah = ({ mataKuliah }) => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMataKuliah, setFilteredMataKuliah] = useState([]);
    const [newMataKuliah, setNewMataKuliah] = useState({
        kode: "",
        nama: "",
        sks: "",
        semester: "",
        jenis: "Wajib",
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi form
        if (
            !newMataKuliah.kode ||
            !newMataKuliah.nama ||
            !newMataKuliah.sks ||
            !newMataKuliah.semester
        ) {
            Swal.fire({
                title: "Error!",
                text: "Semua field harus diisi!",
                icon: "error",
                customClass: {
                    confirmButton: "btn btn-danger",
                },
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi Penambahan",
            html: `Apakah Anda yakin ingin menambahkan mata kuliah berikut?<br><br>
                  <b>Kode MK:</b> ${newMataKuliah.kode}<br>
                  <b>Nama:</b> ${newMataKuliah.nama}<br>
                  <b>SKS:</b> ${newMataKuliah.sks}<br>
                  <b>Semester:</b> ${newMataKuliah.semester}<br>
                  <b>Jenis:</b> ${newMataKuliah.jenis}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, tambahkan!",
            cancelButtonText: "Batal",
            reverseButtons: true,
            customClass: {
                confirmButton: "btn btn-success mr-2",
                cancelButton: "btn btn-danger ml-2",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // Kirim data mata kuliah baru
                Inertia.post("/kaprodi/data-matakuliah/store", newMataKuliah, {
                    onSuccess: () => {
                        handleCloseModal();
                        setNewMataKuliah({
                            kode: "",
                            nama: "",
                            sks: "",
                            semester: "",
                            jenis: "Wajib",
                        });

                        Swal.fire({
                            title: "Berhasil!",
                            text: "Mata kuliah berhasil ditambahkan",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                        }).then(() => {
                            // Refresh halaman setelah alert ditutup
                            window.location.reload();
                        });
                    },
                    onError: (errors) => {
                        // Check jika error adalah kode MK yang sama
                        if (errors.message) {
                            let errorMessage = "";

                            // Handle kasus di mana ada duplikasi kode dan/atau nama
                            if (errors.duplicate) {
                                if (
                                    errors.duplicate.kode &&
                                    errors.duplicate.nama
                                ) {
                                    errorMessage =
                                        "Kode dan nama mata kuliah sudah digunakan!";
                                } else if (errors.duplicate.kode) {
                                    errorMessage =
                                        "Kode mata kuliah sudah digunakan!";
                                } else if (errors.duplicate.nama) {
                                    errorMessage =
                                        "Nama mata kuliah sudah digunakan!";
                                }
                            } else {
                                // Handle error lainnya
                                errorMessage = Object.values(errors.message)[0];
                            }

                            Swal.fire({
                                title: "Gagal!",
                                text: errorMessage,
                                icon: "error",
                                customClass: {
                                    confirmButton: "btn btn-danger",
                                },
                            });
                        }
                    },
                });
            }
        });
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            html: `Untuk menghapus mata kuliah:<br>
                   <b>Kode:</b> ${item.kode_mk}<br>
                   <b>Nama:</b> ${item.nama}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
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
                // Menggunakan Inertia.post dengan parameter yang benar
                Inertia.post(
                    `/kaprodi/data-matakuliah/delete/${item.kode_mk}`,
                    {},
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Terhapus!",
                                text: "Mata kuliah berhasil dihapus",
                                icon: "success",
                                customClass: {
                                    confirmButton: "btn btn-success",
                                },
                            }).then(() => {
                                // Refresh halaman setelah alert ditutup
                                window.location.reload();
                            });
                        },
                        onError: (errors) => {
                            Swal.fire({
                                title: "Gagal!",
                                text:
                                    errors.message ||
                                    "Terjadi kesalahan saat menghapus mata kuliah.",
                                icon: "error",
                                customClass: {
                                    confirmButton: "btn btn-danger",
                                },
                            });
                        },
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Dibatalkan",
                    text: "Penghapusan mata kuliah dibatalkan",
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-success",
                    },
                });
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMataKuliah((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        // Menerapkan filter berdasarkan pencarian dan semester
        const filtered = mataKuliah.filter((mk) => {
            const matchesSearch =
                mk.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                mk.kode_mk.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSemester =
                selectedSemester === "" || // Jika tidak ada semester yang dipilih, tampilkan semua
                mk.semester.toString() === selectedSemester;

            return matchesSearch && matchesSemester;
        });

        setFilteredMataKuliah(filtered);
    }, [dosen, searchTerm, selectedSemester, mataKuliah]);

    return (
        <KaprodiLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Data Mata Kuliah
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 pb-4 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <div className="mt-4">
                                    {/* Program Studi Filter */}
                                    <span className="mr-[1rem]">Semester</span>
                                    <select
                                        value={selectedSemester}
                                        onChange={(e) =>
                                            setSelectedSemester(e.target.value)
                                        }
                                        className="px-2 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
                                    >
                                        <option value="">Semua Semester</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                            <option
                                                key={num}
                                                value={num.toString()}
                                            >
                                                Semester {num}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-between items-center mt-4 mb-2">
                                    <button
                                        onClick={handleOpenModal}
                                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                    >
                                        Tambah Mata Kuliah
                                    </button>
                                    <div className="flex justify-center items-center w-64">
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
                                                name="search"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                placeholder="Cari Mata Kuliah..."
                                                className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative overflow-x-auto mt-1 rounded-lg overflow-auto h-[420px] scrollbar-hide">
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
                                                        width: "3%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
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
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    KODE MATA KULIAH
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "20%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    NAMA MATA KULIAH
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    SKS
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    SEMESTER
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "17%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    JENIS
                                                </th>
                                                {/* <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Action
                                                </th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredMataKuliah.map(
                                                (mk, index) => (
                                                    <tr
                                                        key={mk.id}
                                                        className="bg-gray-100 border-b"
                                                    >
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {mk.kode_mk}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px]">
                                                            {mk.nama}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {mk.sks}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {mk.semester}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {mk.jenis}
                                                        </td>
                                                        {/* <td className="flex items-center justify-center py-3">
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        mk
                                                                    )
                                                                }
                                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-[14px]"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td> */}
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

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-lg font-semibold mb-4">
                                Tambah Mata Kuliah Baru
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm">
                                        Kode Mata Kuliah
                                    </label>
                                    <input
                                        type="text"
                                        name="kode"
                                        value={newMataKuliah.kode}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm">
                                        Nama Mata Kuliah
                                    </label>
                                    <input
                                        type="text"
                                        name="nama"
                                        value={newMataKuliah.nama}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm">SKS</label>
                                    <input
                                        type="number"
                                        name="sks"
                                        min="1"
                                        value={newMataKuliah.sks}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm">
                                        Semester
                                    </label>
                                    <select
                                        name="semester"
                                        value={newMataKuliah.semester}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">Pilih Semester</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                            <option key={num} value={num}>
                                                Semester {num}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm">
                                        Jenis
                                    </label>
                                    <select
                                        name="jenis"
                                        value={newMataKuliah.jenis}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="Wajib">Wajib</option>
                                        <option value="Pilihan">Pilihan</option>
                                    </select>
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </KaprodiLayout>
    );
};

export default DataMataKuliah;
