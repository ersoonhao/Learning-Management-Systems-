FROM node:15 
WORKDIR /spm
COPY package.json . /spm//
RUN npm install 
COPY . /spm/
EXPOSE 3005
CMD ["node", "server.js"]
