import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import KaprodiLayout from "@/Layouts/KaprodiLayout";
import { Icon } from "@iconify/react";
import { X, Plus, Minus } from "lucide-react";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const DataMataKuliah = ({ mataKuliah }) => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const listDosenData = props.listDosen;
    const [dosen, setDosen] = useState(dosenData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMataKuliah, setNewMataKuliah] = useState({
        kode: "",
        nama: "",
        sks: "",
        semester: "",
        jenis: "Wajib",
    });
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [kelasValue, setKelasValue] = useState('');
    const [filteredMataKuliah, setFilteredMataKuliah] = useState([]);
    const [scheduleForms, setScheduleForms] = useState([
        {
            class: "",
            quota: "",
            listDosenData: [""],
            listKelas: [""],
            room: "",
            day: "",
            startTime: "",
            endTime: "",
            hour: "",
            minute: "",
        },
    ]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddForm = () => {
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
        //     },
        // ]);
    };

    const openModal = (course) => {
        console.log(course);
        setSelectedCourse(course);
        // if (courseForms[course.id]) {
        //     setScheduleForms(courseForms[course.id]);
        // } else {
            // Jika belum ada, gunakan form default
            setScheduleForms([
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
                },
            ]);
        // }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        // Simpan state form saat ini ke courseForms
        // if (selectedCourse) {
        //     setCourseForms((prev) => ({
        //         ...prev,
        //         [selectedCourse.id]: scheduleForms,
        //     }));
        // }
        setIsModalOpen(false);
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

    const handleTambahKelasButtonClick = (formIndex) => {
        console.log("Halo");
        Inertia.post("/kaprodi/atur-kelas/tambah", { kode_mk: selectedCourse.kode_mk, banyak: kelasValue });
    };

    const handleInputKelasChange = (e) => {
        setKelasValue(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi form
        if (
            !newMataKuliah.kode ||
            !newMataKuliah.nama ||
            !newMataKuliah.sks ||
            !newMataKuliah.semester
        ) {
            Swal.fire({
                title: "Error!",
                text: "Semua field harus diisi!",
                icon: "error",
                customClass: {
                    confirmButton: "btn btn-danger",
                },
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi Penambahan",
            html: `Apakah Anda yakin ingin menambahkan mata kuliah berikut?<br><br>
                  <b>Kode MK:</b> ${newMataKuliah.kode}<br>
                  <b>Nama:</b> ${newMataKuliah.nama}<br>
                  <b>SKS:</b> ${newMataKuliah.sks}<br>
                  <b>Semester:</b> ${newMataKuliah.semester}<br>
                  <b>Jenis:</b> ${newMataKuliah.jenis}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, tambahkan!",
            cancelButtonText: "Batal",
            reverseButtons: true,
            customClass: {
                confirmButton: "btn btn-success mr-2",
                cancelButton: "btn btn-danger ml-2",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // Kirim data mata kuliah baru
                Inertia.post("/kaprodi/data-matakuliah/store", newMataKuliah, {
                    onSuccess: () => {
                        handleCloseModal();
                        setNewMataKuliah({
                            kode: "",
                            nama: "",
                            sks: "",
                            semester: "",
                            jenis: "Wajib",
                        });

                        Swal.fire({
                            title: "Berhasil!",
                            text: "Mata kuliah berhasil ditambahkan",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                        }).then(() => {
                            // Refresh halaman setelah alert ditutup
                            window.location.reload();
                        });
                    },
                    onError: (errors) => {
                        // Check jika error adalah kode MK yang sama
                        if (errors.message) {
                            let errorMessage = "";

                            // Handle kasus di mana ada duplikasi kode dan/atau nama
                            if (errors.duplicate) {
                                if (
                                    errors.duplicate.kode &&
                                    errors.duplicate.nama
                                ) {
                                    errorMessage =
                                        "Kode dan nama mata kuliah sudah digunakan!";
                                } else if (errors.duplicate.kode) {
                                    errorMessage =
                                        "Kode mata kuliah sudah digunakan!";
                                } else if (errors.duplicate.nama) {
                                    errorMessage =
                                        "Nama mata kuliah sudah digunakan!";
                                }
                            } else {
                                // Handle error lainnya
                                errorMessage = Object.values(errors.message)[0];
                            }

                            Swal.fire({
                                title: "Gagal!",
                                text: errorMessage,
                                icon: "error",
                                customClass: {
                                    confirmButton: "btn btn-danger",
                                },
                            });
                        }
                    },
                });
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMataKuliah((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const filtered = mataKuliah.filter(
            (mk) =>
                mk.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                mk.kode_mk.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMataKuliah(filtered);
        // setMataKuliah(mataKuliahData);
        // getStackedData(mataKuliah);
    }, [dosen, searchTerm, mataKuliah]);

    return (
        <KaprodiLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Data Mata Kuliah
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 pb-4 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <div className="mt-4">
                                    {/* Program Studi Filter */}
                                    <span className="mr-[1rem]">Semester</span>
                                    <select
                                        value={selectedSemester}
                                        onChange={(e) =>
                                            setSelectedSemester(e.target.value)
                                        }
                                        className="px-2 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
                                    >
                                        <option value="">Semua Semester</option>
                                        <option value="1">Semester 1</option>
                                        <option value="2">Semester 2</option>
                                        <option value="3">Semester 3</option>
                                        <option value="4">Semester 4</option>
                                        <option value="5">Semester 5</option>
                                        <option value="6">Semester 6</option>
                                        <option value="7">Semester 7</option>
                                        <option value="8">Semester 8</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center mt-4 mb-2">
                                    <button
                                        onClick={handleOpenModal}
                                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                    >
                                        Tambah Mata Kuliah
                                    </button>
                                    <div className="flex justify-center items-center w-64">
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
                                                onChange={handleSearchChange}
                                                placeholder="Cari Mata Kuliah..."
                                                className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative overflow-x-auto mt-1 rounded-lg overflow-auto h-[420px] scrollbar-hide">
                                    <style jsx>{`
                                        .scrollbar-hide::-webkit-scrollbar {
                                            display: none;
                                        }
                                        .scrollbar-hide {
                                            -ms-overflow-style: none;
                                            scrollbar-width: none;
                                        }
                                    `}</style>
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
                                                        width: "3%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "20%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    KODE MATA KULIAH
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "20%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    NAMA MATA KULIAH
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    SKS
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    SEMESTER
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "17%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    JENIS
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredMataKuliah.map(
                                                (mk, index) => (
                                                    <tr
                                                        key={mk.id}
                                                        className="bg-gray-100 border-b"
                                                    >
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {mk.kode_mk}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px]">
                                                            {mk.nama}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {mk.sks}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {mk.semester}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {mk.jenis}
                                                        </td>
                                                        <td className="flex items-center justify-center py-3">
                                                            <button
                                                                onClick={() =>
                                                                    openModal(
                                                                        mk
                                                                    )
                                                                }
                                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-[14px]"
                                                            >
                                                                Edit
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg px-6 pb-6 w-1/3 h-[80vh] overflow-y-auto scrollbar-hide">
                            <style jsx>{`
                                .scrollbar-hide::-webkit-scrollbar {
                                    display: none;
                                }
                                .scrollbar-hide {
                                    -ms-overflow-style: none;
                                    scrollbar-width: none;
                                }
                            `}</style>
                            <header className="sticky top-0 bg-white pt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-bold">
                                        Atur Kelas
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

                            <form onSubmit={handleSubmit} className="space-y-2">
                                {scheduleForms.map((form, formIndex) => (
                                    <div
                                        key={formIndex}
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    required
                                                    type="number"
                                                    min="1"
                                                    className="w-full border rounded p-2"
                                                    value={kelasValue}
                                                    onChange={handleInputKelasChange}
                                                />
                                                <button
                                                    onClick={handleTambahKelasButtonClick}
                                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            </div>
                                            {/* <div>
                                                <label className="block mb-1">
                                                    Kuota
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    min="1"
                                                    className="w-full border rounded p-2"
                                                    value={form.quota}
                                                    onChange={(e) => {
                                                        const newForms = [
                                                            ...scheduleForms,
                                                        ];
                                                        newForms[
                                                            formIndex
                                                        ].quota = Math.max(
                                                            1,
                                                            parseInt(
                                                                e.target.value
                                                            ) || 1
                                                        );
                                                        setScheduleForms(
                                                            newForms
                                                        );
                                                    }}
                                                />
                                            </div> */}
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block mb-1">List Kelas dan Kuota</label>
                                                {selectedCourse['kelas'].map((course, courseIndex) => (
                                                    <div key={courseIndex} className="flex gap-2 mb-2 items-center">
                                                        <input
                                                            readOnly
                                                            className="w-1/2 border rounded p-2 bg-gray-100"
                                                            value={course.kode_kelas}
                                                        />
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            className="w-1/2 border rounded p-2"
                                                            value={course.kuota}
                                                        />
                                                        <button
                                                            onClick={() => handleDelete(courseIndex)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <FaRegTrashCan />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label className="block mb-1">
                                                Dosen Pengampu
                                            </label>
                                            {form.listDosenData.map(
                                                (lecturer, lecturerIndex) => (
                                                    <div
                                                        key={lecturerIndex}
                                                        className="flex gap-2 mb-2"
                                                    >
                                                        <select
                                                            required
                                                            className="w-full border rounded p-2"
                                                            value={lecturer}
                                                            onChange={(e) => {
                                                                const newForms =
                                                                    [
                                                                        ...scheduleForms,
                                                                    ];
                                                                newForms[
                                                                    formIndex
                                                                ].listDosenData[
                                                                    lecturerIndex
                                                                ] =
                                                                    e.target.value;
                                                                setScheduleForms(
                                                                    newForms
                                                                );
                                                            }}
                                                        >
                                                            <option value="">
                                                                Pilih Dosen
                                                            </option>
                                                            {listDosenData.map(
                                                                (l) => (
                                                                    <option
                                                                        key={
                                                                            l.nip
                                                                        }
                                                                        value={
                                                                            l.nama
                                                                        }
                                                                    >
                                                                        {l.nama}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleAddLecturer(
                                                                    formIndex
                                                                )
                                                            }
                                                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                                        >
                                                            <Plus size={20} />
                                                        </button>
                                                        {form.listDosenData
                                                            .length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRemoveLecturer(
                                                                        formIndex,
                                                                        lecturerIndex
                                                                    )
                                                                }
                                                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                                            >
                                                                <Minus
                                                                    size={20}
                                                                />
                                                            </button>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        {scheduleForms.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveForm(formIndex)
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            >
                                                Hapus Kelas
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <div className="flex justify-start">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2  mr-2 rounded hover:bg-blue-700"
                                    >
                                        Simpan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddForm}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Tambah Kelas
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </KaprodiLayout>
    );
};

export default DataMataKuliah;
