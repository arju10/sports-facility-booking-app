import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFacility: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = '';

      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'your_cloudinary_preset');

        const uploadResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
          formData,
        );
        imageUrl = uploadResponse.data.secure_url;
      }

      await axios.post('http://localhost:5500/api/facility', {
        name,
        description,
        pricePerHour,
        location,
        image: imageUrl,
      });

      navigate('/facilities');
    } catch (err) {
      setError('Error creating facility.');
      console.error('Error creating facility:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Create New Facility</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price Per Hour:
          <input
            type="number"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        <button type="submit" disabled={uploading}>
          {uploading ? 'Creating...' : 'Create Facility'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CreateFacility;
