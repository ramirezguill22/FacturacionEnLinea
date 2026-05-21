/**
 * @NApiVersion 2.1
 */
define(["N/search"], function(search) {
  function buildNoEncontradoResponse(customerId) {
    return {
      ok: true,
      status: "no_encontrado",
      message: "No se encontró información fiscal para ese cliente.",
      customerId: customerId
    };
  }

  function buildEncontradoResponse(customerId, result) {
    return {
      ok: true,
      status: "encontrado",
      message: "Información fiscal localizada correctamente.",
      customerId: customerId,
      razonSocial: result.getValue({ name: "custentity_cfdi_nombrefiscal" }),
      rfc: result.getValue({ name: "custentity_rfc" }),
      usoCfdi: result.getText({ name: "custentity_cte_usocfdi" }),
      regimenFiscal: result.getText({ name: "custentity_regimenfiscal_ce" }),
      codigoPostal: result.getValue({ name: "billzip" })
    };
  }

  function searchByCustomerId(customerId) {
    const customerSearch = search.create({
      type: search.Type.CUSTOMER,
      filters: [["internalid", "anyof", customerId]],
      columns: [
        search.createColumn({ name: "custentity_cfdi_nombrefiscal" }),
        search.createColumn({ name: "custentity_rfc" }),
        search.createColumn({ name: "custentity_cte_usocfdi" }),
        search.createColumn({ name: "custentity_regimenfiscal_ce" }),
        search.createColumn({ name: "billzip" })
      ]
    });

    const results = customerSearch.run().getRange({ start: 0, end: 1 });

    if (!results || results.length === 0) {
      return buildNoEncontradoResponse(customerId);
    }

    return buildEncontradoResponse(customerId, results[0]);
  }

  return {
    searchByCustomerId: searchByCustomerId
  };
});