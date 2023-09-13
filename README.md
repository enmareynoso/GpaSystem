# General Purpose Accounting   System 
## Prerequisites
1 - First, make sure you have Docker installed on your machine. You can download it from the official website ([https://www.docker.com/](https://www.docker.com/)).

## Backend setup

1- Once you have Docker installed, open your command line interface and run the following command:

               docker pull enmareynoso/backend-django

This will download the Backend image from Docker Hub to your computer.
    
2 - Next, run the following command to start a container using the backend image:

        docker run -dp  8000:8000 enmareynoso/backend-django


 This will start a container and map the container's port 8000 to your host machine's port 8000.


## Client setup

1- Once you have Docker installed, open your command line interface and run the following command:

               docker pull enmareynoso/client-nextjs

This will download the Client image from Docker Hub to your computer.
    
2 - Next, run the following command to start a container using the client image:

        docker run -dp  3000:3000 enmareynoso/client-nextjs


**Important Note:** Ensure that the backend image is running correctly for the proper functioning of the application.

And that's it! 🎉 You are now running the "GpaSystem" inside Docker containers on your machine.

## Troubleshooting
If you encounter the following error while pulling the images: ***Cannot connect to the Docker daemon at unix:/var/run/docker.sock. Is the docker daemon running?***
**Check Docker Daemon Status:**

Ensure that the Docker daemon is running on your system. You can check its status by running:


`docker info` 

If the Docker daemon is not running, you will need to start it. The method to start Docker depends on your operating system. Here are some common ways to start it:

-   **Linux:** Use the following command to start the Docker daemon:
    

    
    `sudo systemctl start docker` 
    
-   **Windows:** Start Docker Desktop from the system tray or application menu.
    
-   **macOS:** Start Docker Desktop from the applications.


You can download docker desktop from here: [Docker desktop](https://www.docker.com/products/docker-desktop/)




## Resources

[Install on Mac | Docker Documentation](https://docs.docker.com/desktop/install/mac-install/) 🍎

[Install on Windows | Docker Documentation](https://docs.docker.com/desktop/install/windows-install/) 🪟

[Backend docker image](https://hub.docker.com/r/enmareynoso/backend-django)

[Client docker image](https://hub.docker.com/r/enmareynoso/client-nextjs/tags)

                 



