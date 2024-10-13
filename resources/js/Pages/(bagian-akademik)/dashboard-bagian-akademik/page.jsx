import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import BagianAkademikLayout from "../../../Layouts/BagianAkademikLayout";

const DashboardBagianAkademik = () => {
    const { props } = usePage();
    const bagian_akademikData = props.bagian_akademik;
    const [bagian_akademik, setBagian_akademik] = useState(bagian_akademikData);

    useEffect(() => {
        setBagian_akademik(bagian_akademikData);
    }, [bagian_akademikData]);
    
    return (
        <BagianAkademikLayout bagian_akademik={bagian_akademik}>
            <h2>Dashboard Bagian Akademik</h2>
            {bagian_akademik ? (
                <div>
                    <p>Welcome, {bagian_akademik.nama} <br />
                    {bagian_akademik.nip} <br />
                    </p>
                    {/* Display other mahasiswa data as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </BagianAkademikLayout>
    );
};

export default DashboardBagianAkademik;
