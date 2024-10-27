import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";
import { PieChart } from "@mui/x-charts/PieChart";

const Perwalian = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState(new Array(10).fill(false));

    const handleSelectAllChange = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setCheckedItems(new Array(10).fill(newSelectAll));
    };

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
        setSelectAll(newCheckedItems.every((item) => item));
    };

    const data = [
        {
            no: 1,
            nama: "John Doe",
            nim: "123456789",
            prodi: "Teknik Informatika",
            angkatan: 2020,
            jalur: "SNMPTN",
            ip: 3.5,
            sks: 20,
            status: "Aktif",
        },
        {
            no: 2,
            nama: "Jane Smith",
            nim: "987654321",
            prodi: "Sistem Informasi",
            angkatan: 2019,
            jalur: "SBMPTN",
            ip: 3.8,
            sks: 22,
            status: "Aktif",
        },
        {
            no: 3,
            nama: "Alice Johnson",
            nim: "112233445",
            prodi: "Manajemen Informatika",
            angkatan: 2021,
            jalur: "Mandiri",
            ip: 3.2,
            sks: 18,
            status: "Aktif",
        },
        {
            no: 4,
            nama: "Bob Brown",
            nim: "556677889",
            prodi: "Komputer Akuntansi",
            angkatan: 2022,
            jalur: "SNMPTN",
            ip: 3.9,
            sks: 24,
            status: "Aktif",
        },
        {
            no: 5,
            nama: "Charlie Davis",
            nim: "998877665",
            prodi: "Teknik Informatika",
            angkatan: 2018,
            jalur: "SBMPTN",
            ip: 3.4,
            sks: 21,
            status: "Aktif",
        },
        {
            no: 6,
            nama: "Diana Evans",
            nim: "443322110",
            prodi: "Sistem Informasi",
            angkatan: 2020,
            jalur: "Mandiri",
            ip: 3.7,
            sks: 23,
            status: "Aktif",
        },
        {
            no: 7,
            nama: "Evan Foster",
            nim: "667788990",
            prodi: "Manajemen Informatika",
            angkatan: 2019,
            jalur: "SNMPTN",
            ip: 3.1,
            sks: 19,
            status: "Aktif",
        },
        {
            no: 8,
            nama: "Fiona Green",
            nim: "334455667",
            prodi: "Komputer Akuntansi",
            angkatan: 2021,
            jalur: "SBMPTN",
            ip: 3.6,
            sks: 20,
            status: "Aktif",
        },
        {
            no: 9,
            nama: "George Harris",
            nim: "776655443",
            prodi: "Teknik Informatika",
            angkatan: 2022,
            jalur: "Mandiri",
            ip: 3.3,
            sks: 22,
            status: "Aktif",
        },
        {
            no: 10,
            nama: "Hannah White",
            nim: "554433221",
            prodi: "Sistem Informasi",
            angkatan: 2018,
            jalur: "SNMPTN",
            ip: 3.9,
            sks: 24,
            status: "Aktif",
        },
    ];
    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <DosenLayout dosen={dosen}>
            <main
                className="flex-1 px-5 pb-5 pt-4"
                style={{ minHeight: `calc(100vh - 6.5rem)`, overflow: "auto" }}
            >
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Perwalian
                    </h1>
                </div>
                <form className="max-w-sm mt-6">
                    <table className="w-full">
                        <tr>
                            <td className="text-sm font-medium text-gray-900">
                                Angkatan
                            </td>
                            <td>
                                <select
                                    id="angkatan"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option selected>Select an option</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option selected>Select an option</option>
                                    <option value="TI">
                                        Teknik Informatika
                                    </option>
                                    <option value="SI">Sistem Informasi</option>
                                    <option value="MI">
                                        Manajemen Informatika
                                    </option>
                                    <option value="KA">
                                        Komputer Akuntansi
                                    </option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <div className="mt-4 flex space-x-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Filter Data
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Reset Filter
                        </button>
                    </div>
                </form>
                <div className="border-b w-full mt-4"></div>
                <div className="mt-4 flex space-x-2">
                    <button
                        type="button"
                        className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Setujui IRS
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Batalkan Persutujan IRS
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Berikan Izin Melakukan Perubahan IRS
                    </button>
                </div>
                <span className="block mt- text-sm text-gray-700">
                    <span className="block mt-1 text-sm text-gray-700">
                        <strong>
                            *Memberikan izin melakukan perubahan IRS
                        </strong>{" "}
                        berarti dianggap telah menyetujui IRS awal mahasiswa dan
                        <br />
                        sekaligus mengijinkan mahasiswa melakukan perubahan IRS
                        pada periode penggantian IRS.
                    </span>
                </span>

                <div class="flex rounded-md border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif] mt-6">
                    <input
                        type="text"
                        placeholder="NIM/Nama"
                        class="w-full outline-none bg-white text-gray-600 text-xs px-2 py-2"
                    />
                    <button
                        type="button"
                        class="flex items-center justify-center bg-[#007bff] hover:bg-blue-600 px-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 192.904 192.904"
                            width="12px"
                            class="fill-white"
                        >
                            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                        </svg>
                    </button>
                </div>
                <div className="mt-2">
                    <span className="text-lg font-medium text-gray-900">
                        Total: 10
                    </span>
                </div>
                <div className="relative overflow-x-auto mt-1 rounded-lg overflow-auto h-[500px] scrollbar-hide">
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
                                <th scope="col" className="px-6 py-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAllChange}
                                        />
                                        <span className="ml-2">Semua</span>
                                    </label>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nama
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    NIM
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Prodi
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Angkatan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jalur Masuk
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    IP Lalu
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    SKS Diambil
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr
                                    key={index}
                                    className="bg-gray-100 border-b"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <input
                                                type="checkbox"
                                                checked={checkedItems[index]}
                                                onChange={() =>
                                                    handleCheckboxChange(index)
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item.no}</td>
                                    <td className="px-6 py-4">{item.nama}</td>
                                    <td className="px-6 py-4">{item.nim}</td>
                                    <td className="px-6 py-4">{item.prodi}</td>
                                    <td className="px-6 py-4">
                                        {item.angkatan}
                                    </td>
                                    <td className="px-6 py-4">{item.jalur}</td>
                                    <td className="px-6 py-4">{item.ip}</td>
                                    <td className="px-6 py-4">{item.sks}</td>
                                    <td className="px-6 py-4">{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </DosenLayout>
    );
};

export default Perwalian;
