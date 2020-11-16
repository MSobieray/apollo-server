const { RESTDataSource } = require("apollo-datasource-rest")

class PrePricedAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://homeadvisor.com/api/resource/prepriced/"
  }
  willSendRequest(request) {
    request.params.set("entityID", "80851022")
    request.params.set(
      "entityHash",
      "80851022_sbf8261b1b7b9509f3eba4aeacd95262b"
    )
    request.params.set("r_username", "pre_priced_fe")
    request.params.set("r_accesskey", "KRnMrH8t")
  }
  async getPrePriced() {
    const response = await this.get("40117")
    return typeof response === "object" ? this.prePricedReducer(response) : []
  }

  // Utility Method
  prePricedReducer(pricing) {
    return {
      taskOid: pricing.taskOid,
      basePrice: pricing.pricing.basePrice,
      downPayment: pricing.pricing.basePrice,
      dueOnCompletion: pricing.pricing.dueOnCompletion,
      sections: pricing.sow.sections.map(section =>
        this.sectionReducer(section)
      )
    }
  }
  sectionReducer(section) {
    return {
      text: section.text,
      items: section.items
    }
  }
}

module.exports = PrePricedAPI
