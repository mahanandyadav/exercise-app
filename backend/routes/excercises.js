const router = require('express').Router()
let Exercise = require('../models/exercise.model')

router.get('/', async (req, res, next) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/add', async (req, res, next) => {
    const username = req.body.username;
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()
        .then(() => res.json('exercise added'))
        .catch(err => res.status(400).json('error: ' + err))
})

router.get('/:id', async (req, res, next) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('error: ' + err))
})

router.delete('/:id', async (req, res, next) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json("exercise deleted"))
        .catch(err => res.status(400).json('error: ' + err))
})

router.post('/update/:id', async (req, res, next) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username,
                exercise.description = req.body.description,
                exercise.duration = Number(req.body.duration),
                exercise.date = Date.parse(req.body.date)

            exercise.save()
                .then(() => res.json('esercise udpated'))
                .catch(err => res.status(400).json('error: ' + err))

        })
        .catch(err => res.status(400).json('error: ' + err))
})



module.exports = router