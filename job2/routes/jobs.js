var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/jobsearch';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;
var jobSchema = new Schema({

    "title": String,
    "description": String,
    "type": String,
    "role": String,
    "skills": String,
    "work_experience": String,
    "location": String,
    "link": String,
    "company_name": String,
    "logo": String,
    "website": String
});
var soft_delete = require('mongoose-softdelete');
jobSchema.plugin(soft_delete);
var jobModel = mongoose.model('jobs', jobSchema);


router.get('/', function(req, res) {

    var searchCriteria = { deleted: { $ne: true } };

    var jobtitle = req.query.jobtitle;
    var jlocation = req.query.jlocation;
    var flag = req.query.flag;
    console.log("--------------------");
    console.log(flag);
    console.log("--------------------");

    if (flag == "fulltime") {
        //searchCriteria = { deleted: { $ne: true } };
        searchCriteria = {
            'deleted': { $ne: true },
            'type': { '$regex': 'Full-time', '$options': 'i' }
        };

        if (jobtitle) {
            searchCriteria = {
                'title': { '$regex': jobtitle, '$options': 'i' },
                'deleted': { $ne: true },
                'type': { '$regex': 'Full-time', '$options': 'i' }
            };
        }
        if (jlocation) {
            searchCriteria = {
                'location': { '$regex': jlocation, '$options': 'i' },
                'deleted': { $ne: true },
                'type': { '$regex': 'Full-time', '$options': 'i' }
            };
        }
        if (jobtitle && jlocation) {
            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'title': { '$regex': jobtitle, '$options': 'i' } },
                    { 'location': { '$regex': jlocation, '$options': 'i' } },
                    {
                        'type': { '$regex': 'Full-time', '$options': 'i' }
                    }
                ]
            }
        }
    }

    if (flag == "parttime") {
        searchCriteria = {
            'deleted': { $ne: true },
            'type': { '$regex': 'Part-time', '$options': 'i' }
        };
        if (jobtitle) {
            searchCriteria = {
                'title': { '$regex': jobtitle, '$options': 'i' },
                'deleted': { $ne: true },
                'type': { '$regex': 'Part-time', '$options': 'i' }
            };
        }
        if (jlocation) {
            searchCriteria = {
                'location': { '$regex': jlocation, '$options': 'i' },
                'deleted': { $ne: true },
                'type': { '$regex': 'Part-time', '$options': 'i' }
            };
        }
        if (jobtitle && jlocation) {
            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'title': { '$regex': jobtitle, '$options': 'i' } },
                    { 'location': { '$regex': jlocation, '$options': 'i' } },
                    {
                        'type': { '$regex': 'Part-time', '$options': 'i' }
                    }
                ]
            }
        }
    }

    if (flag == "internship") {
        searchCriteria = {
            'deleted': { $ne: true },
            'type': { '$regex': 'internship', '$options': 'i' }
        };

        if (jobtitle) {
            searchCriteria = {
                'title': { '$regex': jobtitle, '$options': 'i' },
                'deleted': { $ne: true },
                'type': { '$regex': 'internship', '$options': 'i' }
            };
        }
        if (jlocation) {
            searchCriteria = {
                'location': { '$regex': jlocation, '$options': 'i' },
                'deleted': { $ne: true },
                'type': { '$regex': 'internship', '$options': 'i' }
            };
        }
        if (jobtitle && jlocation) {
            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'title': { '$regex': jobtitle, '$options': 'i' } },
                    { 'location': { '$regex': jlocation, '$options': 'i' } },
                    {
                        'type': { '$regex': 'internship', '$options': 'i' }
                    }
                ]
            }
        }
    }

    if (flag == "fp") {

        searchCriteria = {
            $and: [
                { 'deleted': { $ne: true } },
                {
                    $or: [
                        { 'type': { '$regex': 'Full-time', '$options': 'i' } },
                        { 'type': { '$regex': 'Part-time', '$options': 'i' } }
                    ]
                }
            ]
        };

        if (jobtitle) {

            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'title': { '$regex': jobtitle, '$options': 'i' } },
                    {
                        $or: [
                            { 'type': { '$regex': 'Full-time', '$options': 'i' } },
                            { 'type': { '$regex': 'Part-time', '$options': 'i' } }
                        ]
                    }
                ]
            };

        }

        if (jlocation) {

            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'location': { '$regex': jlocation, '$options': 'i' } },
                    {
                        $or: [
                            { 'type': { '$regex': 'Full-time', '$options': 'i' } },
                            { 'type': { '$regex': 'Part-time', '$options': 'i' } }
                        ]
                    }
                ]
            };

        }

        if (jobtitle && jlocation) {

            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'title': { '$regex': jobtitle, '$options': 'i' } },
                    { 'location': { '$regex': jlocation, '$options': 'i' } },
                    {
                        $or: [
                            { 'type': { '$regex': 'Full-time', '$options': 'i' } },
                            { 'type': { '$regex': 'Part-time', '$options': 'i' } }
                        ]
                    }
                ]
            };
        }

    }

    if (flag == "pi") {

        searchCriteria = {
            $and: [
                { 'deleted': { $ne: true } },
                {
                    $or: [
                        { 'type': { '$regex': 'internship', '$options': 'i' } },
                        { 'type': { '$regex': 'Part-time', '$options': 'i' } }
                    ]
                }
            ]
        };

        if (jobtitle) {

            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'title': { '$regex': jobtitle, '$options': 'i' } },
                    {
                        $or: [
                            { 'type': { '$regex': 'internship', '$options': 'i' } },
                            { 'type': { '$regex': 'Part-time', '$options': 'i' } }
                        ]
                    }
                ]
            };

        }

        if (jlocation) {

            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'location': { '$regex': jlocation, '$options': 'i' } },
                    {
                        $or: [
                            { 'type': { '$regex': 'internship', '$options': 'i' } },
                            { 'type': { '$regex': 'Part-time', '$options': 'i' } }
                        ]
                    }
                ]
            };

        }

        if (jobtitle && jlocation) {

            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'title': { '$regex': jobtitle, '$options': 'i' } },
                    { 'location': { '$regex': jlocation, '$options': 'i' } },
                    {
                        $or: [
                            { 'type': { '$regex': 'internship', '$options': 'i' } },
                            { 'type': { '$regex': 'Part-time', '$options': 'i' } }
                        ]
                    }
                ]
            };
        }

    }

    if (flag == "fi") {

        searchCriteria = {
            $and: [
                { 'deleted': { $ne: true } },
                {
                    $or: [
                        { 'type': { '$regex': 'internship', '$options': 'i' } },
                        { 'type': { '$regex': 'Full-time', '$options': 'i' } }
                    ]
                }
            ]
        };

        if (jobtitle) {

            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'title': { '$regex': jobtitle, '$options': 'i' } },
                    {
                        $or: [
                            { 'type': { '$regex': 'internship', '$options': 'i' } },
                            { 'type': { '$regex': 'Full-time', '$options': 'i' } }
                        ]
                    }
                ]
            };

        }

        if (jlocation) {

            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'location': { '$regex': jlocation, '$options': 'i' } },
                    {
                        $or: [
                            { 'type': { '$regex': 'internship', '$options': 'i' } },
                            { 'type': { '$regex': 'Full-time', '$options': 'i' } }
                        ]
                    }
                ]
            };

        }

        if (jobtitle && jlocation) {

            searchCriteria = {
                $and: [
                    { 'deleted': { $ne: true } },
                    { 'title': { '$regex': jobtitle, '$options': 'i' } },
                    { 'location': { '$regex': jlocation, '$options': 'i' } },
                    {
                        $or: [
                            { 'type': { '$regex': 'internship', '$options': 'i' } },
                            { 'type': { '$regex': 'Full-time', '$options': 'i' } }
                        ]
                    }
                ]
            };
        }

    }

    if (flag == "fpi") {

        

        if (jobtitle) {
            searchCriteria = { 'title': { '$regex': jobtitle, '$options': 'i' }, 'deleted': { $ne: true } };

        }
        if (jlocation) searchCriteria = { 'location': { '$regex': jlocation, '$options': 'i' }, 'deleted': { $ne: true } };
        if (jobtitle && jlocation) searchCriteria = { $and: [{ 'title': { '$regex': jobtitle, '$options': 'i' } }, { 'location': { '$regex': jlocation, '$options': 'i' } }] };



    }


    jobModel.find(searchCriteria, function(err, jobs) {
        if (err) throw err;
        res.json(jobs);
    });
});


router.get('/:id', function(req, res) {
    jobModel.findById(req.params.id, function(err, job) {
        if (err) throw err;
        res.json(job);
    });
});



router.put('/:id', function(req, res) {

    jobModel.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            role: req.body.role,
            skills: req.body.skills,
            work_experience: req.body.work_experience,
            location: req.body.location,
            link: req.body.link,
            company_name: req.body.company_name,
            logo: req.body.logo,
            website: req.body.website
        }
    }, { new: true }, (err, job) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        res.json(job);
    });


});


router.post('/', function(req, res) {
    var job_row = new jobModel({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        role: req.body.role,
        skills: req.body.skills,
        work_experience: req.body.work_experience,
        location: req.body.location,
        link: req.body.link,
        company_name: req.body.company_name,
        logo: req.body.logo,
        website: req.body.website
    });

    job_row.save(function(err, row) {
        if (err) return console.error(err);
        console.log(row.title + " saved to job collection.");
        res.json(row);
    });

});

router.delete('/:id', function(req, res) {
    jobModel.findById(req.params.id, function(err, job) {
        if (err) throw err;
        console.log(job.title);
        job.softdelete(function(err, job) {
            if (err) throw err;
            res.json(job);
        });
    });
});

module.exports = router;