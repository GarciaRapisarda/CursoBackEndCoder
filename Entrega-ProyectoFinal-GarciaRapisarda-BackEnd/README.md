# PM2  
  
pm2 start app2.js --watch (Modo Fork)  
  
pm2 start app2.js -i max --watch  (Modo Cluster)   
  
pm2 delete app.js all // pm2 delete app2.js all  
  
pm2 restart app.js     
  
pm2 monit   
  
---  
# MODOS DE EJECUCION DEL SERVIDOR

npm run dev-fork (ejecutar en modo Fork)
  
npm run dev (Modo Cluster)  
  
 --- 
# RUTAS:    
  
http://localhost:8080/info    
  
http://localhost:8080/api/random?cant=2545574  (ingresar número aleatoreo despues de "cant=" de lo contrario por defecto será 100.000.000 )    
  
http://localhost:8080/ (Ruta raiz del proyecto)
 
 --- 
# ARCHIVOS .ENV 

Se encuentran las credenciales para el envío y recepción de e-mail, el número de teléfono de twilio y el acceso a la BD de Mongo
