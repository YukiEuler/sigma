import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";
import { BiSearchAlt } from "react-icons/bi";

const RekapIRS = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [selectAll, setSelectAll] = useState(false);
    const [filteredMahasiswa, setFilteredMahasiswa] = useState(mahasiswaData);
    const [checkedItems, setCheckedItems] = useState(new Array(10).fill(false));
    const [activeTab, setActiveTab] = useState("Belum IRS");

    const jumlahMahasiswa = props.jumlahMahasiswa;

    const uniqueAngkatan = [
        ...new Set(mahasiswaData.map((item) => item.angkatan)),
    ].sort((a, b) => b - a); // Mengurutkan dari yang terbaru

    const uniqueProdi = [
        ...new Set(mahasiswaData.map((item) => item.nama_prodi)),
    ].sort((a, b) => a.localeCompare(b)); // Mengurutkan secara alfabetis

    const [filters, setFilters] = useState({
        angkatan: "all",
        prodi: "all",
        search: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        let result = [...mahasiswaData];

        // Apply angkatan filter only if not "all"
        if (filters.angkatan && filters.angkatan !== "all") {
            result = result.filter(
                (item) => item.angkatan.toString() === filters.angkatan
            );
        }

        // Apply prodi filter only if not "all"
        if (filters.prodi && filters.prodi !== "all") {
            result = result.filter((item) =>
                item.nama_prodi
                    .toLowerCase()
                    .includes(filters.prodi.toLowerCase())
            );
        }

        // Apply search filter
        if (filters.search) {
            result = result.filter(
                (item) =>
                    item.nama
                        .toLowerCase()
                        .includes(filters.search.toLowerCase()) ||
                    item.nim
                        .toLowerCase()
                        .includes(filters.search.toLowerCase()) ||
                    item.nama_prodi
                        .toLowerCase()
                        .includes(filters.search.toLowerCase())
            );
        }

        setFilteredMahasiswa(result);
        // Reset checked items when filters change
        setCheckedItems(new Array(result.length).fill(false));
        setSelectAll(false);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
        <DosenLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Rekap IRS
                    </h1>
                </div>
                <div className="flex w-full border-b mb-3 mt-2">
                    <button
                        onClick={() => handleTabClick("Belum IRS")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "Belum IRS"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Belum IRS
                    </button>
                    <button
                        onClick={() => handleTabClick("Belum Disetujui")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "Belum Disetujui"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Belum Disetujui
                    </button>
                    <button
                        onClick={() => handleTabClick("Sudah Disetujui")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "Sudah Disetujui"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Sudah Disetujui
                    </button>
                </div>
                <div className="grid grid-cols-1 mt-3">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 pb-4 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <div className="w-full mt-2"></div>
                                <table className="w-64">
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
                                            Prodi
                                        </td>
                                        <td>
                                            <select
                                                id="prodi"
                                                name="prodi"
                                                value={filters.prodi}
                                                onChange={handleFilterChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="all">
                                                    Semua Program Studi
                                                </option>
                                                {uniqueProdi.map((prodi) => (
                                                    <option
                                                        key={prodi}
                                                        value={prodi}
                                                    >
                                                        {prodi}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                </table>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="mt-3">
                                        <span className="text-lg font-medium text-gray-900">
                                            Total: {filteredMahasiswa.length}
                                        </span>
                                    </div>
                                    <div className="flex justify-center items-center w-64">
                                        <div className="relative w-full">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <BiSearchAlt
                                                    style={{
                                                        fontSize: "20px",
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

                                {activeTab === "Belum IRS" && (
                                    <div>
                                        Belum IRS
                                        <div className="relative overflow-x-auto mt-1 rounded-lg overflow-auto h-[370px] scrollbar-hide">
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
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            No
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Nama
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            NIM
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Prodi
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Angkatan
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "5%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            IP Lalu
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "3%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            SKS Diambil
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Status Mahasiswa
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
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
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {
                                                                        item.nama_prodi
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.angkatan
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {item.ipk.toFixed(
                                                                        2
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.sks_kumulatif
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.status
                                                                    }
                                                                </td>
                                                                <td className="flex items-center justify-center py-3">
                                                                    <a
                                                                        href={`/dosen/perwalian/detail/${item.nim}`}
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
                                )}
                                {activeTab === "Belum Disetujui" && (
                                    <div>
                                        Belum Disetujui
                                        <div className="relative overflow-x-auto mt-1 rounded-lg overflow-auto h-[370px] scrollbar-hide">
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
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            No
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Nama
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            NIM
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Prodi
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Angkatan
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "5%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            IP Lalu
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "3%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            SKS Diambil
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Status Mahasiswa
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
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
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {
                                                                        item.nama_prodi
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.angkatan
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {item.ipk.toFixed(
                                                                        2
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.sks_kumulatif
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.status
                                                                    }
                                                                </td>
                                                                <td className="flex items-center justify-center py-3">
                                                                    <a
                                                                        href={`/dosen/perwalian/detail/${item.nim}`}
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
                                )}
                                {activeTab === "Sudah Disetujui" && (
                                    <div>
                                        Sudah Disetujui
                                        <div className="relative overflow-x-auto mt-1 rounded-lg overflow-auto h-[370px] scrollbar-hide">
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
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            No
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Nama
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            NIM
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Prodi
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Angkatan
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "5%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            IP Lalu
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "3%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            SKS Diambil
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Status Mahasiswa
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
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
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {
                                                                        item.nama_prodi
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.angkatan
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {item.ipk.toFixed(
                                                                        2
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.sks_kumulatif
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.status
                                                                    }
                                                                </td>
                                                                <td className="flex items-center justify-center py-3">
                                                                    <a
                                                                        href={`/dosen/perwalian/detail/${item.nim}`}
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DosenLayout>
    );
};

export default RekapIRS;
