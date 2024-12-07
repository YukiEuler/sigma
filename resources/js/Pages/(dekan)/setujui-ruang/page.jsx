import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import DekanLayout from "../../../Layouts/DekanLayout";
import Swal from "sweetalert2";
import { usePage } from "@inertiajs/inertia-react";

const SetujuiRuang = () => {
    const [ruanganData, setRuanganData] = useState([]);
    const [dosenData, setDosenData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProdi, setSelectedProdi] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showDetails, setShowDetails] = useState({});
    const { props } = usePage();

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

    // Daftar program studi
    const prodiList = Object.keys(groupedByProdi);

    // Filter ruangan berdasarkan pencarian
    const filteredData = Object.entries(groupedByProdi).map(
        ([prodiName, rooms]) => ({
            prodiName,
            rooms: rooms.filter((room) => {
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

    const handleSetujuiProdi = (prodiName) => {
        const roomsToApprove = groupedByProdi[prodiName].filter(
            (room) => room.diajukan === 1 && room.disetujui === 0
        );
        if (roomsToApprove.length === 0) {
            Swal.fire({
                icon: "info",
                title: "Semua ruangan sudah disetujui atau belum diajukan!",
                text: `Tidak ada ruangan yang perlu disetujui untuk Program Studi ${prodiName}`,
            });
            return;
        }

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: `Menyetujui semua ruangan untuk Program Studi ${prodiName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, setujui semua!",
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
                                text: `Semua ruangan di Program Studi ${prodiName} berhasil disetujui.`,
                                icon: "success",
                                customClass: {
                                    confirmButton: "btn btn-success",
                                    cancelButton: "btn btn-danger",
                                },
                            }).then(() => {
                                // Cek apakah ada ruangan yang belum disetujui
                                const allRoomsInProdi =
                                    groupedByProdi[prodiName];
                                const hasUnapprovedRooms = allRoomsInProdi.some(
                                    (room) => room.disetujui === 0
                                );
                                if (hasUnapprovedRooms) {
                                    // Setujui ulang semua ruangan di prodi yang sama jika ada ruangan yang belum disetujui
                                    Inertia.post(
                                        "/dekan/setujui-ruang/set/setujui-multiple",
                                        {
                                            room_ids: allRoomsInProdi.map(
                                                (room) => room.id_ruang
                                            ),
                                        },
                                        {
                                            onSuccess: () => {
                                                window.location.reload(); // Reload halaman setelah disetujui ulang
                                            },
                                            onError: () => {
                                                setLoading(false);
                                                Swal.fire({
                                                    title: "Gagal!",
                                                    text: "Terjadi kesalahan saat menyetujui ulang ruangan.",
                                                    icon: "error",
                                                });
                                            },
                                        }
                                    );
                                } else {
                                    window.location.reload(); // Jika sudah selesai, reload halaman
                                }
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

    const toggleDetails = (prodiName) => {
        setShowDetails((prevDetails) => ({
            ...prevDetails,
            [prodiName]: !prevDetails[prodiName],
        }));
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
                        <div className="justify-between px-4 pb-3 border rounded-lg shadow-lg bg-white">
                            <br />
                            <div className="relative overflow-x-auto mt-2 rounded-lg overflow-auto max-h-[calc(100vh-200px)] scrollbar-hide">
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
                                                    width: "1%",
                                                    textAlign: "center",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Nama Prodi
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                                style={{
                                                    width: "1%",
                                                    textAlign: "center",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Jumlah Ruang
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                                style={{
                                                    width: "1%",
                                                    textAlign: "center",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Detail
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                                style={{
                                                    width: "1%",
                                                    textAlign: "center",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((group) => (
                                            <React.Fragment
                                                key={group.prodiName}
                                            >
                                                <tr
                                                    style={{
                                                        backgroundColor:
                                                            "#F5F5F5",
                                                    }}
                                                >
                                                    <td className="px-4 py-2 text-[14px] text-center font-bold">
                                                        {group.prodiName}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center font-bold">
                                                        {group.rooms.length}
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        <button
                                                            onClick={() =>
                                                                toggleDetails(
                                                                    group.prodiName
                                                                )
                                                            }
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[14px] text-center w-20"
                                                        >
                                                            {showDetails[
                                                                group.prodiName
                                                            ]
                                                                ? "Detail"
                                                                : "Detail"}
                                                        </button>
                                                    </td>
                                                    <td className="px-4 py-2 text-[14px] text-center">
                                                        <button
                                                            onClick={() =>
                                                                handleSetujuiProdi(
                                                                    group.prodiName
                                                                )
                                                            }
                                                            className={`${
                                                                group.rooms.every(
                                                                    (room) =>
                                                                        room.disetujui ===
                                                                        1
                                                                )
                                                                    ? "bg-gray-400"
                                                                    : "bg-green-500 hover:bg-green-600"
                                                            } text-white px-2 py-1 rounded text-[14px] text-center w-20`}
                                                        >
                                                            {group.rooms.every(
                                                                (room) =>
                                                                    room.disetujui ===
                                                                    1
                                                            )
                                                                ? "Disetujui"
                                                                : "Setujui"}
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* detail diklik */}
                                                {showDetails[
                                                    group.prodiName
                                                ] && (
                                                    <tr>
                                                        <td
                                                            colSpan="4"
                                                            className="px-4 py-2"
                                                        >
                                                            <div
                                                                className="w-full overflow-y-auto"
                                                                style={{
                                                                    maxHeight:
                                                                        "300px",
                                                                }}
                                                            >
                                                                <table className="w-full text-sm text-left text-gray-500">
                                                                    <thead
                                                                        className="text-xs text-black uppercase bg-gray-50 dark:text-black-400 sticky top-0"
                                                                        style={{
                                                                            backgroundColor:
                                                                                "#D3D3D3",
                                                                        }}
                                                                    >
                                                                        <tr>
                                                                            <th
                                                                                scope="col"
                                                                                className="px-4 py-3"
                                                                                style={{
                                                                                    width: "1%",
                                                                                    textAlign:
                                                                                        "center",
                                                                                    fontSize:
                                                                                        "12px",
                                                                                }}
                                                                            >
                                                                                Nama
                                                                                Ruang
                                                                            </th>
                                                                            <th
                                                                                scope="col"
                                                                                className="px-4 py-3"
                                                                                style={{
                                                                                    width: "1%",
                                                                                    textAlign:
                                                                                        "center",
                                                                                    fontSize:
                                                                                        "12px",
                                                                                }}
                                                                            >
                                                                                Kuota
                                                                            </th>
                                                                            <th
                                                                                scope="col"
                                                                                className="px-4 py-3"
                                                                                style={{
                                                                                    width: "1%",
                                                                                    textAlign:
                                                                                        "center",
                                                                                    fontSize:
                                                                                        "12px",
                                                                                }}
                                                                            >
                                                                                Status
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {group.rooms.map(
                                                                            (
                                                                                room
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        room.id_ruang
                                                                                    }
                                                                                >
                                                                                    <td
                                                                                        scope="col"
                                                                                        className="px-4 py-3"
                                                                                        style={{
                                                                                            width: "1%",
                                                                                            textAlign:
                                                                                                "center",
                                                                                            fontSize:
                                                                                                "14px",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            room.nama_ruang
                                                                                        }
                                                                                    </td>
                                                                                    <td
                                                                                        scope="col"
                                                                                        className="px-4 py-3"
                                                                                        style={{
                                                                                            width: "1%",
                                                                                            textAlign:
                                                                                                "center",
                                                                                            fontSize:
                                                                                                "14px",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            room.kuota
                                                                                        }
                                                                                    </td>
                                                                                    <td
                                                                                        scope="col"
                                                                                        className="px-4 py-3"
                                                                                        style={{
                                                                                            width: "1%",
                                                                                            textAlign:
                                                                                                "center",
                                                                                            fontSize:
                                                                                                "14px",
                                                                                        }}
                                                                                    >
                                                                                        {room.disetujui ===
                                                                                        1 ? (
                                                                                            <span className="text-green-500">
                                                                                                Disetujui
                                                                                            </span>
                                                                                        ) : (
                                                                                            <span className="text-yellow-500">
                                                                                                Belum
                                                                                                Disetujui
                                                                                            </span>
                                                                                        )}
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        )}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
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
