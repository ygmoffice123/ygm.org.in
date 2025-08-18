import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaPlusCircle, FaCertificate } from 'react-icons/fa';
import LisenceCard from '../../LisenceCard.jsx';
import AddStrengthForm from './AddStrengthForm.jsx';
import { fetchStrengths, deleteStrength, addStrength } from '../../../utils/redux/slices/strengthDataSlice.js';
import { toast } from 'react-hot-toast';

const AdminStrengths = () => {
  const dispatch = useDispatch();
  const { data: licenses, loading, error } = useSelector(state => state.strengths);
  const { isAuthenticated, admin } = useSelector(state => state.admin);
  const isAdmin = isAuthenticated && admin?.role === 'admin';

  // useEffect(() => {
  //   dispatch(fetchStrengths());
  // }, [dispatch]);

  useGSAP(() => {
    gsap.from('.admin-strength-heading', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.add-strength-form', {
      x: -50,
      opacity: 0,
      delay: 0.3,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.license-grid', {
      opacity: 0,
      y: 50,
      delay: 0.6,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteStrength(id)).unwrap();
      toast.success('License deleted successfully');
    } catch (error) {
      toast.error(error || 'Failed to delete license');
    }
  };

  const handleAddStrength = async (strengthData, resetForm) => {
    try {
      await dispatch(addStrength(strengthData)).unwrap();
      toast.success('Strength added successfully');
      resetForm();
    } catch (error) {
      toast.error(error || 'Failed to add strength');
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#FFD700] px-4 md:px-12 py-10 space-y-20 font-sans">
      <div className="text-center admin-strength-heading">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          Our Strengths
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Authorized licenses and professional documentation
        </p>
      </div>

      <div className="add-strength-form">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-center gap-2">
          <FaPlusCircle /> Add New Strength
        </h2>
        <AddStrengthForm onAddStrength={handleAddStrength} />
      </div>

      <div className="license-grid">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center justify-center gap-2">
          <FaCertificate /> Available Licenses
        </h2>

        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {licenses?.length > 0 ? (
            licenses.map((license, index) => (
              <LisenceCard
                key={`${license._id}-${index}`}
                item={license}
                isAdmin={isAdmin}
                onDelete={handleDelete}
              />
            ))
          ) : !loading && (
            <p className="text-center text-gray-400 col-span-full">
              No licenses found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStrengths;
