import React, { useState, useEffect } from 'react';

function Banner() {
    const [bannerData, setBannerData] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/banner');
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setBannerData(data[0]);
                    setTimeRemaining(data[0].timer || 0); // Set initial timer value
                }
            } catch (error) {
                console.error('Error fetching banner data:', error);
                // Handle error, e.g., display an error message
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let interval = null;
        if (timeRemaining > 0 && bannerData?.is_visible) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timeRemaining, bannerData]);

    return (
        <div className="banner" style={{ display: bannerData?.is_visible ? 'block' : 'none' }}>
            {bannerData && (
                <>
                    <p>{bannerData.description}</p>
                    <a href={bannerData.link} target="_blank" rel="noopener noreferrer">
                        {bannerData.link}
                    </a>
                    <p>Time Remaining: {timeRemaining} seconds</p>
                </>
            )}
        </div>
    );
}

export default Banner;