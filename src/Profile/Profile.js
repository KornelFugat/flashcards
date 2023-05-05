import React, { useState, useEffect } from "react";
import { useUserAuth } from "../UserAuthContext";
import { useNavigate } from "react-router";
import "./Profile.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import userdefault from "./userdefault.jpg";

const Profile = () => {
  const { user } = useUserAuth();
  const userEmail = user.email;
  const userId = user.uid;
  

  const [profilePicture, setProfilePicture] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(userdefault);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleUpload = () => {
    // Create a reference to the file in Firebase Storage
    const storage = getStorage();
    const fileRef = ref(storage, `profilePictures/${userId}`);
    
  
    // Upload the file to Firebase Storage
    uploadBytes(fileRef, profilePicture).then(() => {
      console.log("File uploaded successfully!");
      // Reload the page to see the updated profile picture
      window.location.reload();
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    // Create a reference to the file
    const storage = getStorage();
    const gsReference = ref(storage, `gs://flashcard-project-uek.appspot.com/profilePictures/${userId}`);

    // Get the download URL of the file
    getDownloadURL(gsReference).then((url) => {
      // Save the URL to state
      setDownloadUrl(`${url}?t=${new Date().getTime()}`);
    }).catch((error) => {
      // Handle any errors
      console.log("Error getting download URL:", error);
    });
  }, [userId]);


  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div className="container">
        <h2>Profile</h2>
        <div className="profile-picture">
          <img
            src={downloadUrl}
            alt="Profile"
          />
          
          <div className="file-upload-wrapper">
          <label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
            Choose a file
          </label> 
          </div>
          
          </div>
          <div>
          <label className="take-photo-label">
          <input type="file" accept="image/*" capture="camera" onChange={handleFileChange} />
          </label> 
          </div>
          <button className="button" onClick={handleUpload}>
            Upload
          </button>
        
        <p>Email: {userEmail}</p>
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
        <button className="button" onClick={handleGoBack}>
          Go back to Home
        </button>
      </div>
  );
};

export default Profile;