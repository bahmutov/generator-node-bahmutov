# simple docker file
# assumes the `src/index.js` is the top level file

# start with small docker image
FROM node:6@sha256:e133e66ec3bfc98da0440e552f452e5cdf6413319d27a2db3b01ac4b319759b3

# run as non-root user inside the docker container
# see https://vimeo.com/171803492 at 17:20 mark
# or read the tutorial
# https://nodesource.com/blog/8-protips-to-start-killing-it-when-dockerizing-node-js/
RUN groupadd -r nodejs && useradd -m -r -g nodejs nodejs
# now run as new user nodejs from group nodejs
USER nodejs

# Create an app directory (in the Docker container)
# create it in "nodejs" home folder, because we no longer
# have permission to create it anywhere else, secure!
RUN mkdir -p /home/nodejs/<%= name %>
WORKDIR /home/nodejs/<%= name %>

# install small process to handle signals
# https://github.com/Yelp/dumb-init
# https://blog.phusion.nl/2015/01/20/docker-and-the-pid-1-zombie-reaping-problem/
RUN wget -O dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64
RUN chmod +x dumb-init

# Copy .npm settings and package.json into container
COPY package.json /home/nodejs/<%= name %>
COPY .npmrc /home/nodejs/<%= name %>
# and install dependencies
RUN npm install --production --quiet

# Copy our source into container
COPY src /home/nodejs/<%= name %>/src

# tell the server what port to use
ENV PORT 1337
EXPOSE 1337

# We are running in production environment
ENV NODE_ENV production

# Finally start the container command
CMD ["./dumb-init", "node", "src"]

# build:  docker build -t <%= name %> .
# run:    docker run --name <%= name %> -p 5000:1337 -d <%= name %>
#         curl localhost:5000
# stop and remove container
#         docker stop <%= name %>
#         docker rm <%= name %>
