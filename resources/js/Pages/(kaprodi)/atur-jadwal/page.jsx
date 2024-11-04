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
        hari: "",
        waktu_mulai: "",
        waktu_selesai: "",
        sks: 1, // Default
        id_ruang: "",
        id_kelas: "",
        id_dosen: [],
        kode_mk: ""
    });

    const calculateEndTime = (startTime, sks) => {
        if (!startTime || !sks) return;

        const [hours, minutes] = startTime.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes + sks * 50; // 50 menit per SKS
        const endHours = Math.floor(totalMinutes / 60) % 24;
        const endMinutes = totalMinutes % 60;

        setFormData((prevFormData) => ({
            ...prevFormData,
            waktu_selesai: `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`,
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
        Inertia.post('/kaprodi/atur-jadwal', formData);
    };

    return (
        <KaprodiLayout dosen={dosen}>
            <main className="flex-1 px-5 pb-5 pt-4" style={{ minHeight: `calc(100vh - 6.5rem)`, overflow: "auto" }}>
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Tambah Jadwal Mata Kuliah
                    </h1>
                </div>
                <div className="container bg-white shadow-lg rounded-lg p-6 mt-6">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="font-semibold">Tahun Akademik</label>
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
                        <label className="font-semibold">Mata Kuliah</label>
                        <select
                            name="kode_mk"
                            className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                            value={formData.kode_mk}
                            onChange={handleChange}
                        >
                            <option value="">Pilih Mata Kuliah</option>
                            {mataKuliah.map((item) => (
                                <option key={item.kode_mk} value={item.kode_mk}>{item.nama}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mt-4">
                        <label className="font-semibold">SKS</label>
                        <input
                            type="number"
                            name="sks"
                            className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                            readOnly
                            value={formData.sks}
                        />
                    </div>
                    <div className="form-group mt-4">
                        <label className="font-semibold">Kelas</label>
                        <select
                            name="id_kelas"
                            className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                            value={formData.id_kelas}
                            onChange={handleChange}
                        >
                            <option value="">Pilih Kelas</option>
                            <option value="A">A</option>
                            {/* {kelas.map((item) => (
                                <option key={item.id} value={item.id}>{item.kode_kelas}</option>
                            ))} */}
                        </select>
                    </div>
                    <div className="form-group mt-4">
                        <label className="font-semibold">Ruangan</label>
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
                        <label className="font-semibold">Hari</label>
                        <select
                            name="hari"
                            className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                            value={formData.hari}
                            onChange={handleChange}
                        >
                            <option value="">Pilih Hari</option>
                            <option value="Senin">Senin</option>
                            <option value="Selasa">Selasa</option>
                            <option value="Rabu">Rabu</option>
                            <option value="Kamis">Kamis</option>
                            <option value="Jumat">Jumat</option>
                        </select>
                    </div>
                    <div className="form-group mt-4">
                        <label className="font-semibold">Waktu Mulai</label>
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
                        <label className="font-semibold">Waktu Selesai</label>
                        <input
                            type="time"
                            name="waktu_selesai"
                            className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                            readOnly
                            value={formData.waktu_selesai}
                        />
                    </div>
                    <div className="form-group mt-4">
                        <label className="font-semibold">Dosen</label>
                        <select
                            name="id_dosen"
                            className="form-control mt-1 block w-full border border-gray-300 rounded-md p-2"
                            multiple
                            required
                            value={formData.id_dosen}
                            onChange={(e) => {
                                const options = e.target.options;
                                const selectedDosen = [];
                                for (let i = 0; i < options.length; i++) {
                                    if (options[i].selected) {
                                        selectedDosen.push(options[i].value);
                                    }
                                }
                                setFormData({
                                    ...formData,
                                    id_dosen: selectedDosen,
                                });
                            }}
                        >
                            {dosen.map((item) => (
                                <option key={item.nip} value={item.nip}>{item.nama}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="btn btn-primary w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            Tambah Jadwal
                        </button>
                    </div>
                </form>
            </div>

            {/* Bagian Tabel Jadwal */}
            <div className="container bg-white shadow-lg rounded-lg p-6 mt-10">
                <h2 className="text-xl font-semibold mb-4">Daftar Jadwal Kuliah</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Tahun Akademik</th>
                            <th className="px-4 py-2 border">Mata Kuliah</th>
                            <th className="px-4 py-2 border">SKS</th>
                            <th className="px-4 py-2 border">Kelas</th>
                            <th className="px-4 py-2 border">Hari</th>
                            <th className="px-4 py-2 border">Waktu Mulai</th>
                            <th className="px-4 py-2 border">Waktu Selesai</th>
                            <th className="px-4 py-2 border">Ruangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jadwalKuliah.map((jadwal, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{jadwal.tahun_akademik}</td>
                                <td className="border px-4 py-2">{jadwal.kode_mk}</td>
                                <td className="border px-4 py-2">{jadwal.sks}</td>
                                <td className="border px-4 py-2">{jadwal.id_kelas}</td>
                                <td className="border px-4 py-2">{jadwal.hari}</td>
                                <td className="border px-4 py-2">{jadwal.waktu_mulai}</td>
                                <td className="border px-4 py-2">{jadwal.waktu_selesai}</td>
                                <td className="border px-4 py-2">{jadwal.id_ruang}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </main>
        </KaprodiLayout>
    );
};

export default AturJadwal;
