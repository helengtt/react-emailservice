
const fakeAPI = {
    isAuthenticated: false,
    senderEmail: "",

    send(data, cb) {
        console.log(data);
        setTimeout(cb, 1000); // fake async
    },
    login(sender, cb) {
        this.isAuthenticated = true;
        this.senderEmail = sender;
        setTimeout(cb, 500); 
    },
    logout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 500); 
    },
};

export default fakeAPI;