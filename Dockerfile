FROM nginx:latest


# Copy all the contents from the build directory into the web root
COPY ./build/ /var/www/html

COPY ./nginx/cert/tawakkalna.crt /etc/nginx/nginx-selfsigned.crt
COPY ./nginx/cert/tawakkalna.key /etc/nginx/nginx-selfsigned.key
COPY ./nginx/default.conf /etc/nginx/conf.d

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]