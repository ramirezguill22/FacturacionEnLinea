export type NetSuiteTicketValidationRequest = {
  ticket: string;
};

export type NetSuiteCustomerFiscalInfoRequest = {
  customerId: string;
};

export type NetSuiteUsoCfdiCatalogRequest = {
  catalogId: "customlist_cfdi_uso";
};

export type NetSuiteInvoiceRequest = {
  salesorder: string;
  ticket: string;
};

export type InvoiceStampingStatus = "EXITO" | "ERROR";

export type InvoiceResultData = {
  ovInternalId: number;
  salesorder: string;
  facturaInternalId: number;
  facturaTranId: string;
  ticket: string;
  uuid: string | null;
  fechaTimbrado: string | null;
  registroPersonalizadoId: number;
};

export type InvoiceProcessingError = {
  etapa: string;
  codigo: string | number | null;
  detalle: string;
};

export type NetSuiteInvoiceResponse = {
  success: boolean;
  estatusTimbrado: InvoiceStampingStatus;
  mensaje: string;
  data: InvoiceResultData;
  error?: InvoiceProcessingError;
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
  usoCfdiId?: string;
  usoCfdi?: string;
  regimenFiscal?: string;
  codigoPostal?: string;
  detail?: string;
};

export type UsoCfdiCatalogStatus = "encontrado" | "error_validacion" | "error_interno";

export type UsoCfdiCatalogOption = {
  id: string;
  text: string;
};

export type NetSuiteUsoCfdiCatalogResponse = {
  ok: boolean;
  status: UsoCfdiCatalogStatus;
  message: string;
  options?: UsoCfdiCatalogOption[];
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
    usoCfdiId?: string;
    usoCfdi?: string;
    regimenFiscal?: string;
    codigoPostal?: string;
  };
};

export type UsoCfdiCatalogApiResponse = {
  success: boolean;
  status: UsoCfdiCatalogStatus;
  message: string;
  data: {
    options: UsoCfdiCatalogOption[];
  };
};