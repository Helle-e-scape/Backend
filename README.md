# Backend

# Create docker 
docker build -t helle-e-scape-backend .

# Run project 
docker run -p 3000:3000 -p 8080:8080 helle-e-scape-backend

# transférer le fichier tar 
scp helle-e-scape-backend.tar user@server_ip:/path/to/destination

# charger l'image du serveur 
docker load -i helle-e-scape-backend.tar