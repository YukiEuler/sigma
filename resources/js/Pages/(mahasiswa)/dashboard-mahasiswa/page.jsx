import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";

const DashboardMahasiswa = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <h2>Dashboard Mahasiswa</h2>
            {mahasiswa ? (
                <div>
                    <p>Welcome, {mahasiswa.nama}</p>
                    {/* Display other mahasiswa data as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </MahasiswaLayout>
    );
};

export default DashboardMahasiswa;
