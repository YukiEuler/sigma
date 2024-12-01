import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const IRSMahasiswa = () => {
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

    const semesterData = props.irs;

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

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Isian Rancangan Studi (IRS)
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
                                                            IRS MAHASISWA ({semesterInfo.courses[0].is_verified === 1 ? "SUDAH DISETUJUI WALI" : "BELUM DISETUJUI WALI"})
                                                        </h3>
                                                        {console.log(semesterInfo)}
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
                                                                                            course.kelas.kode_kelas
                                                                                        }
                                                                                    </td>
                                                                                    <td className="p-2 border text-center">
                                                                                        {
                                                                                            course.sks
                                                                                        }
                                                                                    </td>
                                                                                    <td className="p-2 border">
                                                                                        {course.jadwal_kuliah.map((jadwal, index) => (
                                                                                            <div key={index}>
                                                                                                {jadwal.ruangan.nama_ruang}
                                                                                            </div>
                                                                                        ))}
                                                                                    </td>
                                                                                    <td className="p-2 border text-center">
                                                                                        {
                                                                                            course.status
                                                                                        }
                                                                                    </td>
                                                                                    <td className="p-2 border">
                                                                                        {course.mata_kuliah.dosen.map((elm, index) => (
                                                                                            <div key={index}>
                                                                                                {elm.nama}
                                                                                            </div>
                                                                                        ))}
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
                                                                                                              {
                                                                                                                  `${jadwal.hari} pukul ${jadwal.waktu_mulai.slice(0, -3)} - ${jadwal.waktu_selesai.slice(0, -3)}`
                                                                                                              }
                                                                                                          </div>
                                                                                                      )
                                                                                                  )
                                                                                            }
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                            </React.Fragment>
                                                                        )
                                                                    )}
                                                                </tbody>
                                                            </table>
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
                        </div>
                    </div>
                </div>
            </main>
        </MahasiswaLayout>
    );
};

export default IRSMahasiswa;
