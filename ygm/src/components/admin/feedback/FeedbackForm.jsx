    import React, { useState } from "react";
    import { useDispatch } from "react-redux";
    import { addFeedback } from "../../../utils/redux/slices/feedbackDataSlice";
    import { toast } from "react-hot-toast";

    const FeedbackForm = () => {
    const dispatch = useDispatch();
    const [company, setCompany] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!company || !feedback) {
        toast.error("Please fill all fields!");
        return;
        }

        try {
        await dispatch(addFeedback({ company, feedback })).unwrap();
        toast.success("Feedback added successfully!");
        setCompany("");
        setFeedback("");
        } catch (err) {
        toast.error(err.message || "Failed to add feedback");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-black rounded-2xl shadow-xl border border-yellow-500">
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">
            Add Feedback
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
            <label className="block text-yellow-400 font-semibold mb-1">
                Company
            </label>
            <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-yellow-500 bg-black text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter company name"
            />
            </div>

            <div>
            <label className="block text-yellow-400 font-semibold mb-1">
                Feedback
            </label>
            <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-yellow-500 bg-black text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows="4"
                placeholder="Write your feedback"
            ></textarea>
            </div>

            <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-xl hover:bg-yellow-500 transition duration-300"
            >
            Submit
            </button>
        </form>
        </div>
    );
    };

    export default FeedbackForm;
