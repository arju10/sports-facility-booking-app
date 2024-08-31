import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';

const UpdateFacility: React.FC = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState<any>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/facility/${id}`,
        );
        const { name, description, pricePerHour, location } = response.data; // include schedule if it exists
        setFacility(response.data);
        setName(name);
        setDescription(description);
        setPricePerHour(pricePerHour);
        setLocation(location);
        // If you have a schedule, add state management for it here
      } catch (err) {
        setError('Error fetching facility details.');
        console.error('Error fetching facility details:', err);
      }
    };

    fetchFacility();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = facility.image;

      if (image) {
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'image'); // This is your Cloudinary preset name

        // Correct Cloudinary URL and cloud name
        const uploadResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dljtrk80s/image/upload',
          formData,
        );
        imageUrl = uploadResponse.data.secure_url;
      }

      // Update facility details
      await axios.put(`http://localhost:5500/api/facility/${id}`, {
        name,
        description,
        pricePerHour,
        location,
        image: imageUrl,
      });

      navigate('/facilities');
    } catch (err) {
      setError('Error updating facility.');
      console.error('Error updating facility:', err);
    } finally {
      setUploading(false);
    }
  };

  if (!facility) return <p>Loading...</p>;

  return (
    <div>
      <h1>Update Facility</h1>
      <form onSubmit={handleSubmit}>
        {/* Your form fields here */}
        <label>
          Schedule:
          {facility.schedule ? (
            <div>
              {/* Render schedule details */}
              {facility.schedule.map((slot: any, index: number) => (
                <div key={index}>
                  <p>
                    {slot.day}: {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No schedule available.</p>
          )}
        </label>
        {/* Other form fields and submit button */}
      </form>

      {facility.image && (
        <div>
          <h2>Current Image:</h2>
          <AdvancedImage cldImg={facility.image} alt={name} />
        </div>
      )}
    </div>
  );
};

export default UpdateFacility;
