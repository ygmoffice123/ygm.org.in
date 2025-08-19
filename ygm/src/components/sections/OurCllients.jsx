import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClientCard from '../ClientCard';
import { fetchClients } from '../../utils/redux/slices/clientDataSlice';

const OurClients = () => {
  const dispatch = useDispatch();
  const { data: clients, totalCount: totalClients, loading, error, currentPage, limit } =
    useSelector((state) => state.clients);

  // Auto-fetch first page on mount
  useEffect(() => {
// console.log("client:",clients.length);
console.log("total client:",clients);


    if (clients.length === 0) {
      dispatch(fetchClients());
    }
  }, [dispatch, clients.length]);

  const handleFetchMore = () => {
    if (clients.length < totalClients && !loading) {
      dispatch(fetchClients());
    }
  };

  if (loading && clients.length === 0) {
    return <p className="text-center py-4 text-yellow-500">Loading clients...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-4">Error loading clients: {error}</p>
    );
  }

  return (
    <div className="w-screen h-full px-4 py-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-400">Our Clients</h2>

        <div
          className="grid gap-6 justify-items-center pr-3"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
        >
          {clients.map((item, index) => (
            <ClientCard item={item} key={index} index={index} />
          ))}
        </div>

        {/* Fetch More Button */}
        {clients.length < totalClients && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleFetchMore}
              className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-xl hover:bg-yellow-500 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Fetch More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurClients;
