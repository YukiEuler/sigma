import React, { useState, useEffect } from "react";
import { usePage, Inertia } from "@inertiajs/inertia-react";
import KaprodiLayout from "@/Layouts/KaprodiLayout";

const DataMataKuliah = () => {
    const { props } = usePage();
    const { mataKuliah: mataKuliahData, dosen } = props;
    const [mataKuliah, setMataKuliah] = useState(mataKuliahData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMataKuliah, setNewMataKuliah] = useState({
        kode: "",
        nama: "",
        sks: "",
        semester: "",
        jenis: "",
    });

    useEffect(() => {
        setMataKuliah(mataKuliahData);
    }, [mataKuliahData]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMataKuliah((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/mata-kuliah", newMataKuliah, {
            onSuccess: () => {
                handleCloseModal(); // Tutup modal setelah berhasil
                setNewMataKuliah({ kode: "", nama: "", sks: "", semester: "", jenis: "" });
            },
        });
    };

    return (
        <KaprodiLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">Mata Kuliah</h1>
                    <button 
                        onClick={handleOpenModal} 
                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Tambahkan Mata Kuliah
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-5 mt-6">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky-header">
                        <thead className="text-xs text-white uppercase bg-blue-500 dark:text-gray-400 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-center">No</th>
                                <th className="px-6 py-3 text-center">Kode</th>
                                <th className="px-6 py-3 text-center">Mata Kuliah</th>
                                <th className="px-6 py-3 text-center">SKS</th>
                                <th className="px-6 py-3 text-center">Semester</th>
                                <th className="px-6 py-3 text-center">Jenis</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mataKuliah.map((mk, index) => (
                                <tr key={mk.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 text-center">{index + 1}</td>
                                    <td className="px-6 py-4 text-center">{mk.kode}</td>
                                    <td className="px-6 py-4">{mk.nama}</td>
                                    <td className="px-6 py-4 text-center">{mk.sks}</td>
                                    <td className="px-6 py-4 text-center">{mk.semester}</td>
                                    <td className="px-6 py-4 text-center">{mk.jenis}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-lg font-semibold mb-4">Tambah Mata Kuliah Baru</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm">Kode</label>
                                    <input
                                        type="text"
                                        name="kode"
                                        value={newMataKuliah.kode}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm">Mata Kuliah</label>
                                    <input
                                        type="text"
                                        name="nama"
                                        value={newMataKuliah.nama}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm">SKS</label>
                                    <input
                                        type="number"
                                        name="sks"
                                        value={newMataKuliah.sks}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm">Semester</label>
                                    <input
                                        type="number"
                                        name="semester"
                                        value={newMataKuliah.semester}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm">Jenis</label>
                                    <input
                                        type="text"
                                        name="jenis"
                                        value={newMataKuliah.jenis}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-400 rounded">
                                        Batal
                                    </button>
                                    <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </KaprodiLayout>
    );
};

export default DataMataKuliah;
