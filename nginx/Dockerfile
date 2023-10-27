FROM nginx
WORKDIR /app
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY  ./nginx-entrypoint.sh /app/nginx/nginx-entrypoint.sh
RUN ["chmod", "a+x", "/app/nginx/nginx-entrypoint.sh"]
ENTRYPOINT ["/app/nginx/nginx-entrypoint.sh"]