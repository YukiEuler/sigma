import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";
import { Icon } from "@iconify/react"

const DashboardMahasiswa = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Dashboard
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 border rounded-lg shadow-lg bg-white pb-3">
                            <div className="flex justify-center items-center mt-3 mb-3">
                                <Icon
                                    icon="fluent:building-bank-20-filled"
                                    width="30"
                                    height="30"
                                />
                                <h2 className="text-xl font-semibold whitespace-nowrap text-center ml-2">
                                    Status Akademik
                                </h2>
                            </div>
                            <div className="border-b w-full mt-2"></div>
                            <div className="flex justify-center items-center mt-3 mb-1">
                                <Icon
                                    icon="mdi:person"
                                    width="20"
                                    height="20"
                                />
                                <span className="block text-lg text-gray-700">
                                    <strong>Dosen wali:</strong> {mahasiswa.nama_dosen}
                                </span>
                            </div>
                            <div className="flex justify-center items-center mb-3">
                                <span className="block text-lg text-gray-700">
                                    <strong>(NIP:</strong> {mahasiswa.nip_dosen_wali})
                                </span>
                            </div>
                            <div className="grid grid-cols-3 text-center mb-3">
                                <div className="border-r border-gray-300">
                                    <p className="text-gray-500 text-md">
                                        Semester Akademik Sekarang
                                    </p>
                                    <p className="font-semibold text-xl">
                                        {mahasiswa.tahun_ajaran}
                                    </p>
                                </div>
                                <div className="border-r border-gray-300">
                                    <p className="text-gray-500 text-md">
                                        Semester Studi
                                    </p>
                                    <p className="font-semibold text-xl">{mahasiswa.semester}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-md">
                                        Status Akademik
                                    </p>
                                    <span className="inline-block px-3 py-1 mt-1 text-sm font-semibold text-white bg-green-500 rounded-md">
                                        {mahasiswa.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 mt-4">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 border rounded-lg shadow-lg bg-white pb-3">
                            <div className="flex justify-center items-center mt-3 mb-3">
                                <Icon
                                    icon="stash:trophy-solid"
                                    width="30"
                                    height="30"
                                />
                                <h2 className="text-xl font-semibold whitespace-nowrap text-center ml-2">
                                    Prestasi Akademik
                                </h2>
                            </div>
                            <div className="border-b w-full mt-4"></div>
                            <div className="grid grid-cols-2 text-center mb-3 mt-3">
                                <div className="border-r border-gray-300">
                                    <p className="text-gray-500 text-lg">
                                        IPk
                                    </p>
                                    <p className="font-semibold text-xl">
                                        {mahasiswa.ipk}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-lg">
                                        SKSk
                                    </p>
                                    <p className="font-semibold text-xl">{mahasiswa.sks_kumulatif}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <button
                        onClick={() => Inertia.get('/mahasiswa/registrasi')}
                        className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none"
                    >
                        <Icon icon="mdi:account" width="40" height="40" className="text-blue-500" />
                        <h3 className="text-lg font-semibold text-blue-900 mt-2">Registrasi Akademik</h3>
                        <p className="text-green-600 mt-1">Sudah Registrasi</p>
                    </button>
                    <button
                        onClick={() => Inertia.get('/mahasiswa/biaya')}
                        className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none"
                    >
                        <Icon icon="mdi:cash-multiple" width="40" height="40" className="text-blue-500" />
                        <h3 className="text-lg font-semibold text-blue-900 mt-2">Biaya Akademik</h3>
                        <p className="text-gray-500 mt-1">Cek tagihan Anda</p>
                    </button>
                    <button
                        onClick={() => Inertia.get('/mahasiswa/akademik')}
                        className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none"
                    >
                        <Icon icon="mdi:book-open-page-variant" width="40" height="40" className="text-blue-500" />
                        <h3 className="text-lg font-semibold text-blue-900 mt-2">Akademik</h3>
                        <p className="text-gray-500 mt-1">TA 2024/2025 Ganjil</p>
                    </button>
                </div>


            </main>
        </MahasiswaLayout>
    );
};

export default DashboardMahasiswa;
