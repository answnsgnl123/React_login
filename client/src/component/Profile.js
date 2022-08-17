import React from 'react'
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={() => navigate("/")}>Change Page</button>
    </div>
  )
}

export default Profile