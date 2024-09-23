resources/views/home.blade.php

<!DOCTYPE html>
<html>
<head>
    <title>User Data</title>
</head>
<body>
    <h1>User Data</h1>
    @if(isset($user))
        <p>Name: {{ $user->name }}</p>
        <p>Role: {{ $user->role }}</p>
    @else
        <p>No data available.</p>
    @endif

    @if (isset($mahasiswa))
    <?php
        foreach ($mahasiswa->toArray() as $x => $y) {
            echo "$x : $y <br>";
        }
    ?>
    @endif


    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>
    <a href="{{ route('logout') }}" 
       onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
       Logout
    </a>
</body>
</html>
