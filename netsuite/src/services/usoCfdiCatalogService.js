/**
 * @NApiVersion 2.1
 */
define(["N/search"], function(search) {
  function getUsoCfdiCatalog() {
    const catalogSearch = search.create({
      type: "customlist_cfdi_uso",
      columns: [
        search.createColumn({ name: "internalid", sort: search.Sort.ASC }),
        search.createColumn({ name: "name" })
      ]
    });

    const results = catalogSearch.run().getRange({ start: 0, end: 1000 }) || [];

    return {
      ok: true,
      status: "encontrado",
      message: "Catálogo de Uso de CFDI localizado correctamente.",
      options: results.map(function(result) {
        return {
          id: result.getValue({ name: "internalid" }),
          text: result.getValue({ name: "name" })
        };
      })
    };
  }

  return {
    getUsoCfdiCatalog: getUsoCfdiCatalog
  };
});