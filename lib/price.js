const { parseI16F16 } = require('@encointer/util')
const BN = require('bn.js')

async function getPrice (self) {
  const price = await self.api.query.tftPriceModule.tFTPrice()

  const priceAsUint16 = new DataView(price.buffer).getUint16(0, true)

  /// Got fixed-point encoded number
  const priceFixedPoint = new BN(priceAsUint16, 2)

  /// Parse to Number
  const result = parseI16F16(priceFixedPoint)

  return result
}

module.exports = {
  getPrice
}