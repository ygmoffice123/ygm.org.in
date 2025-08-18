import React, { useEffect } from "react";
import FeedbackForm from "./FeedbackForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacks, deleteFeedback } from "../../../utils/redux/slices/feedbackDataSlice";
import { Toaster, toast } from "react-hot-toast";

const AdminFeedback = () => {
  const dispatch = useDispatch();
  const { data: feedback, loading, error, totalCount, currentPage, limit } = useSelector(
    (state) => state.feedback
  );

  useEffect(() => {
    if (feedback.length === 0) dispatch(fetchFeedbacks());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    try {
      await dispatch(deleteFeedback(id)).unwrap();
      toast.success("Feedback deleted!");
    } catch (err) {
      toast.error(err.message || "Failed to delete feedback");
    }
  };

  const handleLoadMore = () => {
    if (feedback.length < totalCount) {
      dispatch(fetchFeedbacks());
    }
  };

  return (
    <div className="min-h-screen bg-black px-6 py-10">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
        Manage Feedbacks
      </h1>

      <FeedbackForm />

      {loading && <p className="text-yellow-400 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedback?.length === 0 && !loading && (
          <p className="text-yellow-400 text-center col-span-2">No feedbacks available.</p>
        )}

        {feedback.map((item) => (
          <div
            key={item._id}
            className="p-4 bg-black border border-yellow-500 rounded-xl shadow-md text-yellow-200 relative"
          >
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold"
            >
              Delete
            </button>
            <p className="font-semibold">{item.company}</p>
            <p className="mt-1">{item.feedback}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {feedback.length < totalCount && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-xl hover:bg-yellow-500 transition duration-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {totalCount > 0 && (
        <p className="text-yellow-400 mt-6 text-center">Total Feedbacks: {totalCount}</p>
      )}
    </div>
  );
};

export default AdminFeedback;
