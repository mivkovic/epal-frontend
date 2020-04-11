FROM keymetrics/pm2:10-alpine
WORKDIR /app/epal
COPY dist dist
COPY pm2-ssr.json .
EXPOSE 4000
CMD ["pm2-runtime", "pm2-ssr.json", "--no-daemon"]
