#!/bin/bash

npm run clean:dist && npm run build:ssr && docker build -t mivkovic17/epal-frontend . && docker push mivkovic17/epal-frontend