import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";

const EditFounderForm = () => {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch existing founders data
  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const res = await axiosInstance.get(`/founder/fetch-founder`);
        const fetchedFounders = res?.data?.data?.founders || [];
        if (!fetchedFounders.length) throw new Error("No founder data found");
        setFounders(fetchedFounders);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch founders data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFounders();
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFounders = [...founders];
    updatedFounders[index][name] = value;
    setFounders(updatedFounders);
  };

  const handleBioChange = (fIndex, bIndex, value) => {
    const updatedFounders = [...founders];
    updatedFounders[fIndex].bio[bIndex] = value;
    setFounders(updatedFounders);
  };

  const addBioPoint = (fIndex) => {
    const updatedFounders = [...founders];
    updatedFounders[fIndex].bio.push("");
    setFounders(updatedFounders);
  };

  const handleSubmit = async (e, founder) => {
    e.preventDefault();
    setUploading(true);
    setMessage("");
    setError("");

    try {
      await axiosInstance.put(`/founder/edit-founder/${founder._id}`, founder);
      setMessage(`${founder.name} updated successfully.`);
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
    <div className="space-y-10 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#d4af37]">Edit Founders</h2>

      {message && <div className="text-green-400">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}

      {founders.map((founder, fIndex) => (
        <form
          key={founder._id}
          onSubmit={(e) => handleSubmit(e, founder)}
          className="bg-black text-white p-6 rounded-md space-y-4"
        >
          <h3 className="text-xl font-medium text-yellow-300">{founder.position}</h3>

          <div>
            <label className="block">Name:</label>
            <input
              type="text"
              name="name"
              value={founder.name}
              onChange={(e) => handleChange(fIndex, e)}
              className="w-full p-2 bg-gray-800 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="block">Position:</label>
            <input
              type="text"
              name="position"
              value={founder.position}
              onChange={(e) => handleChange(fIndex, e)}
              className="w-full p-2 bg-gray-800 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="block">Image URL:</label>
            <input
              type="text"
              name="image"
              value={founder.image}
              onChange={(e) => handleChange(fIndex, e)}
              className="w-full p-2 bg-gray-800 rounded mt-1"
            />
          </div>

          <div>
            <label className="block">Quote:</label>
            <input
              type="text"
              name="quote"
              value={founder.quote}
              onChange={(e) => handleChange(fIndex, e)}
              className="w-full p-2 bg-gray-800 rounded mt-1"
            />
          </div>

          <div>
            <label className="block">Bio:</label>
            {founder.bio.map((point, bIndex) => (
              <textarea
                key={bIndex}
                value={point}
                onChange={(e) => handleBioChange(fIndex, bIndex, e.target.value)}
                className="w-full p-2 bg-gray-800 rounded mt-1 mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => addBioPoint(fIndex)}
              className="text-sm text-blue-400 mt-1"
            >
              + Add another bio point
            </button>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`px-4 py-2 rounded text-black ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#d4af37] hover:bg-yellow-400"
            }`}
          >
            {uploading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      ))}
    </div>
  );
};

export default EditFounderForm;
