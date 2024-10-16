import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { PieChart } from "@mui/x-charts/PieChart";
import KaprodiLayout from "../../../Layouts/KaprodiLayout";

const DashboardKaprodi = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <KaprodiLayout dosen={dosen}>
            <h1>Dashboard Kaprodi</h1>
        </KaprodiLayout>
    );
};

export default DashboardKaprodi;
