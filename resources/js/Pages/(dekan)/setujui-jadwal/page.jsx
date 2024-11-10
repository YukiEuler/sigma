import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import DekanLayout from "../../../Layouts/DekanLayout";
import { Icon } from "@iconify/react";
import { usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";

const SetujuiJadwal = ({ ruangan }) => {
    const [data, setData] = useState([]);
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <DekanLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Persetujuan Jadwal
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100 mb-3">
                        <div className="justify-between px-4 pb-3 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2"></div>
                        </div>
                    </div>
                </div>
            </main>
        </DekanLayout>
    );
};

export default SetujuiJadwal;
