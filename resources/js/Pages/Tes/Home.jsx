import React, { useEffect } from 'react';

const Home = ({ user, mahasiswa }) => {
    useEffect(() => {
        console.log('User:', user);
        console.log('Mahasiswa:', mahasiswa);
    }, [user, mahasiswa]);

    const handleLogout = (e) => {
        e.preventDefault();
        const csrfToken = document.querySelector('meta[name="csrf-token"]');
        if (csrfToken) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/logout';
            const tokenInput = document.createElement('input');
            tokenInput.type = 'hidden';
            tokenInput.name = '_token';
            tokenInput.value = csrfToken.getAttribute('content');
            form.appendChild(tokenInput);
            document.body.appendChild(form);
            form.submit();
        } else {
            console.error('CSRF token not found');
        }
    };

    return (
        <div>
            {user ? (
                <>
                    <p>Name: {user.name}</p>
                    <p>Role: {user.role}</p>
                </>
            ) : (
                <p>No user data available.</p>
            )}
            {mahasiswa ? (
                <div>
                    {Object.entries(mahasiswa).map(([key, value]) => (
                        <p key={key}>
                            {key}: {value}
                        </p>
                    ))}
                </div>
            ) : (
                <p>No mahasiswa data available.</p>
            )}
            <a href="/logout" onClick={handleLogout}>
                Logout
            </a>
        </div>
    );
};

export default Home;