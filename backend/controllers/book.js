const Book = require('../models/book')
const fs = require('fs');

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/resized_${req.file.filename}`,
      averageRating: bookObject.ratings[0].grade
  });

  book.save()
  .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
  .catch(error => { res.status(400).json( { error })})}

exports.getAllBooks = (req, res, next) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
}

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/resized_${req.file.filename}`
    } : { ...req.body };
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Modification non autorisée'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                // Si l'image a été modifiée, on tente de supprimer l'ancienne
                req.file && fs.unlink(`images/${filename}`, (err => {
                        if (err) console.log(err);
                }));

                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Livre modifié !'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id})
  .then(book => {
      if (book.userId != req.auth.userId) {
          res.status(401).json({message: 'Suppression non autorisée'});
      } else {
          const filename = book.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Book.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
}

// Création d'une note
exports.createRating = (req, res, next) => {
    // On vérifie que la note est comprise entre 0 et 5
    if (0 <= req.body.rating <= 5) {
        // Stockage de la requête dans une constante
        const ratingBook = { 
            userId: req.body.userId, 
            grade: req.body.rating 
        };
        // Suppression du faux _id envoyé par le front
        delete ratingBook._id;
        // Récupération du livre auquel on veut ajouter une note
        Book.findOne({_id: req.params.id})
            .then(book => {
                // Création de la fonction qui permettra de calculer la moyenne des notes
                const numAverage = (grades) => {
                    let somme = 0
                    grades.forEach(rate => {
                        somme += rate
                    })
                    return (somme / grades.length).toFixed(1)
                }
                // Création d'un tableau où stocke infos envoyé par front
                let newRating = book.ratings;
                const userIdArray = newRating.map(ratingId => ratingId.userId);
                // Si tableau précédent contient déjà l'id du user (=> .includes = true), alors erreur !
                if (userIdArray.includes(req.auth.userId)) {
                    res.status(401).json({ message : 'Vote non autorisé' });
                } else {
                    newRating.push(ratingBook)
                    // Récupération de la note donnée parmi les infos envoyées par front (=> .map())
                    const grades = newRating.map(ratingGrade => ratingGrade.grade);
                    // Calcul de la moyenne des notes du tableau grades
                    const averageRatings = numAverage(grades);
                    book.averageRating = averageRatings;
                    // Mise à jour du livre avec la nouvelle note ainsi que la nouvelle moyenne des notes
                    Book.updateOne({ _id: req.params.id }, { ratings: newRating, averageRating: averageRatings, _id: req.params.id })
                        .then(() => { res.status(201).json()})
                        .catch(error => { res.status(400).json( { error })});
                    res.status(200).json(book);
                }
            })
            .catch((error) => {
                res.status(404).json({ error });
            });
    } else {
        res.status(400).json({ message: 'La note doit être entre 1 et 5' });
    }
};

// Récupération des 3 livres les mieux notés
exports.getTopBooks = (req, res, next) => {
    Book.find()
        .then(books => {
            //méthode .sort() pour trier les données du tableau et plus précisément les données dont la clé de propriété est averageRating
            books.sort((a, b) => b.averageRating - a.averageRating);
            // méthode .slice() pour avoir copie portion du tableau précédent (index du tableau 0 et 3 => 0 étant le début et 3 étant l'index exclu)
            const bestBooks = books.slice(0, 3);
            res.status(200).json(bestBooks)})
        .catch(error => res.status(404).json({error}))
  };

