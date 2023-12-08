import React from 'react';

const Login = () => {
    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Đăng Nhập</h2>
                <label htmlFor="username">Tên Truy Cập:</label>
                <input type="text" id="username" name="username" />

                <label htmlFor="password">Mật Khẩu:</label>
                <input type="password" id="password" name="password" />

                <button type="submit">Đăng Nhập</button>
            </form>
        </div>
    );
};

export default Login;
