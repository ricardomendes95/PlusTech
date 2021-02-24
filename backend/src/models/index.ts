import Contributor from './Contributor'
import Pool from './Pool'
import Payment from './Payment'
import User from './User'
import AdditionalAid from './AdditionalAid'
import AdditionalFine from './AdditionalFine'

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

Payment.hasMany(AdditionalAid, {
  as: 'additionalAids',
})

Payment.hasMany(AdditionalFine, {
  as: 'additionalFines',
})

AdditionalAid.belongsTo(Payment, {
  as: 'payment',
})

AdditionalFine.belongsTo(Payment, {
  as: 'payment',
})

export { User, Pool, Contributor, Payment, AdditionalFine, AdditionalAid }
