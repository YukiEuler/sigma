import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";
import { Icon } from "@iconify/react";

const RegistrasiMahasiswa = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
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
                                                status === "aktif"
                                                    ? "border-green-500 bg-green-100"
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
                                                    status === "aktif"
                                                        ? "bg-green-500 text-white"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                                onClick={() =>
                                                    handleStatusChange("aktif")
                                                }
                                                disabled={status === "cuti"}
                                            >
                                                {status === "aktif"
                                                    ? "Terpilih"
                                                    : "Pilih"}
                                            </button>
                                        </div>

                                        <div
                                            className={`p-4 border rounded-lg ${
                                                status === "cuti"
                                                    ? "border-blue-500 bg-blue-100"
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
                                                    status === "cuti"
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-blue-100 text-blue-700"
                                                }`}
                                                onClick={() =>
                                                    handleStatusChange("cuti")
                                                }
                                                disabled={status === "aktif"}
                                            >
                                                {status === "cuti"
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
                                                status === "aktif"
                                                    ? "text-green-500"
                                                    : "text-blue-500"
                                            }`}
                                        >
                                            {status
                                                ? status.toUpperCase()
                                                : "BELUM DIPILIH"}
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
