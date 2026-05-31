const Company = require('../models/Company');

// POST /api/companies
exports.createCompany = async (req, res) => {
    try {
      const company = await Company.create({
        name: req.body.name,
        description: req.body.description,
        website: req.body.website,
        logo: req.body.logo,
        location: req.body.location,
        industry: req.body.industry,
        createdBy: req.auth.userId
      });
  
      res.status(201).json(company);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// GET /api/companies
exports.getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.find()
        .populate('createdBy', 'name email'); // Pour chaque entreprise on récupère le nom et email du créateur
  
      res.status(200).json(companies); // On affiche toutes les entreprises avec un succès 200
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// GET /api/companies/:id
exports.getCompanyById = async (req, res) => {
    try {
      const company = await Company.findById(req.params.id) // On récupère l'ID grâce au paramètre de l'url qui est l'ID
        .populate('createdBy', 'name email');
  
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// PUT /api/companies/:id
exports.updateCompany = async (req, res) => {
    try {
      const allowedFields = [
        'name',
        'description',
        'website',
        'logo',
        'location',
        'industry'
      ];
  
      const updates = {};
  
      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      });
  
      const company = await Company.findById(req.params.id); // On cherche si la compagnie existe par l'id en paramètre de l'URL
  
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      if (company.createdBy.toString() !== req.auth.userId) {
        return res.status(403).json({ message: 'Not authorized to update this company' });
      }
  
      const updatedCompany = await Company.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      );
  
      res.status(200).json(updatedCompany);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// DELETE /api/companies/:id
exports.deleteCompany = async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
  
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      if (company.createdBy.toString() !== req.auth.userId) { // On vérifie que celui qui souhaite supprimer est le créateur
        return res.status(403).json({ message: 'Not authorized to delete this company' });
      }
  
      await Company.findByIdAndDelete(req.params.id); // On supprime l'entreprise qui a un id correspondant à celui de l'url
  
      res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// GET /api/companies/my-companies
exports.getMyCompanies = async (req, res) => {
    try {
      const companies = await Company.find({ createdBy: req.auth.userId });
  
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};