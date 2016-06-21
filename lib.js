/*
  TODO: Implement empty function bodies according to their requirements
*/

'use strict'

function createGrowthModel (lengthToWingspan, leavesEatenToWeight) {
  return {
    lengthToWingspan,
    leavesEatenToWeight
  }
}

/**
 * Given an array of growth models, this function finds their average and returns
 * this result as a new growth model object
 *
 * @param growthModels [Array<GrowthModel>] the growth models to average.
 *                                          If empty or undefined, return
 *                                          an undefined growth model
 *
 * @return a GrowthModel object
 */
function averageGrowthModel (growthModels) {
  if (growthModels.length === 0) {
    return undefined
  }
  let ao = growthModels.reduce((previous, current) => {
    previous.leavesEatenToWeight += current.leavesEatenToWeight
    previous.lengthToWingspan += current.lengthToWingspan
    ++previous.cnt
    return previous
  }, { leavesEatenToWeight: 0, lengthToWingspan: 0, cnt: 0 })

  return createGrowthModel(ao.lengthToWingspan / ao.cnt,
    ao.leavesEatenToWeight / ao.cnt)
}

module.exports = {
  createGrowthModel,
  averageGrowthModel
}
