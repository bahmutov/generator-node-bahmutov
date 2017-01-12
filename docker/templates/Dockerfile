# simple docker file
# assumes the `src/index.js` is the top level file

# start with small docker image
# https://github.com/mhart/alpine-node
FROM mhart/alpine-node:6

# run as non-root user inside the docker container
# see https://vimeo.com/171803492 at 17:20 mark
RUN groupadd -r nodejs && useradd -m -r -g nodejs nodejs
# now run as new user nodejs from group nodejs
USER nodejs

# Create an app directory (in the Docker container)
RUN mkdir -p /usr/src/<%= name %>
WORKDIR /usr/src/<%= name %>

# Copy .npm settings and package.json into container
COPY package.json /usr/src/<%= name %>
COPY .npmrc /usr/src/<%= name %>
# and install dependencies
RUN npm install --quiet

# Copy our source into container
COPY src /usr/src/<%= name %>/src

# If our server uses 1337 by default
# expose it from Docker container
EXPOSE 1337

# Finally start the container command
CMD ["node", "src"]

# build: docker build -t <%= name %> .
# run:   docker run --name <%= name %> -p 5000:1337 -d <%= name %>
# then hit the service at localhost:5000
