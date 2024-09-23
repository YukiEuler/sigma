<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SIGMA UNDIPi</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container"><br>
        <div class="col-md-4 col-md-offset-4">
            <h2 class="text-center"><b>SIGMA UNDIP</b><br>Sistem Informasi Gabungan Akademik Mahasiswa</h3>
            <hr>
            @if(session('error'))
            <div class="alert alert-danger">
                <b>Opps!</b> {{session('error')}}
            </div>
            @endif
            <form action="{{ route('actionlogin') }}" method="post">
            @csrf
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" class="form-control" placeholder="Email" required="">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <div class="input-group">
                        <input type="password" name="password" class="form-control" placeholder="Password" required="" id="password">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" onclick="togglePasswordVisibility()">
                                <i class="glyphicon glyphicon-eye-open"></i>
                            </button>
                        </span>
                    </div>
                    <script>
                        function togglePasswordVisibility() {
                            var passwordField = document.getElementById('password');
                            var passwordFieldType = passwordField.getAttribute('type');
                            if (passwordFieldType == 'password') {
                                passwordField.setAttribute('type', 'text');
                            } else {
                                passwordField.setAttribute('type', 'password');
                            }
                        }
                    </script>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Log In</button>
                <hr>
                <p class="text-center"><a href="{{ route('register') }}">Register</a></p>
            </form>
        </div>
    </div>
</body>
</html>