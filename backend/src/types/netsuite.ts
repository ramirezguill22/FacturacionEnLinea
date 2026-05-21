export type NetSuiteTicketValidationRequest = {
  ticket: string;
};

export type NetSuiteCustomerFiscalInfoRequest = {
  customerId: string;
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
  customerId?: string;
  total?: string;
  currency?: string;
  dateCreated?: string;
  ovFacturableEnPortal?: boolean | string;
  ticketFacturado?: boolean | string;
  matches?: number;
  ticketField?: string;
  detail?: string;
};

export type CustomerFiscalInfoStatus =
  | "encontrado"
  | "no_encontrado"
  | "error_validacion"
  | "error_interno";

export type NetSuiteCustomerFiscalInfoResponse = {
  ok: boolean;
  status: CustomerFiscalInfoStatus;
  message: string;
  customerId?: string;
  razonSocial?: string;
  rfc?: string;
  usoCfdi?: string;
  regimenFiscal?: string;
  codigoPostal?: string;
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
    customerId?: string;
    total?: string;
    currency?: string;
    dateCreated?: string;
    ovFacturableEnPortal?: boolean | string;
    ticketFacturado?: boolean | string;
    matches?: number;
    ticketField?: string;
  };
};

export type CustomerFiscalInfoApiResponse = {
  success: boolean;
  status: CustomerFiscalInfoStatus;
  message: string;
  data: {
    customerId?: string;
    razonSocial?: string;
    rfc?: string;
    usoCfdi?: string;
    regimenFiscal?: string;
    codigoPostal?: string;
  };
};