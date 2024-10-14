import React, { useEffect, useState } from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import BagianAkademikLayout from "../../../Layouts/BagianAkademikLayout";

const KelolaRuangan = ({ ruangan }) => {
    const [data, setData] = useState([]);
    const { props } = usePage();
    const bagian_akademikData = props.bagian_akademik;
    const [bagian_akademik, setBagian_akademik] = useState(bagian_akademikData);

    useEffect(() => {
        setData(ruangan);
        setBagian_akademik(bagian_akademikData);
    }, [ruangan, bagian_akademikData]);

    return (
        <BagianAkademikLayout bagian_akademik={bagian_akademik}>
            <main className="min-h-screen p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">
                    Kelola Ruangan
                </h1>

                <div className="relative overflow-x-auto mt-6 rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nama
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ruangan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Program Studi
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id_ruang}>
                                    <td>{item.nama_ruang}</td>
                                    <td>{item.nama_prodi}</td>
                                    <td>
                                        {item.disetujui === 0
                                            ? "Belum Disetujui"
                                            : "Disetujui"}
                                    </td>
                                    <td>
                                        <InertiaLink
                                            href={`/bagian-akademik/atur-ruang/edit/${item.id_ruang}`}
                                        >
                                            Edit
                                        </InertiaLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            {/* <div>
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
                                <td>
                                    {item.disetujui === 0
                                        ? "Belum Disetujui"
                                        : "Disetujui"}
                                </td>
                                <td>
                                    <InertiaLink
                                        href={`/bagian-akademik/atur-ruang/edit/${item.id_ruang}`}
                                    >
                                        Edit
                                    </InertiaLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </BagianAkademikLayout>
    );
};

export default KelolaRuangan;
