const debug = require('debug')('app:orphanage');
const {Orphanage, validate} = require('../models/orphan');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const orphanage = await Orphanage.find().sort('oName');
    res.send([orphanage]);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let orphanHome = new Orphanage({
        oName: req.body.oName,
        oAddress: req.body.oAddress,
        oRegNum: req.body.oRegNum,
        oStrength: req.body.oStrength,
        oSponserNum: req.body.oSponserNum
    });
    orphanHome = await orphanHome.save();
    res.send(orphanHome);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const orphanHome = await Orphanage.findByIdAndUpdate(req.params.id, { oName: req.body.oName }, {
        new: true
    });
    if (!orphanHome) return res.status(404).send('The orphan home with the given ID was not found.');
    res.send(orphanHome);
});

router.delete('/:id', async (req,res) => {
    const orphanHome = await Orphanage.findByIdAndRemove(req.params.id);
    if (!orphanHome) return res.status(404).send('The orphan home with the given ID was not found.');
    res.send(orphanHome);
});


router.get('/:id', async (req, res)=> {
    const orphanHome = await Orphanage.findById(req.params.id);
    if (!orphanHome) return res.status(404).send('The orphan home with the given ID was not found.');
    res.send(orphanHome);
 });

 module.exports = router;
 