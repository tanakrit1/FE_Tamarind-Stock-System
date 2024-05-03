const setLoginStorage = (val) => {
    localStorage.setItem("sessionInfo", val);

};

const getLoginStorage = () => {
    const sessionInfo = localStorage?.getItem("sessionInfo");
    return { sessionInfo: JSON.parse(sessionInfo)}
}

const removeLoginStorage = () => {
    localStorage.removeItem("sessionInfo");
}

export { setLoginStorage, getLoginStorage, removeLoginStorage }