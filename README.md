
# react-docker-base

A starter kit for developing and deploying a React app in Docker containers.
The files and commands contained within will allow you to develop and build a React applicaiton within containers.
During development you get features like hot reload without having to keep rebuilding the container, then when you are ready to build, you can create an optimised container that will host the static files in a lightweight Nginx server.

## Using the repository

### Creating a new application

The react application is contained within the `react-app` directory, when cloning from here you should find it as created by Create-React-App with no added features. If you want to create a new app, simply delete teh `react-app` folder and run the following Make command from the root directory: 

```shell
make cra
```

This will recreate the `react-app` directory and create a new React application.

### Using an existing application

If you already have a react application you can place it into the `react-app` folder

### Running in Development mode

In order to run the appplicaiton locally with hot reload, just run:

```shell
make dev
```

This will start up the application and it will be available on [localhost:3000](http://localhost:3000)

Then just carry on developing in your local machine and the container should pickup the changes.

A docker-compose file is used to start up the development container. The compose file only contains the react application when you start out. The reason for using a compose file is so that you can easily add any dependancies you need to run at development time, such as a database, or API containers. Just add to the `docker-compose-local.yaml` file.

### Running unit tests

To run the unit tests simply run:

```shell
make test
```

### Building a final release

When you're happy with your app and want to package it up ready to host somewhere like Azure App Service for Containers or Kubernetes, run the following command:

To run the final build:

```shell
make prod ENV=env_name
```

This command will take the image that was build in previous command and run it. It will be available on [localhost:3001](http://localhost:3001)

N.B. you will need to pass in an environment name when running the build. Details below.

## Configuration

When you have a single page app, that runs with static pages on the client, it's difficult to solve the build once deploy anywhere strategy. This is solved here by using a launch script on the final container instead of the `CMD` in the Dockerfile.

Add any configuration that needs to be present on the client to the `config/client-side` folder. The file should be named with the name of the environment and have a json extension. You can have as many of these as you need, local and production are supplied as an example.

When you run the container you supply the `ENV` parameter to the Make command, which will  be the name of the environment you are running in. Once the container has started, you can simply write some code in the application to fetch the config from `/config.json`. As all environment configuration is packaged in the image, you do not need to rebuild for each environment, just supply the `ENVIRONMENT` environment label.

### Nginx Configuration

A basic Nginx configuration file supplied in `config\nginx\nginx.conf`. This file will be copied into Nginx as the `conf.d\default.conf`. It is setup to allow React router to function correctly.
