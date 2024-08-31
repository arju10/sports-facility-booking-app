// src/components/facility/DeleteFacility.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteFacility: React.FC = () => {
  const { id } = useParams();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5500/api/facility/${id}`);
      navigate('/facilities');
    } catch (err) {
      setError('Error deleting facility.');
      console.error('Error deleting facility:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <h1>Delete Facility</h1>
      <p>Are you sure you want to delete this facility?</p>
      <button onClick={handleDelete} disabled={deleting}>
        {deleting ? 'Deleting...' : 'Delete Facility'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DeleteFacility;
