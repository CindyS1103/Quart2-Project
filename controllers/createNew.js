const knex = require("../db/knex.js");

module.exports = {

newOrder: (req, res)=>{
  knex('order').where('user_id', req.params.id).insert({
    description: req.body.description,
    size: req.body.size,
    date: req.body.date,
    address: req.body.address,
    deadline: req.body.deadline,
    confirmation: req.body.confirmation,
    user_id: req.params.id
  }).then(()=>{
    res.redirect('/donorSummary');
  })
},
donor_summary: (req, res)=>{
  knex('user').where('id', req.session.user_id).then((results)=>{
    let user = results[0];
    knex('order').where('user_id', req.session.user_id).select('user.name').join('user', 'order.user_id', 'user.id').then((result)=>{
      res.render('donor_summary', {user: user, orders: result});
    })
  })
}








}
