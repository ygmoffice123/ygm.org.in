import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClientCard from '../ClientCard';
import { fetchClients } from '../../utils/redux/slices/clientDataSlice';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import gsap from 'gsap';

const OurClients = () => {
    const titleRef = useRef();
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




    useGSAP(() => {
    // Animate Title
    const titleSplit = new SplitText(titleRef.current, { type: "words" });
    gsap.from(titleSplit.words, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".client-container",
        start: "top 80%",
        end: "top 70%",
        scrub: 0.5,
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div className="client-container w-screen h-full px-4 py-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2  ref={titleRef}  className="text-4xl md:text-5xl font-extrabold text-center text-[#FFD700] mb-10">Our Clients</h2>

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
