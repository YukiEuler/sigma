import React, { useState, useRef, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Calendar } from "lucide-react";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";

const AltIRSMahasiswa = () => {
    const { props } = usePage();
    const mahasiswa = props.mahasiswa;
    const periode =  props.periode;

    const formatIndonesianDate = (dateStr) => {
        const days = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        const [year, month, day] = dateStr.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];

        return `${dayName}, ${String(day).padStart(
            2,
            "0"
        )} ${monthName} ${year}`;
    };

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                    Buat IRS
                </h1>
            </div>
            <div className="flex flex-col items-center justify-center h-full bg-gray-50">
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 flex justify-center">
                        <Calendar className="w-16 h-16 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Tidak dalam periode {periode.status}
                    </h2>
                    <p className="text-gray-600">
                        Pembatalan IRS dapat dilakukan pada{" "}
                        <span className="font-semibold">
                            {formatIndonesianDate(
                                periode.tanggal_mulai
                            )}
                        </span>{" "}
                        sampai{" "}
                        <span className="font-semibold">
                            {formatIndonesianDate(
                                periode.tanggal_selesai
                            )}
                        </span>
                    </p>
                </div>
            </div>
        </MahasiswaLayout>
    );
};

export default AltIRSMahasiswa;