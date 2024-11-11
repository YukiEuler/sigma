<?php

namespace Database\Seeders;

use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Process\FakeProcessResult;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        User::create([
            'username' => '197805162003121001',
            'email' => 'helmie@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198803222020121010',
            'email' => 'prajanto@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198511252018032001',
            'email' => 'rismiyati@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '197905242009121003',
            'email' => 'sutikno@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198012272015041002',
            'email' => 'guruh@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '197007051997021001',
            'email' => 'priyosidiksasongko@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => 'H.7.199602212023072001',
            'email' => 'etnavianita02@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => 'H.7.199204252023072001',
            'email' => 'yeva@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '197308291998022001',
            'email' => 'betanoranita@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198302032006041002',
            'email' => 'satriyo@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '199606132024062001',
            'email' => 'dhenakamalia@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '199603032024061003',
            'email' => 'sandy@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '199112092024061001',
            'email' => 'adhesetya@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '199612272024061001',
            'email' => 'henritantyoko@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198009142006041002',
            'email' => 'edys@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198903032015042002',
            'email' => 'khadijah@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '199805212024061001',
            'email' => 'satriawanrasyid@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '196511231994031003',
            'email' => 'rahmatgernowo@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '196311051988031001',
            'email' => 'bayus@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198203092006041002',
            'email' => 'adiwibowo@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '196512051988031058',
            'email' => 'abdullah@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '197404011999031002',
            'email' => 'arispw@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '196109281986032002',
            'email' => 'tatikwidiharih@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198104202005012001',
            'email' => 'retno@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198121502005012072',
            'email' => 'sugito@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '197211211998021001',
            'email' => 'jatmikoendro@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '197902122008121002',
            'email' => 'indrawaspada@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '195809011986032002',
            'email' => 'sunarsih@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '197108111997021004',
            'email' => 'arissugiharto@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '197907202003121002',
            'email' => 'nurdinbahtiar@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);


        User::create([
            'username' => '196511071992031003',
            'email' => 'ekoadisarwoko@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);


        User::create([
            'username' => '197203171998021001',
            'email' => 'kusworoadi@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);


        User::create([
            'username' => '197108222997021079',
            'email' => 'slamet@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);


        User::create([
            'username' => '197601102009122002',
            'email' => 'dinarmutiara@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => 'H.7.198806142022102001',
            'email' => 'yuniladwiputriariyan@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '196502251992011001',
            'email' => 'rukunsantoso@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '196502251992011272',
            'email' => 'endang@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '196502256192011897',
            'email' => 'atrinawati@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198010212005011003',
            'email' => 'ragilsaputra@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198010212005011229',
            'email' => 'margaretha@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198010212005017123',
            'email' => 'darosy@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198010211005211603',
            'email' => 'dyah@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198010211005211629',
            'email' => 'sutrisno@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '196902141994032002',
            'email' => 'widowati@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '197312202000121001',
            'email' => 'farikhin@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '196405181992031002',
            'email' => 'caturediwidodo@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        User::create([
            'username' => '198106202015041002',
            'email' => 'muhammadmalikhakim@lecturer.undip.ac.id',
            'password' => Hash::make('password'),
            'role' => 'Dosen',
        ]);

        
        
    }
}
