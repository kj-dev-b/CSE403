const qr = require("../models/Qreview");


const callback = (err, results, res) => {
    if(err) return err;
    res.json(results);
};

exports.getAll = (req, res) => {
    qr.getAll(
        req.params.owner,
        req.params.repo,
        (err, results) => callback(err, results, res)
    );
};

exports.getSingle = (req, res) => {
    qr.getSingle(
        req.params.owner,
        req.params.repo,
        req.params.number,
        (err, results) => callback(err, results, res)
    );
};

exports.create = (req, res) => {
    qr.create(
        req.params.owner,
        req.params.repo,
        req.body,
        (err, results) => callback(err, results, res)
    );
};

exports.update = (req, res) => {
    qr.update(
        req.params.owner,
        req.params.repo,
        req.params.number,
        rea.body,
        (err, results) => callback(err, results, res)
    )
}

exports.merge = (req, res) => {
    experiment.updateExperimentById(
        req.params.owner,
        req.params.repo,
        req.params.number, 
        req.body,
        (err, results) => callback(err, results, res)
    );
};
