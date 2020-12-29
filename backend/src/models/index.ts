import Contributor from './Contributor'
import Pool from './Pool'
import Payment from './Payment'

Pool.hasMany(Contributor, {
  as: 'contributor',
})

Contributor.belongsTo(Pool, {
  as: 'pool',
})

export { Pool, Contributor, Payment }
