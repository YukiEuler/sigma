import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";
import { Icon } from "@iconify/react";
import { FaUserNinja } from "react-icons/fa6";

const AltStatusMahasiswa = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                    Buat IRS
                </h1>
            </div>
            <div className="flex flex-col items-center justify-center h-full mt-4">
                <div className="text-center mb-8">
                    <div className="mx-auto mb-2 flex justify-center">
                        <FaUserNinja className="w-16 h-16 text-black" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Status Akademik Anda Bukan Mahasiswa Aktif
                    </h2>
                    <p className="text-gray-600">
                        Silahkan lakukan registrasi akademik untuk dapat melakukan pengisian IRS{" "}
                    </p>
                </div>
            </div>
        </MahasiswaLayout>
    );
};

export default AltStatusMahasiswa;
