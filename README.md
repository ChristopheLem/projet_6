
       

        Projet 6 

Pour éxécuter ce projet 
        1- cloner le projet
        2- npm install
        3- créer dossier config
        4- créer fichier config.env 
        
Dans le fichier config.env:
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0-ywms4.mongodb.net/test
JWT_SECRET=<votre mot de passe>

pour MONGODB_URI:
        Droit 1, supprimer ou modifier document de la base de donnée:
                username = admin2
                password = editDB
        Droit 2, éditer contenu dans la base de donnée : 
                username = admin1
                password = deleteOrUpdate
                
       5- Dans le terminal, démarrer npm run dev pour avoir accès au serveur.
       Rendez-vous sur http://localhost:3000/. L'application va se recharger automatiquement si vous modifiez un fichier source.
