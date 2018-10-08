#  Create a new image from the base nginx image.
FROM nginx
# Overwrite nginx's default configuration file with our own.
COPY default.conf /etc/nginx/conf.d/

#COPY --from=angular /usr/src/app/dist/ /usr/share/nginx/html