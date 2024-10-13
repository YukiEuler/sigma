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
        </BagianAkademikLayout>
    );
};

export default KelolaRuangan;
