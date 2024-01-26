const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

module.exports = (req, res, next) => {
    // Vérification qu'un fichier a bien été téléchargé (on récupère les infos du MW multer précédent)
    if (!req.file) return next();
    
    const currentFileName = req.file.filename; //Récupération de l'actuel nom de l'image
    const newFileName = `resized_${currentFileName}` // on donne un nouveau nom à l'image redimensionnée
    const newFilePath = path.join('images', newFileName); // Précision de l'emplacement d'enregistrement de l'image et nouveau nom
  
    sharp(req.file.path) // on récupère les informations de l'image qu'on souhaite transformer
      .resize({ 
        width: 206,
        height: 260,
       }) // nouvelle dimension
      .toFile(newFilePath) // précision d'où on enregistre
      .then(() => {
        // Remplacer le fichier original par le fichier redimensionné
        fs.unlink(req.file.path, () => {
          req.file.path = newFilePath; // précision du nouveau chemin de l'image
          next(); // si tout est ok, on passe à la suite
        });
      })
      .catch(err => {
        console.log(err);
        return next();
      });
}