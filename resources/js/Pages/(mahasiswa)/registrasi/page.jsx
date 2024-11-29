import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

const RegistrasiMahasiswa = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    const handleAktifConfirmation = () => {
        if (mahasiswa.status !== "Belum Aktif") return;

        Swal.fire({
            title: "Konfirmasi Status Aktif",
            text: "Apakah Anda yakin ingin memilih status AKTIF untuk semester ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Pilih Aktif",
            cancelButtonText: "Batal",
            reverseButtons: true,
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(
                    "/mahasiswa/registrasi/ubah-status",
                    {
                        status: "Aktif",
                    },
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Berhasil!",
                                text: "Status AKTIF telah dipilih",
                                icon: "success",
                                customClass: {
                                    confirmButton: "btn btn-success",
                                },
                                buttonsStyling: true,
                            }).then(() => {
                                window.location.reload();
                            });
                        },
                        onError: (errors) => {
                            Swal.fire({
                                title: "Gagal!",
                                text:
                                    errors.message ||
                                    "Terjadi kesalahan saat mengupdate status",
                                icon: "error",
                                customClass: {
                                    confirmButton: "btn btn-danger",
                                },
                                buttonsStyling: true,
                            });
                        },
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Dibatalkan",
                    text: "Pemilihan status AKTIF dibatalkan",
                    icon: "info",
                    customClass: {
                        cancelButton: "btn btn-danger",
                    },
                    buttonsStyling: true,
                });
            }
        });
    };

    const handleCutiConfirmation = () => {
        if (mahasiswa.status !== "Belum Aktif") return; // Prevent clicking if already on leave

        Swal.fire({
            title: "Konfirmasi Status Cuti",
            text: "Apakah Anda yakin ingin mengambil CUTI untuk semester ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Pilih Cuti",
            cancelButtonText: "Batal",
            reverseButtons: true,
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(
                    "/mahasiswa/registrasi/ubah-status",
                    {
                        status: "Cuti",
                    },
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Berhasil!",
                                text: "Status CUTI telah dipilih",
                                icon: "success",
                                customClass: {
                                    confirmButton: "btn btn-success",
                                },
                                buttonsStyling: true,
                            }).then(() => {
                                window.location.reload();
                            });
                        },
                        onError: (errors) => {
                            Swal.fire({
                                title: "Gagal!",
                                text:
                                    errors.message ||
                                    "Terjadi kesalahan saat mengupdate status",
                                icon: "error",
                                customClass: {
                                    confirmButton: "btn btn-danger",
                                },
                                buttonsStyling: true,
                            });
                        },
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Dibatalkan",
                    text: "Pemilihan status CUTI dibatalkan",
                    icon: "info",
                    customClass: {
                        cancelButton: "btn btn-danger",
                    },
                    buttonsStyling: true,
                });
            }
        });
    };

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Registrasi
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 border rounded-lg shadow-lg bg-white pb-3">
                            <div className="flex justify-center items-center mt-3 mb-3">
                                <div>
                                    <div className="text-center">
                                        <h1 className="text-2xl font-semibold mb-2">
                                            Pilih Status Akademik
                                        </h1>
                                        <p className="text-gray-600 mb-6">
                                            Silakan pilih salah satu status
                                            akademik berikut untuk semester ini:
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div
                                            className={`p-4 border rounded-lg ${
                                                mahasiswa.status === "Aktif"
                                                    ? "border-green-500 bg-green-100"
                                                    : mahasiswa.status ===
                                                          "Lulus" ||
                                                      mahasiswa.status ===
                                                          "DO" ||
                                                      mahasiswa.status ===
                                                          "Cuti"
                                                    ? "border-gray-300 bg-gray-100"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            <h2 className="text-lg font-semibold">
                                                Aktif
                                            </h2>
                                            <p className="text-gray-700">
                                                Anda akan mengikuti kegiatan
                                                perkuliahan pada semester ini
                                                serta mengisi Isian Rencana
                                                Studi (IRS).
                                            </p>
                                            <button
                                                className={`mt-2 px-4 py-2 rounded-lg ${
                                                    mahasiswa.status === "Aktif"
                                                        ? "bg-green-500 text-white"
                                                        : mahasiswa.status ===
                                                          "Belum Aktif"
                                                        ? "bg-green-500 hover:bg-green-600 text-white"
                                                        : "bg-gray-300 text-gray-700"
                                                }`}
                                                onClick={
                                                    handleAktifConfirmation
                                                }
                                                disabled={
                                                    mahasiswa.status ===
                                                        "Cuti" ||
                                                    mahasiswa.status ===
                                                        "Lulus" ||
                                                    mahasiswa.status === "DO" ||
                                                    mahasiswa.status === "Aktif"
                                                }
                                            >
                                                {mahasiswa.status === "Aktif"
                                                    ? "Terpilih"
                                                    : "Pilih"}
                                            </button>
                                        </div>

                                        <div
                                            className={`p-4 border rounded-lg ${
                                                mahasiswa.status === "Cuti"
                                                    ? "border-red-500 bg-red-100"
                                                    : mahasiswa.status ===
                                                          "Lulus" ||
                                                      mahasiswa.status ===
                                                          "DO" ||
                                                      mahasiswa.status ===
                                                          "Aktif"
                                                    ? "border-gray-300 bg-gray-100"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            <h2 className="text-lg font-semibold">
                                                Cuti
                                            </h2>
                                            <p className="text-gray-700">
                                                Menghentikan kuliah sementara
                                                untuk semester ini tanpa
                                                kehilangan status sebagai
                                                mahasiswa.
                                            </p>
                                            <button
                                                className={`mt-2 px-4 py-2 rounded-lg ${
                                                    mahasiswa.status === "Cuti"
                                                        ? "bg-red-500 text-white"
                                                        : mahasiswa.status ===
                                                          "Belum Aktif"
                                                        ? "bg-red-500 hover:bg-red-600 text-white"
                                                        : "bg-gray-300 text-gray-700"
                                                }`}
                                                onClick={handleCutiConfirmation}
                                                disabled={
                                                    mahasiswa.status ===
                                                        "Aktif" ||
                                                    mahasiswa.status ===
                                                        "Lulus" ||
                                                    mahasiswa.status === "DO" ||
                                                    mahasiswa.status === "Cuti"
                                                }
                                            >
                                                {mahasiswa.status === "Cuti"
                                                    ? "Terpilih"
                                                    : "Pilih"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 mt-4">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 border rounded-lg shadow-lg bg-white pb-3">
                            <div className="flex justify-center items-center mt-3 mb-3">
                                <div className="p-2">
                                    <h2 className="font-semibold mb-2">
                                        Her-Registrasi
                                    </h2>
                                    <p>
                                        Status akademik Anda:{" "}
                                        <span
                                            className={`font-semibold ${
                                                mahasiswa.status === "Aktif"
                                                    ? "text-green-500"
                                                    : mahasiswa.status ===
                                                      "Cuti"
                                                    ? "text-red-500"
                                                    : "text-blue-500"
                                            }`}
                                        >
                                            {mahasiswa.status === "Belum Aktif"
                                                ? "BELUM HER-REGISTRASI"
                                                : mahasiswa.status}
                                        </span>
                                    </p>
                                    <p className="text-gray-700 mt-2">
                                        Informasi lebih lanjut mengenai
                                        her-registrasi, atau mekanisme serta
                                        pengajuan penangguhan pembayaran dapat
                                        ditanyakan melalui Biro Administrasi
                                        Akademik (BAA) atau program studi
                                        masing-masing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </MahasiswaLayout>
    );
};

export default RegistrasiMahasiswa;
