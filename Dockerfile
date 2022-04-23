FROM cypress/included:9.5.4
RUN mkdir /cypress-project
WORKDIR /cypress-project
COPY . /cypress-project
RUN npm ci