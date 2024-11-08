import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import BagianAkademikLayout from "../../../Layouts/BagianAkademikLayout";

const EditRuangan = ({ ruangan, programStudiList }) => {
    const [selectedProdi, setSelectedProdi] = useState("");
    const [data, setData] = useState([]);
    const { props } = usePage();
    const bagian_akademikData = props.bagian_akademik;
    const [bagian_akademik, setBagian_akademik] = useState(bagian_akademikData);

    useEffect(() => {
        if (ruangan.id_prodi) {
            setSelectedProdi(ruangan.id_prodi);
        }
        setData(ruangan);
        setBagian_akademik(bagian_akademikData);
    }, [ruangan, bagian_akademikData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        Inertia.post(
            "/bagian-akademik/atur-ruang/update",
            {
                id_ruang: ruangan.id_ruang,
                id_prodi: selectedProdi,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Update Berhasil",
                        text: "Ruangan berhasil diperbarui",
                    });
                },
                onError: () => {
                    Swal.fire({
                        icon: "error",
                        title: "Update Gagal",
                        text: "Terdapat Kesalahan",
                    });
                },
            }
        );
    };

    return (
        <BagianAkademikLayout bagian_akademik={bagian_akademik}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <div className="flex itmes-center justify-center">
                        <button onClick={() => window.history.back()}>
                            <Icon
                                icon="weui:back-filled"
                                className="mt-[5px]"
                                width="24"
                                height="24"
                            />
                        </button>

                        <h1 className="ml-2 text-2xl font-semibold whitespace-nowrap text-black">
                            Edit Ruangan
                        </h1>
                    </div>
                </div>
                <div className="flex justify-center items-center w-100 mt-10">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center items-center">
                                    <div className="bg-white rounded-lg px-8 py-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h2 className="text-2xl font-bold">
                                                Ruang {ruangan.nama_ruang}
                                            </h2>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-gray-500 text-xl">
                                                Kuota:
                                            </p>
                                            <p className="text-gray-900 text-xl font-semibold">
                                                {ruangan.kuota}
                                            </p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-gray-500 text-xl">
                                                Status:
                                            </p>
                                            <p className="text-gray-900 text-xl font-semibold">
                                                {ruangan.diajukan === 0 &&
                                                ruangan.disetujui === 0
                                                    ? "Belum Diajukan"
                                                    : ruangan.diajukan === 1 &&
                                                      ruangan.disetujui === 0
                                                    ? "Sudah Diajukan"
                                                    : "Sudah Disetujui"}
                                            </p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-gray-500 text-xl">
                                                Fakultas:
                                            </p>
                                            <p className="text-gray-900 text-xl font-semibold">
                                                {ruangan.nama_fakultas}
                                            </p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-gray-500 text-xl">
                                                Prorgram Studi:
                                            </p>
                                            <div className="relative mt-2">
                                                <select
                                                    name="id_prodi"
                                                    value={selectedProdi}
                                                    onChange={(e) =>
                                                        setSelectedProdi(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full p-2 border rounded"
                                                >
                                                    <option value="">
                                                        Pilih Program Studi
                                                    </option>
                                                    {programStudiList.map(
                                                        (item, index) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item.id_prodi
                                                                }
                                                            >
                                                                {
                                                                    item.nama_prodi
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <button
                                                type="submit"
                                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </BagianAkademikLayout>
    );
};

export default EditRuangan;
