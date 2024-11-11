<?php

namespace Database\Seeders;

use App\Models\Dosen;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class DosenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        Dosen::create([
            'nip' => '197805162003121001',
            'nama' => 'Dr. Helmie Arif Wibawa, S.Si., M.Cs.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 1
        ]);

        Dosen::create([
            'nip' => '198803222020121010',
            'nama' => 'Prajanto Wahyu Adi, M.Kom.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 2
        ]);

        Dosen::create([
            'nip' => '198511252018032001',
            'nama' => 'Rismiyati, B.Eng, M.Cs',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 3
        ]);

        Dosen::create([
            'nip' => '197905242009121003',
            'nama' => 'Dr. Sutikno, S.T., M.Cs.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 4
        ]);

        Dosen::create([
            'nip' => '198012272015041002',
            'nama' => 'Guruh Aryotejo, S.Kom., M.Sc.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 5
        ]);

        Dosen::create([
            'nip' => '197007051997021001',
            'nama' => 'Priyo Sidik Sasongko, S.Si., M.Kom.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 6
        ]);

        Dosen::create([
            'nip' => 'H.7.199602212023072001',
            'nama' => 'Etna Vianita, S.Mat., M.Mat.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 7
        ]);

        Dosen::create([
            'nip' => 'H.7.199204252023072001',
            'nama' => 'Dr. Yeva Fadhilah Ashari, S.Si., M.Si.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 8
        ]);

        Dosen::create([
            'nip' => '197308291998022001',
            'nama' => 'Beta Noranita, S.Si., M.Kom.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 9
        ]);

        Dosen::create([
            'nip' => '198302032006041002',
            'nama' => 'Satriyo Adhy, S.Si., M.T.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 10
        ]);

        Dosen::create([
            'nip' => '199606132024062001',
            'nama' => "Dhena Kamalia Fu'adi, S.Kom., M.Kom.",
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 11
        ]);

        Dosen::create([
            'nip' => '199603032024061003',
            'nama' => 'Sandy Kurniawan, S.Kom., M.Kom.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 12
        ]);

        Dosen::create([
            'nip' => '199112092024061001',
            'nama' => 'Adhe Setya Pramayoga, M.T.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 13
        ]);

        Dosen::create([
            'nip' => '199612272024061001',
            'nama' => 'Henri Tantyoko, S.Kom., M.Kom.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 14
        ]);

        Dosen::create([
            'nip' => '198009142006041002',
            'nama' => 'Edy Suharto, S.T., M.Kom',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 15
        ]);

        Dosen::create([
            'nip' => '198903032015042002',
            'nama' => 'Khadijah, S.Kom., M.Cs.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 16
        ]);

        Dosen::create([
            'nip' => '199805212024061001',
            'nama' => 'Satriawan Rasyid Purnama, S.Kom., M.Cs.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 17
        ]);

        Dosen::create([
            'nip' => '196511231994031003',
            'nama' => 'Prof. Dr. Rahmat Gernowo, M.Si.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 18
        ]);

        Dosen::create([
            'nip' => '196311051988031001',
            'nama' => 'Drs. Bayu Surarso, M.Sc., Ph.D.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 19
        ]);

        Dosen::create([
            'nip' => '198203092006041002',
            'nama' => 'Dr.Eng. Adi Wibowo, S.Si., M.Kom.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 20
        ]);

        Dosen::create([
            'nip' => '196512051988031058',
            'nama' => 'Dr. Drs. Muh Abdullah, M.A.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 21
        ]);

        Dosen::create([
            'nip' => '197404011999031002',
            'nama' => 'Dr. Aris Puji Widodo, S.Si., M.T.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 22
        ]);

        Dosen::create([
            'nip' => '196109281986032002',
            'nama' => 'Dr. Dra. Tatik Widiharih, M.Si.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 23
        ]);

        Dosen::create([
            'nip' => '198104202005012001',
            'nama' => 'Dr. Retno Kusumaningrum, S.Si., M.Kom.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 24
        ]);

        Dosen::create([
            'nip' => '198121502005012072',
            'nama' => 'Sugito, S.Si., M.Si.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 25
        ]);

        Dosen::create([
            'nip' => '197211211998021001',
            'nama' => 'Jatmiko Endro Suseno, S.Si., M.Si., Ph.D.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 26
        ]);

        Dosen::create([
            'nip' => '197902122008121002',
            'nama' => 'Dr. Indra Waspada, S.T., M.TI',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 27
        ]);

        Dosen::create([
            'nip' => '195809011986032002',
            'nama' => 'Prof. Dr. Dra. Sunarsih, M.Si.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 28
        ]);

        Dosen::create([
            'nip' => '197108111997021004',
            'nama' => 'Dr. Aris Sugiharto, S.Si., M.Kom.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'kaprodi' => true,
            'id_prodi' => 62,
            'user_id' => 29
        ]);

        Dosen::create([
            'nip' => '197907202003121002',
            'nama' => 'Nurdin Bahtiar, S.Si., M.T.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 30
        ]);

        Dosen::create([
            'nip' => '196511071992031003',
            'nama' => 'Drs. Eko Adi Sarwoko, M.Komp.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 31
        ]);

        Dosen::create([
            'nip' => '197203171998021001',
            'nama' => 'Prof. Dr. Kusworo Adi, S.Si., M.T.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 32
        ]);

        Dosen::create([
            'nip' => '197108222997021079',
            'nama' => 'Drs. Slamet Subekti, M.Hum.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 33
        ]);
        
        Dosen::create([
            'nip' => '197601102009122002',
            'nama' => 'Dinar Mutiara Kusumo Nugraheni, S.T., M.InfoTech.(Comp)., Ph.D.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 34
        ]);

        Dosen::create([
            'nip' => 'H.7.198806142022102001',
            'nama' => 'Yunila Dwi Putri Ariyanti, S.Kom., M.Kom.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 35
        ]);

        Dosen::create([
            'nip' => '196502251992011001',
            'nama' => 'Dr.Drs. Rukun Santoso, M.Si.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 36
        ]);

        Dosen::create([
            'nip' => '196502251992011272',
            'nama' => 'Dra. Endang Kumaidah, M.Kes',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 37
        ]);

        Dosen::create([
            'nip' => '196502256192011897',
            'nama' => 'Dra. R.A.J. Atrinawati, M.Hum',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 38
        ]);

        Dosen::create([
            'nip' => '198010212005011003',
            'nama' => 'Ragil Saputra, S.Si., M.Cs.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 39
        ]);

        Dosen::create([
            'nip' => '198010212005011229',
            'nama' => 'Dra. Margaretha Suryaningsih, M.S',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 40
        ]);

        Dosen::create([
            'nip' => '198010212005017123',
            'nama' => 'Dra. Darosy Endah Hyoscyamina, M.Pd.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 41
        ]);

        Dosen::create([
            'nip' => '198010211005211603',
            'nama' => 'Dyah Wijaningsih, S.H., M.H.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 42
        ]);

        Dosen::create([
            'nip' => '198010211005211629',
            'nama' => 'Dr. Sutrisno, S.Si., M.Sc',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 43
        ]);

        Dosen::create([
            'nip' => '196902141994032002',
            'nama' => 'Prof. Dr. Widowati, S.Si., M.Si.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 44
        ]);

        Dosen::create([
            'nip' => '197312202000121001',
            'nama' => 'Farikhin, S.Si., M.Si., Ph.D.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 45
        ]);

        Dosen::create([
            'nip' => '196405181992031002',
            'nama' => 'Dr.Drs. Catur Edi Widodo, M.T.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 46
        ]);

        Dosen::create([
            'nip' => '198106202015041002',
            'nama' => 'Muhammad Malik Hakim, S.T., M.T.I.',
            'alamat' => $faker->address,
            'no_telp' => $faker->phoneNumber,
            'id_prodi' => 62,
            'user_id' => 47
        ]);
    }
}
