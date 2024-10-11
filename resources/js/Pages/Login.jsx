import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        Inertia.post("/actionlogin", formData, {
            onError: (errors) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: 'Periksa Kembali Email dan Password',
                });
            },
        });
    };

    return (
        <main
            className="min-h-screen flex items-center justify-center w-full"
            style={{
                backgroundImage: "url('/bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-xl">
                    <img
                        src="/logoundip.png"
                        alt="Logo Undip"
                        className="mx-auto mb-4"
                        style={{ width: "200px", height: "auto" }}
                    />
                    <h1 className="text-4xl font-bold text-center mb-4 text-black">
                        Single Sign On (SSO)
                    </h1>
                    <h2 className="text-2xl text-center mb-8 text-black">
                        Universitas Diponegoro
                    </h2>
                    <div className="flex items-center mb-8">
                        <div className="flex-grow border-t border-slate-300"></div>
                        <span className="mx-4 text-sm text-center text-black">
                            Silahkan Masuk
                        </span>
                        <div className="flex-grow border-t border-slate-300"></div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="text-sm font-medium text-gray-700 mb-2 flex items-center"
                            >
                                <Icon
                                    icon="lucide:circle-user-round"
                                    width="24px"
                                    height="24px"
                                    className="mr-2"
                                />
                                Username
                            </label>
                            <input
                                type="text"
                                className="shadow-sm rounded-md w-96 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                style={{ color: "black" }}
                                placeholder="NIM/NIP/username/e-mail official Undip"
                                id="email"
                                name="email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700 mb-2 flex items-center"
                            >
                                <Icon
                                    icon="lucide:lock"
                                    width="24px"
                                    height="24px"
                                    className="mr-2"
                                />
                                Password
                            </label>
                            <input
                                type="password"
                                className="shadow-sm rounded-md w-96 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                style={{ color: "black" }}
                                placeholder="Password"
                                id="password"
                                name="password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full h-14x flex justify-center items-center py-2 px-4 border-4 rounded-md shadow-sm text-lg font-medium text-white bg-black border-black hover:bg-slate-800 hover:border-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
