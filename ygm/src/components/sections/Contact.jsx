  import React, { useRef, useState } from "react";
  import emailjs from "@emailjs/browser";
  import { Toaster, toast } from "react-hot-toast";
  import { companyTypes } from "../../data/contactUsData";
  import ContactInfo from "../ContactInfo";
  import { useSelector } from "react-redux";

  function Contact() {
    // Destructure from Redux, rename loading to contactLoading to avoid conflict
    const { data: contactDetails, loading: contactLoading, error } = useSelector(
      (state) => state.contact
    );

    // Local state to handle email sending loading
    const [loading, setLoading] = useState(false);

    const ContactLeftRef = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
      setLoading(true); // start local loading for email sending
    

      emailjs
        .sendForm(
          import.meta.env.VITE_EMAIL_JS_SERVICE_ID, // EmailJS service ID
          import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID, // Admin template ID
          ContactLeftRef.current,
          import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY // Public key
        )
        .then(() => {
          // console.log("✅ Admin notification sent");

          // Send auto-reply to user
          const formData = new FormData(ContactLeftRef.current);

          emailjs
            .send(
              import.meta.env.VITE_EMAIL_JS_SERVICE_ID, // Same service ID
              import.meta.env.VITE_EMAIL_JS_AUTO_REPLY_TEMPLATE_ID, // Auto-reply template ID
              {
                to_name: formData.get("full_name"),
                to_email: formData.get("work_email"),
                company_name: formData.get("company_name"),
                phone_number: formData.get("phone_number"),
                employees_needed: formData.get("employees_needed"),
                workforce_type: formData.get("workforce_type"),
              },
              import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY // Public key
            )
            .then(() => {
              // console.log("✅ Auto-reply sent to user");
              toast.success("✅ Request submitted successfully!");
              ContactLeftRef.current.reset(); // Clear form
            })
            .catch((err) => {
              console.error("❌ Auto-reply error:", err.text);
              toast.error("❌ Auto-reply failed, but request was submitted.");
            });
        })
        .catch((error) => {
          console.error("❌ Admin email error:", error.text);
          toast.error("❌ Something went wrong. Please try again.");
        })
        .finally(() => setLoading(false)); // stop local loading
    };

    return (
      <div className="p-1 md:p-6 contact-container relative mt-5">
        <div className="relative w-full">
          <div className="flex flex-col lg:flex-row gap-10 p-4 lg:p-16 items-start rounded-2xl overflow-hidden text-[#E0E0E0]">
            {/* Right Side - Contact Details */}
            <div className="flex-1 flex rounded-2xl flex-col z-10 justify-center">
              <h1 className="contact-title text-4xl lg:text-6xl font-extrabold text-[#FFD700] mb-10 drop-shadow-lg">
                Contact Us
              </h1>
              <h2 className="text-4xl font-bold text-[#FFD700]">
                Let’s Build Your Workforce
              </h2>

              <ContactInfo contactDetails={contactDetails} />
            </div>

            {/* Left Side - Form */}
            <form
              ref={ContactLeftRef}
              onSubmit={sendEmail}
              className="flex-1 px-2 text-white md:px-8 py-8 rounded-3xl border-3 border-[#FFD700] space-y-6 "
            >
              <h3 className="text-2xl font-semibold mb-2 text-[#FFD700]">
                Request a Callback
              </h3>
              <p className="text-[#A0A0A0] text-sm">
                Fill out the details and our team will connect with you within 24
                hours.
              </p>

              {/* Hidden Year Field */}
              <input type="hidden" name="year" value={new Date().getFullYear()} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  required
                  className="border-b border-[#C0C0C0] focus:border-[#FFD700] placeholder-[#A0A0A0] px-2 py-2 w-full bg-transparent focus:outline-none"
                />

                <input
                  type="email"
                  name="work_email"
                  placeholder="Work Email"
                  required
                  className="border-b border-[#C0C0C0] focus:border-[#FFD700] placeholder-[#A0A0A0] px-2 py-2 w-full bg-transparent focus:outline-none"
                />

                <input
                  type="text"
                  name="company_name"
                  placeholder="Company Name"
                  required
                  className="border-b border-[#C0C0C0] focus:border-[#FFD700] placeholder-[#A0A0A0] px-2 py-2 w-full bg-transparent focus:outline-none"
                />

                <input
                  type="tel"
                  name="phone_number"
                  placeholder="Phone Number"
                  required
                  className="border-b border-[#C0C0C0] focus:border-[#FFD700] placeholder-[#A0A0A0] px-2 py-2 w-full bg-transparent focus:outline-none"
                />

                <select
                  name="company_type"
                  required
                  className="border-b border-[#C0C0C0] focus:border-[#FFD700] text-[#A0A0A0] px-2 py-2 w-full bg-transparent focus:outline-none"
                >
                  <option value="">Company Type</option>
                  {companyTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="work_location"
                  placeholder="Work Location (City, State)"
                  required
                  className="border-b border-[#C0C0C0] focus:border-[#FFD700] placeholder-[#A0A0A0] px-2 py-2 w-full bg-transparent focus:outline-none"
                />

                <input
                  type="number"
                  name="employees_needed"
                  placeholder="Number of Employees Needed"
                  className="border-b border-[#C0C0C0] focus:border-[#FFD700] placeholder-[#A0A0A0] px-2 py-2 w-full bg-transparent focus:outline-none"
                />

                <select
                  name="workforce_type"
                  required
                  className="border-b border-[#C0C0C0] focus:border-[#FFD700] text-[#A0A0A0] px-2 py-2 w-full bg-transparent focus:outline-none"
                >
                  <option value="">Type of Workforce</option>
                  <option>Skilled</option>
                  <option>Semi-skilled</option>
                  <option>Unskilled</option>
                </select>
              </div>

              <textarea
                name="additional_details"
                placeholder="Additional Details (optional)"
                rows="2"
                className="border-b border-[#C0C0C0] focus:border-[#FFD700] placeholder-[#A0A0A0] px-2 py-2 w-full bg-transparent focus:outline-none"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#FFD700] text-[#000000] py-3 rounded-lg transition text-lg font-medium ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#C5A017]"
                }`}
              >
                {loading ? "Sending..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    );
  }

  export default Contact;
