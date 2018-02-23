# vuepress

> A Vue.js project

![Alt text](./screen.jpg?raw=true "Title")

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build 
```

## TODO

- General
    - [ ] valdi HTML5 elements
    - [x] download font (roboto)
    - [ ] archive page
    - [ ] put host url in variable
    - [ ] fix hilarious IE bug
    - [ ] deafult image if post doesn't have image
    - [ ] 404 page
    - [ ] favicon

- Single post
    - [x] add comment
    - [ ] facebook comments
    - [x] display post comments
    - [ ] back to home button
    - [x] loading on infinite scroll
    - [x] scroll to the top
    - [ ] no more stories
    - [ ] add progress bar for post reading position
    - [ ] change url when reading another post loaded by infinite scroll
    - [ ] comments date format

## Reminder
- to allow anonymous comments add in functions.php
``` bash
    function filter_rest_allow_anonymous_comments() {
        return true;
    }
    add_filter('rest_allow_anonymous_comments','filter_rest_allow_anonymous_comments');
```
