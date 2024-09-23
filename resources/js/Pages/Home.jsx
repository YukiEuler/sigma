import React from 'react';

const Home = ({ user, mahasiswa }) => {
  return (
    <div>
      <h1>User Data</h1>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Role: {user.role}</p>
        </>
      ) : (
        <p>No data available.</p>
      )}

      {mahasiswa && (
        <div>
          {Object.entries(mahasiswa).map(([key, value]) => (
            <p key={key}>
              {key} : {value}
            </p>
          ))}
        </div>
      )}

      <form id="logout-form" action="/logout" method="POST" style={{ display: 'none' }}>
        {/* CSRF Token can be handled with libraries like Axios or Fetch */}
      </form>
      <a
        href="/logout"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('logout-form').submit();
        }}
      >
        Logout
      </a>
    </div>
  );
};

export default Home;
