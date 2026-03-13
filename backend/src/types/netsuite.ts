export type NetSuiteTicketValidationRequest = {
  numeroTicket: string;
};

export type NetSuiteTicketValidationResponse = {
  ok: boolean;
  status:
    | "encontrado"
    | "no_encontrado"
    | "duplicado"
    | "error_validacion"
    | "error_interno";
  message: string;
  ticket?: string;
  salesOrderId?: string;
  salesOrderTranId?: string;
  matches?: number;
  ticketField?: string;
  detail?: string;
};