import React, { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

//plogout
import plogout from "../auth/Plogout";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const loadProfileData = async () => {
    try {
      const userProfile = await keycloak.loadUserProfile();
      setProfileData({
        firstName: userProfile.firstName!,
        lastName: userProfile.lastName!,
        email: userProfile.email!,
        username: userProfile.username!,
      });
    } catch (error) {
      let e = error as Error;
      console.error(e.message);
    }
  };

  const logout = async () => {
    try {
      await plogout(keycloak);
      navigate("/login");
    } catch (error) {
      let e = error as Error;
      console.error(e.message);
    }
    // console.log(keycloak.authenticated);
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading profile data...</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>First Name:</td>
            <td>{profileData.firstName}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{profileData.lastName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{profileData.email}</td>
          </tr>
          <tr>
            <td>Username:</td>
            <td>{profileData.username}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
