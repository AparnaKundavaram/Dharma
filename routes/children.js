const {Children, validate} = require('../models/child');
const debug = require('debug')('app:children');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const children = await Children.find().sort('cName');
    res.send([children]);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let child = new Children({
        cName: req.body.cName,
        cGender: req.body.cGender,
        cAge: req.body.cAge,
        cCity: req.body.cCity,
        cBloodGroup: req.body.cBloodGroup
    });
    child = await child.save();
    res.send(child);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const child = await Children.findByIdAndUpdate(req.params.id, { cName: req.body.cName }, {
        new: true
    });
    if (!child) return res.status(404).send('The child with the given ID was not found.');
    res.send(child);
});

router.delete('/:id', async (req,res) => {
    const child = await Children.findByIdAndRemove(req.params.id);
    if (!child) return res.status(404).send('The child with the given ID was not found.');
    res.send(child);
});

router.get('/:id', async (req, res)=> {
    const child = await Children.findById(req.params.id);
    if (!child) return res.status(404).send('The child with the given ID was not found.');
    res.send(child);
 });

 module.exports = router;