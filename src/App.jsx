import React, { useState } from "react";

function App() {
  const [image, setImage] = useState(null);

  // Load the image from localStorage when the component mounts
  React.useEffect(() => {
    const storedImage = localStorage.getItem("profilePhotoBlob");

    if (storedImage) {
      // Convert the stored base64 back to a Blob
      const blob = new Blob([Uint8Array.from(atob(storedImage), c => c.charCodeAt(0))]);
      const blobUrl = URL.createObjectURL(blob); // Create URL for Blob
      setImage(blobUrl); // Set the Blob URL to display the image
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const blob = new Blob([arrayBuffer], { type: file.type });
        const blobUrl = URL.createObjectURL(blob);

        setImage(blobUrl);
        const blobToBase64 = new FileReader();
        blobToBase64.onloadend = function () {
          const base64data = blobToBase64.result.split(",")[1]; 
          localStorage.setItem("profilePhotoBlob", base64data); 
        };
        blobToBase64.readAsDataURL(blob); 
      };
      reader.readAsArrayBuffer(file); 
    }
  };

  return (
    <div>
      <h1>Upload Profile Photo</h1>
      {image ? (
        <img
          src={image}
          alt="Profile"
          style={{ width: "200px", height: "200px", borderRadius: "50%" }}
        />
      ) : (
        <p>No Profile Photo Uploaded</p>
      )}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button
        onClick={() => {
          localStorage.removeItem("profilePhotoBlob");
          setImage(null);
        }}
      >
        Remove Profile Photo
      </button>
    </div>
  );
}

export default App;
