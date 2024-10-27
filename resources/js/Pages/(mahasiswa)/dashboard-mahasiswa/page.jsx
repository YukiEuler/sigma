import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";

const DashboardMahasiswa = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <main
                className="flex-1 px-5 pb-5 pt-4"
                style={{ minHeight: `calc(100vh - 6.5rem)`, overflow: "auto" }}
            >
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Dashboard
                    </h1>
                </div>

                <div className="flex-1 p-8">
                    <div className="flex space-x-4 mb-4">
                        <button className="border p-2 rounded bg-blue-500 text-white">Registrasi Akademik</button>
                        <button className="border p-2 rounded bg-blue-500 text-white">Biaya Akademik</button>
                    </div>

                    <div className="p-6 bg-blue-100 rounded shadow-md w-full max-w-md mx-auto">
                        <div className="text-center mb-4">
                            <p className="font-semibold">Pembimbing Akademik : </p>
                            <p>{mahasiswa.nama_dosen}</p>
                            <p className="text-sm">(NIP : {mahasiswa.nip_dosen_wali})</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p>Status : <span className="font-semibold">{mahasiswa.status}</span></p>
                                <p>Semester : {mahasiswa.semester}</p>
                                <p>Tahun Ajaran : {mahasiswa.tahun_ajaran}</p>
                            </div>
                            <div>
                                <p>IPK : <span className="font-bold">{mahasiswa.ipk}</span></p>
                                <p>SKS : <span className="font-bold">{mahasiswa.sks_kumulatif}</span></p>
                            </div>

                        </div>
                    </div>
                </div>
                

            </main>
        </MahasiswaLayout>
    );
};

export default DashboardMahasiswa;
