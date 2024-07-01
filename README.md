## Project setup
This app contains both the backend and the frontend in a single repository.
```	
├── Readme.md
├── backend
├── docker-compose.yml
└── frontend
```

### Clone Repository

```bash
git clone https://github.com/SaCHiMiJi/GoGoAR_Web_Application.git
```
### Start app containers

Start the `frontend`, `backend` and `db` containers using docker-compose

```	bash
$ docker-compose up -d --build
```
Access the app from your browser at http://localhost:3030
