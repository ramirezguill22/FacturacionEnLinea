export type NetSuiteTicketValidationRequest = {
  ticket: string;
};

export type TicketValidationStatus =
  | "encontrado"
  | "no_encontrado"
  | "duplicado"
  | "no_elegible"
  | "error_validacion"
  | "error_interno";

export type NetSuiteTicketValidationResponse = {
  ok: boolean;
  status: TicketValidationStatus;
  message: string;
  ticket?: string;
  salesOrderId?: string;
  salesOrderTranId?: string;
  total?: string;
  currency?: string;
  dateCreated?: string;
  ovFacturableEnPortal?: boolean | string;
  ticketFacturado?: boolean | string;
  matches?: number;
  ticketField?: string;
  detail?: string;
};

export type TicketValidationApiResponse = {
  success: boolean;
  status: TicketValidationStatus;
  message: string;
  data: {
    ticket?: string;
    salesOrderId?: string;
    salesOrderTranId?: string;
    total?: string;
    currency?: string;
    dateCreated?: string;
    ovFacturableEnPortal?: boolean | string;
    ticketFacturado?: boolean | string;
    matches?: number;
    ticketField?: string;
  };
};