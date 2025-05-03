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

## home view

skeleton structure of home page:

- **header**
  - header.twig
- **navigation**
  - navbar.twig
- **footer**
  - footer.twig

## galaxy view

- **index.twig**

- **show.twig**

- **confirm_delete.twig**

- **\_form.twig**
  - **required attributes:**
    - name
    - size
    - desc

## stars view

- **index.twig**

- **show.twig**

- **confirm_delete.twig**

- **\_form.twig**
  - **required attributes:**
    - name
    - size
    - desc
    - associated galaxy (via select)

## planets view

- **index.twig**

- **show.twig**

- **confirm_delete.twig**

- **\_form.twig**
  - **required attributes:**
    - name
    - size
    - desc
    - associated galaxy (via select)
    - associated stars (via checkbox)
