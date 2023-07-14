const { LawService } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const lawServices = await LawService.findAll();
    return res.json({ services: lawServices });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getById = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const lawService = await LawService.findByPk(serviceId);
    if (!lawService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    return res.json({ service: lawService });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.create = async (req, res) => {
  const { name, cost } = req.body;

  try {
    const newService = await LawService.create({ name, cost });
    return res.status(201).json({ service: newService });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.update= async (req, res) => {
  const { serviceId } = req.params;
  const { name, cost } = req.body;

  try {
    const lawService = await LawService.findByPk(serviceId);
    if (!lawService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    await lawService.update({ name, cost });
    return res.json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const lawService = await LawService.findByPk(serviceId);
    if (!lawService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    await lawService.destroy();
    return res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
