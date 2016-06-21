/* global describe */

const jsc = require('jsverify')
const { createGrowthModel, averageGrowthModel } = require('./lib')

describe('ftd day 7 javascript kata', function () {
  jsc.property(
    '#createGrowthModel() creates a correct GrowthModel object',
    'number', 'number',
    function (lengthToWingspan, leavesEatenToWeight) {
      const growthModel = createGrowthModel(lengthToWingspan, leavesEatenToWeight)
      return (lengthToWingspan === growthModel.lengthToWingspan &&
        leavesEatenToWeight === growthModel.leavesEatenToWeight)
    }
  )

  jsc.property(
    '#averageGrowthModel() correctly averages GrowthModel objects',
    jsc.array(jsc.record({
      lengthToWingspan: jsc.number,
      leavesEatenToWeight: jsc.number
    })),
    function (arr) {
      const toCheck = averageGrowthModel(arr)
      if (arr.length > 0) {
        const summed = arr.reduce(
          (acc, next) =>
            createGrowthModel(
              acc.lengthToWingspan + next.lengthToWingspan,
              acc.leavesEatenToWeight + next.leavesEatenToWeight
            ),
            createGrowthModel(0, 0)
        )
        const average = createGrowthModel(
          summed.lengthToWingspan / arr.length,
          summed.leavesEatenToWeight / arr.length
        )
        return (average.lengthToWingspan === toCheck.lengthToWingspan &&
          average.leavesEatenToWeight === toCheck.leavesEatenToWeight)
      } else {
        return toCheck === undefined
      }
    }
  )
})
