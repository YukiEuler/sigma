import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import KaprodiLayout from "@/Layouts/KaprodiLayout";

const DataMahasiswa = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <KaprodiLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">Mahasiswa</h1>
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
                                <option selected>
                                    Select an option
                                </option>
                                <option value="2024">
                                    2024
                                </option> 
                                <option value="2023">
                                    2023
                                </option>
                                <option value="2022">
                                    2022
                                </option> 
                                <option value="2021">
                                    2021
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

                <div class="flex rounded-md border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                    <input
                        type="text"
                        placeholder="Cari"
                        class="w-full outline-none bg-white text-gray-600 text-base px-2 py-2"
                    />
                    <button type="button" class="flex items-center justify-center bg-[#007bff] hover:bg-blue-600 px-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192.904 192.904"
                        width="20px"
                        class="fill-white"
                    >
                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                    </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-5 mt-6">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky-header">
                        <thead className="text-xs text-white uppercase bg-blue-500 dark:text-gray-400 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-center">NIM</th>
                                <th className="px-6 py-3 text-center">Nama</th>
                                <th className="px-6 py-3 text-center">Angkatan</th>
                                <th className="px-6 py-3 text-center">Jalur Masuk</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-center">IPK</th>
                                <th className="px-6 py-3 text-center">SKS Kumulatif</th>
                                <th className="px-6 py-3 text-center">Dosen Wali</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </main>
        </KaprodiLayout>
    );
};

export default DataMahasiswa;
