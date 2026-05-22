/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(["N/log", "../services/ticketSearchService", "../services/customerFiscalInfoService", "../services/usoCfdiCatalogService"], function(log, ticketSearchService, customerFiscalInfoService, usoCfdiCatalogService) {
  function getTicketFromRequest(requestBody) {
    if (typeof requestBody === "string") {
      return requestBody.trim();
    }

    if (!requestBody || typeof requestBody !== "object") {
      return "";
    }

    if (typeof requestBody.ticket === "string") {
      return requestBody.ticket.trim();
    }

    if (typeof requestBody.numeroTicket === "string") {
      return requestBody.numeroTicket.trim();
    }

    return "";
  }

  function getCustomerIdFromRequest(requestBody) {
    if (!requestBody || typeof requestBody !== "object") {
      return "";
    }

    if (typeof requestBody.customerId === "string") {
      return requestBody.customerId.trim();
    }

    return "";
  }

  function getCatalogIdFromRequest(requestBody) {
    if (!requestBody || typeof requestBody !== "object") {
      return "";
    }

    if (typeof requestBody.catalogId === "string") {
      return requestBody.catalogId.trim();
    }

    return "";
  }

  function buildValidationErrorResponse() {
    return {
      ok: false,
      status: "error_validacion",
      message: "Debe enviarse un número de ticket válido.",
      ticketField: ticketSearchService.ticketFieldId
    };
  }

  function buildInternalErrorResponse(error) {
    return {
      ok: false,
      status: "error_interno",
      message: "Ocurrió un error interno al validar el ticket.",
      detail: error && error.message ? error.message : "Error desconocido"
    };
  }

  function post(requestBody) {
    try {
      const catalogId = getCatalogIdFromRequest(requestBody);

      if (catalogId === "customlist_cfdi_uso") {
        log.debug({
          title: "RESTlet catalogoUsoCfdi - request",
          details: {
            catalogId: catalogId
          }
        });

        const catalogResponse = usoCfdiCatalogService.getUsoCfdiCatalog();

        log.debug({
          title: "RESTlet catalogoUsoCfdi - response",
          details: catalogResponse
        });

        return catalogResponse;
      }

      const customerId = getCustomerIdFromRequest(requestBody);

      if (customerId) {
        log.debug({
          title: "RESTlet datosFiscales - request",
          details: {
            customerId: customerId
          }
        });

        const customerResponse = customerFiscalInfoService.searchByCustomerId(customerId);

        log.debug({
          title: "RESTlet datosFiscales - response",
          details: customerResponse
        });

        return customerResponse;
      }

      const ticket = getTicketFromRequest(requestBody);

      log.debug({
        title: "RESTlet validarTicket - request",
        details: {
          ticket: ticket,
          ticketFieldId: ticketSearchService.ticketFieldId
        }
      });

      if (!ticket) {
        return buildValidationErrorResponse();
      }

      const response = ticketSearchService.searchByTicket(ticket);

      log.debug({
        title: "RESTlet validarTicket - response",
        details: response
      });

      return response;
    } catch (error) {
      log.error({
        title: "RESTlet validarTicket - error",
        details: error
      });

      return buildInternalErrorResponse(error);
    }
  }

  return {
    post: post
  };
});