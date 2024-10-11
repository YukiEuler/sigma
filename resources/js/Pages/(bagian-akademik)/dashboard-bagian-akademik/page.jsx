import React from "react";
import BagianAkademikLayout from "../../../Layouts/BagianAkademikLayout";

const DashboardBagianAkademik = () => {
    return (
        <BagianAkademikLayout>
            <h2>Dashboard Bagian Akademik</h2>
            <div>
                <button
                    onClick={() =>
                        (window.location.href = "/bagian-akademik/atur-ruang")
                    }
                >
                    Edit Ruang
                </button>
                <br></br>
                <button
                    onClick={() => (window.location.href = "/actionlogout")}
                >
                    Logout
                </button>
            </div>
        </BagianAkademikLayout>
    );
};

export default DashboardBagianAkademik;
