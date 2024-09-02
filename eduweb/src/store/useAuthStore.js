import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || "",
  userRole: localStorage.getItem("userRole") || "",
  isLoggedIn: !!localStorage.getItem("token"),
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},

  setUserInfo: (token, role, user) => {
    // Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userInfo", JSON.stringify(user));

    // Update Zustand store
    set({
      token,
      userRole: role,
      isLoggedIn: true,
      userInfo: user,
    });
  },

  updateUserInfo: (updatedUserInfo) => {
    // Get the current userInfo from localStorage
    const currentUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

    // Merge updated info with current info
    const updatedInfo = { ...currentUserInfo, ...updatedUserInfo };

    // Update localStorage with the new userInfo
    localStorage.setItem("userInfo", JSON.stringify(updatedInfo));

    // Update Zustand store with the new userInfo
    set((state) => ({
      userInfo: { ...state.userInfo, ...updatedUserInfo },
    }));
  },

  logout: () => {
    // Remove from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userInfo");

    // Reset Zustand store
    set({
      token: "",
      userRole: "",
      isLoggedIn: false,
      userInfo: {},
    });
  },
}));

export default useAuthStore;
