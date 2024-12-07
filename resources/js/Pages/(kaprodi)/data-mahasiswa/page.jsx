import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import KaprodiLayout from "@/Layouts/KaprodiLayout";
import { Icon } from "@iconify/react";

const DataMahasiswa = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [filteredMahasiswa, setFilteredMahasiswa] = useState(mahasiswaData);

    const uniqueAngkatan = [
        ...new Set(mahasiswaData.map((item) => item.angkatan)),
    ].sort((a, b) => b - a);

    const uniqueDoswal = [
        ...new Set(mahasiswaData.map((item) => item.dosen.nama)),
    ].sort((a, b) => a.localeCompare(b));

    const [filters, setFilters] = useState({
        angkatan: "all",
        doswal: "all",
        statusIRS: "all",
        search: "",
    });

    const applyFilters = () => {
        let result = [...mahasiswaData];

        // Apply angkatan filter only if not "all"
        if (filters.angkatan && filters.angkatan !== "all") {
            result = result.filter(
                (item) => item.angkatan.toString() === filters.angkatan
            );
        }

        // Apply doswal filter only if not "all"
        if (filters.doswal && filters.doswal !== "all") {
            result = result.filter(
                (item) => item.dosen.nama === filters.doswal
            );
        }

        // Apply statusIRS filter only if not "all"
        // if (filters.statusIRS && filters.statusIRS !== "all") {
        //     result = result.filter(
        //         (item) => getRandomStatusIRS() === filters.statusIRS
        //     );
        // }

        // Apply search filter
        if (filters.search) {
            result = result.filter(
                (item) =>
                    item.nama
                        .toLowerCase()
                        .includes(filters.search.toLowerCase()) ||
                    item.nim
                        .toLowerCase()
                        .includes(filters.search.toLowerCase())
            );
        }

        setFilteredMahasiswa(result);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        applyFilters();
    }, [filters]);

    useEffect(() => {
        setDosen(dosenData);
        setMahasiswa(mahasiswaData);
        setFilteredMahasiswa(mahasiswaData);
    }, [dosenData, mahasiswaData]);

    return (
        <KaprodiLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Data Mahasiswa
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 pb-4 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <table className="w-full max-w-sm mt-6">
                                    <tr>
                                        <td className="text-sm font-medium text-gray-900">
                                            Angkatan
                                        </td>
                                        <td>
                                            <select
                                                id="angkatan"
                                                name="angkatan"
                                                value={filters.angkatan}
                                                onChange={handleFilterChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="all">
                                                    Semua Angkatan
                                                </option>
                                                {uniqueAngkatan.map(
                                                    (angkatan) => (
                                                        <option
                                                            key={angkatan}
                                                            value={angkatan.toString()}
                                                        >
                                                            {angkatan}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-sm font-medium text-gray-900">
                                            Status IRS
                                        </td>
                                        <td>
                                            <select
                                                id="statusIRS"
                                                name="statusIRS"
                                                // value={filters.statusIRS}
                                                // onChange={handleFilterChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="">
                                                    Semua Status IRS
                                                </option>
                                                <option value="Belum Mengisi">
                                                    Belum Mengisi
                                                </option>
                                                <option value="Belum Disetujui">
                                                    Belum Disetujui
                                                </option>
                                                <option value="Sudah Disetujui">
                                                    Sudah Disetujui
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-sm font-medium text-gray-900">
                                            Dosen Wali
                                        </td>
                                        <td>
                                            <select
                                                id="doswal"
                                                name="doswal"
                                                value={filters.doswal}
                                                onChange={handleFilterChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="">
                                                    Semua Dosen wali
                                                </option>
                                                {uniqueDoswal.map((doswal) => (
                                                    <option
                                                        key={doswal}
                                                        value={doswal.toString()}
                                                    >
                                                        {doswal}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                </table>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="mt-2">
                                        <span className="text-lg font-medium text-gray-900">
                                            Total: {filteredMahasiswa.length}
                                        </span>
                                    </div>
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
                                                value={filters.search}
                                                onChange={handleFilterChange}
                                                placeholder="Cari mahasiswa..."
                                                className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative overflow-x-auto mt-1 rounded-lg overflow-auto h-[340px] scrollbar-hide">
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
                                                    className="px-4 py-2"
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
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "15%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Nama
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    NIM
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "5%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Angkatan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "5%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    IP Lalu
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "3%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    SKS Diambil
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Status Mahasiswa
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Status IRS
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "15%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Doswal
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Detail
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredMahasiswa.map(
                                                (item, index) => (
                                                    <tr
                                                        key={index}
                                                        className="bg-gray-100 border-b"
                                                    >
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px]">
                                                            {item.nama}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px]">
                                                            {item.nim}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {item.angkatan}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {(parseFloat(item.ip_lalu) || 0).toFixed(2)}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {item.sks_kumulatif || 0}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {item.status}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {item.status}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {item.dosen.nama}
                                                        </td>
                                                        <td className="flex items-center justify-center py-3">
                                                            <a
                                                                href={`/kaprodi/data-mahasiswa/detail/${item.nim}`}
                                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-[14px]"
                                                            >
                                                                Detail
                                                            </a>
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
        </KaprodiLayout>
    );
};

export default DataMahasiswa;
