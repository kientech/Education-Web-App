import create from "zustand";
const useAuthStore = create((set) => ({
  token: "",
  userRole: "",
  isLoggedIn: false,
  setUserInfo: (token, role) =>
    set({
      token,
      userRole: role,
      isLoggedIn: true,
    }),
  logout: () =>
    set({
      token: "",
      userRole: "",
      isLoggedIn: false,
    }),
}));

export default useAuthStore;
