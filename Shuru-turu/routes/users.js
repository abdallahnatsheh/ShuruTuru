const Tour = require('../models/tour')
const Guide = require('../models/guide')
const Site = require('../models/site')

module.exports = {
    //READ all tours from file
    read_all_tours: function (req, res) {
        Tour.find().then(tours =>
            res.send(tours)
        ).catch(e => res.status(500).send())
    },
    getGuides: function (req, res) {
        Guide.find().then(guide =>
            res.send(guide)
        ).catch(e=> res.status(500).send())
    },

    //READ  one tour
    read_tour: function (req, res) {
        const userId = req.params["id"];
        Tour.find({"_id": userId}).then(tours =>
            res.send(tours)
        ).catch(e => res.status(500).send())
    },
    read_site:function (req, res) {
        const userId = req.params["id"];
        Site.find({"tourid": userId}).then(sites =>
            res.send(sites)
        ).catch(e => res.status(500).send())
    },

    // CREATE one tour
    create_tour : function (req, res) {
        const tour = new Tour(req.body)
        tour.save().then(data => {
            console.log("in then - save");
            res.status(201).send(data)
        }).catch(e => {
            res.status(400).send(e)
        });
    },

    // UPDATE a tour
    update_tour: function (req, res) {

        const updates = Object.keys(req.body)
        const allowedUpdates = ['date', 'duration', 'price','guideId']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then(tour => {
            if (!tour) {
                return res.status(404).send()
            }
            else {
                console.log(tour)
                res.send(tour)
            }
        }).catch(e => res.status(400).send(e))
    },
    // DELETE a tour
    delete_tour: function (req, res) {
        const tourId = req.params["id"];
        Tour.deleteOne({"_id": tourId}).then(tours =>
            res.status(200).send(`users id:${tourId} removed`)
        ).catch(e => res.status(500).send())
    },
    //create a path
    create_site : function (req, res) {
        const tourid = req.params["id"];
        const site = new Site(req.body)
            site.save().then(data => {
                console.log("in then - save");
                res.status(201).send(data)
            }).catch(e => {
                res.status(400).send(e)
            })
    },
    // DELETE a path
    delete_site: function (req, res) {
        const siteid = req.params["id"];
        Site.remove({"tourid": siteid,"name":req.params["name"]}).then(
            res.status(200).send(`site id:${siteid} removed`)
        ).catch(e => res.status(500).send())
    },
    //create guide
    create_guide: function (req, res) {
        const guide = new Guide(req.body)
        guide.save().then(guide => {
            console.log("in then - save");
            res.status(201).send(guide)
        }).catch(e => {
            res.status(400).send(e)
        });

    }
};