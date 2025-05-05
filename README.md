# 🔗 💻 ASL Final Assignment✨

### 📁🪐 Space Object Library API 💫

This repository houses my **completed** assignment for Advanced Server-Side Languages.

### click [here](https://youtu.be/HxjA7OpWg9E) to view the live demonstration!

> 🗣️💬&nbsp; **emily says...**&nbsp;&nbsp; i turned in my assignment (late by a few minutes) in a rush because i was afraid the submission would close. when it didn't, i figured i might as well come in and try fix things since i had to edit my video link into the README anyway... i ultimately did not fix anything, so my images don't save/render at all. i tried my best! 

# Week #3 Content

## 💎💎 &nbsp;&nbsp; API Specs💡

## 🕵️☝&nbsp;&nbsp; Assignment Overview:

Welcome to your official assignment for Week 3. As mentioned in the lectures, you will be tasked with building a Star Tracker API. This API will be designed to store and manage information about three types of celestial objects commonly found in space: Galaxies, Stars, and Planets.

The aim of this assignment is to strengthen your development skills in storing and retrieving data from a database using a Database Abstraction Layer, specifically SequelizeORM. Your API should feature fully RESTful resource paths and HTTP methods. Additionally, you will need to properly handle the storage and retrieval of information about each specific resource. Therefore, your RESTful API must efficiently serve up three primary resources.
<br>

## 💎💎 &nbsp;&nbsp; API Specs💡

| model  | fields           | association                         |
| ------ | ---------------- | ----------------------------------- |
| planet | name, size, desc | belongs to many stars               |
| star   | name, size, desc | belongs to galaxy, has many planets |
| galaxy | name, size, desc | has many stars                      |
