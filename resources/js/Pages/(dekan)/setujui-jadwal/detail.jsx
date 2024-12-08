import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import DekanLayout from "../../../Layouts/DekanLayout";
import { Icon } from "@iconify/react";
import Swal from 'sweetalert2';

const DetailJadwal = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const mataKuliahData = props.mataKuliah;
    const ruanganData = props.ruangan;
    const selectedProdi = props.selectedProdi;
    const [dosen, setDosen] = useState(dosenData);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const schedules = props.jadwal;
    const programStudi = props.programStudiList;
    const status = programStudi.find(prodi => prodi.id_prodi === selectedProdi.id_prodi)?.disetujui === 0 ? 0 : 1;
    console.log(status);


    


    const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

    const timeSlots = [];
    for (let i = 7; i <= 21; i++) {
        timeSlots.push(`${i.toString().padStart(2, "0")}:00`);
    }

    const handleButtonClick = () => {
        setIsSubmitted(!isSubmitted);
    };

    const getTimeSlot = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        if (minutes <= 30) {
            // Jika menit <= 30, gunakan jam saat ini
            return `${hours.toString().padStart(2, "0")}:00`;
        } else {
            // Jika menit > 30, gunakan jam berikutnya
            return `${(hours + 1).toString().padStart(2, "0")}:00`;
        }
    };

    const isScheduleInTimeSlot = (scheduleTime, slotTime) => {
        const appropriateSlot = getTimeSlot(scheduleTime);
        return appropriateSlot === slotTime;
    };

    return (
        <DekanLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <div className="flex itmes-center justify-center">
                        <button onClick={() => window.history.back()}>
                            <Icon
                                icon="weui:back-filled"
                                className="mt-[5px]"
                                width="24"
                                height="24"
                            />
                        </button>

                        <h1 className="ml-2 text-2xl font-semibold whitespace-nowrap text-black">
                            Jadwal Program Studi {selectedProdi.nama_prodi}
                        </h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100 lg:col-span-5">
                        <div
                            className="p-2 border rounded-lg shadow-lg bg-white"
                            style={{
                                height: "80vh",
                            }}
                        >
                            <button
                                disabled={status === 1}
                                onClick={() => {
                                    Inertia.post(`/dekan/setujui-jadwal${selectedProdi.id_prodi}`, null, {
                                        onSuccess: () => {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Berhasil',
                                                text: 'Jadwal berhasil disetujui'
                                            });
                                        }
                                    });
                                }}
                                className={`w-20 mb-1 mt-2 mx-2 p-2 text-sm text-white rounded-md ${
                                    status === 1
                                        ? "bg-gray-400 hover:bg-gray-600 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600"
                                }`}
                            >
                                {status === 1 ? "Disetujui" : "Setujui"}
                            </button>

                            <div className="flex flex-col space-y-2 p-2 max-h-[70vh] overflow-x-auto scrollbar-hide">
                                <style jsx>
                                    {`
                                        .scrollbar-hide::-webkit-scrollbar {
                                            display: none;
                                        }
                                        .scrollbar-hide {
                                            -ms-overflow-style: none;
                                            scrollbar-width: none;
                                        }
                                    `}
                                </style>
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="border p-2 w-20 text-center">
                                                Jam
                                            </th>
                                            {DAYS.map((day) => (
                                                <th
                                                    key={day}
                                                    className="border p-2 w-48 text-center"
                                                >
                                                    {day}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timeSlots.map((hour) => (
                                            <tr key={hour}>
                                                <td className="border p-2 text-center align-top">
                                                    {hour}
                                                </td>
                                                {DAYS.map((day) => (
                                                    <td
                                                        key={`${day}-${hour}`}
                                                        className="border p-2 align-top"
                                                    >
                                                        <div className="flex flex-col gap-2">
                                                        {schedules.map(
                                                                (
                                                                    schedule,
                                                                    index
                                                                ) => {
                                                                    if (
                                                                        schedule.day ===
                                                                            day &&
                                                                        isScheduleInTimeSlot(
                                                                            schedule.startTime,
                                                                            hour
                                                                        )
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="bg-blue-200 p-2 rounded w-full"
                                                                            >
                                                                                <p className="font-semibold">
                                                                                    {
                                                                                        schedule.courseName
                                                                                    }
                                                                                </p>
                                                                                <p className="text-md">
                                                                                    {
                                                                                        schedule.courseId
                                                                                    }
                                                                                </p>
                                                                                <p className="text-sm">
                                                                                    Kelas:{" "}
                                                                                    {
                                                                                        schedule.class
                                                                                    }
                                                                                </p>
                                                                                <p className="text-sm">
                                                                                    Ruang:{" "}
                                                                                    {
                                                                                        schedule.room
                                                                                    }
                                                                                </p>
                                                                                <p className="text-sm">
                                                                                    Kuota:{" "}
                                                                                    {
                                                                                        schedule.kuota
                                                                                    }
                                                                                </p>
                                                                                <p className="text-sm">
                                                                                    {
                                                                                        schedule.startTime
                                                                                    }{" "}
                                                                                    -{" "}
                                                                                    {
                                                                                        schedule.endTime
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return null;
                                                                }
                                                            )}
                                                        </div>
                                                    </td>
                                                ))}
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

export default DetailJadwal;
