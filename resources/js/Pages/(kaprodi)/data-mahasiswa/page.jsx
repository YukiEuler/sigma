import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import KaprodiLayout from "@/Layouts/KaprodiLayout";

const DataMahasiswa = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <KaprodiLayout dosen={dosen}>
            <h2>Data Mahasiswa</h2>
        </KaprodiLayout>
    );
};

export default DataMahasiswa;