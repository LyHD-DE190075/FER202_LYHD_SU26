import React from 'react';
import MyProfile from './MyProfile'; // Sử dụng đúng dấu chấm đơn ./ vì chung thư mục

function Footer() {
    const profile = {
        id: "DE190075",
        name: "LyHD",
        email: "lyhdde190075@fpt.edu.vn",
        githubLink: "https://github.com/LyHD-DE190075/FER202_LYHD_SU26.git",
        avatarSrc: "/image/avatar/avatar1.jpg"
    };

    return (
        <footer style={{
            position: 'fixed', 
            bottom: 0, 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
        }}>
            <MyProfile profile={profile} />
        </footer>
    );
}

export default Footer; // Bắt buộc phải có dòng này