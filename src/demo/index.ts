import Instagram from '..';
import dotenv from "dotenv";

dotenv.config({path:'src/demo/.env'});

const username = process.env.username;
const password = process.env.password;

(async () => {
    const instagram = await Instagram();

    instagram.login(username ? username : '', password ? password : '')
        .then(mes => {
            console.log(mes);
            return instagram.upload(`123.jpg`);
        }).then(mes => {
            console.log(mes);
            instagram.close();
        }).catch((err) => console.log(err));
})();