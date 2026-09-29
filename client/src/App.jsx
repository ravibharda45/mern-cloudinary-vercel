import { useState } from "react";

function App() {

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("image", image);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    console.log(data);

    setImageUrl(data.imageUrl);

    alert(data.message);
  };

  return (
    <div>

      <h1>Cloudinary Image Upload</h1>

      <input
        type="file"
        onChange={handleImageChange}
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload Image
      </button>

      <br />
      <br />

      {imageUrl && (
        <div>
          <h2>Uploaded Image</h2>

          <img
            src={imageUrl}
            alt="Uploaded"
            width="300"
          />
        </div>
      )}

    </div>
  );
}

export default App;