import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Get the month name by its number.
 * @param monthNumber - The month number (1 for January, 2 for February, etc.).
 * @returns The name of the month, or an error message if the input is invalid.
 */
export const getMonthName = (monthNumber: number): string => {
  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error("Month number must be between 1 and 12.");
  }

  // Create a new date for the given month number.
  const date = new Date(2000, monthNumber - 1); // Year doesn't matter, only the month does.

  return format(date, "MMMM", { locale: ptBR }); // Format the date to get the full month name.
};
