import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

const KelolaRuangan = ({ruangan}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(ruangan);
    }, [ruangan]);

    return (
        <div>
            <h1>Kelola Ruangan</h1>
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
                                <InertiaLink href={`/bagian-akademik/atur-ruang/edit/${item.id_ruang}`}>Edit</InertiaLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default KelolaRuangan;