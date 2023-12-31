const express = require("express");

const controleursStage = require("../controllers/stages-controllers")
const router = express.Router();

router.get("/listeStage", controleursStage.getStages);
router.get('/:stageId', controleursStage.getStageId);
router.get("/parEntreprise/:nomEntreprise", controleursStage.getStageEmploy);
router.post('/', controleursStage.ajouterStage);
router.delete('/:stageId', controleursStage.supprimerStage);
router.patch('/:stageId',controleursStage.modifierStage);

module.exports = router;
