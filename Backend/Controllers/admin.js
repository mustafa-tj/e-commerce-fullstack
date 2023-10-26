const Music = require('../Models/music');
const Merch =  require('../Models/merch');

const ITEMS_PER_PAGE = 2;

exports.getMusic = ((req,res,next)=>{
    const page=+req.query.page || 1;
    var totalItems;
    Music.count()
    .then((numProducts)=>{
        totalItems = numProducts;
        return Music.findAll({
            offset: (page - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE
        });
    })
    .then((result)=>{
        res.json({
            data:result,
            currentPage:page,
            hasNextPage:totalItems > page * ITEMS_PER_PAGE,
            hasPreviousPage: page>1,
            nextPage: +page+1,
            previousPage: +page-1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        })
    }).catch((err)=>{
        console.log(err);
    });
});

// exports.getMerch = ((req,res,next)=>{
//     Merch.findAll()
//     .then((result)=> {
//         res.json(result)
//     }).catch((err)=> {
//         console.log(err);
//     });
// });