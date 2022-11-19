FROM cypress/included:11.1.0
RUN npm install -g pnpm
RUN mkdir /cypress-project
WORKDIR /cypress-project
COPY . /cypress-project
RUN pnpm install --frozen-lockfile --prod