import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";
import { Icon } from "@iconify/react"

const BiayaMahasiswa = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [riwayatTagihan, setRiwayatTagihan] = useState([
        { semester: '2022-1', ukt: 'I', tagihan: 'Rp. 500.000', pembayaran: 'Rp. 500.000', tanggalBayar: '2022-04-10 12:00:00', keterangan: 'Pembayaran via BRI' },
        { semester: '2022-2', ukt: 'I', tagihan: 'Rp. 500.000', pembayaran: 'Rp. 500.000', tanggalBayar: '2023-01-10 12:00:00', keterangan: 'Pembayaran via BRI' },
        { semester: '2023-1', ukt: 'I', tagihan: 'Rp. 500.000', pembayaran: 'Rp. 500.000', tanggalBayar: '2023-07-10 12:00:00', keterangan: 'Pembayaran via BRI' }
    ]);
    const [dateFetched, setDateFetched] = useState(new Date());

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    useEffect(() => {
        setDateFetched(new Date());
    }, []);

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Biaya Kuliah
                    </h1>
                </div>
                <div className="p-8">
                    <div className="mb-4">
                        <a href="/" className="text-blue-600">Kembali</a>
                    </div>
                    <div className="bg-white p-4 border rounded-lg mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">Status Billkey</h2>
                            <button className="text-blue-600" onClick={() => setDateFetched(new Date())}>Reload</button>
                        </div>
                        <div>
                            <p><strong>Billkey:</strong> {mahasiswa.nim}</p>
                            <p><strong>Nama:</strong> {mahasiswa.nama}</p>
                            <p><strong>Semester:</strong> {mahasiswa.semester}</p>
                            <p><strong>Nominal:</strong>Rp. 1.000.000</p>
                            <p><strong>Status:</strong> <span className="text-green-600 font-semibold">SUDAH DIBAYAR</span></p>
                        </div>
                    </div>

                    <div className="bg-white p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">Riwayat Tagihan</h2>
                            <button className="text-blue-600" onClick={() => setDateFetched(new Date())}>Reload</button>
                        </div>
                        <p className="text-gray-600 mb-4">Date fetched: {dateFetched.toLocaleString()}</p>
                        
                        <table className="w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                <th className="border p-2 text-left">Semester</th>
                                <th className="border p-2 text-left">UKT</th>
                                <th className="border p-2 text-left">Tagihan</th>
                                <th className="border p-2 text-left">Pembayaran</th>
                                <th className="border p-2 text-left">Tanggal Bayar</th>
                                <th className="border p-2 text-left">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riwayatTagihan.map((tagihan, index) => (
                                <tr key={index}>
                                    <td className="border p-2">{tagihan.semester}</td>
                                    <td className="border p-2">{tagihan.ukt}</td>
                                    <td className="border p-2">{tagihan.tagihan}</td>
                                    <td className="border p-2">{tagihan.pembayaran}</td>
                                    <td className="border p-2">{tagihan.tanggalBayar}</td>
                                    <td className="border p-2">{tagihan.keterangan}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </MahasiswaLayout>
    );
};

export default BiayaMahasiswa;
