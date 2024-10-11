import React from "react";
import DekanLayout from "../../../Layouts/DekanLayout";

const DashboardDekan = () => {
    return (
        <DekanLayout>
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
