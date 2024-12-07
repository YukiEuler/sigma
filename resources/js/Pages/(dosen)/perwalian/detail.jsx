import React, { useState, useRef, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DetailPerwalian = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const mahasiswaData = props.mahasiswa;
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

    const handleDownloadPDF = (semesterKey) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Tambahkan judul
        const title = "ISIAN RANCANGAN STUDI";
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
            html: `#irs-mahasiswa-${semesterKey}`,
            startY: 62, // Posisi Y di mana tabel akan dimulai
        });

        // Simpan PDF
        doc.save("Print IRS.pdf");
    };

     const semesterData = props.irs;


    // KHS
    function hitungBobot(nilaiHuruf) {
        switch (nilaiHuruf.toUpperCase()) {
            case "A":
                return 4;
            case "B":
                return 3;
            case "C":
                return 2;
            case "D":
                return 1;
            case "E":
                return 0;
            default:
                return null;
        }
    }

    const downloadKHS = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        const title = "KARTU HASIL STUDI";
        doc.setFontSize(18);
        const titleWidth = doc.getTextWidth(title);
        doc.text(title, (pageWidth - titleWidth) / 2, 22);

        const tahunAjaran = semesterData[semesterKey].title.split('|').pop();
        const nim = mahasiswaData.nim;
        const nama = mahasiswaData.nama;
        const programStudi = mahasiswaData.nama_prodi;
        const dosenWali = mahasiswaData.nama_dosen_wali;

        doc.setFontSize(12);
        const tahunAjaranWidth = doc.getTextWidth(
            `Tahun Akademik: ${tahunAjaran}`
        );
        doc.text(
            `Tahun Akademik: ${tahunAjaran}`,
            (pageWidth - tahunAjaranWidth) / 2,
            28
        );

        doc.setFontSize(10);
        doc.text(`NIM: ${nim}`, 14, 38);
        doc.text(`Nama: ${nama}`, 14, 44);
        doc.text(`Program Studi: ${programStudi}`, 14, 50);
        doc.text(`Dosen Wali: ${dosenWali}`, 14, 56);

        // Tambahkan tabel KHS
        doc.autoTable({
            html: "#khs-mahasiswa",
            startY: 62, // Posisi Y di mana tabel akan dimulai
        });

        // Posisi Y di mana informasi IP akan dimulai, setelah tabel
        let finalY = doc.lastAutoTable.finalY + 10;

        const ipSemester = 3.81;
        const ipKumulatif = 3.85;

        doc.setFontSize(10);
        doc.text(`IP Semester: ${ipSemester}`, 14, finalY);
        doc.text(`IP Kumulatif: ${ipKumulatif}`, 14, finalY + 6);

        // Simpan PDF
        doc.save("KHS.pdf");
    };
    
    useEffect(() => {
        setMahasiswa(mahasiswaData);
        setDosen(dosenData);
    }, [mahasiswaData, dosenData]);

    console.log(semesterData);

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
                                                : 3.78
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 font-medium">
                                                Beban studi maks
                                            </span>
                                            <span className="ml-2 font-medium">
                                                : 24
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
                                                : 75
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 font-medium">
                                                Pilihan
                                            </span>
                                            <span className="ml-2 font-medium">
                                                : 22
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 font-bold">
                                                Total
                                            </span>
                                            <span className="ml-2 font-medium">
                                                : 97
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
                                        IRS
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
                                                                IRS MAHASISWA
                                                                (SUDAH DISETUJUI
                                                                WALI)
                                                            </h3>
                                                            <div className="overflow-x-auto">
                                                                <table
                                                                    className="w-full table-layout-fixed"
                                                                    id="irs-mahasiswa"
                                                                >
                                                                    <thead className="text-[14px]">
                                                                        <tr className="bg-blue-500 text-white">
                                                                            <th
                                                                                scope="col"
                                                                                className="px-6 py-3 border"
                                                                                style={{
                                                                                    width: "250px",
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
                                                                                    width: "250px",
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
                                                                                    width: "250px",
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
                                                                                    width: "250px",
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
                                                                                    width: "250px",
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
                                                                                    width: "250px",
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
                                                                                    width: "250px",
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
                                                                                course,index
                                                                            ) => (
                                                                                <React.Fragment
                                                                                    key={
                                                                                        course.kode
                                                                                    }
                                                                                >
                                                                                    <tr className="border">
                                                                                        <td className="p-2 border text-center">
                                                                                            {
                                                                                                index+1
                                                                                            }
                                                                                        </td>
                                                                                        <td className="p-2 border">
                                                                                            {
                                                                                                course.kode_mk
                                                                                            }
                                                                                        </td>
                                                                                        <td className="p-2 border">
                                                                                            {
                                                                                                course.mata_kuliah.nama
                                                                                            }
                                                                                        </td>
                                                                                        <td className="p-2 border text-center">
                                                                                            {
                                                                                                course.kode_kelas
                                                                                            }
                                                                                        </td>
                                                                                        <td className="p-2 border text-center">
                                                                                            {
                                                                                                course.sks
                                                                                            }
                                                                                        </td>
                                                                                        <td className="p-2 border">
                                                                                            {Array.isArray(
                                                                                                course.jadwal_kuliah
                                                                                            )
                                                                                                ? course.jadwal_kuliah.map(
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
                                                                                                                  jadwal.ruangan.nama_ruang
                                                                                                              }
                                                                                                          </div>
                                                                                                      )
                                                                                                  )
                                                                                                : course.jadwal_kuliah.ruangan.nama_ruang}
                                                                                        </td>
                                                                                        <td className="p-2 border text-center">
                                                                                            {
                                                                                                course.status
                                                                                            }
                                                                                        </td>
                                                                                        <td className="p-2 border">
                                                                                            {Array.isArray(
                                                                                                course.mata_kuliah.dosen
                                                                                            )
                                                                                                ? course.mata_kuliah.dosen.map(
                                                                                                      (
                                                                                                          dosen,
                                                                                                          index
                                                                                                      ) => (
                                                                                                          <div
                                                                                                              key={
                                                                                                                  index
                                                                                                              }
                                                                                                          >
                                                                                                              {
                                                                                                                  dosen.nama
                                                                                                              }
                                                                                                          </div>
                                                                                                      )
                                                                                                  )
                                                                                                : course.ruang}
                                                                                        </td>
                                                                                    </tr>
                                                                                    {course.jadwal && (
                                                                                        <tr className="border bg-gray-50">
                                                                                            <td
                                                                                                colSpan="8"
                                                                                                className="p-2 border text-gray-600 italic"
                                                                                            >
                                                                                                {Array.isArray(
                                                                                                    course.jadwal
                                                                                                )
                                                                                                    ? course.jadwal.map(
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
                                                                                                                  }
                                                                                                              </div>
                                                                                                          )
                                                                                                      )
                                                                                                    : course.jadwal}
                                                                                            </td>
                                                                                        </tr>
                                                                                    )}
                                                                                </React.Fragment>
                                                                            )
                                                                        )}
                                                                    </tbody>
                                                                </table>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDownloadPDF(semesterKey)
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
                                        KHS
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
                                                                KHS Mahasiswa
                                                            </h3>
                                                            <table
                                                                className="w-full table-layout-fixed"
                                                                id="khs-mahasiswa"
                                                            >
                                                                <thead className="bg-blue-500 text-white text-xs">
                                                                    <tr>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-6 py-3 border"
                                                                            style={{
                                                                                width: "250px",
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
                                                                                width: "250px",
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
                                                                                width: "250px",
                                                                                textAlign:
                                                                                    "center",
                                                                            }}
                                                                        >
                                                                            JENIS
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
                                                                            STATUS
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
                                                                            SKS
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
                                                                            NILAI
                                                                            HURUF
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
                                                                            BOBOT
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
                                                                            SKS
                                                                            x
                                                                            BOBOT
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="text-xs">
                                                                    {semesterInfo.courses.map(
                                                                        (
                                                                            course,
                                                                            index
                                                                        ) => (
                                                                            <tr
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="border"
                                                                            >
                                                                                <td className="p-2 border text-center">
                                                                                    {
                                                                                        course.no
                                                                                    }
                                                                                </td>
                                                                                <td className="p-2 border text-center">
                                                                                    {
                                                                                        course.kode
                                                                                    }
                                                                                </td>
                                                                                <td className="p-2 border text-center">
                                                                                    {
                                                                                        course.mataKuliah
                                                                                    }
                                                                                </td>
                                                                                <td className="p-2 border text-center">
                                                                                    WAJIB
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
                                                                                        course.nilai
                                                                                    }
                                                                                </td>
                                                                                <td className="p-2 border text-center">
                                                                                    {hitungBobot(
                                                                                        course.nilai
                                                                                    )}
                                                                                </td>
                                                                                <td className="p-2 border text-center">
                                                                                    {course.sks *
                                                                                        hitungBobot(
                                                                                            course.nilai
                                                                                        )}
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    )}
                                                                    <tr className="bg-gray-200 font-semibold">
                                                                        <td
                                                                            colSpan="5"
                                                                            className="border px-2 py-1 text-right"
                                                                        >
                                                                            Total
                                                                        </td>
                                                                        <td className="border px-2 py-1 text-center">
                                                                            21
                                                                        </td>
                                                                        <td className="border px-2 py-1"></td>
                                                                        <td className="border px-2 py-1 text-center">
                                                                            10
                                                                        </td>
                                                                        <td className="border px-2 py-1 text-center">
                                                                            100
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <div className="mt-4 p-4">
                                                                <p>
                                                                    <strong>
                                                                        IP
                                                                        Semester
                                                                    </strong>{" "}
                                                                    : 3,81
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    80 / 21 |
                                                                    (total SKS x
                                                                    BOBOT) /
                                                                    total SKS
                                                                </p>
                                                                <p>
                                                                    <strong>
                                                                        IP
                                                                        Kumulatif
                                                                    </strong>{" "}
                                                                    : 3,81
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    80 / 21 |
                                                                    (total(SKS x
                                                                    BOBOT)
                                                                    terbaik) /
                                                                    total SKS
                                                                </p>
                                                                <button
                                                                    onClick={
                                                                        downloadKHS
                                                                    }
                                                                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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

export default DetailPerwalian;
