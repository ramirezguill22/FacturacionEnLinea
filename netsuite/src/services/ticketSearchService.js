/**
 * @NApiVersion 2.1
 */
define(["N/search"], function(search) {
  const TICKET_FIELD_ID = "custbody_ticket_venta";

  function buildNoEncontradoResponse(ticket) {
    return {
      ok: true,
      status: "no_encontrado",
      message: "No se encontró una Orden de Venta con ese ticket.",
      ticket: ticket
    };
  }

  function buildDuplicadoResponse(ticket, matches) {
    return {
      ok: true,
      status: "duplicado",
      message: "Se encontraron múltiples Ordenes de Venta con el mismo ticket.",
      ticket: ticket,
      matches: matches
    };
  }

  function buildEncontradoResponse(ticket, result) {
    return {
      ok: true,
      status: "encontrado",
      message: "Ticket localizado correctamente.",
      ticket: ticket,
      salesOrderId: result.getValue({ name: "internalid" }),
      salesOrderTranId: result.getValue({ name: "tranid" }),
      total: result.getValue({ name: "total" }),
      currency: result.getText({ name: "currency" }),
      dateCreated: result.getValue({ name: "datecreated" }),
      ovFacturableEnPortal: result.getValue({ name: "custbody_ovfacturableenportal" }),
      ticketFacturado: result.getValue({ name: "custbody_ticket_facturado" })
    };
  }

  function searchByTicket(ticket) {
    const salesOrderSearch = search.create({
      type: search.Type.SALES_ORDER,
      filters: [
        ["mainline", "is", "T"],
        "and",
        [TICKET_FIELD_ID, "is", ticket]
      ],
      columns: [
        search.createColumn({ name: "internalid" }),
        search.createColumn({ name: "tranid" }),
        search.createColumn({ name: "total" }),
        search.createColumn({ name: "currency" }),
        search.createColumn({ name: "datecreated" }),
        search.createColumn({ name: "custbody_ovfacturableenportal" }),
        search.createColumn({ name: "custbody_ticket_facturado" })
      ]
    });

    const pagedResult = salesOrderSearch.runPaged({ pageSize: 10 });
    const totalMatches = pagedResult.count;

    if (totalMatches === 0) {
      return buildNoEncontradoResponse(ticket);
    }

    if (totalMatches > 1) {
      return buildDuplicadoResponse(ticket, totalMatches);
    }

    const results = salesOrderSearch.run().getRange({ start: 0, end: 1 });

    return buildEncontradoResponse(ticket, results[0]);
  }

  return {
    searchByTicket: searchByTicket,
    ticketFieldId: TICKET_FIELD_ID
  };
});