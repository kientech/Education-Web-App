import { create } from 'zustand'

const useAuthStore = create((set) => ({
  token: "",
  userRole: "",
  isLoggedIn: false,
  userInfo: {},
  setUserInfo: (token, role, user) =>
    set({
      token,
      userRole: role,
      isLoggedIn: true,
      userInfo: user,
    }),
  logout: () =>
    set({
      token: "",
      userRole: "",
      isLoggedIn: false,
      userInfo: {},
    }),
}));

export default useAuthStore;
