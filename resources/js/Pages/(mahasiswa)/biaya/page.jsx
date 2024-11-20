import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";
import { Icon } from "@iconify/react";

const BiayaMahasiswa = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [riwayatTagihan, setRiwayatTagihan] = useState([
        {
            semester: "2022-1",
            ukt: "I",
            tagihan: "Rp. 500.000",
            pembayaran: "Rp. 500.000",
            tanggalBayar: "2022-04-10 12:00:00",
            keterangan: "Pembayaran via BRI",
        },
        {
            semester: "2022-2",
            ukt: "I",
            tagihan: "Rp. 500.000",
            pembayaran: "Rp. 500.000",
            tanggalBayar: "2023-01-10 12:00:00",
            keterangan: "Pembayaran via BRI",
        },
        {
            semester: "2023-1",
            ukt: "I",
            tagihan: "Rp. 500.000",
            pembayaran: "Rp. 500.000",
            tanggalBayar: "2023-07-10 12:00:00",
            keterangan: "Pembayaran via BRI",
        },
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
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 border rounded-lg shadow-lg bg-white pb-3">
                            <div className="items-center mt-3 mb-2">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-semibold">
                                        Status Billkey
                                    </h2>
                                    <button
                                        className="text-blue-600"
                                        onClick={() =>
                                            setDateFetched(new Date())
                                        }
                                    >
                                        Reload
                                    </button>
                                </div>
                                <div className="flex">
                                    <span className="w-20 font-medium">
                                        <strong>Billkey</strong>
                                    </span>
                                    <span className="ml-2 font-medium">
                                        : {mahasiswa.nim}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="w-20 font-medium">
                                        <strong>Nama</strong>
                                    </span>
                                    <span className="ml-2 font-medium">
                                        : {mahasiswa.nama}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="w-20 font-medium">
                                        <strong>Semester</strong>
                                    </span>
                                    <span className="ml-2 font-medium">
                                        : {mahasiswa.semester}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="w-20 font-medium">
                                        <strong>Nominal</strong>
                                    </span>
                                    <span className="ml-2 font-medium">
                                        : Rp3.000.000
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="w-20 font-medium">
                                        <strong>Status</strong>
                                    </span>
                                    <span className="ml-2 font-medium">
                                        : Sudah Dibayar
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-3">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 border rounded-lg shadow-lg bg-white pb-3">
                            <div className="items-center mt-3 mb-3">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-semibold">
                                        Riwayat Tagihan
                                    </h2>
                                    <button
                                        className="text-blue-600"
                                        onClick={() =>
                                            setDateFetched(new Date())
                                        }
                                    >
                                        Reload
                                    </button>
                                </div>
                                <div className="relative overflow-x-auto mt-3 rounded-lg overflow-auto h-[240px] scrollbar-hide">
                                    <style jsx>{`
                                        .scrollbar-hide::-webkit-scrollbar {
                                            display: none;
                                        }
                                        .scrollbar-hide {
                                            -ms-overflow-style: none;
                                            scrollbar-width: none;
                                        }
                                    `}</style>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky-header">
                                        <thead className="text-xs text-white uppercase bg-blue-500 dark:text-gray-400 sticky top-0">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Semester
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    UKT
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Tagihan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Pembayaran
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{

                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Tanggal Bayar
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Keterangan
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {riwayatTagihan.map(
                                            (tagihan, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {tagihan.semester}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {tagihan.ukt}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {tagihan.tagihan}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {tagihan.pembayaran}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {tagihan.tanggalBayar}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {tagihan.keterangan}
                                                    </td>
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
            </main>
        </MahasiswaLayout>
    );
};

export default BiayaMahasiswa;
