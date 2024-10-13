import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DekanLayout from "../../../Layouts/DekanLayout";

const DashboardDekan = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <DekanLayout dosen={dosen}>
            <h2>Dashboard Dekan</h2>
            <div>
                <button onClick={() => window.location.href = '/'}>Dashboard Dosen</button><br></br>
                <button onClick={() => window.location.href = '/dekan/setujui-ruang'}>Setujui Ruang</button><br></br>
                <button onClick={() => window.location.href = '/actionlogout'}>Logout</button>
            </div>
        </DekanLayout>
    );
};

export default DashboardDekan;
