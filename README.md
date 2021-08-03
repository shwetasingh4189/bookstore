# Bookstore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

Bookstore is an application to get book information. Front end is build on angular and backend is node js. The application is dockerized.

## Steps to run in local using docker terminal
Install docker in your local from https://www.docker.com/products/docker-desktop

## Build docker image
docker build "Dockerfile" -t bookstoreapp:v1 "."

## Run docker 
docker run -it -p 3090:3090/tcp bookstoreapp:v1


## Other docker commands 
To list all the images running: docker ps
To stop docker image: docker stop image_name

## Access the application on

http://localhost:3090/


## Login to bookstore application
Username: admin
password: admin


## How to navigate inside app

After login user will be redirected to page with list of all books available.
Click on book icon to move to book details page.
Book details page have all the detail for a book. 
The value is readonly at the moment. Edit functionality is WIP.
Click on Go back to book list button to move back to list of books.





