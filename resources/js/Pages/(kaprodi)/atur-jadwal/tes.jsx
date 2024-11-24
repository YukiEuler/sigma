import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import KaprodiLayout from "@/Layouts/KaprodiLayout";

const AturJadwal = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    const { dosenmk, mataKuliah, kelas, jadwalKuliah } = props;

    // State untuk form data
    const [formData, setFormData] = useState({
        tahun_akademik: "",
        semester: "",
        hari: "",
        waktu_mulai: "",
        waktu_selesai: "",
        sks: 1, // Default
        id_ruang: "",
        id_kelas: "",
        id_dosen: [],
        kode_mk: "",
    });

    const calculateEndTime = (startTime, sks) => {
        if (!startTime || !sks) return;

        const [hours, minutes] = startTime.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes + sks * 50; // 50 menit per SKS
        const endHours = Math.floor(totalMinutes / 60) % 24;
        const endMinutes = totalMinutes % 60;

        setFormData((prevFormData) => ({
            ...prevFormData,
            waktu_selesai: `${String(endHours).padStart(2, "0")}:${String(
                endMinutes
            ).padStart(2, "0")}`,
        }));
    };

    // Fungsi untuk menangani perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Jika `kode_mk` berubah, perbarui SKS dan hitung waktu selesai
        if (name === "kode_mk") {
            const selectedMK = mataKuliah.find((mk) => mk.kode_mk === value);
            const sks = selectedMK ? selectedMK.sks : 1;

            setFormData((prevFormData) => ({
                ...prevFormData,
                sks: sks,
                kode_mk: value,
            }));

            calculateEndTime(formData.waktu_mulai, sks);
        } else if (name === "waktu_mulai") {
            calculateEndTime(value, formData.sks);
        }
    };

    // Fungsi untuk submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/kaprodi/atur-jadwal", formData);
    };

    return (
        <KaprodiLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Atur Jadwal
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 pb-4 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <div className="container bg-white shadow-lg rounded-lg p-6 mt-6">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label className="font-semibold">
                                                Tahun Akademik
                                            </label>
                                            <input
                                                type="text"
                                                name="tahun_akademik"
                                                className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                placeholder="Tahun Akademik"
                                                required
                                                value={formData.tahun_akademik}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group mt-4">
                                            <label className="font-semibold">
                                                Semester
                                            </label>
                                            <select
                                                name="semester"
                                                className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                required
                                                value={formData.semester}
                                                onChange={handleChange}
                                            >
                                                <option value="Ganjil">
                                                    Ganjil
                                                </option>
                                                <option value="Genap">
                                                    Genap
                                                </option>
                                            </select>
                                        </div>
                                        <div className="form-group mt-4">
                                            <label className="font-semibold">
                                                Mata Kuliah
                                            </label>
                                            <select
                                                name="kode_mk"
                                                className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                required
                                                value={formData.kode_mk}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Pilih Mata Kuliah
                                                </option>
                                                {mataKuliah.map((item) => (
                                                    <option
                                                        key={item.kode_mk}
                                                        value={item.kode_mk}
                                                    >
                                                        {item.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group mt-4">
                                            <label className="font-semibold">
                                                SKS
                                            </label>
                                            <input
                                                type="number"
                                                name="sks"
                                                className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                readOnly
                                                value={formData.sks}
                                            />
                                        </div>
                                        <div className="form-group mt-4">
                                            <label className="font-semibold">
                                                Kelas
                                            </label>
                                            <select
                                                name="id_kelas"
                                                className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                required
                                                value={formData.id_kelas}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Pilih Kelas
                                                </option>
                                                <option value="A">A</option>
                                                {/* {kelas.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.kode_kelas}</option>
                                                ))} */}
                                            </select>
                                        </div>
                                        <div className="form-group mt-4">
                                            <label className="font-semibold">
                                                Ruangan
                                            </label>
                                            <input
                                                type="text"
                                                name="id_ruang"
                                                className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                placeholder="ID Ruangan"
                                                required
                                                value={formData.id_ruang}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group mt-4">
                                            <label className="font-semibold">
                                                Hari
                                            </label>
                                            <select
                                                name="hari"
                                                className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                required
                                                value={formData.hari}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Pilih Hari
                                                </option>
                                                <option value="Senin">
                                                    Senin
                                                </option>
                                                <option value="Selasa">
                                                    Selasa
                                                </option>
                                                <option value="Rabu">
                                                    Rabu
                                                </option>
                                                <option value="Kamis">
                                                    Kamis
                                                </option>
                                                <option value="Jumat">
                                                    Jumat
                                                </option>
                                            </select>
                                        </div>
                                        <div className="form-group mt-4">
                                            <label className="font-semibold">
                                                Waktu Mulai
                                            </label>
                                            <input
                                                type="time"
                                                name="waktu_mulai"
                                                className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                required
                                                value={formData.waktu_mulai}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group mt-4">
                                            <label className="font-semibold">
                                                Waktu Selesai
                                            </label>
                                            <input
                                                type="time"
                                                name="waktu_selesai"
                                                className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                readOnly
                                                value={formData.waktu_selesai}
                                            />
                                        </div>
                                        <div className="form-group mt-4">
                                            <label className="font-semibold">
                                                Dosen
                                            </label>
                                            <select
                                                name="id_dosen"
                                                className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                multiple
                                                required
                                                value={formData.id_dosen}
                                                onChange={(e) => {
                                                    const options =
                                                        e.target.options;
                                                    const selectedDosen = [];
                                                    for (
                                                        let i = 0;
                                                        i < options.length;
                                                        i++
                                                    ) {
                                                        if (
                                                            options[i].selected
                                                        ) {
                                                            selectedDosen.push(
                                                                options[i].value
                                                            );
                                                        }
                                                    }
                                                    setFormData({
                                                        ...formData,
                                                        id_dosen: selectedDosen,
                                                    });
                                                }}
                                            >
                                                {dosen.map((item) => (
                                                    <option
                                                        key={item.nip}
                                                        value={item.nip}
                                                    >
                                                        {item.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                                            >
                                                Tambah Jadwal
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <br />
                                <br />
                                <div className="mt-2">
                                    <span className="text-lg font-medium text-gray-900">
                                        Daftar Jadwal Kuliah
                                    </span>
                                </div>
                                <form className="max-w-sm mt-6">
                                    <table className="w-full">
                                        <tr>
                                            <td className="text-sm font-medium text-gray-900">
                                                Tahun Akademik
                                            </td>
                                            <td>
                                                <select
                                                    id="tahun-akademik"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    <option selected>
                                                        Select an option
                                                    </option>
                                                    <option value="2024/2025">
                                                        2024/2025
                                                    </option>
                                                    <option value="2023/2024">
                                                        2023/2024
                                                    </option>
                                                    <option value="2022/2023">
                                                        2022/2023
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-sm font-medium text-gray-900">
                                                Semester
                                            </td>
                                            <td>
                                                <select
                                                    id="semester"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    <option selected>
                                                        Select an option
                                                    </option>
                                                    <option value="Ganjil">
                                                        Ganjil
                                                    </option>
                                                    <option value="Genap">
                                                        Genap
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                    </table>
                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Filter Data
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        >
                                            Reset Filter
                                        </button>
                                    </div>
                                </form>
                                <div className="relative overflow-x-auto mt-1 rounded-lg overflow-auto h-[500px] scrollbar-hide">
                                    <style jsx>{`
                                        .scrollbar-hide::-webkit-scrollbar {
                                            display: none;
                                        }
                                        .scrollbar-hide {
                                            -ms-overflow-style: none;
                                            scrollbar-width: none;
                                        }
                                    `}</style>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky-header">
                                        <thead className="text-xs text-white uppercase bg-blue-500 dark:text-gray-400 sticky top-0">
                                            <tr>
                                                <th className="px-4 py-2 border">
                                                    Tahun Akademik
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Semester
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Hari
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Waktu Mulai
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Waktu Selesai
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Kode Mata Kuliah
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Mata Kuliah
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    SKS
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Kelas
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Kuota
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Dosen Pengampu
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Ruangan
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {jadwalKuliah.map(
                                                (jadwal, index) => (
                                                    <tr key={index}>
                                                        <td className="border px-4 py-2">
                                                            {
                                                                jadwal.tahun_akademik
                                                            }
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {jadwal.hari}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {jadwal.waktu_mulai}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {
                                                                jadwal.waktu_selesai
                                                            }
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {jadwal.kode_mk}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {jadwal.sks}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {jadwal.id_kelas}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {jadwal.id_ruang}
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
            </main>
        </KaprodiLayout>
    );
};

export default AturJadwal;
