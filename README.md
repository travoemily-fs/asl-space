# 🔗 💻 ASL Assignment #️⃣3️⃣✨

### 📁🪐 Space Object Library API 💫

This repository houses my **completed** assignment for Advanced Server-Side Languages.

> 🗣️💬&nbsp; **emily says...**&nbsp;&nbsp; click [here](https://www.dropbox.com/scl/fi/zkhfqz06dq7cnely1o38i/asl-space-demo-screenshots.pdf?rlkey=fxjefsh7nxhu48ln8g3cy9t2e&st=62d6dfwi&dl=0) to view the live demonstration!

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
