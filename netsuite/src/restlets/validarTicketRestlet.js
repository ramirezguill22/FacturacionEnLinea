/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(["N/log", "../services/ticketSearchService"], function(log, ticketSearchService) {
  function getTicketFromRequest(requestBody) {
    if (typeof requestBody === "string") {
      return requestBody.trim();
    }

    if (!requestBody || typeof requestBody !== "object") {
      return "";
    }

    if (typeof requestBody.numeroTicket === "string") {
      return requestBody.numeroTicket.trim();
    }

    if (typeof requestBody.ticket === "string") {
      return requestBody.ticket.trim();
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