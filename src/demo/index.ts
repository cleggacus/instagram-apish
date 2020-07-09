import Instagram from '..';
import dotenv from "dotenv";

dotenv.config({path:'src/demo/.env'});

const username = process.env.username;
const password = process.env.password;

(async () => {
    const instagram = await Instagram(true);

    instagram.login(username ? username : '', password ? password : '')
        .then(mes => {
            console.log(mes);
            return instagram.upload('src/demo/123.jpg', 'test');
        }).then(mes => {
            console.log(mes);
            return instagram.getMostRecentPostId();
        }).then(id => {
            console.log(id);
            return instagram.like(id);
        }).then(mes => {
            console.log(mes);
            instagram.close();
        }).catch((err) => console.log(err));
})();