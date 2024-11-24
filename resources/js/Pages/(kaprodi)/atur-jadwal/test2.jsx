import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

// Sample data
const COURSES = [
  { id: 'IF1001', name: 'Algoritma dan Pemrograman', semester: 1, sks: 3, code: 'IF1001' },
  { id: 'IF1002', name: 'Basis Data', semester: 3, sks: 4, code: 'IF1002' },
  { id: 'IF1003', name: 'Pemrograman Web', semester: 3, sks: 3, code: 'IF1003' }
];

const LECTURERS = [
  { id: 1, name: 'Dr. John Doe' },
  { id: 2, name: 'Prof. Jane Smith' },
  { id: 3, name: 'Dr. Robert Johnson' },
  { id: 4, name: 'Dr. Sarah Williams' }
];

const ROOMS = [
  { id: 1, name: 'Lab 1' },
  { id: 2, name: 'Lab 2' },
  { id: 3, name: 'Room 301' },
  { id: 4, name: 'Room 302' }
];

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

const HOURS = Array.from({ length: 15 }, (_, i) => {
  const hour = i + 7;
  return `${hour.toString().padStart(2, '0')}:00`;
});

const CourseScheduler = () => {
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [scheduleForms, setScheduleForms] = useState([{
    class: '',
    quota: '',
    lecturers: [''],
    room: '',
    day: '',
    startTime: '',
    endTime: ''
  }]);

  const calculateEndTime = (startTime, sks) => {
    if (!startTime) return '';
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + (sks * 50);
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  };

  const handleStartTimeChange = (index, value) => {
    const newForms = [...scheduleForms];
    newForms[index].startTime = value;
    newForms[index].endTime = calculateEndTime(value, selectedCourse?.sks || 0);
    setScheduleForms(newForms);
  };

  const handleAddForm = () => {
    setScheduleForms([...scheduleForms, {
      class: '',
      quota: '',
      lecturers: [''],
      room: '',
      day: '',
      startTime: '',
      endTime: ''
    }]);
  };

  const handleRemoveForm = (index) => {
    if (scheduleForms.length > 1) {
      const newForms = scheduleForms.filter((_, i) => i !== index);
      setScheduleForms(newForms);
    }
  };

  const handleAddLecturer = (formIndex) => {
    const newForms = [...scheduleForms];
    newForms[formIndex].lecturers.push('');
    setScheduleForms(newForms);
  };

  const handleRemoveLecturer = (formIndex, lecturerIndex) => {
    const newForms = [...scheduleForms];
    if (newForms[formIndex].lecturers.length > 1) {
      newForms[formIndex].lecturers = newForms[formIndex].lecturers.filter((_, i) => i !== lecturerIndex);
      setScheduleForms(newForms);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSchedules = scheduleForms.map(form => ({
      ...form,
      courseId: selectedCourse.id,
      courseName: selectedCourse.name,
      sks: selectedCourse.sks
    }));
    setSchedules([...schedules, ...newSchedules]);
    setIsModalOpen(false);
    setScheduleForms([{
      class: '',
      quota: '',
      lecturers: [''],
      room: '',
      day: '',
      startTime: '',
      endTime: ''
    }]);
  };

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 flex gap-4">
      {/* Left side - Course list */}
      <div className="w-1/3">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">Daftar Mata Kuliah</h2>
          <div className="space-y-4">
            {COURSES.map(course => (
              <div key={course.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{course.name}</h3>
                <p>Kode: {course.code}</p>
                <p>Semester: {course.semester}</p>
                <p>SKS: {course.sks}</p>
                <button
                  onClick={() => openModal(course)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Atur Jadwal
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Schedule table */}
      <div className="w-2/3">
        <div className="bg-white rounded-lg shadow p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-4">Tabel Jadwal</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Jam</th>
                {DAYS.map(day => (
                  <th key={day} className="border p-2">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map(hour => (
                <tr key={hour}>
                  <td className="border p-2">{hour}</td>
                  {DAYS.map(day => (
                    <td key={`${day}-${hour}`} className="border p-2 h-16">
                      {schedules.map((schedule, index) => {
                        if (schedule.day === day && schedule.startTime === hour) {
                          const durationHours = (
                            parseInt(schedule.endTime.split(':')[0]) - 
                            parseInt(schedule.startTime.split(':')[0])
                          );
                          return (
                            <div 
                              key={index} 
                              className="bg-blue-100 p-2 rounded"
                              style={{
                                minHeight: `${durationHours * 4}rem`
                              }}
                            >
                              <p className="font-semibold">{schedule.courseName}</p>
                              <p className="text-sm">Kelas: {schedule.class}</p>
                              <p className="text-sm">Ruang: {schedule.room}</p>
                              <p className="text-sm">{schedule.startTime} - {schedule.endTime}</p>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-3/4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Atur Jadwal {selectedCourse.name}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="mb-4">
              <p>Kode: {selectedCourse.code}</p>
              <p>SKS: {selectedCourse.sks}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {scheduleForms.map((form, formIndex) => (
                <div key={formIndex} className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Kelas</label>
                      <input
                        required
                        type="text"
                        className="w-full border rounded p-2"
                        value={form.class}
                        onChange={(e) => {
                          const newForms = [...scheduleForms];
                          newForms[formIndex].class = e.target.value;
                          setScheduleForms(newForms);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Kuota</label>
                      <input
                        required
                        type="number"
                        min="1"
                        className="w-full border rounded p-2"
                        value={form.quota}
                        onChange={(e) => {
                          const newForms = [...scheduleForms];
                          newForms[formIndex].quota = Math.max(1, parseInt(e.target.value) || 1);
                          setScheduleForms(newForms);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Ruang</label>
                      <select
                        required
                        className="w-full border rounded p-2"
                        value={form.room}
                        onChange={(e) => {
                          const newForms = [...scheduleForms];
                          newForms[formIndex].room = e.target.value;
                          setScheduleForms(newForms);
                        }}
                      >
                        <option value="">Pilih Ruang</option>
                        {ROOMS.map(room => (
                          <option key={room.id} value={room.name}>{room.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1">Hari</label>
                      <select
                        required
                        className="w-full border rounded p-2"
                        value={form.day}
                        onChange={(e) => {
                          const newForms = [...scheduleForms];
                          newForms[formIndex].day = e.target.value;
                          setScheduleForms(newForms);
                        }}
                      >
                        <option value="">Pilih Hari</option>
                        {DAYS.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1">Jam Mulai</label>
                      <select
                        required
                        className="w-full border rounded p-2"
                        value={form.startTime}
                        onChange={(e) => handleStartTimeChange(formIndex, e.target.value)}
                      >
                        <option value="">Pilih Jam</option>
                        {HOURS.map(hour => (
                          <option key={hour} value={hour}>{hour}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1">Jam Selesai</label>
                      <input
                        type="text"
                        className="w-full border rounded p-2 bg-gray-100"
                        value={form.endTime}
                        readOnly
                        placeholder="Otomatis terisi"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block mb-1">Dosen Pengampu</label>
                    {form.lecturers.map((lecturer, lecturerIndex) => (
                      <div key={lecturerIndex} className="flex gap-2 mb-2">
                        <select
                          required
                          className="w-full border rounded p-2"
                          value={lecturer}
                          onChange={(e) => {
                            const newForms = [...scheduleForms];
                            newForms[formIndex].lecturers[lecturerIndex] = e.target.value;
                            setScheduleForms(newForms);
                          }}
                        >
                          <option value="">Pilih Dosen</option>
                          {LECTURERS.map(l => (
                            <option key={l.id} value={l.name}>{l.name}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => handleAddLecturer(formIndex)}
                          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                          <Plus size={20} />
                        </button>
                        {form.lecturers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveLecturer(formIndex, lecturerIndex)}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                          >
                            <Minus size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {scheduleForms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveForm(formIndex)}
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Hapus Form
                    </button>
                  )}
                </div>
              ))}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleAddForm}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Tambah Form
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseScheduler;