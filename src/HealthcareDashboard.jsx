import React, { useState } from "react";
import { useForm } from "react-hook-form";

const HealthcareDashboard = () => {
  const { register, handleSubmit, reset } = useForm();
  const [submittedData, setSubmittedData] = useState(null);
  const [preview, setPreview] = useState(null); // For previewing the file

  const onSubmit = (data) => {
    const file = data.file?.[0];
    const fileURL = file ? URL.createObjectURL(file) : null;

    const formattedData = {
      ...data,
      fileName: file ? file.name : "No file uploaded",
      fileURL,
      fileType: file ? file.type : null,
    };

    setSubmittedData(formattedData);
    setPreview(fileURL); // Set preview for the uploaded file
    reset(); // Reset the form fields
    alert("Form Submitted Successfully!");
  };

  return (
    <div style={{ margin: "20px auto", maxWidth: "500px", textAlign: "center" }}>
      <h2>Healthcare Dashboard</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Name Field */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            style={{ marginLeft: "10px", padding: "5px", width: "80%" }}
          />
        </div>

        {/* Gender Field */}
        <div>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            {...register("gender", { required: "Gender is required" })}
            style={{ marginLeft: "10px", padding: "5px", width: "85%" }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Age Field */}
        <div>
          <label htmlFor="age">Age</label>
          <select
            id="age"
            {...register("age", { required: "Age is required" })}
            style={{ marginLeft: "10px", padding: "5px", width: "85%" }}
          >
            <option value="">Select Age</option>
            {Array.from({ length: 100 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="fileUpload">Upload File</label>
          <input
            type="file"
            id="fileUpload"
            {...register("file")}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      {/* Display Submitted Data */}
      {submittedData && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Submitted Data:</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Gender:</strong> {submittedData.gender}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p>
            <strong>File:</strong> {submittedData.fileName}
          </p>

          {/* Display File Preview */}
          {submittedData.fileURL && (
            <div style={{ marginTop: "10px" }}>
              <strong>File Preview:</strong>
              {submittedData.fileType.startsWith("image/") && (
                <img src={submittedData.fileURL} alt="Uploaded" style={{ width: "100%", maxWidth: "300px" }} />
              )}
              {submittedData.fileType === "application/pdf" && (
                <iframe
                  src={submittedData.fileURL}
                  title="PDF Preview"
                  style={{ width: "100%", height: "300px", border: "none" }}
                />
              )}
              {!submittedData.fileType.startsWith("image/") &&
                submittedData.fileType !== "application/pdf" && (
                  <a href={submittedData.fileURL} download={submittedData.fileName}>
                    Download File
                  </a>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthcareDashboard;
