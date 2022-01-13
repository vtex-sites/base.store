FROM bazel:image
WORKDIR /home/node/app
COPY . .

# Exposes connection port
EXPOSE 8000
ENV ENABLE_GATSBY_REFRESH_ENDPOINT=true
ENV CMS_PREVIEW=true

# Starts a gatsby preview server
# CMD yarn gatsby develop --no-colors -H 0.0.0.0 -p 8000

SHELL ["/busybox/sh", "-c"]

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["/home/node/app/entrypoint.sh"]