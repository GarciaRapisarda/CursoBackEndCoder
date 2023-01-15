PM2  
  
pm2 start app2.js --watch (Modo Fork)  
  
pm2 start app2.js -i max --watch  (Modo Cluster)   
  
pm2 delete app.js all // pm2 delete app2.js all  
  
pm2 restart app.js     
  
pm2 monit   
  
---  
  
nodemon app.js (Modo Fork)  
  
nodemon app.js --mode CLUSTER (Modo Cluster)  
  
  
# RUTAS:    
  
http://localhost:8080/info    
  
http://localhost:8080/api/random?cant=1245574  (ingresar número aleatoreo despues de "cant=" de lo contrario por defecto será 100.000.000 )    
  

 
