# my notes for asl space assignment week 4

> this markdown file will contain all of the updates and important notes taken in regards to module 4!

## association notes

ONE galaxy can have: MANY stars AND MANY planets
ONE planet can: belong to ONE galaxy and have MANY stars
ONE star can: belong to ONE galaxy and have MANY planets

when creating a planet, automatically search for stars based off of the galaxy selected.

## views quick checklist

- [x] **index views**

  - [x] /galaxies
  - [x] /stars
  - [x] /planets

- [x] **partials**

  - [x] header
  - [x] nav bar
    - [x] galaxy link
    - [x] stars link
    - [x] planets link
  - [x] action bar

    - [x] view object
    - [x] edit object
    - [x] delete object

  - [] **galaxy**
    - [x] form
    - [x] edit
    - [x] create
    - [x] show one
    - [x] delete
    - [] image uploading
  - [] **planets**
    - [x] form
    - [x] edit
    - [x] create
    - [x] show one
    - [x] delete
    - [] image uploading
  - [] **stars**
    - [x] form
    - [x] edit
    - [x] create
    - [x] show one
    - [x] delete
    - [] image uploading

## image uploading checklist

- [x] install express-fileupload
  - [x] import into index.js
- [x] create a middleware folder to handle saving files
  - [x] "uploadImage"
  - [x] connect middleware to entry index.js file
- [x] construct an images model that stores relevant metadata
  - [x] id
  - [x] extension
- [x] create image associations with each model inside image model file
  - [x] star
    - [x] hasMany() added to star model
  - [x] galaxy
    - [x] hasMany() added to galaxy model
  - [x] planet
    - [x] hasMany() added to planet model
- [x] add image to sequelize registry
  - [x] models/index.js
- [x] add middleware and imageUpload functionality to all routes
  - [x] galaxy
    - [x] create
    - [x] update
      - [x] html5 update
      - [x] restful update
  - [x] stars
    - [x] create
    - [x] update
      - [x] html5 update
      - [x] restful update
  - [x] planets
    - [x] create
    - [x] update
      - [x] html5 update
      - [x] restful update
- [x] create an "images.js" file inside /routers
  - [x] get routes
  - [x] post routes
  - [x] delete/remove routes
- [x] base form with enctype="multipart/form-data" functional
- [x] create empty "images" folder inside public to house uploaded content
- [x] modify existing controllers with image support
  - [x] add image handling logic to create and update methods
    - [x] galaxy
    - [x] stars
    - [x] planets
- [x] create "images.js" file inside controllers folder
  - [x] handle the following methods:
    - [x] create
    - [x] update

upload path -> app/public/images/EXAMPLE.jpg
upload load passes through -> image Id and extension

for each param passed, add "%s"
that turns into... `public/images/%s%s`
