FROM node:8

MAINTAINER Abdulsalam

# create a specific user to run this container
#RUN adduser -S -D user-app 

RUN ln -sf /bin/bash /bin/sh
RUN useradd -ms /bin/bash user-app

# add files to container
ADD . /app

# specify the working directory
WORKDIR app

RUN chmod -R 777 .

# build process
RUN npm install
RUN npm run build
RUN npm prune --production

# run the container using a specific user
USER user-app

ENV SERVER_PORT 9090 
EXPOSE 9090

# run application
CMD ["npm", "start"]
