import Contributor from './Contributor'
import Pool from './Pool'
import Payment from './Payment'
import User from './User'

Pool.hasMany(Contributor, {
  as: 'contributors',
})

Pool.hasMany(Payment, {
  as: 'payments',
})

Contributor.belongsTo(Pool, {
  as: 'pool',
})

Contributor.hasMany(Payment, {
  as: 'payments',
})

Payment.belongsTo(Pool, {
  as: 'pool',
})

Payment.belongsTo(Contributor, {
  as: 'contributor',
})

export { User, Pool, Contributor, Payment }
