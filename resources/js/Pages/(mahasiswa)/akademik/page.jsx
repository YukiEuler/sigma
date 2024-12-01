import React, { useState, useRef, useEffect } from "react";
import {
    Eye,
    Search,
    ChevronDown,
    Trash2,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { usePage } from "@inertiajs/inertia-react";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Akademik = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const jadwalData = props.jadwal;
    const [jadwal, setJadwal] = useState(jadwalData);
    const irsData = props.irs;
    const [irs, setIrs] = useState(irsData);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const dropdownRef = useRef(null);
    const [isWithinSchedule, setIsWithinSchedule] = useState(false);
    const [activeTab, setActiveTab] = useState("Pengisian IRS");
    const [openSemesters, setOpenSemesters] = useState({});
    const [academicCalendar] = useState({
        year: "2024",
        semester: "Ganjil",
        irsSchedule: {
            startDate: "30-08-2024",
            endDate: "13-09-2024",
        },
    });

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

    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

    const timeSlots = [];
    for (let i = 7; i <= 21; i++) {
        timeSlots.push(`${i.toString().padStart(2, "0")}:00`);
    }

    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    const parseTime = (timeStr) => {
        const [hours, minutes, seconds] = timeStr.split(":").map(Number);
        return new Date(1970, 0, 1, hours, minutes, seconds);
    };

    // Calculate total credits
    const totalCredits = registeredCourses.reduce(
        (sum, course) => sum + course.credits,
        0
    );

    // Handle course selection from dropdown
    const handleCourseSelect = (course) => {
        if (
            !selectedCourses.some(
                (selected) => selected.kode_mk === course.kode_mk
            )
        ) {
            setSelectedCourses([...selectedCourses, course]);
            setFilteredCourses(
                filteredCourses.filter((c) => c.kode_mk !== course.kode_mk)
            );
        }
        setIsDropdownOpen(false);
        setSearchQuery("");
    };

    // Handle course visibility toggle
    const handleToggleCourse = (courseId) => {
        setSelectedCourses(
            selectedCourses.filter((course) => course.kode_mk !== courseId)
        );
        const courseToAdd = jadwalData.find(
            (course) => course.kode_mk === courseId
        );
        if (courseToAdd) {
            setFilteredCourses([...filteredCourses, courseToAdd]);
        }
    };

    // Handle class selection
    const handleClassSelect = (course, classInfo) => {
        const existingCourse = registeredCourses.find(
            (c) => c.kode_mk === course.kode_mk
        );
        if (!existingCourse) {
            setRegisteredCourses([
                ...registeredCourses,
                {
                    ...course,
                    selectedClass: classInfo,
                },
            ]);
            Inertia.visit("/mahasiswa/buat-irs/insert/" + classInfo.id_kelas, {
                method: "get",
                preserveState: true,
            });
        }
    };

    // Helper function untuk menentukan slot waktu berdasarkan threshold 30 menit
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

    // Helper function untuk mengecek apakah suatu jadwal masuk ke dalam slot waktu
    const isScheduleInTimeSlot = (scheduleTime, slotTime) => {
        const appropriateSlot = getTimeSlot(scheduleTime);
        return appropriateSlot === slotTime;
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const toggleSemester = (semester) => {
        setOpenSemesters((prev) => ({
            ...prev,
            [semester]: !prev[semester],
        }));
    };

    // Handle course removal from registration
    const handleRemoveCourse = (courseId) => {
        Swal.fire({
            title: "Apakah Anda yakin ingin menghapus course ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
        }).then((result) => {
            if (result.isConfirmed) {
                setRegisteredCourses(
                    registeredCourses.filter(
                        (course) => course.selectedClass.id_kelas !== courseId
                    )
                );
                Inertia.visit("/mahasiswa/buat-irs/delete/" + courseId, {
                    method: "get",
                    preserveState: true,
                });
                Swal.fire("Deleted!", "Course sudah dihapus.", "success");
            }
        });
    };

    // Handle submission
    const handleSubmit = () => {
        Inertia.visit("/mahasiswa/buat-irs/ubah-status/", {
            method: "get",
            preserveState: true,
        });
        setIsSubmitted(!isSubmitted);
    };

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

    const downloadIRS = () => {
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

    //TRANSKRIP
    const downloadTS = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        const title = "TRANSKRIP AKADEMIK";
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
            html: "#ts-mahasiswa",
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
        doc.save("Transkrip.pdf");
    };

    const Schedule = () => (
        <div className="space-y-2 max-h-[67vh] overflow-y-auto scrollbar-hide">
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2 w-20"></th>
                        {days.map((day) => (
                            <th key={day} className="border p-2 w-48">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((time, index) => (
                        <tr key={time}>
                            <td className="border p-2 text-center align-top">
                                {time}
                            </td>
                            {days.map((day) => (
                                <td
                                    key={`${day}-${time}`}
                                    className="border p-2 align-top"
                                >
                                    <div className="flex flex-col gap-2">
                                        {selectedCourses.map((course) =>
                                            course.jadwal_kuliah.map(
                                                (classInfo) => {
                                                    if (
                                                        classInfo.hari ===
                                                            day &&
                                                        isScheduleInTimeSlot(
                                                            classInfo.waktu_mulai,
                                                            time
                                                        )
                                                    ) {
                                                        const kelasRegistered =
                                                            registeredCourses.some(
                                                                (
                                                                    registeredCourse
                                                                ) =>
                                                                    registeredCourse
                                                                        .selectedClass
                                                                        .id_kelas ===
                                                                    classInfo.id_kelas
                                                            );
                                                        const matkulRegistered =
                                                            registeredCourses.some(
                                                                (
                                                                    registeredCourse
                                                                ) =>
                                                                    registeredCourse.kode_mk ===
                                                                    course.kode_mk
                                                            );
                                                        const bentrok =
                                                            registeredCourses.some(
                                                                (
                                                                    registeredCourse
                                                                ) => {
                                                                    const jadwal =
                                                                        registeredCourse.selectedClass;
                                                                    return (
                                                                        jadwal.hari ===
                                                                            classInfo.hari &&
                                                                        parseTime(
                                                                            jadwal.waktu_mulai
                                                                        ) <=
                                                                            parseTime(
                                                                                classInfo.waktu_selesai
                                                                            ) &&
                                                                        parseTime(
                                                                            jadwal.waktu_selesai
                                                                        ) >=
                                                                            parseTime(
                                                                                classInfo.waktu_mulai
                                                                            )
                                                                    );
                                                                }
                                                            );
                                                        const maxSks =
                                                            totalCredits +
                                                                course.sks >
                                                            mahasiswa.maxSks;
                                                        let tooltipMessage = "";
                                                        const periodeGanti =
                                                            Boolean(
                                                                mahasiswa.periode_ganti
                                                            );
                                                        if (!periodeGanti) {
                                                            tooltipMessage =
                                                                "Tidak dalam periode penggantian";
                                                        } else if (isVerified) {
                                                            tooltipMessage =
                                                                "IRS telah disetujui";
                                                        } else if (
                                                            isSubmitted
                                                        ) {
                                                            tooltipMessage =
                                                                "IRS telah diajukan";
                                                        } else if (
                                                            kelasRegistered
                                                        ) {
                                                            tooltipMessage =
                                                                "Kelas sudah terdaftar";
                                                        } else if (
                                                            matkulRegistered
                                                        ) {
                                                            tooltipMessage =
                                                                "Mata kuliah sudah terdaftar";
                                                        } else if (bentrok) {
                                                            tooltipMessage =
                                                                "Jadwal bentrok";
                                                        } else if (maxSks) {
                                                            tooltipMessage =
                                                                "Melebihi batasan SKS";
                                                        }

                                                        return (
                                                            <div
                                                                key={`${course.id}-${classInfo.code}`}
                                                                className={`p-2 rounded w-full ${
                                                                    kelasRegistered
                                                                        ? "cursor-not-allowed bg-green-400 hover:bg-green-500"
                                                                        : matkulRegistered
                                                                        ? "cursor-not-allowed bg-yellow-100 hover:bg-yellow-200"
                                                                        : bentrok ||
                                                                          maxSks
                                                                        ? "cursor-not-allowed bg-red-400 hover:bg-red-500"
                                                                        : isSubmitted ||
                                                                          isVerified ||
                                                                          !periodeGanti
                                                                        ? "cursor-not-allowed bg-blue-200 hover:bg-blue-300"
                                                                        : "cursor-pointer bg-blue-200 hover:bg-blue-300"
                                                                }`}
                                                                onClick={() =>
                                                                    !kelasRegistered &&
                                                                    !matkulRegistered &&
                                                                    !bentrok &&
                                                                    !isSubmitted &&
                                                                    !isVerified &&
                                                                    !maxSks &&
                                                                    periodeGanti &&
                                                                    handleClassSelect(
                                                                        course,
                                                                        classInfo
                                                                    )
                                                                }
                                                                title={
                                                                    tooltipMessage
                                                                }
                                                            >
                                                                <div className="text-sm font-semibold">
                                                                    {
                                                                        course.nama
                                                                    }
                                                                </div>
                                                                <div className="text-xs">
                                                                    {
                                                                        course.type
                                                                    }{" "}
                                                                    (SMT{" "}
                                                                    {
                                                                        course.semester
                                                                    }
                                                                    ) (
                                                                    {course.sks}{" "}
                                                                    SKS)
                                                                    <br />
                                                                    Kelas:{" "}
                                                                    {
                                                                        classInfo.kelas
                                                                    }
                                                                    <br />
                                                                    Kuota:{" "}
                                                                    {
                                                                        classInfo.kuota
                                                                    }{" "}
                                                                    <br />
                                                                    <div className="flex justify-start items-center gap-1">
                                                                        <Icon icon="lsicon:time-two-outline" />
                                                                        {
                                                                            classInfo.waktu_mulai
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            classInfo.waktu_selesai
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }
                                            )
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    useEffect(() => {
        const checkSchedule = () => {
            const now = new Date("2023-08-31");
            const startDate = parseDate(academicCalendar.irsSchedule.startDate);
            const endDate = parseDate(academicCalendar.irsSchedule.endDate);

            // Set end date to end of day
            endDate.setHours(23, 59, 59, 999);

            const isWithin = now >= startDate && now <= endDate;
            setIsWithinSchedule(isWithin);
        };
        checkSchedule();
        setJadwal(jadwalData, academicCalendar);
    }, [jadwalData]);

    useEffect(() => {
        setFilteredCourses(
            jadwalData.filter(
                (course) =>
                    (course.nama
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                        course.kode_mk
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())) &&
                    !irs.some(
                        (registeredCourse) =>
                            registeredCourse.kode_mk === course.kode_mk
                    ) &&
                    course.semester != mahasiswa.semester
            )
        );
    }, []);

    // Set Registered Awal
    useEffect(() => {
        const initialRegisteredCourses = [],
            initialCourseSelect = [];
        for (const course of irs) {
            initialRegisteredCourses.push(course);
            const elm = jadwalData.find(
                (filteredCourse) => filteredCourse.kode_mk === course.kode_mk
            );
            initialCourseSelect.push(elm);
        }
        const filteredJadwal = jadwal.filter(
            (elm) => elm.semester == mahasiswa.semester
        );
        const updatedFilteredJadwal = filteredJadwal
            .map((course) => {
                const updatedCourse = { ...course };
                updatedCourse.selectedClass = updatedCourse.jadwal_kuliah;
                delete updatedCourse.jadwal_kuliah;
                return updatedCourse;
            })
            .sort((a, b) => a.kode_mk.localeCompare(b.kode_mk));
        for (const course of updatedFilteredJadwal) {
            if (
                initialRegisteredCourses.some(
                    (registeredCourse) =>
                        registeredCourse.kode_mk === course.kode_mk
                )
            )
                continue;
            const elm = jadwalData.find(
                (filteredCourse) => filteredCourse.kode_mk === course.kode_mk
            );
            if (elm) initialCourseSelect.push(elm);
        }
        setRegisteredCourses(initialRegisteredCourses);
        setSelectedCourses(initialCourseSelect);
        setIsSubmitted(irs.length > 0 && Boolean(irs[0].sudah_diajukan));
        setIsVerified(irs.length > 0 && Boolean(irs[0].sudah_disetujui));
    }, []);

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Akademik
                    </h1>
                </div>
                {/* Tab Menu */}
                <div className="flex w-full border-b mt-4">
                    <button
                        onClick={() => handleTabClick("Pengisian IRS")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "Pengisian IRS"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Pengisian IRS
                    </button>
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
                    <button
                        onClick={() => handleTabClick("Transkrip")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "Transkrip"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Transkrip
                    </button>
                </div>

                <div>
                    {activeTab === "Pengisian IRS" && (
                        <div>
                            <div
                                className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 lg:grid-cols-7"
                                style={{
                                    height: "78vh",
                                }}
                            >
                                <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100 lg:col-span-2">
                                    <div
                                        className="p-2 border rounded-lg shadow-lg bg-white"
                                        style={{
                                            height: "73vh",
                                        }}
                                    >
                                        <div className="flex flex-col space-y-2 border-2 border-black p-2 m-2 rounded-md">
                                            <div className="student-info-container font-bold">
                                                <div className="student-info-item flex text-xs">
                                                    <label className="w-24">
                                                        Nama
                                                    </label>
                                                    <span>
                                                        : {mahasiswa.nama}
                                                    </span>
                                                </div>
                                                <div className="student-info-item flex text-xs">
                                                    <label className="w-24">
                                                        NIM
                                                    </label>
                                                    <span>
                                                        : {mahasiswa.nim}
                                                    </span>
                                                </div>
                                                <div className="student-info-item flex text-xs">
                                                    <label className="w-24">
                                                        Tahun Ajaran
                                                    </label>
                                                    <span>
                                                        :{" "}
                                                        {mahasiswa.tahun_ajaran}{" "}
                                                    </span>
                                                </div>
                                                <div className="student-info-item flex text-xs">
                                                    <label className="w-24">
                                                        Semester
                                                    </label>
                                                    <span>
                                                        : {mahasiswa.semester}{" "}
                                                    </span>
                                                </div>
                                                <div className="student-info-item flex text-xs">
                                                    <label className="w-24">
                                                        IPK
                                                    </label>
                                                    <span>
                                                        : {mahasiswa.ipk}
                                                    </span>
                                                </div>
                                                <div className="student-info-item flex text-xs">
                                                    <label className="w-24">
                                                        IPS
                                                    </label>
                                                    <span>
                                                        : {mahasiswa.ips}{" "}
                                                    </span>
                                                </div>
                                                <div className="student-info-item flex text-xs">
                                                    <label className="w-24">
                                                        Max Beban SKS
                                                    </label>
                                                    <span>
                                                        : {mahasiswa.maxSks}{" "}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="max-w-lg mx-auto p-2 mt-2">
                                            <div
                                                className="mb-6"
                                                ref={dropdownRef}
                                            >
                                                <label className="block text-sm font-medium text-black mb-2">
                                                    Tambah Mata Kuliah
                                                </label>

                                                {/* Custom dropdown button */}
                                                <button
                                                    onClick={() =>
                                                        setIsDropdownOpen(
                                                            !isDropdownOpen
                                                        )
                                                    }
                                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-left flex justify-between items-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <span className="text-gray-700">
                                                        Select an option
                                                    </span>
                                                    <ChevronDown
                                                        className={`h-5 w-5 text-gray-400 transition-transform ${
                                                            isDropdownOpen
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </button>

                                                {/* Dropdown menu with search */}
                                                {isDropdownOpen && (
                                                    <div className="absolute mt-1 w-full max-w-[18vw] bg-white border border-gray-300 rounded-md shadow-lg">
                                                        {/* Search input */}
                                                        <div className="p-2 border-b border-gray-200">
                                                            <div className="relative">
                                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Cari mata kuliah..."
                                                                    value={
                                                                        searchQuery
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setSearchQuery(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                    autoFocus
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Course options */}
                                                        <div className="max-h-56 overflow-y-auto">
                                                            {filteredCourses.length ===
                                                            0 ? (
                                                                <div className="p-4 text-gray-500 text-center">
                                                                    No courses
                                                                    found
                                                                </div>
                                                            ) : (
                                                                filteredCourses.map(
                                                                    (
                                                                        course
                                                                    ) => (
                                                                        <button
                                                                            key={
                                                                                course.kode_mk
                                                                            }
                                                                            onClick={() =>
                                                                                handleCourseSelect(
                                                                                    course
                                                                                )
                                                                            }
                                                                            className="w-full text-left p-2 hover:bg-gray-100"
                                                                        >
                                                                            <div className="font-medium text-[12px]">
                                                                                {
                                                                                    course.nama
                                                                                }
                                                                            </div>
                                                                            <div className="text-sm text-gray-500 text-[10px]">
                                                                                {
                                                                                    course.kode_mk
                                                                                }{" "}
                                                                                -{" "}
                                                                                {
                                                                                    course.sks
                                                                                }{" "}
                                                                                SKS
                                                                            </div>
                                                                        </button>
                                                                    )
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Selected courses list */}
                                            <h2 className="text-lg font-medium text-gray-900 mb-3">
                                                Mata Kuliah
                                            </h2>
                                            <div className="space-y-2 max-h-[28vh] overflow-y-auto pr-2">
                                                {console.log(selectedCourses)}
                                                {selectedCourses.map(
                                                    (course) => (
                                                        <div
                                                            key={course.id}
                                                            className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md shadow-sm"
                                                        >
                                                            <div>
                                                                <div className="font-medium text-[12px]">
                                                                    {
                                                                        course.nama
                                                                    }
                                                                </div>
                                                                <div className="text-[10px] text-gray-500">
                                                                    Semester{" "}
                                                                    {
                                                                        course.semester
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        course.kode_mk
                                                                    }{" "}
                                                                    (
                                                                    {course.sks}{" "}
                                                                    SKS)
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() =>
                                                                    handleToggleCourse(
                                                                        course.kode_mk
                                                                    )
                                                                }
                                                                className="p-1 text-gray-400 hover:text-gray-600"
                                                            >
                                                                <Eye
                                                                    size={20}
                                                                />
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 w-[115vh] transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100 lg:col-span-5">
                                    <div
                                        className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white overflow-y-auto"
                                        style={{
                                            height: "73vh",
                                        }}
                                    >
                                        <div className="flex flex-col space-y-2 p-2">
                                            <Schedule />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div
                                className={`fixed right-0 top-0 h-full bg-[#1EAADF] shadow-lg transition-all duration-300 ${
                                    isSidebarOpen ? "w-80" : "w-12" 
                                }`}
                            >
                                <button
                                    onClick={() =>
                                        setIsSidebarOpen(!isSidebarOpen)
                                    }
                                    className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-[#1EAADF] p-2 rounded-l-lg shadow-lg"
                                >
                                    {isSidebarOpen ? (
                                        <ChevronRight className="text-white" />
                                    ) : (
                                        <ChevronLeft className="text-white" />
                                    )}
                                    <div className="text-sm text-white">
                                        {totalCredits} SKS
                                    </div>
                                </button>

                                {isSidebarOpen && (
                                    <div className="p-4 pt-3 bg-[#1EAADF]">
                                        <h2 className="text-lg font-medium mb-2 text-white">
                                            Registered Courses
                                        </h2>
                                        <div
                                            className="space-y-2 mb-4 border-t overflow-y-auto"
                                            style={{ maxHeight: "500px" }}
                                        >
                                            <div className="mt-2">
                                                {registeredCourses.map(
                                                    (course) => (
                                                        <div
                                                            key={course.id}
                                                            className="p-2 bg-gray-50 rounded-md mt-1"
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <div className="font-medium text-[12px]">
                                                                        {
                                                                            course.nama
                                                                        }
                                                                    </div>
                                                                    <div className="text-[10px] text-gray-500">
                                                                        {
                                                                            course.kode_mk
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            course.sks
                                                                        }{" "}
                                                                        SKS
                                                                        <br />
                                                                        Kelas{" "}
                                                                        {
                                                                            course
                                                                                .selectedClass
                                                                                .kelas
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {!isSubmitted &&
                                                                    !isVerified && (
                                                                        <button
                                                                            onClick={() =>
                                                                                handleRemoveCourse(
                                                                                    course
                                                                                        .selectedClass
                                                                                        .id_kelas
                                                                                )
                                                                            }
                                                                            className="text-red-500"
                                                                        >
                                                                            <Trash2
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        </button>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative min-h-screen">
                                            {/* Konten halaman lainnya */}
                                            <div className="border-t pt-2 fixed bottom-3 w-[37vh] bg-[#1EAADF]">
                                                <div className="flex justify-between mb-3 text-white">
                                                    <span>Total SKS:</span>
                                                    <span className="font-medium">
                                                        {totalCredits}
                                                    </span>
                                                </div>
                                                {!isVerified && (
                                                    <button
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: "Apakah Anda yakin?",
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor:
                                                                    "#3085d6",
                                                                cancelButtonColor:
                                                                    "#d33",
                                                                confirmButtonText:
                                                                    isSubmitted
                                                                        ? "Ya, batalkan!"
                                                                        : "Ya, ajukan!",
                                                            }).then(
                                                                (result) => {
                                                                    if (
                                                                        result.isConfirmed
                                                                    ) {
                                                                        handleSubmit();
                                                                        Swal.fire(
                                                                            isSubmitted
                                                                                ? "Dibatalkan!"
                                                                                : "Diajukan!",
                                                                            isSubmitted
                                                                                ? "Pengajuan IRS telah dibatalkan."
                                                                                : "IRS Anda telah diajukan.",
                                                                            "success"
                                                                        );
                                                                    }
                                                                }
                                                            );
                                                        }}
                                                        className={`w-full p-2 rounded-md ${
                                                            isSubmitted
                                                                ? "bg-red-500 text-white hover:bg-red-600"
                                                                : "bg-green-500 text-white hover:bg-green-600"
                                                        }`}
                                                    >
                                                        {isSubmitted
                                                            ? "Batalkan"
                                                            : "Ajukan"}
                                                    </button>
                                                )}
                                                {isVerified && (
                                                    <button
                                                        className={`w-full p-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 cursor-not-allowed`}
                                                        disabled
                                                    >
                                                        {"IRS telah disetujui"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "IRS" && (
                        <div className="w-full max-w-6xl mx-auto p-4">
                            <div className="border rounded-md shadow-sm">
                                {Object.entries(semesterData).map(
                                    ([semesterKey, semesterInfo]) => (
                                        <div key={semesterKey} className="mb-4">
                                            <div
                                                onClick={() =>
                                                    toggleSemester(semesterKey)
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
                                                {openSemesters[semesterKey] ? (
                                                    <ChevronUp className="text-blue-900" />
                                                ) : (
                                                    <ChevronDown className="text-blue-900" />
                                                )}
                                            </div>
                                            {openSemesters[semesterKey] && (
                                                <div className="border border-gray-200 rounded-b p-4">
                                                    <h3 className="text-center font-bold mb-4">
                                                        IRS MAHASISWA (SUDAH
                                                        DISETUJUI WALI)
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
                                                                        course
                                                                    ) => (
                                                                        <React.Fragment
                                                                            key={
                                                                                course.kode
                                                                            }
                                                                        >
                                                                            <tr className="border">
                                                                                <td className="p-2 border text-center">
                                                                                    {
                                                                                        course.no
                                                                                    }
                                                                                </td>
                                                                                <td className="p-2 border">
                                                                                    {
                                                                                        course.kode
                                                                                    }
                                                                                </td>
                                                                                <td className="p-2 border">
                                                                                    {
                                                                                        course.mataKuliah
                                                                                    }
                                                                                </td>
                                                                                <td className="p-2 border text-center">
                                                                                    {
                                                                                        course.kelas
                                                                                    }
                                                                                </td>
                                                                                <td className="p-2 border text-center">
                                                                                    {
                                                                                        course.sks
                                                                                    }
                                                                                </td>
                                                                                <td className="p-2 border">
                                                                                    {Array.isArray(
                                                                                        course.ruang
                                                                                    )
                                                                                        ? course.ruang.map(
                                                                                              (
                                                                                                  ruang,
                                                                                                  index
                                                                                              ) => (
                                                                                                  <div
                                                                                                      key={
                                                                                                          index
                                                                                                      }
                                                                                                  >
                                                                                                      {
                                                                                                          ruang
                                                                                                      }
                                                                                                  </div>
                                                                                              )
                                                                                          )
                                                                                        : course.ruang}
                                                                                </td>
                                                                                <td className="p-2 border text-center">
                                                                                    {
                                                                                        course.status
                                                                                    }
                                                                                </td>
                                                                                <td className="p-2 border">
                                                                                    {Array.isArray(
                                                                                        course.namaDosen
                                                                                    )
                                                                                        ? course.namaDosen.map(
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
                                                                                                          dosen
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
                                                            onClick={
                                                                downloadIRS
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
                                                                    Cetak IRS
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
                                {Object.entries(semesterData).map(
                                    ([semesterKey, semesterInfo]) => (
                                        <div key={semesterKey} className="mb-4">
                                            <div
                                                onClick={() =>
                                                    toggleSemester(semesterKey)
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
                                                {openSemesters[semesterKey] ? (
                                                    <ChevronUp className="text-blue-900" />
                                                ) : (
                                                    <ChevronDown className="text-blue-900" />
                                                )}
                                            </div>

                                            {openSemesters[semesterKey] && (
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
                                                                    MATA KULIAH
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
                                                                    NILAI HURUF
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
                                                                    SKS x BOBOT
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
                                                                IP Semester
                                                            </strong>{" "}
                                                            : 3,81
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            80 / 21 | (total SKS
                                                            x BOBOT) / total SKS
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                IP Kumulatif
                                                            </strong>{" "}
                                                            : 3,81
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            80 / 21 | (total(SKS
                                                            x BOBOT) terbaik) /
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
                                                                    Cetak KHS
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

                    {activeTab === "Transkrip" && (
                        <div className="w-full max-w-6xl mx-auto p-4">
                            <h1 className="text-center font-bold mb-4">
                                Transkrip Mahasiswa
                            </h1>
                            <table
                                className="w-full table-layout-fixed"
                                id="ts-mahasiswa"
                            >
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th
                                            className="border px-2 py-1 text-center"
                                            style={{ width: "50px" }}
                                        >
                                            NO
                                        </th>
                                        <th className="border px-2 py-1 text-center">
                                            NAMA MATA KULIAH
                                        </th>
                                        <th
                                            className="border px-2 py-1 text-center"
                                            style={{ width: "60px" }}
                                        >
                                            SKS
                                        </th>
                                        <th
                                            className="border px-2 py-1 text-center"
                                            style={{ width: "60px" }}
                                        >
                                            NILAI
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(semesterData).flatMap(
                                        (semesterInfo, semesterIndex) =>
                                            semesterInfo.courses.map(
                                                (course, index) => (
                                                    <tr
                                                        key={`${course.kode}-${index}`}
                                                        className="border"
                                                    >
                                                        <td className="border px-2 py-1 text-center">
                                                            {semesterIndex *
                                                                semesterInfo
                                                                    .courses
                                                                    .length +
                                                                index +
                                                                1}
                                                        </td>
                                                        <td className="border px-2 py-1">
                                                            {course.mataKuliah}
                                                        </td>
                                                        <td className="border px-2 py-1 text-center">
                                                            {course.sks}
                                                        </td>
                                                        <td className="border px-2 py-1 text-center">
                                                            {course.nilai}
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                    )}
                                </tbody>
                            </table>
                            <div className="mt-4 p-4">
                                <p>
                                    <strong>IP Semester</strong> : 3,81
                                </p>
                                <p>
                                    <strong>IP Kumulatif</strong> : 3,81
                                </p>
                                <button
                                    onClick={downloadTS}
                                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    <div className="flex items-center justify-center">
                                        <Icon
                                            icon="material-symbols-light:print"
                                            height="24"
                                            width="24"
                                        />
                                        <span className="ml-2">
                                            Cetak Transkrip
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </MahasiswaLayout>
    );
};

export default Akademik;
