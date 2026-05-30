const User = require('../models/User');

// GET /api/users/me
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.auth.userId).select('-password'); // On cherche l'info de user par son ID et on retire des champs le mot de passe

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // On récupère l'utilisateur par l'ID qui est en paramètre de l'url

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/users/me
exports.updateMyProfile = async (req, res) => {
  try {
    const allowedFields = [
      'name',
      'avatar',
      'phone',
      'location',
      'bio',
      'skills',
      'resume'
    ];

    const updates = {};

    allowedFields.forEach((field) => { // On parcourt les fields autorisés
      if (req.body[field] !== undefined) { // S'il y a qqchse dans le corps du field
        updates[field] = req.body[field]; // On met à jour chacun de ces fields concernés
      }
    });

    const updatedUser = await User.findByIdAndUpdate( // On selectionne par id le user afin de le mettre à jour :
      req.auth.userId, // On récupere le userId via l'authentification
      updates, // On ajoute les mises à jour
      { new: true, runValidators: true } // New: true permet de retourner la nouvelle version du document; runValidators: true permet de vérifier si le schema est bien respecté.
    ).select('-password');

    if (!updatedUser) { // S'il n'y a pas d'utilisateur (à mettre à jour) reconnu
      return res.status(404).json({ message: 'User not found' }); 
    }

    res.status(200).json(updatedUser); // On publie le updatedUser
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/users/me
exports.deleteMyAccount = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.auth.userId); // On cherche un user à deleter par ID

    if (!deletedUser) { // Si l'utilisateur à supprimer n'existe pas, envoyer un message disant qu'il n'est pas trouvé
      return res.status(404).json({ message: 'User not found' }); 
    }

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users
// plutôt réservé à admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};