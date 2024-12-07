import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const KHS = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [openSemesters, setOpenSemesters] = useState({});

    const toggleSemester = (semester) => {
        setOpenSemesters((prev) => ({
            ...prev,
            [semester]: !prev[semester],
        }));
    };

    const semesterData = props.khs;

    const handleDownloadPDF = (semesterKey) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const semesterInfo = semesterData[semesterKey];

        // Tambahkan judul
        const title = "KARTU HASIL STUDI";
        doc.setFontSize(18);
        const titleWidth = doc.getTextWidth(title);
        doc.text(title, (pageWidth - titleWidth) / 2, 22);

        // Tambahkan informasi tambahan
        const tahunAjaran = semesterData[semesterKey].title.split('|').pop();
        const nim = mahasiswaData.nim;
        const nama = mahasiswaData.nama;
        const programStudi = mahasiswaData.nama_prodi;
        const dosenWali = mahasiswaData.nama_dosen_wali;

        doc.setFontSize(12);
        const tahunAjaranWidth = doc.getTextWidth(
            `${tahunAjaran}`
        );
        doc.text(
            `${tahunAjaran}`,
            (pageWidth - tahunAjaranWidth) / 2,
            28
        );

        doc.setFontSize(10);
        doc.text(`NIM: ${nim}`, 14, 38);
        doc.text(`Nama: ${nama}`, 14, 44);
        doc.text(`Program Studi: ${programStudi}`, 14, 50);
        doc.text(`Dosen Wali: ${dosenWali}`, 14, 56);

        // Tambahkan tabel
        doc.autoTable({
            html: `#khs-mahasiswa-${semesterKey}`,
            startY: 62, // Posisi Y di mana tabel akan dimulai
        });

        const finalY = doc.lastAutoTable.finalY + 10;
        // Calculate text widths for centering
        doc.setFont("helvetica", "normal");
        const numeratorText = "sum(SKS × Bobot)"; 
        const denominatorText = "sum(SKS)";
        const numeratorWidth = doc.getTextWidth(numeratorText);
        const denominatorWidth = doc.getTextWidth(denominatorText);

        // Calculate position to center texts
        const lineStart = 30;
        const lineLength = 50;
        const lineEnd = lineStart + lineLength;
        const centerX = lineStart + (lineLength/2);
        const numerator = semesterInfo.courses.reduce((sum, course) => sum + (course.sks_x_bobot || 0), 0).toFixed(2);
        const denominator = semesterInfo.sks;
        const ip = (numerator/denominator).toFixed(2);

        // Draw fraction components
        doc.text("IP = ", 14, finalY + 10);
        doc.text(numeratorText, centerX - (numeratorWidth/2), finalY + 8);
        doc.line(lineStart, finalY + 9, lineEnd, finalY + 9);
        doc.text(denominatorText, centerX - (denominatorWidth/2), finalY + 14);

        // Rest of the calculation display
        doc.text(`= ${numerator} / ${denominator}`, lineEnd + 10, finalY + 10);
        doc.text(`= ${ip}`, lineEnd + 40, finalY + 10);

        // Simpan PDF
        doc.save("Print KHS.pdf");
    };

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Kartu Hasil Studi (KHS)
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="w-full max-w-6xl mx-auto p-4">
                                <div className="border rounded-md shadow-sm">
                                    {Object.entries(semesterData).map(
                                        ([semesterKey, semesterInfo]) => (
                                            <div
                                                key={semesterKey}
                                                className="mb-4"
                                            >
                                                <div
                                                    onClick={() =>
                                                        toggleSemester(
                                                            semesterKey
                                                        )
                                                    }
                                                    className="flex justify-between items-center p-4 bg-blue-100 hover:bg-blue-200 cursor-pointer rounded-t"
                                                >
                                                    <div>
                                                        <h2 className="text-blue-900 font-medium">
                                                            {semesterInfo.title}
                                                        </h2>
                                                        <p className="text-sm text-blue-700">
                                                            Jumlah SKS{" "}
                                                            {semesterInfo.sks}
                                                        </p>
                                                    </div>
                                                    {openSemesters[
                                                        semesterKey
                                                    ] ? (
                                                        <ChevronUp className="text-blue-900" />
                                                    ) : (
                                                        <ChevronDown className="text-blue-900" />
                                                    )}
                                                </div>

                                                {openSemesters[semesterKey] && (
                                                    <div className="border border-gray-200 rounded-b p-4">
                                                        <h3 className="text-center font-bold mb-4">
                                                            KHS MAHASISWA
                                                        </h3>
                                                        <div className="overflow-x-auto">
                                                            <table
                                                                className="w-full table-layout-fixed"
                                                                id={`khs-mahasiswa-${semesterKey}`}
                                                            >
                                                                <thead className="text-[14px]">
                                                                    <tr className="bg-blue-500 text-white">
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-3 border"
                                                                            style={{
                                                                                width: "50px",
                                                                                textAlign:
                                                                                    "center",
                                                                            }}
                                                                        >
                                                                            NO
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-3 border"
                                                                            style={{
                                                                                width: "50px",
                                                                                textAlign:
                                                                                    "center",
                                                                            }}
                                                                        >
                                                                            KODE
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-3 border"
                                                                            style={{
                                                                                width: "250px",
                                                                                textAlign:
                                                                                    "center",
                                                                            }}
                                                                        >
                                                                            MATA
                                                                            KULIAH
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-3 border"
                                                                            style={{
                                                                                width: "50px",
                                                                                textAlign:
                                                                                    "center",
                                                                            }}
                                                                        >
                                                                            STATUS
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-3 border"
                                                                            style={{
                                                                                width: "50px",
                                                                                textAlign:
                                                                                    "center",
                                                                            }}
                                                                        >
                                                                            SKS
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-3 border"
                                                                            style={{
                                                                                width: "50px",
                                                                                textAlign:
                                                                                    "center",
                                                                            }}
                                                                        >
                                                                            NILAI HURUF
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-3 border"
                                                                            style={{
                                                                                width: "50px",
                                                                                textAlign:
                                                                                    "center",
                                                                            }}
                                                                        >
                                                                            BOBOT
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-3 border"
                                                                            style={{
                                                                                width: "50px",
                                                                                textAlign:
                                                                                    "center",
                                                                            }}
                                                                        >
                                                                            SKS X BOBOT
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="text-[14px]">
                                                                    {semesterInfo.courses.map(
                                                                        (
                                                                            course,
                                                                            courseIndex
                                                                        ) => (
                                                                            <React.Fragment
                                                                                key={
                                                                                    course.kode_mk
                                                                                }
                                                                            >
                                                                                <tr className="border">
                                                                                    <td className="p-2 border text-center">
                                                                                        {
                                                                                            courseIndex + 1
                                                                                        }
                                                                                    </td>
                                                                                    <td className="p-2 border">
                                                                                        {
                                                                                            course.kode_mk
                                                                                        }
                                                                                    </td>
                                                                                    <td className="p-2 border">
                                                                                        {
                                                                                            course.nama
                                                                                        }
                                                                                    </td>
                                                                                    <td className="p-2 border text-center">
                                                                                        {
                                                                                            course.status
                                                                                        }
                                                                                    </td>
                                                                                    <td className="p-2 border text-center">
                                                                                        {
                                                                                            course.sks
                                                                                        }
                                                                                    </td>
                                                                                    <td className="p-2 border text-center">
                                                                                        {
                                                                                            course.nilai_huruf
                                                                                        }
                                                                                    </td>
                                                                                    <td className="p-2 border text-center">
                                                                                        {
                                                                                            course.bobot
                                                                                        }
                                                                                    </td>
                                                                                    <td className="p-2 border text-center">
                                                                                        {
                                                                                            course.sks_x_bobot
                                                                                        }
                                                                                    </td>
                                                                                </tr>
                                                                            </React.Fragment>
                                                                        )
                                                                    )}
                                                                    <tr className="border font-bold bg-gray-100">
                                                                        <td className="p-2 border text-center" colSpan="4">
                                                                            Total
                                                                        </td>
                                                                        <td className="p-2 border text-center">
                                                                            {semesterInfo.sks}
                                                                        </td>
                                                                        <td className="p-2 border text-center">
                                                                            -
                                                                        </td>
                                                                        <td className="p-2 border text-center">
                                                                            {(semesterInfo.courses.reduce((sum, course) => sum + (course.bobot || 0), 0) / 
                                                                            semesterInfo.courses.length).toFixed(2)}
                                                                        </td>
                                                                        <td className="p-2 border text-center">
                                                                            {semesterInfo.courses.reduce((sum, course) => sum + (course.sks_x_bobot || 0), 0).toFixed(2)}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <div className="mt-4 p-4 border rounded-lg bg-blue-50">
                                                                <h4 className="font-bold text-blue-900 mb-2">IP Semester</h4>
                                                                <div className="flex flex-col space-y-2">
                                                                    <div className="flex items-center">
                                                                        <span className="text-blue-800 self-center">IP = </span>
                                                                        <div className="flex flex-col items-center ml-2">
                                                                            <div className="border-b border-blue-800">
                                                                                <span className="text-blue-800">
                                                                                    Σ(SKS × Bobot)
                                                                                </span>
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <span className="text-blue-800">
                                                                                    Σ(SKS)
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="ml-4 flex items-center">
                                                                            <span className="text-blue-800 self-center">
                                                                                = {(semesterInfo.courses.reduce((sum, course) => sum + (course.sks_x_bobot || 0), 0) / 
                                                                                semesterInfo.courses.reduce((sum, course) => sum + course.sks, 0)).toFixed(2)}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="text-blue-800 invisible">IP</span>
                                                                        <span className="text-blue-800 ml-2">
                                                                            = {semesterInfo.courses.reduce((sum, course) => sum + (course.sks_x_bobot || 0), 0).toFixed(2)} / {semesterInfo.sks}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => handleDownloadPDF(semesterKey)}
                                                                className="w-40 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                            >
                                                                <div className="flex items-center justify-center">
                                                                    <Icon
                                                                        icon="material-symbols-light:print"
                                                                        height="24"
                                                                        width="24"
                                                                    />
                                                                    <span className="ml-2">
                                                                        Cetak
                                                                        KHS
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </MahasiswaLayout>
    );
};

export default KHS;
