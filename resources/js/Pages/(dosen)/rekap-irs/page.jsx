import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";
import { BiSearchAlt } from "react-icons/bi";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

const RekapIRS = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [selectAll, setSelectAll] = useState(false);
    const [filteredMahasiswa, setFilteredMahasiswa] = useState(mahasiswaData);
    const [checkedItems, setCheckedItems] = useState(
        new Array(mahasiswaData.length).fill(false)
    );

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
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const applyFilters = () => {
        let result = [...mahasiswaData];

        // Apply "Belum IRS" filter
        if (activeTab !== "Belum Disetujui" && activeTab !== "Sudah Disetujui") {
            result = result.filter(
            (item) => item.is_verified === null || item.diajukan === 0
            );
        }
        if (activeTab === "Belum Disetujui" ) {
            result = result.filter(
            (item) => item.is_verified === 0 && item.diajukan === 1
            );
        }
        if (activeTab === "Sudah Disetujui") {
            result = result.filter(
            (item) => item.is_verified === 1 && item.diajukan === 1
            );
        }


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

    // setujui IRS
    const handleSelectAllChange = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        // Buat array baru untuk status checkbox berdasarkan status IRS
        const newCheckedItems = filteredMahasiswa.map((mhs) =>
            newSelectAll ? mhs.status_irs === "Not Approved" : false
        );

        setCheckedItems(newCheckedItems);
    };

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);

        // Hitung jumlah mahasiswa dengan status "Not Approved"
        const notApprovedCount = filteredMahasiswa.filter(
            (mhs) => mhs.status_irs === "Not Approved"
        ).length;

        // Hitung jumlah item yang tercentang dari mahasiswa "Not Approved"
        const checkedNotApprovedCount = filteredMahasiswa.reduce(
            (count, mhs, idx) =>
                mhs.status_irs === "Not Approved" && newCheckedItems[idx]
                    ? count + 1
                    : count,
            0
        );

        // Set selectAll true jika semua mahasiswa "Not Approved" tercentang
        setSelectAll(
            notApprovedCount > 0 && checkedNotApprovedCount === notApprovedCount
        );
    };

    const updateFilteredMahasiswa = (updatedMahasiswa) => {
        const updatedFilteredMahasiswa = updatedMahasiswa.filter((mhs) => {
            let matchesFilter = true;

            if (filters.angkatan !== "all") {
                matchesFilter = matchesFilter && mhs.angkatan.toString() === filters.angkatan;
            }

            if (filters.prodi !== "all") {
                matchesFilter = matchesFilter && mhs.nama_prodi.toLowerCase().includes(filters.prodi.toLowerCase());
            }

            if (filters.search) {
                matchesFilter = matchesFilter && (
                    mhs.nama.toLowerCase().includes(filters.search.toLowerCase()) ||
                    mhs.nim.toLowerCase().includes(filters.search.toLowerCase()) ||
                    mhs.nama_prodi.toLowerCase().includes(filters.search.toLowerCase())
                );
            }

            if (activeTab === "Belum IRS") {
                matchesFilter = matchesFilter && (mhs.is_verified === null || mhs.diajukan === 0);
            } else if (activeTab === "Belum Disetujui") {
                matchesFilter = matchesFilter && (mhs.is_verified === 0 && mhs.diajukan === 1);
            } else if (activeTab === "Sudah Disetujui") {
                matchesFilter = matchesFilter && (mhs.is_verified === 1 && mhs.diajukan === 1);
            }

            return matchesFilter;
        });

        setFilteredMahasiswa(updatedFilteredMahasiswa);
        setCheckedItems(new Array(updatedFilteredMahasiswa.length).fill(false));
        setSelectAll(false);
    };

    useEffect(() => {
        console.log("Filtered Mahasiswa:", filteredMahasiswa);
    }, [filteredMahasiswa]);

    useEffect(() => {
        applyFilters();
    }, [filters, activeTab]);

    useEffect(() => {
        setDosen(dosenData);
        setMahasiswa(mahasiswaData);
        setFilteredMahasiswa(mahasiswaData);
    }, [dosenData, mahasiswaData]);

    useEffect(() => {
        // Reset checked items when filteredMahasiswa changes
        setCheckedItems(new Array(filteredMahasiswa.length).fill(false));
    }, [filteredMahasiswa]);

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
                        Belum IRS ({mahasiswaData.filter(item => item.is_verified === null || item.diajukan === 0).length})
                    
                    </button>
                    <button
                        onClick={() => handleTabClick("Belum Disetujui")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "Belum Disetujui"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Belum Disetujui ({mahasiswaData.filter(item => item.is_verified === 0 && item.diajukan === 1).length})
                    </button>
                    <button
                        onClick={() => handleTabClick("Sudah Disetujui")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "Sudah Disetujui"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Sudah Disetujui ({mahasiswaData.filter(item => item.is_verified === 1 && item.diajukan === 1).length})
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
                                                                    {parseFloat(item.ip_lalu).toFixed(
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
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    const selectedMahasiswa =
                                                        filteredMahasiswa.filter(
                                                            (_, index) =>
                                                                checkedItems[index]
                                                        );

                                                    // Check if any selected student has status other than "Not Approved"
                                                    const invalidSelection =
                                                        selectedMahasiswa.some(
                                                            (mhs) =>
                                                                mhs.status_irs !==
                                                                "Not Approved"
                                                        );

                                                    if (invalidSelection) {
                                                        Swal.fire({
                                                            icon: "warning",
                                                            title: "Peringatan",
                                                            text: "Mahasiswa belum mengajukan IRS atau IRS sudah disetujui",
                                                        });
                                                        return;
                                                    }

                                                    Inertia.post(
                                                        "/dosen/perwalian/setujui-irs",
                                                        {
                                                            checkedItems:
                                                                selectedMahasiswa.map(
                                                                    (m) => m.nim
                                                                ),
                                                        },
                                                        {
                                                            onSuccess: () => {
                                                                // Update status IRS untuk mahasiswa yang dipilih
                                                                const updatedMahasiswa =
                                                                    mahasiswa.map(
                                                                        (mhs) => {
                                                                            if (
                                                                                selectedMahasiswa.find(
                                                                                    (
                                                                                        selected
                                                                                    ) =>
                                                                                        selected.nim ===
                                                                                        mhs.nim
                                                                                )
                                                                            ) {
                                                                                return {
                                                                                    ...mhs,
                                                                                    status_irs:
                                                                                        "Approved",
                                                                                    is_verified: 1,
                                                                                    diajukan: 1,
                                                                                };
                                                                            }
                                                                            return mhs;
                                                                        }
                                                                    );

                                                                setMahasiswa(
                                                                    updatedMahasiswa
                                                                );
                                                                updateFilteredMahasiswa(updatedMahasiswa);

                                                                Swal.fire({
                                                                    title: "Sukses!",
                                                                    text: "IRS berhasil disetujui",
                                                                    icon: "success",
                                                                    confirmButtonText:
                                                                        "OK",
                                                                });
                                                            },
                                                            onError: () => {
                                                                Swal.fire({
                                                                    icon: "error",
                                                                    title: "Gagal",
                                                                    text: "Terdapat Kesalahan",
                                                                });
                                                            },
                                                            onBefore: () => {
                                                                if (
                                                                    selectedMahasiswa.length ===
                                                                    0
                                                                ) {
                                                                    Swal.fire({
                                                                        icon: "warning",
                                                                        title: "Peringatan",
                                                                        text: "Tidak ada IRS yang dipilih",
                                                                    });
                                                                    return false;
                                                                }
                                                            },
                                                        }
                                                    );
                                                }}
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-[12px] w-40"
                                            >
                                                Setujui IRS
                                            </button>
                                        </div>

                                        <div className="relative overflow-x-auto mt-1 rounded-lg overflow-auto h-[335px] scrollbar-hide">
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
                                                            className="px-6 py-3"
                                                            style={{
                                                                width: "5%",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            <label className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-checkbox"
                                                                    checked={selectAll}
                                                                    onChange={handleSelectAllChange}
                                                                />
                                                                <span className="ml-2 text-[10px]">
                                                                    Semua
                                                                </span>
                                                            </label>
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
                                                                <td className="px-6 py-3">
                                                                    <div className="flex justify-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={
                                                                                checkedItems[
                                                                                    index
                                                                                ]
                                                                            }
                                                                            onChange={() =>
                                                                                handleCheckboxChange(
                                                                                    index
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </td>
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
                                                                    {parseFloat(item.ip_lalu).toFixed(
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
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    const selectedMahasiswa =
                                                        filteredMahasiswa.filter(
                                                            (_, index) =>
                                                                checkedItems[index]
                                                        );

                                                    if (
                                                        selectedMahasiswa.length ===
                                                        0
                                                    ) {
                                                        Swal.fire({
                                                            icon: "warning",
                                                            title: "Peringatan",
                                                            text: "Tidak ada IRS yang dipilih",
                                                        });
                                                        return;
                                                    }

                                                    // Check if any selected student has status other than "Approved"
                                                    const invalidSelection =
                                                        selectedMahasiswa.some(
                                                            (mhs) =>
                                                                mhs.is_verified !== 1 || mhs.diajukan !== 1
                                                        );

                                                    if (invalidSelection) {
                                                        Swal.fire({
                                                            icon: "warning",
                                                            title: "Peringatan",
                                                            text: "IRS belum diajukan atau disetujui",
                                                        });
                                                        return;
                                                    }

                                                    Inertia.post(
                                                        "/dosen/perwalian/batalkan-irs",
                                                        {
                                                            checkedItems:
                                                                selectedMahasiswa.map(
                                                                    (m) => m.nim
                                                                ),
                                                        },
                                                        {
                                                            onSuccess: () => {
                                                                // Update status IRS untuk mahasiswa yang dipilih
                                                                const updatedMahasiswa =
                                                                    mahasiswa.map(
                                                                        (mhs) => {
                                                                            if (
                                                                                selectedMahasiswa.find(
                                                                                    (
                                                                                        selected
                                                                                    ) =>
                                                                                        selected.nim ===
                                                                                        mhs.nim
                                                                                )
                                                                            ) {
                                                                                return {
                                                                                    ...mhs,
                                                                                    status_irs: "Not Approved",
                                                                                    is_verified: 0,
                                                                                    diajukan: 1,
                                                                                };
                                                                            }
                                                                            return mhs;
                                                                        }
                                                                    );

                                                                setMahasiswa(
                                                                    updatedMahasiswa
                                                                );
                                                                updateFilteredMahasiswa(updatedMahasiswa);

                                                                Swal.fire({
                                                                    title: "Sukses!",
                                                                    text: "IRS berhasil dibatalkan",
                                                                    icon: "success",
                                                                    confirmButtonText:
                                                                        "OK",
                                                                });
                                                            },
                                                            onError: () => {
                                                                Swal.fire({
                                                                    icon: "error",
                                                                    title: "Gagal",
                                                                    text: "Terdapat Kesalahan",
                                                                });
                                                            },
                                                        }
                                                    );
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-[12px] w-40`"
                                            >
                                                Batalkan IRS
                                            </button>
                                        </div>
                                        <div className="relative overflow-x-auto mt-1 rounded-lg overflow-auto h-[335px] scrollbar-hide">
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
                                                            className="px-6 py-3"
                                                            style={{
                                                                width: "5%",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            <label className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-checkbox"
                                                                    checked={selectAll}
                                                                    onChange={handleSelectAllChange}
                                                                />
                                                                <span className="ml-2 text-[10px]">
                                                                    Semua
                                                                </span>
                                                            </label>
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
                                                                <td className="px-6 py-3">
                                                                    <div className="flex justify-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={
                                                                                checkedItems[
                                                                                    index
                                                                                ]
                                                                            }
                                                                            onChange={() =>
                                                                                handleCheckboxChange(
                                                                                    index
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </td>
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
                                                                    {parseFloat(item.ip_lalu).toFixed(
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
