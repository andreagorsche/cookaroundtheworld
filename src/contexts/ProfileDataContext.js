import { createContext, useContext, useEffect, useState } from "react";
import { axiosRes,axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

//follow/unfollow helper functions 
export const followHelper = (profile, clickedProfile, followedId) => {
  switch (true) {
    case profile.id === clickedProfile.id:
      return {
        ...profile,
        followers_count: profile.followers_count + 1,
        followedId,
      };
    case profile.is_owner:
      return { ...profile, following_count: profile.following_count + 1 };
    default:
      return profile;
  }
};

export const unfollowHelper = (profile, extractedFollowedId) => {
  switch (true) {
    case profile.id === extractedFollowedId:
      return {
        ...profile,
        followers_count: profile.followers_count - 1,
        extractedFollowedId: null,
      };
    case profile.is_owner:
      return { ...profile, following_count: profile.following_count - 1 };
    default:
      return profile;
  }
};

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    topProfiles: { results: [] },
    followedId: null,
  });
  
  const extractedFollowedId = profileData.followedId?.pageProfile?.results?.[0]?.id;
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


  //follow and unfollow logic
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile?.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
            results: (prevState.popularProfiles?.results || []).map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (extractedFollowedId) => {
    try {
      await axiosRes.delete(`/unfollow/${extractedFollowedId}/`);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results:(prevState.pageProfile?.results || []).map((profile) =>
            unfollowHelper(profile, extractedFollowedId)
          ),
        },
        topProfiles: {
          ...prevState.topProfiles,
          results: (prevState.topProfiles?.results || []).map((profile) =>
            unfollowHelper(profile, extractedFollowedId)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
       value={{ setProfileData, handleFollow, handleUnfollow }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
