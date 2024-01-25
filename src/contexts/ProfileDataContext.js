import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    topProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        if (currentUser && currentUser.id) {
          const { data } = await axiosReq.get(`/profiles/${currentUser.id}/`);
          setProfileData((prevState) => ({
            ...prevState,
            pageProfile: { results: [data] },
          }));
          console.log("Updated profileData:", profileData);
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        console.error('Error response data:', err.response?.data);
      }
    };
  
    handleMount();
  }, [currentUser]);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-updated_at"
        );
        console.log("Updated topProfiles:", data);

        setProfileData((prevState) => ({
          ...prevState,
          topProfiles: { results: [data] },
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);


  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
