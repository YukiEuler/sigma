import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import DekanLayout from "../../../Layouts/DekanLayout";
import Swal from "sweetalert2";
import { usePage } from "@inertiajs/inertia-react";
import { IoChevronBack } from "react-icons/io5";

const DetailRuang = () => {
    const { props } = usePage();
    const [ruanganData, setRuanganData] = useState([]);
    const [dosenData, setDosenData] = useState([]);
    const [programStudi, setProgramStudi] = useState({});
    const programStudiData = props.programStudi;
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState({});

    useEffect(() => {
        setDosenData(props.dosen);
        setRuanganData(props.ruangan);
    }, [props.ruangan, props.dosen]);

    // Kelompokkan ruangan berdasarkan program studi
    const groupedByProdi = ruanganData.reduce((acc, room) => {
        if (!acc[room.nama_prodi]) {
            acc[room.nama_prodi] = [];
        }
        acc[room.nama_prodi].push(room);
        return acc;
    }, {});

    const handleSetujuiProdi = () => {
        // Get only the unapproved but proposed rooms
        const roomsToApprove = ruanganData.filter(
            (room) => room.diajukan === 1 && room.disetujui === 0
        );
    
        if (roomsToApprove.length === 0) {
            Swal.fire({
                icon: "info",
                title: "Tidak ada ruangan baru yang perlu disetujui",
                text: `Semua ruangan yang diajukan untuk Program Studi ${programStudiData.nama_prodi} sudah disetujui`,
            });
            return;
        }
    
        // Get count of rooms that are already approved
        const approvedRoomsCount = ruanganData.filter(
            (room) => room.disetujui === 1
        ).length;
    
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: `Terdapat ${roomsToApprove.length} ruangan baru yang diajukan untuk Program Studi ${programStudiData.nama_prodi}. Apakah anda ingin menyetujui ruangan tersebut?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, setujui ruangan baru!",
            cancelButtonText: "Tidak, batalkan!",
            reverseButtons: true,
            customClass: {
                confirmButton: "btn btn-success mr-2",
                cancelButton: "btn btn-danger ml-2",
                actions: "gap-2",
            },
            buttonsStyling: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const roomIds = roomsToApprove.map((room) => room.id_ruang);
    
                Inertia.post(
                    "/dekan/setujui-ruang/set/setujui-multiple",
                    { room_ids: roomIds },
                    {
                        onSuccess: () => {
                            setLoading(false);
                            Swal.fire({
                                title: "Disetujui!",
                                text: `${roomsToApprove.length} ruangan baru untuk Program Studi ${programStudiData.nama_prodi} berhasil disetujui`,
                                icon: "success",
                                customClass: {
                                    confirmButton: "btn btn-success",
                                    cancelButton: "btn btn-danger",
                                },
                            }).then(() => {
                                window.location.reload();
                            });
                        },
                        onError: () => {
                            setLoading(false);
                            Swal.fire({
                                title: "Gagal!",
                                text: "Terjadi kesalahan saat menyetujui ruangan.",
                                icon: "error",
                            });
                        },
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Dibatalkan",
                    text: "Persetujuan ruangan dibatalkan",
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-success",
                        cancelButton: "btn btn-danger",
                    },
                    buttonsStyling: false,
                });
            }
        });
    };

    return (
        <DekanLayout dosen={dosenData}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <div className="flex itmes-center justify-center">
                        <button onClick={() => window.history.back()}>
                            <IoChevronBack style={{ fontSize: "28px" }} />
                        </button>
                        <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                            Ruang {programStudiData.nama_prodi}
                        </h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100 mb-3">
                        <div className="justify-between px-4 pb-3 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={handleSetujuiProdi}
                                        disabled={ruanganData.every(
                                            (room) => room.disetujui === 1
                                        )}
                                        className={`${
                                            ruanganData.every(
                                                (room) => room.disetujui === 1
                                            )
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-500 hover:bg-blue-600"
                                        } text-white px-4 py-2 rounded text-[14px]`}
                                    >
                                        {ruanganData.every(
                                            (room) => room.disetujui === 1
                                        )
                                            ? "Disetujui"
                                            : "Setujui"}
                                    </button>
                                </div>
                                <div className="relative overflow-x-auto mt-2 rounded-lg overflow-auto h-[540px] scrollbar-hide">
                                    <style jsx>{`
                                        .scrollbar-hide::-webkit-scrollbar {
                                            display: none;
                                        }
                                        .scrollbar-hide {
                                            -ms-overflow-style: none;
                                            scrollbar-width: none;
                                        }
                                    `}</style>
                                    <table className="w-full text-sm text-left rounded-lg text-gray-500 sticky-header">
                                        <thead
                                            className="text-xs text-white uppercase bg-gray-50 dark:text-gray-400 sticky top-0"
                                            style={{
                                                backgroundColor: "#1EAADF",
                                            }}
                                        >
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "5%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "20%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Nama Ruangan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "35%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Program Studi
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "5%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Kuota
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "30%",
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ruanganData.map((room, index) => (
                                                <tr key={room.id_ruang}>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {room.nama_ruang}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {room.nama_prodi}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {room.kuota}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        {room.disetujui ===
                                                        1 ? (
                                                            <span>
                                                                Approved
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                Not Approved
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DekanLayout>
    );
};

export default DetailRuang;
