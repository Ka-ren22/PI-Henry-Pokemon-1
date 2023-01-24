
const { Router } = require("express");
const { Type } = require("../db.js");
const axios = require("axios")
const router = Router();

router.get('/', async (req, res) => {
    const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
    const types = typesApi.data.results;
  
    types.forEach( el => {
      Type.findOrCreate({
        where: {name: el.name}
      })
    })
  
    const allTypes = await Type.findAll();
    return res.send(allTypes);
  })

  module.exports = router