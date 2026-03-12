type AppConfig = {
  port: number;
  ticketMinLength: number;
  mockFoundTicket: string;
};

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsedValue = Number.parseInt(value ?? "", 10);

  if (Number.isNaN(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  return parsedValue;
}

export const config: AppConfig = {
  port: parsePositiveInteger(process.env.PORT, 8080),
  ticketMinLength: parsePositiveInteger(process.env.TICKET_MIN_LENGTH, 20),
  mockFoundTicket: (process.env.MOCK_FOUND_TICKET ?? "TICKET-PRUEBA-0000001").trim()
};