module.exports = data => {
  const express = require("express");
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json(data);
  });

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.json(data.find(k => k.id === Number(id)));
  });

  router.post("/", (req, res) => {
    const reducer = (acc, curr) => Math.max(acc, curr);
    const nextId = data.map(el => el.id).reduce(reducer) + 1;
    const kitten = {
      id: nextId,
      name: req.body.name,
      hobbies: [] // Empty hobby array
    };
    data.push(kitten);
    res.json(kitten);
  });

  router.post("/:id/hobbies", (req, res) => {
    const kitten = data.find(k => k.id === Number(id));
    kitten.hobbies.push(req.body.hobby);
    res.json(kitten);
  });

  return router;
};