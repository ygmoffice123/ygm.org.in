import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";

const EditFounderForm = () => {
  const [founderData, setFounderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch existing founder data
  useEffect(() => {
    const fetchFounder = async () => {
      try {
        const res = await axiosInstance.get(`/founder/fetch-founder`);
        const fetchedFounder = res?.data?.data?.founders?.[0];
        if (!fetchedFounder) throw new Error("Founder data not found");
        setFounderData(fetchedFounder);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch founder data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFounder();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFounderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBioChange = (index, value) => {
    const newBio = [...founderData.bio];
    newBio[index] = value;
    setFounderData((prev) => ({
      ...prev,
      bio: newBio,
    }));
  };

  const addBioPoint = () => {
    setFounderData((prev) => ({
      ...prev,
      bio: [...prev.bio, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage("");
    setError("");

    try {
      await axiosInstance.put(`/founder/edit-founder/${founderData._id}`, founderData);
      setMessage("Founder updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Update failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="text-yellow-400">Loading founder data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-md space-y-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#d4af37]">Edit Founder</h2>

      {message && <div className="text-green-400">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div>
        <label className="block">Name:</label>
        <input
          type="text"
          name="name"
          value={founderData.name}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded mt-1"
          required
        />
      </div>

      <div>
        <label className="block">Position:</label>
        <input
          type="text"
          name="position"
          value={founderData.position}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded mt-1"
          required
        />
      </div>

      <div>
        <label className="block">Image URL:</label>
        <input
          type="text"
          name="image"
          value={founderData.image}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded mt-1"
        />
      </div>

      <div>
        <label className="block">Quote:</label>
        <input
          type="text"
          name="quote"
          value={founderData.quote}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded mt-1"
        />
      </div>

      <div>
        <label className="block">Bio:</label>
        {founderData.bio.map((point, index) => (
          <textarea
            key={index}
            value={point}
            onChange={(e) => handleBioChange(index, e.target.value)}
            className="w-full p-2 bg-gray-800 rounded mt-1 mb-2"
          />
        ))}
        <button
          type="button"
          onClick={addBioPoint}
          className="text-sm text-blue-400 mt-1"
        >
          + Add another bio point
        </button>
      </div>

      <button
        type="submit"
        disabled={uploading}
        className={`px-4 py-2 rounded text-black ${uploading ? "bg-gray-400 cursor-not-allowed" : "bg-[#d4af37] hover:bg-yellow-400"}`}
      >
        {uploading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditFounderForm;
