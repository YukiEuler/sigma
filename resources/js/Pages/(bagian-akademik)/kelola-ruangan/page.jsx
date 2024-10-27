import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
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
            <main
                className="flex-1 px-5 pb-4 pt-4 bg-gradient-to-r "
                style={{ minHeight: `calc(100vh - 6.5rem)`, overflow: "auto" }}
            >
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Kelola Ruangan
                    </h1>
                </div>

                <div className="relative overflow-x-auto mt-6 rounded-lg overflow-auto h-[500px] scrollbar-hide">
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
                        <thead className="text-xs text-white uppercase bg-gray-50 dark:text-gray-400 sticky top-0" style={{ backgroundColor: "#1EAADF" }}>
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ID Ruangan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nama Ruangan
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
                            {data.map((item, index) => (
                                <tr
                                    key={item.id_ruang}
                                    className="bg-gray-100 border-b"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        {item.nama_ruang}
                                    </td>
                                    <td className="px-4 py-2">
                                        Ruangan {index + 1}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.nama_prodi}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.disetujui === 0
                                            ? "Belum Disetujui"
                                            : "Disetujui"}
                                    </td>
                                    <td className="px-4 py-2">
                                        <a href={`/bagian-akademik/atur-ruang/edit/${item.id_ruang}`} className="text-blue-500 hover:underline">
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </BagianAkademikLayout>
    );
};

export default KelolaRuangan;
