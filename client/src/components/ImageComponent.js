import React, { useEffect, useState } from 'react';

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetch(`/api/get-image`).then(response => {
                console.log(response);  // Log the entire response object
                return response.json(); // Parse it as JSON
            }).then(data => {
                console.log(data);  // Log the parsed JSON data
                setImageUrl(data.url); // Set the image URL from the response JSON
            })
            .catch(error => { console.error('Error fetching the image URL:', error); });
    }, []);


    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
        {imageUrl ? (
                <img src={imageUrl} alt="Santa" className="w-full h-full object-cover" />
            ) : (
                <p>Loading...</p>
            )}
        </div>

    );
};

export default ImageComponent;
