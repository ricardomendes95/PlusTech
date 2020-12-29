import Contributor from './Contributor'
import Pool from './Pool'

Pool.hasMany(Contributor, {
  as: 'contributor',
})

Contributor.belongsTo(Pool, {
  as: 'pool',
})

export { Pool }
export { Contributor }
