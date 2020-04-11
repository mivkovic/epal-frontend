#!/bin/bash

npm run clean:dist && npm run build:ssr && docker build -t mivkovic17/epal-frontend . --no-cache && docker push mivkovic17/epal-frontend