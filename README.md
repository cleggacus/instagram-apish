# Instgram APIsh

### Unofficial Instagram API

Instgram APIsh is a unofficial Instagram API made with typescript.

## How to install

#### npm

```bash
npm i instagram-apish
```

#### yarn

```bash
yarn add instagram-apish
```

## How to use

Can either use **await** or **chain commands using promises**

#### Example

```javascript
import InstagramApish from 'instagram-apish';

(async () => {
    const instagram = await InstagramApish(true); //creates instance of instagram APIish

    instagram.login('username', 'password') //login
        .then(mes => instagram.upload('123.jpg', 'test')) //uploads image at path '123.jpg' with caption 'test'
        .then(mes => return instagram.getMostRecentPostId()) //gets id of image just uploaded
        .then(id => return instagram.like(id)) //likes image with id of image just uploaded
        .then(mes => instagram.close()) //closes instance of instagram APIish
        .catch((err) => console.log(err));
})();
```

#### All current methods on Instagram APIsh

```javascript
instagram.login('username', 'password') //first login with username/email and password
instagram.upload('image.jpg', 'caption') //upload post with path and caption
instagram.delete('id goes here') //delete post with id
instagram.like('id goes here') //like post with id
instagram.unlike('id goes here') //unlike post with id
instagram.follow('username') //follow user with username
instagram.unfollow('username') //unfollow user with username
instagram.getMostRecentPostId() //gets most recently posted post id, returns id as string
instagram.close() //close instance
```

## Build

The commands below will build the API to a dist directory

```bash
yarn install
yarn build
```