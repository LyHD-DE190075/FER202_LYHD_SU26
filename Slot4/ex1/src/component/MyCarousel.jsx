// creat Carousels component, sử dụng bannerData để hiển thị các banner trong carousel
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { bannerData } from '../data/bannerData';
function MyCarousel() {
    return (
        <div>
            <Carousel>
                {bannerData.map((banner) => (
                    <Carousel.Item key={banner.id}>
                        <img 
                            className="d-block w-100" 
                            src={banner.imageSrc} 
                            alt={banner.name} 
                            style={{ height: '500px', objectFit: 'cover' }} 
                        />
                        <Carousel.Caption>
                            <h3>{banner.name}</h3>
                            <p>{banner.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default MyCarousel;