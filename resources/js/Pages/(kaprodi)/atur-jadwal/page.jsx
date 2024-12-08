import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import KaprodiLayout from "@/Layouts/KaprodiLayout";
import { X, Plus, Minus } from "lucide-react";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

const AturJadwal = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const mataKuliahData = props.mataKuliah;
    const listDosenData = props.listDosen;
    const ruanganData = props.ruangan;
    const [dosen, setDosen] = useState(dosenData);
    const [schedules, setSchedules] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedKelas, setSelectedKelas] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessages, setErrorMessages] = useState({});
    const [semesterFilter, setSemesterFilter] = useState("");
    const [status, setStatus] = useState("belum");
    const [courseForms, setCourseForms] = useState({});
    const [scheduleForms, setScheduleForms] = useState([
        {
            class: "",
            quota: "",
            listDosenData: [""],
            room: "",
            day: "",
            startTime: "",
            endTime: "",
            hour: "",
            minute: "",
            idRuang: "",
        },
    ]);

    const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

    useEffect(() => {
        const daftarJadwal = [];
        for (const matkul of mataKuliahData){
            for (const kelas of matkul.kelas){
                setStatus(kelas.status);
                for (const jadwal of kelas.jadwal_kuliah){
                    daftarJadwal.push({
                        'class': kelas.kode_kelas,
                        'courseId': matkul.kode_mk,
                        'courseName': matkul.nama,
                        'quota': kelas.kuota,
                        'room': jadwal.ruangan.nama_ruang,
                        'day': jadwal.hari,
                        'startTime': jadwal.waktu_mulai,
                        'endTime': jadwal.waktu_selesai,
                        'idKelas': kelas.id,
                        'idRuang': jadwal.ruangan.id_ruang,
                        'hour': jadwal.waktu_mulai.split(':')[0],
                        'minute': jadwal.waktu_mulai.split(':')[1],
                    })
                }
            }
        }
        setSchedules(daftarJadwal);
    }, []);


    const timeSlots = [];
    for (let i = 7; i <= 21; i++) {
        timeSlots.push(`${i.toString().padStart(2, "0")}:00`);
    }

    const HOURS = Array.from({ length: 15 }, (_, i) => {
        const hour = i + 7;
        return hour.toString().padStart(2, "0");
    });

    // Generate minutes array (00-55, step 5)
    const MINUTES = Array.from({ length: 12 }, (_, i) => {
        const minute = i * 5;
        return minute.toString().padStart(2, "0");
    });

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

    const handleButtonClick = () => {
        if (schedules.length === 0 && getUnscheduledClasses().length === 0) {
            Swal.fire({
                icon: "info",
                title: "Tidak Ada Jadwal",
                text: "Tidak ada jadwal yang tersedia atau belum terjadwal.",
            });
            return;
        }
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Anda akan mengubah status jadwal!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, ubah!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.get('/kaprodi/atur-jadwal/ubah-status')
                    .then(() => {
                        if (status === 'belum') {
                            setStatus('diajukan');
                        } else if (status === 'diajukan'){
                            setStatus('belum');
                        }
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Status sudah diubah!",
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal",
                            text: `Terjadi kesalahan: ${error.message}`,
                        });
                    });
            }
        });
    };

    const calculateEndTime = (hour, minute, sks) => {
        if (!hour || !minute || sks === "" || sks === 0 || sks === undefined) return "";
        const totalMinutes = parseInt(hour) * 60 + parseInt(minute) + sks * 50;
        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;
        return `${newHours.toString().padStart(2, "0")}:${newMinutes
            .toString()
            .padStart(2, "0")}`;
    };

    const handleTimeChange = (formIndex, jadwalIndex, type, value) => {
        const newForms = [...scheduleForms];
        console.log(newForms[formIndex]);
        const before = newForms[formIndex].jadwal[jadwalIndex][type];
        const sks = newForms[formIndex].jadwal[jadwalIndex].sks;
        newForms[formIndex].jadwal[jadwalIndex][type] = value;

        if (newForms[formIndex].jadwal[jadwalIndex].hour && newForms[formIndex].jadwal[jadwalIndex].minute) {
            const roomId = newForms[formIndex].jadwal[jadwalIndex].idRuang;
            const day = newForms[formIndex].jadwal[jadwalIndex].day;
            const startTime = `${newForms[formIndex].jadwal[jadwalIndex].hour}:${newForms[formIndex].jadwal[jadwalIndex].minute}`;
            const endTime = calculateEndTime(
                newForms[formIndex].jadwal[jadwalIndex].hour,
                newForms[formIndex].jadwal[jadwalIndex].minute,
                sks
            );
            const kodeKelas = newForms[formIndex].class;
            if (isRoomAvailable(roomId, day, startTime, endTime, kodeKelas)) {
                newForms[formIndex].jadwal[jadwalIndex].startTime = startTime;
                newForms[formIndex].jadwal[jadwalIndex].endTime = endTime;
            } else {
                newForms[formIndex].jadwal[jadwalIndex][type] = before;
                Swal.fire({
                    icon: "error",
                    title: "Ruangan Tidak Tersedia",
                    text: "Ruangan sudah dipakai dalam rentang waktu yang dipilih.",
                });
            }
            setScheduleForms(newForms);
        } else {
            newForms[formIndex].jadwal[jadwalIndex].endTime = "";
        }

        setScheduleForms(newForms);
    };

    const parseTime = (timeStr) => {
        const [hours, minutes, seconds] = timeStr.split(":").map(Number);
        return new Date(1970, 0, 1, hours, minutes, seconds);
    };

    const isRoomAvailable = (roomId, day, startTime, endTime, kode_kelas) => {
        if (roomId === '' || day === '' || startTime === '' || endTime === '') return true;
        startTime += ":00";
        endTime += ":00";
        for (const matkul of mataKuliahData) {
            if (matkul.kode_mk === selectedCourse.kode_mk) continue;
            for (const kelas of matkul.kelas) {
                for (const jadwal of kelas.jadwal_kuliah) {
                    if (
                        jadwal.ruangan.id_ruang == roomId &&
                        jadwal.hari === day &&
                        parseTime(jadwal.waktu_mulai) <= parseTime(endTime) &&
                        parseTime(jadwal.waktu_selesai) >= parseTime(startTime)
                    ) {
                        console.log(jadwal, roomId);
                        return false;
                    }
                }
            }
        }
        for (const kelas of scheduleForms){
            if (kode_kelas === kelas.class) continue;
            for (const jadwal of kelas.jadwal){
                if (
                    jadwal.idRuang == roomId &&
                    jadwal.day === day &&
                    parseTime(jadwal.startTime) <= parseTime(endTime) &&
                    parseTime(jadwal.endTime+":00") >= parseTime(startTime)
                ) {
                    console.log(jadwal, roomId);
                    return false;
                }
            }
        }
        return true;
    };

    const handleSksChange = (formIndex, jadwalIndex, sks) => {
        const newForms = [...scheduleForms];
        const roomId = newForms[formIndex].jadwal[jadwalIndex].idRuang;
        const day = newForms[formIndex].jadwal[jadwalIndex].day;
        const startTime = `${newForms[formIndex].jadwal[jadwalIndex].hour}:${newForms[formIndex].jadwal[jadwalIndex].minute}`;
        const endTime = calculateEndTime(
            newForms[formIndex].jadwal[jadwalIndex].hour,
            newForms[formIndex].jadwal[jadwalIndex].minute,
            sks
        );
        const kodeKelas = newForms[formIndex].class;
        if (isRoomAvailable(roomId, day, startTime, endTime, kodeKelas)) {
            newForms[formIndex].jadwal[jadwalIndex].sks = sks;
            newForms[formIndex].jadwal[jadwalIndex].endTime = endTime;
        } else {
            Swal.fire({
                icon: "error",
                title: "Ruangan Tidak Tersedia",
                text: "Ruangan sudah dipakai dalam rentang waktu yang dipilih.",
            });
        }
        setScheduleForms(newForms);
    };

    const handleRoomChange = (formIndex, jadwalIndex, roomId, roomName) => {
        const newForms = [...scheduleForms];
        const startTime = newForms[formIndex].jadwal[jadwalIndex].startTime;
        const endTime = newForms[formIndex].jadwal[jadwalIndex].endTime;
        const day = newForms[formIndex].jadwal[jadwalIndex].day;
        const kodeKelas = newForms[formIndex].class;

        if (isRoomAvailable(roomId, day, startTime, endTime, kodeKelas)) {
            newForms[formIndex].jadwal[jadwalIndex].room = roomName;
            newForms[formIndex].jadwal[jadwalIndex].idRuang = roomId;
            setScheduleForms(newForms);
        } else {
            Swal.fire({
                icon: "error",
                title: "Ruangan Tidak Tersedia",
                text: "Ruangan sudah dipakai dalam rentang waktu yang dipilih.",
            });
        }
    };

    const handleDayChange = (formIndex, jadwalIndex, day) => {
        const newForms = [...scheduleForms];
        const roomId = newForms[formIndex].jadwal[jadwalIndex].idRuang;
        const startTime = newForms[formIndex].jadwal[jadwalIndex].startTime;
        const endTime = newForms[formIndex].jadwal[jadwalIndex].endTime;
        const kodeKelas = newForms[formIndex].class;

        if (isRoomAvailable(roomId, day, startTime, endTime, kodeKelas)) {
            newForms[formIndex].jadwal[jadwalIndex].day = day;
            setScheduleForms(newForms);
        } else {
            Swal.fire({
                icon: "error",
                title: "Ruangan Tidak Tersedia",
                text: "Ruangan sudah dipakai dalam rentang waktu yang dipilih.",
            });
        }
    };

    const handleAddForm = (formIndex) => {
        const newForms = [...scheduleForms];
        newForms[formIndex].jadwal.push({
            day: "",
            startTime: "",
            endTime: "",
            hour: "",
            minute: "",
            idRuang: "",
            room: "",
        });
        setScheduleForms(newForms);
        // setScheduleForms([
        //     ...scheduleForms,
        //     {
        //         class: "",
        //         quota: "",
        //         listDosenData: [""],
        //         room: "",
        //         day: "",
        //         startTime: "",
        //         endTime: "",
        //         hour: "",
        //         minute: "",
        //         idRuang: "",
        //     },
        // ]);
    };

    const handleRemoveForm = (index) => {
        if (scheduleForms.length > 1) {
            const newForms = scheduleForms.filter((_, i) => i !== index);
            setScheduleForms(newForms);
        }
    };

    const handleAddLecturer = (formIndex) => {
        const newForms = [...scheduleForms];
        newForms[formIndex].listDosenData.push("");
        setScheduleForms(newForms);
    };

    const handleRemoveLecturer = (formIndex, lecturerIndex) => {
        const newForms = [...scheduleForms];
        if (newForms[formIndex].listDosenData.length > 1) {
            newForms[formIndex].listDosenData = newForms[
                formIndex
            ].listDosenData.filter((_, i) => i !== lecturerIndex);
            setScheduleForms(newForms);
        }
    };

    const getUnscheduledClasses = () => {
        return mataKuliahData.flatMap(course => 
            course.kelas.filter(kelas => 
                !kelas.jadwal_kuliah || kelas.jadwal_kuliah.length === 0
            ).map(kelas => ({
                kode_mk: course.kode_mk,
                nama: course.nama,
                sks: course.sks,
                kelas: kelas.kode_kelas,
                kuota: kelas.kuota
            }))
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const kelas of scheduleForms) {
            let jumSks = 0;
            for (const jadwal of kelas.jadwal) {
                const { room, day, startTime, endTime, sks } = jadwal;
                const allFilled = room && day && startTime && endTime && sks;
                const allEmpty = !room && !day && !startTime && !endTime && !sks;
                jumSks += parseInt(sks || 0);
        
                if (!allFilled && !allEmpty) {
                    Swal.fire({
                        title: "Error!",
                        text: `Atribut harus diisi semua atau tidak diisi semua pada kelas ${kelas.class}.`,
                        icon: "error",
                        customClass: {
                            confirmButton: "btn btn-danger",
                        },
                    });
                    return;
                }
            }
            if (jumSks != 0 && jumSks != selectedCourse.sks) {
                Swal.fire({
                    title: "Error!",
                    text: `Jumlah SKS kurang pada kelas ${kelas.class}.`,
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-danger",
                    },
                });
                return;
            }
        }

        // const newSchedules = scheduleForms.map((form) => {
        //     const startTime = `${form.hour}:${form.minute}`;
        //     const endTime = calculateEndTime(
        //         form.hour,
        //         form.minute,
        //         selectedCourse.sks
        //     );

        //     return {
        //         ...form,
        //         courseId: selectedCourse.kode_mk,
        //         courseName: selectedCourse.nama,
        //         sks: selectedCourse.sks,
        //         kuota: selectedCourse.kuota,
        //         startTime,
        //         endTime,
        //     };
        // });

        // Update schedules
        // setSchedules((prevSchedules) => {
        //     // Hapus jadwal lama untuk mata kuliah ini (jika ada)
        //     const filteredSchedules = prevSchedules.filter(
        //         (schedule) => schedule.courseId !== selectedCourse.id
        //     );
        //     // Tambahkan jadwal baru
        //     return [...filteredSchedules, ...newSchedules];
        // });

        // // Simpan form state
        // setCourseForms((prev) => ({
        //     ...prev,
        //     [selectedCourse.id]: scheduleForms,
        // }));

        // const { kelas, ...courseWithoutKelas } = selectedCourse;
        Inertia.post("/kaprodi/atur-jadwal/store", { scheduleForms }, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Jadwal berhasil disimpan",
                }).then(() => {
                    setIsModalOpen(false);
                    window.location.reload();
                });
            },
            onError: (errors) => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Terjadi kesalahan saat menyimpan jadwal",
                });
            },
        });
    };

    const openModal = (course) => {
        setSelectedCourse(course);
        const daftarJadwal = [];
        for (const matkul of mataKuliahData){
            if (matkul.kode_mk !== course.kode_mk) continue;
            for (const kelas of matkul.kelas){
                const listJadwal = [];
                for (const jadwal of kelas.jadwal_kuliah){
                    const sks = (parseTime(jadwal.waktu_selesai)-parseTime(jadwal.waktu_mulai))/3000000;
                    const endTimeArray = jadwal.waktu_selesai.split(':');
                    endTimeArray.pop();
                    const endTime = endTimeArray.join(':');
                    listJadwal.push({
                        'day': jadwal.hari,
                        'startTime': jadwal.waktu_mulai,
                        'endTime': endTime,
                        'hour': jadwal.waktu_mulai.split(':')[0],
                        'minute': jadwal.waktu_mulai.split(':')[1],
                        'sks': sks,
                        'idRuang': jadwal.ruangan.id_ruang,
                        'room': jadwal.ruangan.nama_ruang,
                    });
                }
                if (listJadwal.length === 0) {
                    listJadwal.push({
                        'day': "",
                        'startTime': "",
                        'endTime': "",
                        'hour': "",
                        'minute': "",
                        'sks': "",
                        'idRuang': "",
                        'room': "",
                    })
                }
                daftarJadwal.push({
                    'class': kelas.kode_kelas,
                    'courseId': matkul.kode_mk,
                    'courseName': matkul.nama,
                    'quota': kelas.kuota,
                    'idKelas': kelas.id,
                    'jadwal': listJadwal
                });
            }
        }
        console.log(mataKuliahData);
        console.log(daftarJadwal);
        setScheduleForms(daftarJadwal);
        // if (courseForms[course.id]) {
        //     setScheduleForms(courseForms[course.id]);
        // } else {
        // if (daftarJadwal.length == 0){
        //     // Jika belum ada, gunakan form default
        //     setScheduleForms([
        //         {
        //             class: "",
        //             quota: "",
        //             listDosenData: [""],
        //             room: "",
        //             day: "",
        //             startTime: "",
        //             endTime: "",
        //             hour: "",
        //             minute: "",
        //             idRuang: ""
        //         },
        //     ]);
        // }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        // Simpan state form saat ini ke courseForms
        if (status === 'belum'){
            Swal.fire({
                title: 'Apakah Anda yakin?',
                text: "Perubahan yang belum disimpan akan hilang!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, tutup!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsModalOpen(false);
                }
            });
        } else {
            setIsModalOpen(false);
        }
    };

    // Modifikasi handler untuk search dan filter
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSemesterFilter = (e) => {
        setSemesterFilter(e.target.value);
    };

    const getFilteredCourses = () => {
        return mataKuliahData.filter((course) => {
            const matchesSearch =
                course.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.kode_mk.toLowerCase().includes(searchTerm.toLowerCase());

            if (semesterFilter === "") {
                return matchesSearch;
            }

            const isOdd = course.semester % 2 === 1;
            return (
                matchesSearch &&
                ((semesterFilter === "ganjil" && isOdd) ||
                    (semesterFilter === "genap" && !isOdd))
            );
        });
    };

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <KaprodiLayout kaprodi={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Atur Jadwal
                    </h1>
                </div>
                <div
                    className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-2 lg:grid-cols-7"
                    style={{
                        height: "85vh",
                    }}
                >
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100 lg:col-span-2">
                        <div
                            className="py-2 px-3 border rounded-lg shadow-lg bg-white"
                            style={{
                                height: "80vh",
                            }}
                        >
                            <div className="flex flex-col space-y-2">
                                <h2 className="text-xl font-bold mb-2">
                                    Daftar Mata Kuliah
                                </h2>
                                <div className="flex-col">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-sm font-medium">
                                            Semester
                                        </span>
                                        <select
                                            value={semesterFilter}
                                            onChange={(e) =>
                                                setSemesterFilter(
                                                    e.target.value
                                                )
                                            }
                                            className="p-2 text-sm border border-gray-300 rounded-md w-full"
                                        >
                                            <option value="">
                                                Semua Semester
                                            </option>
                                            <option value="ganjil">
                                                Ganjil
                                            </option>
                                            <option value="genap">Genap</option>
                                        </select>
                                    </div>
                                    <div className="relative w-full">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Icon
                                                icon="ri:search-line"
                                                style={{
                                                    color: "gray",
                                                }}
                                            />
                                        </span>
                                        <input
                                            type="text"
                                            name="search"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                            placeholder="Cari Mata Kuliah..."
                                            className="w-full pl-10 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 max-h-[57vh] overflow-y-auto scrollbar-hide">
                                    <style jsx>{`
                                        .scrollbar-hide::-webkit-scrollbar {
                                            display: none;
                                        }
                                        .scrollbar-hide {
                                            -ms-overflow-style: none;
                                            scrollbar-width: none;
                                        }
                                    `}</style>
                                    {getFilteredCourses().map((course) => (
                                        <div
                                            key={course.kode_mk}
                                            className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md shadow-sm"
                                        >
                                            <div>
                                                <div className="font-medium text-[12px]">
                                                    {course.nama}
                                                </div>
                                                <div className="text-[10px] text-gray-500">
                                                    SMT {course.semester} -{" "}
                                                    {course.kode_mk} (
                                                    {course.semester} SKS)
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    openModal(course)
                                                }
                                                className="bg-blue-500 text-white text-[12px] px-3 py-2 rounded-lg hover:bg-blue-600"
                                            >
                                                Atur
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100 lg:col-span-5">
                        <div
                            className="p-2 border rounded-lg shadow-lg bg-white"
                            style={{
                                height: "80vh",
                            }}
                        >
                            <button
                                onClick={handleButtonClick}
                                className={`w-20 mb-1 mt-2 mx-2 p-2 text-sm text-white rounded-md ${
                                    status === 'diajukan'
                                        ? "bg-red-500 hover:bg-red-600"
                                        : status === 'belum'
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                                }`}
                                disabled={status === 'disetujui'}
                            >
                                {status === 'diajukan' ? "Batalkan" : status === 'belum' ? "Ajukan" : "Disetujui"}
                            </button>
                            <div className="flex flex-col space-y-2 p-2 max-h-[70vh] overflow-x-auto scrollbar-hide">
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
                                <div className="mt-4 p-2 border rounded-lg">
                                    <h3 className="font-semibold mb-2">Kelas Tidak Terjadwal</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {getUnscheduledClasses().map((item) => (
                                            <div 
                                                key={`${item.kode_mk}-${item.kelas}`}
                                                className="p-2 bg-gray-100 rounded-lg border flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="font-medium text-sm">{item.nama}</p>
                                                    <p className="text-xs text-gray-600">
                                                        {item.kode_mk} - Kelas {item.kelas}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {item.sks} SKS - Kuota: {item.kuota}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {getUnscheduledClasses().length === 0 && (
                                            <div className="col-span-full text-center text-gray-500 text-sm">
                                                Semua kelas sudah terjadwal
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg pb-6 w-2/3 h-[80vh] overflow-y-auto scrollbar-hide">
                            <style jsx>{`
                                .scrollbar-hide::-webkit-scrollbar {
                                    display: none;
                                }
                                .scrollbar-hide {
                                    -ms-overflow-style: none;
                                    scrollbar-width: none;
                                }
                            `}</style>
                            <header className="sticky top-0 w-full px-6 bg-white pt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-bold">
                                        Atur Jadwal Mata Kuliah
                                    </h2>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="mb-3 grid grid-cols-8">
                                    <div className="col-span-4">
                                        Nama Mata Kuliah <br />
                                        {selectedCourse.nama}
                                    </div>
                                    <div className="col-span-3">
                                        <p>
                                            Kode Mata Kuliah <br />
                                            {selectedCourse.kode_mk}
                                        </p>
                                    </div>
                                    <div className="col-span-1">
                                        <p>
                                            SKS <br />
                                            {selectedCourse.sks}
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t pt-2"></div>
                            </header>

                            <form onSubmit={handleSubmit} className="space-y-4 px-4">
                                {scheduleForms.map((form, formIndex) => (
                                    <div key={formIndex} className="p-4 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-1">Kelas</label>
                                                <input
                                                    readOnly
                                                    className="w-full border rounded p-2 bg-gray-100"
                                                    value={form.class}
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1">Kuota</label>
                                                <input
                                                    className="w-full border rounded p-2 bg-gray-100"
                                                    value={
                                                        selectedCourse.kelas.find(
                                                            (kelas) => kelas.kode_kelas === form['class']
                                                        )?.kuota || ""
                                                    }
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        {form.jadwal.map((jadwal, jadwalIndex) => (
                                            <div key={jadwalIndex} className="grid grid-cols-12 gap-4">
                                                <div className="col-span-2">
                                                    <label className="block mb-1">Ruang</label>
                                                    <select
                                                        className={"w-full border rounded p-2" + (status !== 'belum' ? " bg-gray-100" : "")}
                                                        value={jadwal.room}
                                                        onChange={(e) => {
                                                            const roomId = e.target.options[e.target.selectedIndex].getAttribute('data-key');
                                                            handleRoomChange(formIndex, jadwalIndex, roomId, e.target.value);
                                                        }}
                                                        disabled={status !== 'belum'}
                                                    >
                                                        <option value="">Pilih Ruang</option>
                                                        {ruanganData
                                                            .filter(
                                                                (room) =>
                                                                    parseInt(room.kuota) >= parseInt(form.quota)
                                                            )
                                                            .map((room) => (
                                                                <option
                                                                    key={room.id_ruang}
                                                                    value={room.nama_ruang}
                                                                    data-key={room.id_ruang}
                                                                >
                                                                    {room.nama_ruang}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className="col-span-2">
                                                    <label className="block mb-1">Hari</label>
                                                    <select
                                                        className={"w-full border rounded p-2" + (status !== 'belum' ? " bg-gray-100" : "")}
                                                        value={jadwal.day}
                                                        onChange={(e) => {
                                                            handleDayChange(formIndex, jadwalIndex, e.target.value);
                                                        }}
                                                        disabled={status !== 'belum'}
                                                    >
                                                        <option value="">Pilih Hari</option>
                                                        {DAYS.map((day) => (
                                                            <option key={day} value={day}>
                                                                {day}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-span-3">
                                                    <label className="block mb-1">Jam Mulai</label>
                                                    <div className="flex gap-1 items-center">
                                                        <select
                                                            className={"w-full border rounded p-2" + (status !== 'belum' ? " bg-gray-100" : "")}
                                                            value={jadwal.hour}
                                                            onChange={(e) =>
                                                                handleTimeChange(formIndex, jadwalIndex, "hour", e.target.value)
                                                            }
                                                            disabled={status !== 'belum'}
                                                        >
                                                            <option value="">Jam</option>
                                                            {HOURS.map((hour) => (
                                                                <option key={hour} value={hour}>
                                                                    {hour}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <span className="text-xl">:</span>
                                                        <select
                                                            className={"w-full border rounded p-2" + (status !== 'belum' ? " bg-gray-100" : "")}
                                                            value={jadwal.minute}
                                                            onChange={(e) =>
                                                                handleTimeChange(formIndex, jadwalIndex, "minute", e.target.value)
                                                            }
                                                            disabled={status !== 'belum'}
                                                        >
                                                            <option value="">Menit</option>
                                                            {MINUTES.map((minute) => (
                                                                <option key={minute} value={minute}>
                                                                    {minute}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-span-1">
                                                    <label className="block mb-1">SKS</label>
                                                    <select
                                                        className={"w-full border rounded p-2" + (status !== 'belum' ? " bg-gray-100" : "")}
                                                        value={jadwal.sks || ""}
                                                        onChange={(e) => {
                                                            handleSksChange(formIndex, jadwalIndex, e.target.value);
                                                        }}
                                                        disabled={status !== 'belum'}
                                                    >
                                                        <option value="">Pilih SKS</option>
                                                        {(() => {
                                                            const usedSks = form.jadwal.reduce((sum, j, idx) => {
                                                                return idx !== jadwalIndex ? sum + (parseInt(j.sks) || 0) : sum;
                                                            }, 0);
                                                            const remainingSks = selectedCourse.sks - usedSks;
                                                            return Array.from({length: remainingSks}, (_, i) => i + 1).map(num => (
                                                                <option key={num} value={num}>
                                                                    {num}
                                                                </option>
                                                            ));
                                                        })()}
                                                    </select>
                                                </div>
                                                <div className="col-span-3">
                                                    <label className="block mb-1">Jam Selesai</label>
                                                    <input
                                                        type="text"
                                                        className="w-full border rounded p-2 bg-gray-100"
                                                        value={jadwal.endTime}
                                                        readOnly
                                                        placeholder="--.--"
                                                    />
                                                </div>
                                                <div className="col-span-1 flex items-end gap-2">
                                                    {jadwalIndex === form.jadwal.length - 1 && 
                                                    form.jadwal.reduce((sum, j) => sum + (parseInt(j.sks) || 0), 0) < selectedCourse.sks &&
                                                    status === 'belum' ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddForm(formIndex)}
                                                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                                        >
                                                            <Plus size={20} />
                                                        </button>
                                                    ) : form.jadwal.reduce((sum, j) => sum + (parseInt(j.sks) || 0), 0) < selectedCourse.sks && (
                                                        <div
                                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 opacity-0"
                                                        >
                                                            <Plus size={20} />
                                                        </div>
                                                    )}

                                                    {form.jadwal.length > 1 && status === 'belum' ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newForms = [...scheduleForms];
                                                                newForms[formIndex].jadwal = newForms[formIndex].jadwal.filter((_, idx) => idx !== jadwalIndex);
                                                                setScheduleForms(newForms);
                                                            }}
                                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                                        >
                                                            <Minus size={20} />
                                                        </button>
                                                    ) : (
                                                        <div
                                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 opacity-0"
                                                        >
                                                            <Minus size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}

                                <div className="flex justify-start">
                                    {status === 'belum' && (<button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 mr-2 rounded hover:bg-blue-700"
                                    >
                                        Simpan
                                    </button>)}
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </KaprodiLayout>
    );
};

export default AturJadwal;
