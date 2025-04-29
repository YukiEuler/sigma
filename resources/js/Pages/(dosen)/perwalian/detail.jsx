import React, { useState, useRef, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import KaprodiLayout from "../../../Layouts/KaprodiLayout";
import DosenLayout from "../../../Layouts/DosenLayout";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DetailMahasiswaPerwalian = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const mahasiswaData = props.mahasiswa;
    const irsData = props.irs;
    const khsData = props.khs;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [openSemesters, setOpenSemesters] = useState({});
    const [isApproved, setIsApproved] = useState(false);
    const [activeTab, setActiveTab] = useState("IRS");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleButtonClick = () => {
        setIsApproved(!isApproved);
    };

    const toggleSemester = (semester) => {
        setOpenSemesters((prev) => ({
            ...prev,
            [semester]: !prev[semester],
        }));
    };

    const downloadIRS = (semesterKey) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Tambahkan judul
        const title = "ISIAN RANCANGAN STUDI";
        doc.setFontSize(18);
        const titleWidth = doc.getTextWidth(title);
        doc.text(title, (pageWidth - titleWidth) / 2, 22);

        // Tambahkan informasi tambahan
        const tahunAjaran = irsData[semesterKey].title.split("|").pop();
        const nim = mahasiswaData.nim;
        const nama = mahasiswaData.nama;
        const programStudi = mahasiswaData.nama_prodi;
        const dosenWali = mahasiswaData.nama_dosen_wali;

        doc.setFontSize(12);
        const tahunAjaranWidth = doc.getTextWidth(`${tahunAjaran}`);
        doc.text(`${tahunAjaran}`, (pageWidth - tahunAjaranWidth) / 2, 28);

        doc.setFontSize(10);
        doc.text(`NIM: ${nim}`, 14, 38);
        doc.text(`Nama: ${nama}`, 14, 44);
        doc.text(`Program Studi: ${programStudi}`, 14, 50);
        doc.text(`Dosen Wali: ${dosenWali}`, 14, 56);

        // Tambahkan tabel
        doc.autoTable({
            html: `#irs-mahasiswa-${semesterKey}`,
            startY: 62, // Posisi Y di mana tabel akan dimulai
        });

        // Simpan PDF
        doc.save("Print IRS.pdf");
    };

    const downloadKHS = (semesterKey) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const semesterInfo = khsData[semesterKey];

        // Tambahkan judul
        const title = "KARTU HASIL STUDI";
        doc.setFontSize(18);
        const titleWidth = doc.getTextWidth(title);
        doc.text(title, (pageWidth - titleWidth) / 2, 22);

        // Tambahkan informasi tambahan
        const tahunAjaran = khsData[semesterKey].title.split("|").pop();
        const nim = mahasiswaData.nim;
        const nama = mahasiswaData.nama;
        const programStudi = mahasiswaData.nama_prodi;
        const dosenWali = mahasiswaData.nama_dosen_wali;

        doc.setFontSize(12);
        const tahunAjaranWidth = doc.getTextWidth(`${tahunAjaran}`);
        doc.text(`${tahunAjaran}`, (pageWidth - tahunAjaranWidth) / 2, 28);

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
        const centerX = lineStart + lineLength / 2;
        const numerator = semesterInfo.courses
            .reduce((sum, course) => sum + (course.sks_x_bobot || 0), 0)
            .toFixed(2);
        const denominator = semesterInfo.sks;
        const ip = (numerator / denominator).toFixed(2);

        // Draw fraction components
        doc.text("IP = ", 14, finalY + 10);
        doc.text(numeratorText, centerX - numeratorWidth / 2, finalY + 8);
        doc.line(lineStart, finalY + 9, lineEnd, finalY + 9);
        doc.text(denominatorText, centerX - denominatorWidth / 2, finalY + 14);

        // Rest of the calculation display
        doc.text(`= ${numerator} / ${denominator}`, lineEnd + 10, finalY + 10);
        doc.text(`= ${ip}`, lineEnd + 40, finalY + 10);

        // Simpan PDF
        doc.save("Print KHS.pdf");
    };

    useEffect(() => {
        setMahasiswa(mahasiswaData);
        setDosen(dosenData);
    }, [mahasiswaData, dosenData]);

    return (
        <DosenLayout dosen={dosen}>
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
                            Data Mahasiswa
                        </h1>
                    </div>
                </div>
                <div className="flex w-full border-b mb-4 mt-3">
                    <button
                        onClick={() => handleTabClick("IRS")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "IRS"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        IRS
                    </button>
                    <button
                        onClick={() => handleTabClick("KHS")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "KHS"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        KHS
                    </button>
                </div>
                <div className="grid grid-cols-1 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-3 border rounded-lg shadow-lg bg-white">
                            <div className="w-full grid grid-cols-3 md:grid-cols-3 gap-6 px-3 py-2 border-2 border-black rounded-md">
                                {/* Kolom 1 - Info Pribadi */}
                                <div className="w-full space-y-2 flex justify-cente">
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-gray-700 mb-2">
                                            Info Pribadi
                                        </h3>
                                        <div className="border-b"></div>
                                        <div className="flex">
                                            <span className="w-20 font-medium">
                                                Nama
                                            </span>
                                            <span className="ml-2 font-medium">
                                                : {mahasiswa.nama}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-20 font-medium">
                                                NIM
                                            </span>
                                            <span className="ml-2 font-medium">
                                                : {mahasiswa.nim}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Kolom 2 - Info Akademik */}
                                <div className="w-full space-y-2 flex justify-center">
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-gray-700 mb-2">
                                            Info Akademik
                                        </h3>
                                        <div className="border-b"></div>
                                        <div className="flex">
                                            <span className="w-32 font-medium">
                                                IP lalu
                                            </span>
                                            <span className="ml-2 font-medium">
                                                : {mahasiswa.ips}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 font-medium">
                                                Beban studi maks
                                            </span>
                                            <span className="ml-2 font-medium">
                                                : {mahasiswa.maxSks}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 font-medium">
                                                IPk/SKSk
                                            </span>
                                            <span className="ml-2 font-medium">
                                                : {mahasiswa.ipk.toFixed(2)}/
                                                {mahasiswa.sks_kumulatif}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Kolom 3 - Beban MK */}
                                <div className="w-full space-y-2 flex justify-center">
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-gray-700 mb-2">
                                            Beban Mata Kuliah
                                        </h3>
                                        <div className="border-b w-full"></div>
                                        <div className="flex">
                                            <span className="w-32 font-medium">
                                                Wajib
                                            </span>
                                            <span className="ml-2 font-medium">
                                                : {mahasiswa.sks_wajib}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 font-medium">
                                                Pilihan
                                            </span>
                                            <span className="ml-2 font-medium">
                                                : {mahasiswa.sks_pilihan}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 font-bold">
                                                Total
                                            </span>
                                            <span className="ml-2 font-medium">
                                                : {mahasiswa.sks_kumulatif}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 mt-3 mb-2">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-3 border rounded-lg shadow-lg bg-white">
                            {activeTab === "IRS" && (
                                <div className="w-full max-w-6xl mx-auto p-4">
                                    <div className="border rounded-md shadow-sm">
                                        {Object.entries(irsData).map(
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
                                                                {
                                                                    semesterInfo.title
                                                                }
                                                            </h2>
                                                            <p className="text-sm text-blue-700">
                                                                Jumlah SKS{" "}
                                                                {
                                                                    semesterInfo.sks
                                                                }
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

                                                    {openSemesters[
                                                        semesterKey
                                                    ] && (
                                                        <div className="border border-gray-200 rounded-b p-4">
                                                            <h3 className="text-center font-bold mb-4">
                                                                IRS MAHASISWA (
                                                                {semesterInfo
                                                                    .courses[0]
                                                                    .is_verified ===
                                                                1
                                                                    ? "SUDAH DISETUJUI WALI"
                                                                    : "BELUM DISETUJUI WALI"}
                                                                )
                                                            </h3>
                                                            {console.log(
                                                                semesterInfo
                                                            )}
                                                            <div className="overflow-x-auto">
                                                                <table
                                                                    className="w-full table-layout-fixed"
                                                                    id={`irs-mahasiswa-${semesterKey}`}
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
                                                                                KELAS
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
                                                                                RUANG
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
                                                                                    width: "300px",
                                                                                    textAlign:
                                                                                        "center",
                                                                                }}
                                                                            >
                                                                                NAMA
                                                                                DOSEN
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
                                                                                            {courseIndex +
                                                                                                1}
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
                                                                                                course
                                                                                                    .kelas
                                                                                                    .kode_kelas
                                                                                            }
                                                                                        </td>
                                                                                        <td className="p-2 border text-center">
                                                                                            {
                                                                                                course.sks
                                                                                            }
                                                                                        </td>
                                                                                        <td className="p-2 border">
                                                                                            {course.jadwal_kuliah.map(
                                                                                                (
                                                                                                    jadwal,
                                                                                                    index
                                                                                                ) => (
                                                                                                    <div
                                                                                                        key={
                                                                                                            index
                                                                                                        }
                                                                                                    >
                                                                                                        {
                                                                                                            jadwal
                                                                                                                .ruangan
                                                                                                                .nama_ruang
                                                                                                        }
                                                                                                    </div>
                                                                                                )
                                                                                            )}
                                                                                        </td>
                                                                                        <td className="p-2 border text-center">
                                                                                            {
                                                                                                course.status_irs
                                                                                            }
                                                                                        </td>
                                                                                        <td className="p-2 border">
                                                                                            {course.mata_kuliah.dosen.map(
                                                                                                (
                                                                                                    elm,
                                                                                                    index
                                                                                                ) => (
                                                                                                    <div
                                                                                                        key={
                                                                                                            index
                                                                                                        }
                                                                                                    >
                                                                                                        {
                                                                                                            elm.nama
                                                                                                        }
                                                                                                    </div>
                                                                                                )
                                                                                            )}
                                                                                        </td>
                                                                                    </tr>
                                                                                    {course.jadwal_kuliah && (
                                                                                        <tr className="border bg-gray-50">
                                                                                            <td
                                                                                                colSpan="8"
                                                                                                className="p-2 border text-gray-600 italic"
                                                                                            >
                                                                                                {course.jadwal_kuliah.map(
                                                                                                    (
                                                                                                        jadwal,
                                                                                                        index
                                                                                                    ) => (
                                                                                                        <div
                                                                                                            key={
                                                                                                                index
                                                                                                            }
                                                                                                        >
                                                                                                            {`${
                                                                                                                jadwal.hari
                                                                                                            } pukul ${jadwal.waktu_mulai.slice(
                                                                                                                0,
                                                                                                                -3
                                                                                                            )} - ${jadwal.waktu_selesai.slice(
                                                                                                                0,
                                                                                                                -3
                                                                                                            )}`}
                                                                                                        </div>
                                                                                                    )
                                                                                                )}
                                                                                            </td>
                                                                                        </tr>
                                                                                    )}
                                                                                </React.Fragment>
                                                                            )
                                                                        )}
                                                                    </tbody>
                                                                </table>
                                                                {semesterInfo
                                                                    .courses[0]
                                                                    .is_verified ===
                                                                    1 && (
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDownloadPDF(
                                                                                semesterKey
                                                                            )
                                                                        }
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
                                                                                IRS
                                                                            </span>
                                                                        </div>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === "KHS" && (
                                <div className="w-full max-w-6xl mx-auto p-4">
                                    <div className="border rounded-md shadow-sm">
                                        {Object.entries(khsData).map(
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
                                                                {
                                                                    semesterInfo.title
                                                                }
                                                            </h2>
                                                            <p className="text-sm text-blue-700">
                                                                Jumlah SKS{" "}
                                                                {
                                                                    semesterInfo.sks
                                                                }
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

                                                    {openSemesters[
                                                        semesterKey
                                                    ] && (
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
                                                                                NILAI
                                                                                HURUF
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
                                                                                SKS
                                                                                X
                                                                                BOBOT
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
                                                                                            {courseIndex +
                                                                                                1}
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
                                                                            <td
                                                                                className="p-2 border text-center"
                                                                                colSpan="4"
                                                                            >
                                                                                Total
                                                                            </td>
                                                                            <td className="p-2 border text-center">
                                                                                {
                                                                                    semesterInfo.sks
                                                                                }
                                                                            </td>
                                                                            <td className="p-2 border text-center">
                                                                                -
                                                                            </td>
                                                                            <td className="p-2 border text-center">
                                                                                {(
                                                                                    semesterInfo.courses.reduce(
                                                                                        (
                                                                                            sum,
                                                                                            course
                                                                                        ) =>
                                                                                            sum +
                                                                                            (course.bobot ||
                                                                                                0),
                                                                                        0
                                                                                    ) /
                                                                                    semesterInfo
                                                                                        .courses
                                                                                        .length
                                                                                ).toFixed(
                                                                                    2
                                                                                )}
                                                                            </td>
                                                                            <td className="p-2 border text-center">
                                                                                {semesterInfo.courses
                                                                                    .reduce(
                                                                                        (
                                                                                            sum,
                                                                                            course
                                                                                        ) =>
                                                                                            sum +
                                                                                            (course.sks_x_bobot ||
                                                                                                0),
                                                                                        0
                                                                                    )
                                                                                    .toFixed(
                                                                                        2
                                                                                    )}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div className="mt-4 p-4 border rounded-lg bg-blue-50">
                                                                    <h4 className="font-bold text-blue-900 mb-2">
                                                                        IP
                                                                        Semester
                                                                    </h4>
                                                                    <div className="flex flex-col space-y-2">
                                                                        <div className="flex items-center">
                                                                            <span className="text-blue-800 self-center">
                                                                                IP
                                                                                ={" "}
                                                                            </span>
                                                                            <div className="flex flex-col items-center ml-2">
                                                                                <div className="border-b border-blue-800">
                                                                                    <span className="text-blue-800">
                                                                                        Σ(SKS
                                                                                        ×
                                                                                        Bobot)
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
                                                                                    ={" "}
                                                                                    {(
                                                                                        semesterInfo.courses.reduce(
                                                                                            (
                                                                                                sum,
                                                                                                course
                                                                                            ) =>
                                                                                                sum +
                                                                                                (course.sks_x_bobot ||
                                                                                                    0),
                                                                                            0
                                                                                        ) /
                                                                                        semesterInfo.courses.reduce(
                                                                                            (
                                                                                                sum,
                                                                                                course
                                                                                            ) =>
                                                                                                sum +
                                                                                                course.sks,
                                                                                            0
                                                                                        )
                                                                                    ).toFixed(
                                                                                        2
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center">
                                                                            <span className="text-blue-800 invisible">
                                                                                IP
                                                                            </span>
                                                                            <span className="text-blue-800 ml-2">
                                                                                ={" "}
                                                                                {semesterInfo.courses
                                                                                    .reduce(
                                                                                        (
                                                                                            sum,
                                                                                            course
                                                                                        ) =>
                                                                                            sum +
                                                                                            (course.sks_x_bobot ||
                                                                                                0),
                                                                                        0
                                                                                    )
                                                                                    .toFixed(
                                                                                        2
                                                                                    )}{" "}
                                                                                /{" "}
                                                                                {
                                                                                    semesterInfo.sks
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() =>
                                                                        downloadKHS(
                                                                            semesterKey
                                                                        )
                                                                    }
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
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </DosenLayout>
    );
};

export default DetailMahasiswaPerwalian;
