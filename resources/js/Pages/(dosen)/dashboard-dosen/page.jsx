import React, { useState, useEffect } from "react";
import { usePage } from '@inertiajs/inertia-react';
import DosenLayout from "../../../Layouts/DosenLayout";

const DashboardDosen = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <DosenLayout>
            <h2>Dashboard Dosen</h2>
            {dosen ? (
                <div>
                    <p>Welcome, {dosen.nama}</p>
                    {/* Display other mahasiswa data as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {dosen.dekan === 1 && (
                <div>
                    <button onClick={() => window.location.href = '/dekan/dashboard'}>Dashboard Dekan</button>
                </div>
            )}
        <button onClick={() => window.location.href = '/actionlogout'}>Logout</button>
        </DosenLayout>
    );
};

export default DashboardDosen;
