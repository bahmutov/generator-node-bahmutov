# simple docker file
# assumes the `src/index.js` is the top level file

# start with small docker image
FROM node:6

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

# Copy .npm settings and package.json into container
COPY package.json /home/nodejs/<%= name %>
COPY .npmrc /home/nodejs/<%= name %>
# and install dependencies
RUN npm install --production --quiet

# Copy our source into container
COPY src /home/nodejs/<%= name %>/src

# If our server uses 1337 by default
# expose it from Docker container
EXPOSE 1337

# We are running in production environment
ENV NODE_ENV production

# Finally start the container command
CMD ["node", "src"]

# build: docker build -t <%= name %> .
# run:   docker run --name <%= name %> -p 5000:1337 -d <%= name %>
# then hit the service at localhost:5000
