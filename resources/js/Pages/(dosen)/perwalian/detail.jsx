import React, { useState, useRef, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
    Eye,
    Search,
    Trash2,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
} from "lucide-react";

const DetailPerwalian = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    const [activeTab, setActiveTab] = useState('IRS');
    const [openSemesters, setOpenSemesters] = useState({});

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const toggleSemester = (semester) => {
        setOpenSemesters((prev) => ({
            ...prev,
            [semester]: !prev[semester],
        }));
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Tambahkan judul
        const title = "ISIAN RANCANGAN STUDI";
        doc.setFontSize(18);
        const titleWidth = doc.getTextWidth(title);
        doc.text(title, (pageWidth - titleWidth) / 2, 22);

        // Tambahkan informasi tambahan
        const tahunAjaran = "2022/2023 Ganjil";
        const nim = "123456789";
        const nama = "John Doe";
        const programStudi = "Teknik Informatika";
        const dosenWali = "Dr. Jane Smith";

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

        // Tambahkan tabel
        doc.autoTable({
            html: "#irs-mahasiswa",
            startY: 62, // Posisi Y di mana tabel akan dimulai
        });

        // Simpan PDF
        doc.save("Print IRS.pdf");
    };    

    const semesterData = {
        semester1: {
            title: "Semester-1 | Tahun Ajaran 2022/2023 Ganjil",
            sks: 21,
            courses: [
                {
                    no: 1,
                    kode: "UUW00003",
                    mataKuliah: "Pancasila dan Kewarganegaraan",
                    jadwal: "Selasa pukul 18:20 - 20:50",
                    kelas: "C",
                    sks: 3,
                    ruang: ["A303", "E101"],
                    status: "BARU",
                    namaDosen: "Dr. Drs. Slamet Subekti, M.Hum.",
                    nilai: "A",
                },
                {
                    no: 2,
                    kode: "UUW00005",
                    mataKuliah: "Olahraga",
                    jadwal: "Rabu pukul 06:00 - 06:50",
                    kelas: "A",
                    sks: 1,
                    ruang: "Lapangan Stadion UNDIP Tembalang",
                    status: "BARU",
                    namaDosen: "Dra. Endang Kumaidah, M.Kes.",
                    nilai: "A",
                },
                {
                    no: 3,
                    kode: "PAIK6102",
                    mataKuliah: "Dasar Pemrograman",
                    jadwal: "Rabu pukul 08:50 - 11:20",
                    kelas: "C",
                    sks: 3,
                    ruang: "K202",
                    status: "BARU",
                    namaDosen: [
                        "Dr.Eng. Adi Wibowo, S.Si., M.Kom.",
                        "Khadijah, S.Kom., M.Cs.",
                    ],
                    nilai: "A",
                },
                {
                    no: 4,
                    kode: "PAIK6103",
                    mataKuliah: "Dasar Sistem",
                    jadwal: "Kamis pukul 07:00 - 09:30",
                    kelas: "C",
                    sks: 3,
                    ruang: "E102",
                    status: "BARU",
                    namaDosen: [
                        "Rismiyati, B.Eng, M.Cs",
                        "Muhammad Malik Hakim, S.T., M.T.I.",
                    ],
                    nilai: "A",
                },
                {
                    no: 5,
                    kode: "PAIK6104",
                    mataKuliah: "Logika Informatika",
                    jadwal: "Kamis pukul 15:40 - 18:10",
                    kelas: "C",
                    sks: 3,
                    ruang: "A205",
                    status: "BARU",
                    namaDosen: [
                        "Dr. Sutikno, S.T., M.Cs.",
                        "Dr. Aris Sugiharto, S.Si., M.Kom.",
                    ],
                    nilai: "B",
                },
                {
                    no: 6,
                    kode: "PAIK6105",
                    mataKuliah: "Struktur Diskrit",
                    jadwal: [
                        "Kamis pukul 18:20 - 20:00",
                        "Jumat pukul 16:40 - 18:20",
                    ],
                    kelas: "C",
                    sks: 4,
                    ruang: "E101",
                    status: "BARU",
                    namaDosen: [
                        "Nurdin Bahtiar, S.Si., M.T.",
                        "Sandy Kurniawan, S.Kom., M.Kom.",
                        "Dr. Aris Sugiharto, S.Si., M.Kom.",
                    ],
                    nilai: "A",
                },
                {
                    no: 7,
                    kode: "UUW00007",
                    mataKuliah: "Bahasa Inggris",
                    jadwal: "Jumat pukul 07:00 - 08:40",
                    kelas: "C",
                    sks: 2,
                    ruang: "E101",
                    status: "BARU",
                    namaDosen: "Dra. R.A.J. Atrinawati, M.Hum.",
                    nilai: "A",
                },
                {
                    no: 8,
                    kode: "PAIK6101",
                    mataKuliah: "Matematika I",
                    jadwal: "Jumat pukul 14:50 - 16:30",
                    kelas: "C",
                    sks: 2,
                    ruang: "E101",
                    status: "BARU",
                    namaDosen: [
                        "Prof. Dr. Dra. Sunarsih, M.Si.",
                        "Solikhin, S.Si., M.Sc.",
                    ],
                    nilai: "B",
                },
            ],
        },
        semester2: {
            title: "Semester-2 | Tahun Ajaran 2022/2023 Genap",
            sks: 24,
            courses: [
                {
                    no: 1,
                    kode: "UUW00004",
                    mataKuliah: "Bahasa Indonesia",
                    jadwal: "Senin pukul 10:40 - 12:20",
                    kelas: "C",
                    sks: 2,
                    ruang: "E103",
                    status: "BARU",
                    namaDosen: "Dr. Drs. Muh Abdullah, M.A.",
                    nilai: "A",
                },
                {
                    no: 2,
                    kode: "PAIK6202",
                    mataKuliah: "Algoritma dan Pemrograman",
                    jadwal: [
                        "Senin pukul 13:00 - 14:40",
                        "Rabu pukul 13:00 - 14:40",
                    ],
                    kelas: "C",
                    sks: 4,
                    ruang: "E103",
                    status: "BARU",
                    namaDosen: [
                        "Dr. Aris Puji Widodo, S.Si., M.T.",
                        "Drs. Eko Adi Sarwoko, M.Komp.",
                    ],
                    nilai: "A",
                },
                {
                    no: 3,
                    kode: "PAIK6402",
                    mataKuliah: "Jaringan Komputer",
                    jadwal: "Selasa pukul 07:00 - 09:30",
                    kelas: "A",
                    sks: 3,
                    ruang: "K102",
                    status: "BARU",
                    namaDosen: [
                        "Prajanto Wahyu Adi, M.Kom.",
                        "Dr.Eng. Adi Wibowo, S.Si., M.Kom.",
                        "Dr. Sutikno, S.T., M.Cs.",
                        "Guruh Aryotejo, S.Kom., M.Sc.",
                        "Yunila Dwi Putri Ariyanti, S.Kom., M.Kom.",
                        "Dr. Aris Sugiharto, S.Si., M.Kom.",
                    ],
                    nilai: "A",
                },
                {
                    no: 4,
                    kode: "UUW00011",
                    mataKuliah: "Pendidikan Agama Islam",
                    jadwal: "Selasa pukul 09:40 - 11:20",
                    kelas: "C",
                    sks: 2,
                    ruang: "E103",
                    status: "BARU",
                    namaDosen: "Muhyidin, S.Ag., M.Ag., M.H.",
                    nilai: "A",
                },
                {
                    no: 5,
                    kode: "PAIK6203",
                    mataKuliah: "Organisasi dan Arsitektur Komputer",
                    jadwal: "Rabu pukul 07:00 - 09:30",
                    kelas: "C",
                    sks: 3,
                    ruang: "E103",
                    status: "BARU",
                    namaDosen: [
                        "Rismiyati, B.Eng, M.Cs",
                        "Muhammad Malik Hakim, S.T., M.T.I.",
                    ],
                    nilai: "A",
                },
                {
                    no: 6,
                    kode: "PAIK6603",
                    mataKuliah: "Masyarakat dan Etika Profesi",
                    jadwal: "Rabu pukul 15:40 - 18:10",
                    kelas: "C",
                    sks: 3,
                    ruang: "E102",
                    status: "BARU",
                    namaDosen: [
                        "Yunila Dwi Putri Ariyanti, S.Kom., M.Kom.",
                        "Nurdin Bahtiar, S.Si., M.T.",
                        "Khadijah, S.Kom., M.Cs.",
                        "Muhammad Malik Hakim, S.T., M.T.I.",
                    ],
                    nilai: "A",
                },
                {
                    no: 7,
                    kode: "PAIK6201",
                    mataKuliah: "Matematika II",
                    jadwal: "Jumat pukul 07:00 - 08:40",
                    kelas: "C",
                    sks: 2,
                    ruang: "E103",
                    status: "BARU",
                    namaDosen: [
                        "Solikhin, S.Si., M.Sc.",
                        "Farikhin, S.Si., M.Si., Ph.D.",
                    ],
                    nilai: "A",
                },
                {
                    no: 8,
                    kode: "UUW00006",
                    mataKuliah: "Internet of Things (IoT)",
                    jadwal: "Jumat pukul 09:40 - 11:20",
                    kelas: "C",
                    sks: 2,
                    ruang: "E103",
                    status: "BARU",
                    namaDosen: [
                        "Priyo Sidik Sasongko, S.Si., M.Kom.",
                        "Guruh Aryotejo, S.Kom., M.Sc.",
                        "Nurdin Bahtiar, S.Si., M.T.",
                        "Yunila Dwi Putri Ariyanti, S.Kom., M.Kom.",
                        "Drs. Eko Adi Sarwoko, M.Komp.",
                    ],
                    nilai: "A",
                },
                {
                    no: 9,
                    kode: "PAIK6204",
                    mataKuliah: "Aljabar Linier",
                    jadwal: "Jumat pukul 15:40 - 18:10",
                    kelas: "C",
                    sks: 3,
                    ruang: "B103",
                    status: "BARU",
                    namaDosen: [
                        "Dr. Retno Kusumaningrum, S.Si., M.Kom.",
                        "Priyo Sidik Sasongko, S.Si., M.Kom.",
                        "Dr. Aris Sugiharto, S.Si., M.Kom.",
                    ],
                    nilai: "A",
                },
            ],
        },
    };

    // KHS
    function hitungBobot(nilaiHuruf) {
        switch (nilaiHuruf.toUpperCase()) {
            case 'A':
                return 4;
            case 'B':
                return 3;
            case 'C':
                return 2;
            case 'D':
                return 1;
            case 'E':
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

        const tahunAjaran = "2022/2023 Ganjil";
        const nim = "123456789";
        const nama = "John Doe";
        const programStudi = "Teknik Informatika";
        const dosenWali = "Dr. Jane Smith";
    
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

    return (
        <DosenLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Perwalian
                    </h1>
                </div>
                <div className="mb-4">
                    <a href="/dosen/perwalian" className="text-blue-600"><br />Kembali</a>
                </div>
                <div className="mb-4">
                    <label>Nama : Hulk</label>
                    <br />
                    <label>NIM : 24060122180001</label>
                </div>
                <div className="flex w-full border-b mb-4">
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

                <div className="p-4 bg-white-100 rounded-lg shadow-md">
                    {activeTab === "IRS" && (
                        <div className="w-full max-w-6xl mx-auto p-4">
                            <div className="border rounded-md shadow-sm">
                                {Object.entries(semesterData).map(
                                    ([semesterKey, semesterInfo]) => (
                                        <div key={semesterKey} className="mb-4">
                                            <div 
                                                onClick={() => toggleSemester(semesterKey)}
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
                                                {openSemesters[semesterKey] ? (<ChevronUp className="text-blue-900" />) : (<ChevronDown className="text-blue-900" />)}
                                            </div>
                                            {openSemesters[semesterKey] && (
                                                <div className="border border-gray-200 rounded-b p-4">
                                                    <h3 className="text-center font-bold mb-4">
                                                        IRS MAHASISWA (SUDAH DISETUJUI WALI)
                                                    </h3>
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full table-layout-fixed" id="irs-mahasiswa">
                                                            <thead className="text-[14px]">
                                                                <tr className="bg-blue-500 text-white">
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 border"
                                                                        style={{width: "250px", textAlign: "center"}}
                                                                    >
                                                                        NO
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 border"
                                                                        style={{width: "250px", textAlign: "center"}}
                                                                    >
                                                                        KODE
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 border"
                                                                        style={{width: "250px", textAlign: "center"}}
                                                                    >
                                                                        MATA KULIAH
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 border"
                                                                        style={{width: "250px", textAlign: "center"}}
                                                                    >
                                                                        KELAS
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 border"
                                                                        style={{width: "250px", textAlign: "center"}}
                                                                    >
                                                                        SKS
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 border"
                                                                        style={{width: "250px", textAlign: "center"}}
                                                                    >
                                                                        RUANG
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 border"
                                                                        style={{width: "250px", textAlign: "center"}}
                                                                    >
                                                                        STATUS
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 border"
                                                                        style={{width: "250px", textAlign: "center"}}
                                                                    >
                                                                        NAMA DOSEN
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="text-[14px]">
                                                                {semesterInfo.courses.map((course) => (
                                                                    <React.Fragment key={course.kode}>
                                                                    <tr className="border">
                                                                        <td className="p-2 border text-center">
                                                                            {course.no}
                                                                        </td>
                                                                        <td className="p-2 border">
                                                                            {course.kode}
                                                                        </td>
                                                                        <td className="p-2 border">
                                                                            {course.mataKuliah}
                                                                        </td>
                                                                        <td className="p-2 border text-center">
                                                                            {course.kelas}
                                                                        </td>
                                                                        <td className="p-2 border text-center">
                                                                            {course.sks}
                                                                        </td>
                                                                        <td className="p-2 border">
                                                                            {Array.isArray(course.ruang) ? course.ruang.map((ruang, index) => (
                                                                                <div key={index}>
                                                                                    {ruang}
                                                                                </div>
                                                                            )) : course.ruang}
                                                                        </td>
                                                                        <td className="p-2 border text-center">
                                                                            {course.status}
                                                                        </td>
                                                                        <td className="p-2 border">
                                                                            {Array.isArray(course.namaDosen) ? course.namaDosen.map((dosen, index) => (
                                                                                <div key={index}>
                                                                                    {dosen}
                                                                                </div>
                                                                            )) : course.ruang}
                                                                        </td>
                                                                        </tr>
                                                                            {course.jadwal && (
                                                                                <tr className="border bg-gray-50">
                                                                                    <td colSpan="8" className="p-2 border text-gray-600 italic">
                                                                                        {Array.isArray(course.jadwal) ? course.jadwal.map((jadwal, index) => (
                                                                                            <div key={index}>
                                                                                                {jadwal}
                                                                                            </div>
                                                                                        )) : course.jadwal}
                                                                                    </td>
                                                                                </tr>
                                                                            )}
                                                                        </React.Fragment>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                        <button
                                                            onClick={handleDownloadPDF} className="w-40 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                                            <div className="flex items-center justify-center">
                                                                <Icon
                                                                    icon="material-symbols-light:print"
                                                                    height="24"
                                                                    width="24"
                                                                />
                                                                <span className="ml-2">Cetak IRS</span>
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
                                {Object.entries(semesterData).map(([semesterKey, semesterInfo]) => (
                                    <div key={semesterKey} className="mb-4">
                                        <div 
                                            onClick={() => toggleSemester(semesterKey)}
                                            className="flex justify-between items-center p-4 bg-blue-100 hover:bg-blue-200 cursor-pointer rounded-t"
                                        >
                                            <div>
                                                <h2 className="text-blue-900 font-medium">
                                                    {semesterInfo.title}
                                                </h2>
                                                <p className="text-sm text-blue-700">
                                                    Jumlah SKS {semesterInfo.sks}
                                                </p>
                                            </div>
                                            {openSemesters[semesterKey] ? (<ChevronUp className="text-blue-900" />) : (<ChevronDown className="text-blue-900" />)}
                                        </div>
                                        
                                        {openSemesters[semesterKey] && (
                                            <div className="border border-gray-200 rounded-b p-4">
                                                <h3 className="text-center font-bold mb-4">KHS Mahasiswa</h3>
                                                <table className="w-full table-layout-fixed" id="khs-mahasiswa">
                                                    <thead className="bg-blue-500 text-white text-xs">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 border" style={{width: "250px", textAlign: "center"}}>NO</th>
                                                            <th scope="col" className="px-6 py-3 border" style={{width: "250px", textAlign: "center"}}>KODE</th>
                                                            <th scope="col" className="px-6 py-3 border" style={{width: "250px", textAlign: "center"}}>MATA KULIAH</th>
                                                            <th scope="col" className="px-6 py-3 border" style={{width: "250px", textAlign: "center"}}>JENIS</th>
                                                            <th scope="col" className="px-6 py-3 border" style={{width: "250px", textAlign: "center"}}>STATUS</th>
                                                            <th scope="col" className="px-6 py-3 border" style={{width: "250px", textAlign: "center"}}>SKS</th>
                                                            <th scope="col" className="px-6 py-3 border" style={{width: "250px", textAlign: "center"}}>NILAI HURUF</th>
                                                            <th scope="col" className="px-6 py-3 border" style={{width: "250px", textAlign: "center"}}>BOBOT</th>
                                                            <th scope="col" className="px-6 py-3 border" style={{width: "250px", textAlign: "center"}}>SKS x BOBOT</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-xs">
                                                        {semesterInfo.courses.map((course, index) => (
                                                            <tr key={index} className="border">
                                                                <td className="p-2 border text-center">{course.no}</td>
                                                                <td className="p-2 border text-center">{course.kode}</td>
                                                                <td className="p-2 border text-center">{course.mataKuliah}</td>
                                                                <td className="p-2 border text-center">WAJIB</td>
                                                                <td className="p-2 border text-center">{course.status}</td>
                                                                <td className="p-2 border text-center">{course.sks}</td>
                                                                <td className="p-2 border text-center">{course.nilai}</td>
                                                                <td className="p-2 border text-center">{hitungBobot(course.nilai)}</td>
                                                                <td className="p-2 border text-center">{course.sks * hitungBobot(course.nilai)}</td>
                                                            </tr>
                                                        ))}
                                                        <tr className="bg-gray-200 font-semibold">
                                                            <td colSpan="5" className="border px-2 py-1 text-right">Total</td>
                                                            <td className="border px-2 py-1 text-center">21</td>
                                                            <td className="border px-2 py-1"></td>
                                                            <td className="border px-2 py-1 text-center">10</td>
                                                            <td className="border px-2 py-1 text-center">100</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="mt-4 p-4">
                                                    <p><strong>IP Semester</strong> : 3,81</p>
                                                    <p className="text-sm text-gray-500">80 / 21 | (total SKS x BOBOT) / total SKS</p>
                                                    <p><strong>IP Kumulatif</strong> : 3,81</p>
                                                    <p className="text-sm text-gray-500">80 / 21 | (total(SKS x BOBOT) terbaik) / total SKS</p>
                                                    <button
                                                        onClick={downloadKHS}
                                                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                    >
                                                        <div className="flex items-center justify-center">
                                                            <Icon icon="material-symbols-light:print" height="24" width="24" />
                                                            <span className="ml-2">Cetak KHS</span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}    
                </div>
            </main>
        </DosenLayout>
    );
};

export default DetailPerwalian;