import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';

const SetujuiRuang = ({ruangan}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(ruangan);
    }, [ruangan]);

    const handleEditClick = (item) => {
        Swal.fire({
            title: 'Apakah Anda yakin menyetujui ruang ini?',
            text: "Ruang: " + item.nama_ruang + "\nProdi: " + item.nama_prodi,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yakin'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.get(`/dekan/setujui-ruang/${item.id_ruang}`, {
                    onSuccess: () => {
                        console.log("OKE");
                        Swal.fire(
                            'Disetujui!',
                            'Ruangan telah disetujui.',
                            'success'
                        );
                        setData(data.map(d => d.id_ruang === item.id_ruang ? { ...d, disetujui: 1 } : d));
                    },
                    onError: () => {
                        Swal.fire(
                            'Gagal!',
                            'Terjadi kesalahan saat menyetujui ruangan.',
                            'error'
                        );
                    }
                });
            }
        });
    };

    return (
        //<DekanLayout dosen={dosen}>
            <main
                className="flex-1 px-5 pb-5 pt-4"
                style={{ minHeight: `calc(100vh - 6.5rem)`, overflow: "auto" }}>
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                Setujui Ruangan</h1>
                </div>
                <table>
                <thead>
                    <tr>
                        <th>Nama Ruangan</th>
                        <th>Prodi</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id_ruang}>
                            <td>{item.nama_ruang}</td>
                            <td>{item.nama_prodi}</td>
                            <td>{item.disetujui === 0 ? 'Belum Disetujui' : 'Disetujui'}</td>
                            <td>
                                {item.disetujui === 0 && item.id_prodi !== null && (
                                    <button onClick={() => handleEditClick(item)}>Setujui</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    //</DekanLayout>
    );
};

export default SetujuiRuang;