import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Inertia } from "@inertiajs/inertia";
import BagianAkademikLayout from "../../../Layouts/BagianAkademikLayout";

const EditRuangan = ({ ruangan, programStudiList }) => {
    const [selectedProdi, setSelectedProdi] = useState('');
    
    useEffect(() => {
        if (ruangan.id_prodi) {
            setSelectedProdi(ruangan.id_prodi);
        }
    }, [ruangan.id_prodi]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        Inertia.post("/bagian-akademik/atur-ruang/update", {
            id_ruang: ruangan.id_ruang,
            id_prodi: selectedProdi
        }, {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Update Berhasil',
                    text: 'Ruangan berhasil diperbarui',
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Gagal',
                    text: 'Terdapat Kesalahan',
                });
            },
        });
    };

    return (
        //<BagianAkademikLayout bagian_akademik={bagian_akademik}>
            <main
                className="flex-1 px-5 pb-4 pt-4 bg-gradient-to-r"
                style={{ minHeight: `calc(100vh - 6.5rem)`, overflow: "auto" }}
            >
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Edit Ruangan
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                    <h2 className="text-lg font-semibold">Data Ruangan</h2>
                    <ul className="mt-4">
                        <li>
                            <p>ID Ruang: {ruangan.id_ruang}</p>
                            <p>Nama Ruang: {ruangan.nama_ruang}</p>
                            <p>Kuota: {ruangan.kuota}</p>
                            <p>Disetujui: {ruangan.disetujui}</p>
                            <p>ID Fakultas: {ruangan.id_fakultas}</p>
                            <p>ID Prodi: {ruangan.id_prodi}</p>
                            <p>Nama Prodi: {ruangan.nama_prodi}</p>
                            <p>Created At: {ruangan.created_at}</p>
                            <p>Updated At: {ruangan.updated_at}</p>
                        </li>
                    </ul>
                    
                    <h2 className="text-lg font-semibold mt-6">Pilih Program Studi</h2>
                    <div className="mt-4">
                        <select
                            name="id_prodi"
                            value={selectedProdi}
                            onChange={(e) => setSelectedProdi(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Pilih Program Studi</option>
                            {programStudiList.map((item, index) => (
                                <option key={index} value={item.id_prodi}>
                                    {item.nama_prodi}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Submit
                    </button>
                </form>
            </main>
        //</BagianAkademikLayout>
    );
};

export default EditRuangan;
