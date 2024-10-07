import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Inertia } from "@inertiajs/inertia";

const EditRuangan = ({ ruangan, programStudiList}) => {
    const [selectedProdi, setSelectedProdi] = useState('');
    
    useEffect(() => {
        if (ruangan.id_prodi) {
            setSelectedProdi(ruangan.id_prodi);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        console.log(selectedProdi);

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
            onError: (errors) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Gagal',
                    text: 'Terdapat Kesalahan',
                });
            },
        });
    };
    return (
        <div>
            <h1>Edit Ruangan</h1>
            <h2>Ruangan Data</h2>
            <ul>
                {ruangan && typeof ruangan === 'object' && !Array.isArray(ruangan) ? (
                    <li key={ruangan.id_ruang}>
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
                ) : (
                    <p>No Ruangan Data Available</p>
                )}
            </ul>
            <h2>List Prodi Data</h2>
            <form onSubmit={handleSubmit}>
                <select
                    name="id_prodi"
                    value={selectedProdi}
                    onChange={(e) => setSelectedProdi(e.target.value)}
                >
                    <option value=""></option>
                    {programStudiList.map((item, index) => (
                        <option key={index} value={item.id_prodi}>{item.nama_prodi}</option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditRuangan;