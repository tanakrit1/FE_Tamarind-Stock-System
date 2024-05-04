const setLoginStorage = (profile, token) => {
    sessionStorage.setItem("profile", JSON.stringify(profile));
    sessionStorage.setItem("token", token);
};

const getLoginStorage = () => {
    const profile = sessionStorage?.getItem("profile");
    const token = sessionStorage?.getItem("token");
    return { profile: JSON.parse(profile), token: token}
}

const removeLoginStorage = () => {
    sessionStorage.removeItem("profile");
    sessionStorage.removeItem("token");
}

export { setLoginStorage, getLoginStorage, removeLoginStorage }