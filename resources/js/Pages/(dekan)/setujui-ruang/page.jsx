import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import DekanLayout from "../../../Layouts/DekanLayout";
import Swal from "sweetalert2";
import { usePage } from "@inertiajs/inertia-react";

const SetujuiRuang = () => {
    const [ruanganData, setRuanganData] = useState([]);
    const [dosenData, setDosenData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { props } = usePage();

    useEffect(() => {
        setDosenData(props.dosen);
        setRuanganData(props.ruangan);
    }, [props.ruangan, props.dosen]);

    // Kelompokkan ruangan berdasarkan program studi
    const groupedByProdi = ruanganData.reduce((acc, room) => {
        if (!acc[room.nama_prodi]) {
            acc[room.nama_prodi] = {
                rooms: [],
                id_prodi: room.id_prodi,
            };
        }
        acc[room.nama_prodi].rooms.push(room);
        return acc;
    }, {});

    // Filter ruangan berdasarkan pencarian
    const filteredData = Object.entries(groupedByProdi).map(
        ([prodiName, data]) => ({
            prodiName,
            id_prodi: data.id_prodi,
            rooms: data.rooms.filter((room) => {
                return (
                    room.nama_ruang
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    room.nama_prodi
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            }),
        })
    );

    const handleSetujuiProdi = (prodiName, prodiId) => {
        const roomsToApprove = groupedByProdi[prodiName].rooms.filter(
            (room) => room.diajukan === 1 && room.disetujui === 0
        );

        if (roomsToApprove.length === 0) {
            Swal.fire({
                icon: "info",
                title: "Tidak ada ruangan baru yang perlu disetujui",
                text: `Semua ruangan yang diajukan untuk Program Studi ${prodiName} sudah disetujui`,
            });
            return;
        }

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: `Terdapat ${roomsToApprove.length} ruangan baru yang diajukan untuk Program Studi ${prodiName}. Apakah anda ingin menyetujui ruangan tersebut?`,
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
                                text: `${roomsToApprove.length} ruangan baru untuk Program Studi ${prodiName} berhasil disetujui`,
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
            }
        });
    };

    const getApprovalStatus = (rooms) => {
        const totalRooms = rooms.length;
        const approvedRooms = rooms.filter(room => room.disetujui === 1).length;
        
        if (approvedRooms === 0) return "Not Approved";
        if (approvedRooms === totalRooms) return "Approved";
        return `${approvedRooms}/${totalRooms} Disetujui`;
    };

    return (
        <DekanLayout dosen={dosenData}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Persetujuan Ruang
                    </h1>
                </div>

                <div className="grid grid-cols-1 gap-5 mt-6 flex-grow">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100 mb-3 flex-grow">
                        <div className="justify-between px-4 pb-3 border rounded-lg shadow-lg bg-white h-[580px]">
                            <br />
                            <div className="relative overflow-x-auto mt-2 rounded-lg overflow-auto max-h-[calc(100vh-200px)] scrollbar-hide">
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
                                            <th scope="col" className="px-4 py-3 text-center" style={{ width: "1%", fontSize: "14px" }}>
                                                NO
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center" style={{ width: "20%", fontSize: "14px" }}>
                                                Nama Prodi
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center" style={{ width: "10%", fontSize: "14px" }}>
                                                Jumlah Ruang
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center" style={{ width: "15%", fontSize: "14px" }}>
                                                Status
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center" style={{ width: "5%", fontSize: "14px" }}>
                                                Detail
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center" style={{ width: "5%", fontSize: "14px" }}>
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((group, index) => (
                                            <tr key={group.prodiName} style={{ backgroundColor: "#F5F5F5" }}>
                                                <td className="px-4 py-2 text-center">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-2 text-[14px] text-center">
                                                    {group.prodiName}
                                                </td>
                                                <td className="px-4 py-2 text-[14px] text-center">
                                                    {group.rooms.length}
                                                </td>
                                                <td className="px-4 py-2 text-[14px] text-center">
                                                        {getApprovalStatus(group.rooms)}
                                                </td>
                                                <td className="px-4 py-2 text-[14px] text-center">
                                                    <a
                                                        href={`/dekan/setujui-ruang/detail/${group.id_prodi}`}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-[14px]"
                                                    >
                                                        Detail
                                                    </a>
                                                </td>
                                                <td className="px-4 py-2 text-[14px] text-center">
                                                    <button
                                                        onClick={() => handleSetujuiProdi(group.prodiName)}
                                                        disabled={group.rooms.every((room) => room.disetujui === 1)}
                                                        className={`${
                                                            group.rooms.every((room) => room.disetujui === 1)
                                                                ? "bg-gray-400 cursor-not-allowed"
                                                                : "bg-green-500 hover:bg-green-600"
                                                        } text-white px-2 py-1 rounded text-[14px] text-center w-20`}
                                                    >
                                                        {group.rooms.every((room) => room.disetujui === 1)
                                                            ? "Disetujui"
                                                            : "Setujui"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DekanLayout>
    );
};

export default SetujuiRuang;