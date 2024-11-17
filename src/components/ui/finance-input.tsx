/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9aW2kLXXMv0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type FinanceInputProps = {
  value?: string;
};
export default function FinanceInput({ value }: FinanceInputProps) {
  const [currentValue, setCurrentValue] = useState(value);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="currency">Amount</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-muted-foreground">R$</span>
        </div>
        <Input
          id="currency"
          type="number"
          min={0}
          max={10000}
          step={0.01}
          placeholder="0.00"
          value={String(currentValue)}
          onChange={(e) => setCurrentValue(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
}
