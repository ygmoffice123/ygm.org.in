import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacks } from "../../utils/redux/slices/feedbackDataSlice";
import { FaQuoteLeft } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

const FeedBackPage = () => {
  const dispatch = useDispatch();
  const { data: feedback, loading, error, totalCount } = useSelector(
    (state) => state.feedback
  );

  useEffect(() => {
    if (feedback.length === 0) dispatch(fetchFeedbacks());
  }, [dispatch]);

  const handleLoadMore = () => {
    if (feedback.length < totalCount) {
      dispatch(fetchFeedbacks());
    }
  };

  return (
    <div className="pt-20 w-screen min-h-screen bg-black py-12 px-4">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center text-[#FFD700] mb-10">
        Client Feedback
      </h1>

      {loading && <p className="text-yellow-400 text-center mb-4">Loading...</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"> */}
      <div className="max-w-6xl mx-auto flex flex-wrap">
  {feedback.map((item) => (
    <div
      key={item._id}
      className="bg-[#111111] shadow-lg rounded-2xl p-6 border border-[#FFD700] hover:shadow-[0_0_20px_#FFD700] transition-all duration-300 m-6 grow min-w-[300px]"
    >
      <FaQuoteLeft size={30} color="#FFD700" />
      <p className="pt-3 text-gray-300 text-sm">{item.feedback}</p>
      <h5 className="text-right text-[#FFD700] mt-4 font-medium">
        - {item.company}
      </h5>
    </div>
  ))}
</div>


      {/* Load More Button */}
      {feedback.length < totalCount && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-[#FFD700] text-black font-bold py-2 px-6 rounded-xl hover:bg-yellow-500 transition duration-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedBackPage;
