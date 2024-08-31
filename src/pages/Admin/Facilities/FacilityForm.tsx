import { useDispatch, useSelector } from 'react-redux';
import {
  updateFacility,
  createFacility,
} from '../../../redux/features/facilities/facilitiesSlice';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';

interface FacilityFormProps {
  facilityId?: string;
  onClose: () => void;
}

const FacilityForm: React.FC<FacilityFormProps> = ({ facilityId, onClose }) => {
  const dispatch = useDispatch();
  const { facilities } = useSelector((state: RootState) => state.facilities);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerHour, setPricePerHour] = useState<number>(0);
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (facilityId) {
      const facility = facilities.find((f) => f._id === facilityId);
      if (facility) {
        setName(facility.name);
        setDescription(facility.description);
        setPricePerHour(facility.pricePerHour);
        setLocation(facility.location);
      }
    }
  }, [facilityId, facilities]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('pricePerHour', pricePerHour.toString());
    formData.append('location', location);
    if (image) {
      formData.append('image', image);
    }

    if (facilityId) {
      dispatch(updateFacility({ id: facilityId, facilityData: formData }));
    } else {
      dispatch(createFacility(formData));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
      </div>
      <div>
        <label className="block">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea"
          required
        />
      </div>
      <div>
        <label className="block">Price Per Hour:</label>
        <input
          type="number"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(Number(e.target.value))}
          className="input"
          required
        />
      </div>
      <div>
        <label className="block">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input"
          required
        />
      </div>
      <div>
        <label className="block">Image:</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="input"
        />
      </div>
      <button type="submit" className="btn">
        {facilityId ? 'Update Facility' : 'Add Facility'}
      </button>
    </form>
  );
};

export default FacilityForm;
