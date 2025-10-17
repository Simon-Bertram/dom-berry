"use client";

import {
  Mail,
  MessageSquare,
  PenTool,
  PoundSterling,
  User,
} from "lucide-react";
import { useState } from "react";

// Define the initial state for the form data
const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  projectType: "",
  projectBudget: "",
  vision: "",
};

// Define the options for the dropdowns
const PROJECT_TYPES = [
  "Corporate Film",
  "Live Event Coverage",
  "Marketing Video (Social/Web)",
  "Commercial/Ad",
  "Wedding",
  "Other",
];

const BUDGET_RANGES = ["Under £500", "£500 - £2k", "£2k - £5k", "£5k+"];

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState(null); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // Client-side basic validation
    if (!(formData.name && formData.email && formData.vision)) {
      setStatus("error");
      setMessage("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(
          "Success! Your brief has been sent. I will review it and reply within 1 business day."
        );
        setFormData(INITIAL_FORM_STATE); // Clear form on success
        // In a real Next.js app, you might now redirect to the Thank You page: router.push('/thank-you')
      } else {
        setStatus("error");
        setMessage(
          data.error ||
            "Oops! There was an issue sending your brief. Please try again or email directly."
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setMessage(
        "A connection error occurred. Please check your network and try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-2xl rounded-xl border border-gray-100 bg-white p-6 shadow-2xl sm:p-10">
        <h1 className="mb-2 font-extrabold text-3xl text-gray-900">
          Start Your Project
        </h1>
        <p className="mb-8 text-gray-600">
          Tell me about your video vision for the Southwest. I'll get back to
          you with a personalized quote and timeline.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Status Message Display */}
          {status === "loading" && (
            <div className="rounded-lg bg-indigo-50 p-3 text-center font-medium text-indigo-700 text-sm">
              Sending brief...
            </div>
          )}
          {status === "success" && (
            <div
              className="rounded-lg border border-green-200 bg-green-100 p-4 text-green-700 text-sm"
              role="alert"
            >
              <span className="font-bold">Message Sent!</span> {message}
            </div>
          )}
          {status === "error" && (
            <div
              className="rounded-lg border border-red-200 bg-red-100 p-4 text-red-700 text-sm"
              role="alert"
            >
              <span className="font-bold">Error:</span> {message}
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name Field */}
            <div>
              <label
                className="mb-1 flex items-center font-medium text-gray-700 text-sm"
                htmlFor="name"
              >
                <User className="mr-2 text-indigo-500" size={16} />
                Your Name
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 p-3 transition duration-150 focus:border-indigo-500 focus:ring-indigo-500"
                id="name"
                name="name"
                onChange={handleChange}
                required
                type="text"
                value={formData.name}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                className="mb-1 flex items-center font-medium text-gray-700 text-sm"
                htmlFor="email"
              >
                <Mail className="mr-2 text-indigo-500" size={16} />
                Email Address
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 p-3 transition duration-150 focus:border-indigo-500 focus:ring-indigo-500"
                id="email"
                name="email"
                onChange={handleChange}
                required
                type="email"
                value={formData.email}
              />
            </div>

            {/* Project Type Dropdown */}
            <div>
              <label
                className="mb-1 flex items-center font-medium text-gray-700 text-sm"
                htmlFor="projectType"
              >
                <PenTool className="mr-2 text-indigo-500" size={16} />
                Project Type
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 bg-white p-3 transition duration-150 focus:border-indigo-500 focus:ring-indigo-500"
                id="projectType"
                name="projectType"
                onChange={handleChange}
                value={formData.projectType}
              >
                <option disabled value="">
                  Select a Type
                </option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Budget Dropdown (Lead Qualifying) */}
            <div>
              <label
                className="mb-1 flex items-center font-medium text-gray-700 text-sm"
                htmlFor="projectBudget"
              >
                <PoundSterling className="mr-2 text-indigo-500" size={16} />
                Estimated Budget Range
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 bg-white p-3 transition duration-150 focus:border-indigo-500 focus:ring-indigo-500"
                id="projectBudget"
                name="projectBudget"
                onChange={handleChange}
                required
                value={formData.projectBudget}
              >
                <option disabled value="">
                  Select a Budget
                </option>
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Vision Text Area */}
          <div>
            <label
              className="mb-1 flex items-center font-medium text-gray-700 text-sm"
              htmlFor="vision"
            >
              <MessageSquare className="mr-2 text-indigo-500" size={16} />
              Tell me about your vision (Project brief)
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 p-3 transition duration-150 focus:border-indigo-500 focus:ring-indigo-500"
              id="vision"
              name="vision"
              onChange={handleChange}
              placeholder="What is the goal of the video? Who is the audience? Do you have any deadlines or preferred locations in the Southwest?"
              required
              rows="5"
              value={formData.vision}
            />
          </div>

          {/* Submit Button */}
          <button
            className="flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 font-bold text-lg text-white shadow-lg transition duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Sending..." : "SEND MY PROJECT BRIEF"}
          </button>
        </form>
      </div>
    </div>
  );
}
