# Sample docker composition of an Angular 2 application and Asp.net core accessed via Nginx

## This demo is a minimal solution containing:
- Asp.net core webapi backend with the standard "\api\values" controller
- Angular2 js frontent calling the webapi backend
- Nginx for serving the frontend and the webapi backend from the same url
- Docker for running the 3 applications as a single solution

## Running the demo:

    docker-compose up --build --force-recreate | cat

## Use the following steps to recreate this application from scratch:

**Install Docker**

**Install Node.js**

**Run the following commands:**

    npm install -g yo
    npm install -g bower
    npm install -g generator-aspnet
    yo aspnet:app webapi webapi
    npm install -g angular-cli
    md nginx

**Create the following files (relative to the application root path):**

\docker-compose.yml

    version: '2':

    services:

    nginx:
        build: ./nginx
        container_name: nginx
        ports:
        - "80:80"
        - "443:443"
        links:
        - webapi
        - frontend
    
    frontend:
        image: metal3d/ng
        command: serve --host 0.0.0.0
        ports:
        - 4200:4200
        - 49152:49152
        user: 1000:1000
        volumes:
        - ./frontend:/project

    webapi:
        build: ./webapi
        ports:
        - "5000:5000"

\nginx\nginx.conf

    worker_processes 4;
    events { worker_connections 1024; }
    http {
        server {
        listen 80;
        location / {
            proxy_pass          http://frontend:4200;
            proxy_set_header        Host $host;
        }

        location /api {
            proxy_pass          http://webapi:5000;
            proxy_set_header        Host $host;
        }
        }   
    }

\nginx\Dockerfile.

    FROM nginx
    COPY ./nginx.conf /etc/nginx/nginx.conf


**Add the constructor to the file \frontend\src\app\app.component.ts**

    export class AppComponent {
        constructor(private http: Http) {
            http.get('/api/values')
            .map(r => r.json())
            .subscribe(r => { this.title = r; })
        }

        title = 'app works!';
    }

**Navigate to**
[http://localhost](http://localhost)



