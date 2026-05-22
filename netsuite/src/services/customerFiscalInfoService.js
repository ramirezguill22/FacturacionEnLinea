/**
 * @NApiVersion 2.1
 */
define(["N/record", "N/search"], function(record, search) {
  function buildNoEncontradoResponse(customerId) {
    return {
      ok: true,
      status: "no_encontrado",
      message: "No se encontró información fiscal para ese cliente.",
      customerId: customerId
    };
  }

  function getDefaultBillingZip(customerId) {
    const customerRecord = record.load({
      type: record.Type.CUSTOMER,
      id: customerId,
      isDynamic: false
    });
    const lineCount = customerRecord.getLineCount({ sublistId: "addressbook" });

    for (let line = 0; line < lineCount; line += 1) {
      const isDefaultBilling = customerRecord.getSublistValue({
        sublistId: "addressbook",
        fieldId: "defaultbilling",
        line: line
      });

      if (!isDefaultBilling) {
        continue;
      }

      const addressSubrecord = customerRecord.getSublistSubrecord({
        sublistId: "addressbook",
        fieldId: "addressbookaddress",
        line: line
      });

      return addressSubrecord.getValue({ fieldId: "zip" }) || "";
    }

    return "";
  }

  function buildEncontradoResponse(customerId, result, codigoPostal) {
    return {
      ok: true,
      status: "encontrado",
      message: "Información fiscal localizada correctamente.",
      customerId: customerId,
      razonSocial: result.getValue({ name: "custentity_cfdi_nombrefiscal" }),
      rfc: result.getValue({ name: "custentity_rfc" }),
      usoCfdi: result.getText({ name: "custentity_cte_usocfdi" }),
      regimenFiscal: result.getText({ name: "custentity_regimenfiscal_ce" }),
      codigoPostal: codigoPostal
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
        search.createColumn({ name: "custentity_regimenfiscal_ce" })
      ]
    });

    const results = customerSearch.run().getRange({ start: 0, end: 1 });

    if (!results || results.length === 0) {
      return buildNoEncontradoResponse(customerId);
    }

    return buildEncontradoResponse(customerId, results[0], getDefaultBillingZip(customerId));
  }

  return {
    searchByCustomerId: searchByCustomerId
  };
});