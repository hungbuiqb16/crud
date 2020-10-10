const express = require('express');
const router = express.Router();
const club = require('../models/club');

//ROUTE FOR READ
router.get('/', (req, res) => {
    club.find((err,docs) => {
        res.render('index',{clubs: docs})
    }).catch(err =>{
    	console.log('Something went wrong to read data to database');
    });
})

//ROUTE FOR CREATE
router.post('/add', (req, res, next) => {
	// const name    = req.body.name;
	// const players = req.body.players;
	// const coach   = req.body.coach;

	const {name, players, coach} = req.body;
    
    //console.log(req.body);

	//console.log(name,players,coach);

	const uclClub = new club({
		name,
		players,
		coach
	});
	uclClub.save((err) => {
		if(err){
            console.log('Something went wrong to save data to database');
		}else{
			console.log('Data is recorded successfully!');
			res.redirect('/');
		}
	});
})

//ROUTE FOR EDIT

router.get('/edit/:id', (req, res,next) => {
	//console.log(req.params.id);
	club.findOneAndUpdate({_id:req.params.id}, req.body, {new:true}, (err, docs) => {
        if (err) {
            console.log('Something went wrong to edit data to database');
	   }else {
	   	   res.render('edit',{club:docs});
	   }
	});
})

//ROUTE FOR UPDATE
router.post('/edit/:id',(req, res, next) => {
    club.findByIdAndUpdate({_id:req.params.id}, req.body, (err,docs) => {
        if(err) {
    	   console.log('Something went wrong to edit data to database');
           next(err);
        }else {
           console.log('Data is updated successfully!');
           res.redirect('/');
        }
    });
})

//ROUTE FOR DELETE

router.get('/delete/:id', (req,res,next) => {
    club.findByIdAndDelete({_id:req.params.id}, req.body, (err,docs) => {
        if (err) {
           console.log('Something went wrong to delete data to database');
           next(err);
        } else {
           console.log('Data is deleted successfully!');
          res.redirect('/');
        }
    });
})

//ROUTE FOR PAGINATE

router.get('/clubs/:page',(req,res,next) => {
    var limit = 3;
    var page  = req.params.page || 1;
    club.find({}).skip((limit * page) - limit).limit(limit).exec((err,clubs) => {
        club.countDocuments().exec((err,count) => {
            if (err) {
                return next(err);
            }else{
                res.render('index',{
                    clubs: clubs,
                    current: page,
                    pages: Math.ceil(count/limit)
                });
            }
        })
    })

})

//ROUTE FOR SEARCH

router.post('/search',(req,res,next) => {
    const keyword = req.body.keyword;
    club.find({$or:[{name: {$regex:keyword, $options:'i'}},
                    {players: {$regex:keyword, $options:'i'}},
                    {coach: {$regex:keyword, $options:'i'}}]})
        .exec((err,docs) => {
        if(err) return next(err)
        res.render('search',{clubs:docs})
    })
})


router.post('/search',(req,res,next) => {
    const keyword = req.body.keyword;
    club.find({$or:[{name: {$regex:keyword, $options:'i'}},
                    {players: {$regex:keyword, $options:'i'}},
                    {coach: {$regex:keyword, $options:'i'}}]})
        .exec((err,docs) => {
        if(err) return next(err)
        res.render('search',{clubs:docs})
    })
})

module.exports = router;