/**
 * Cross-border expansion model — pure, locale-agnostic.
 *
 * Returns keys and numbers only; the section maps keys to localised copy.
 * Figures are indicative planning assumptions (statutory minimums as of 2024
 * for Italy and Türkiye) and are labelled as such in the UI — not advice.
 */

export type CompanySize = "micro" | "small" | "scale"; // 1–10 · 10–50 · 50+
export type Sector = "tech" | "manufacturing" | "retail" | "holding";
export type Jurisdiction = "italy" | "turkiye";

export type EntityKey = "srl" | "spa" | "ltd" | "as";

export type ChecklistKey =
  // Italy — common
  | "it_deed"
  | "it_vat"
  | "it_pec_sdi"
  | "it_inps_inail"
  | "it_bank_kyc"
  | "it_codice_fiscale"
  // Italy — sector
  | "it_patent_box"
  | "it_impatriati"
  | "it_startup_innovativa"
  | "it_scia_production"
  | "it_environmental"
  | "it_transizione"
  | "it_scia_commercial"
  | "it_fiscal_pos"
  | "it_consumer_code"
  | "it_pex"
  | "it_cfc"
  | "it_transfer_pricing"
  | "it_collective_agreement"
  // Türkiye — common
  | "tr_mersis"
  | "tr_trade_registry"
  | "tr_tax_office"
  | "tr_sgk"
  | "tr_bank_account"
  | "tr_e_invoice"
  // Türkiye — sector
  | "tr_technopark"
  | "tr_rd_center"
  | "tr_capacity_report"
  | "tr_osb"
  | "tr_atr_customs"
  | "tr_workplace_license"
  | "tr_etbis"
  | "tr_dividend_wht"
  | "tr_treaty_relief"
  | "tr_isg_physician";

export type SavingsKey =
  | "it_tech"
  | "it_manufacturing"
  | "it_retail"
  | "it_holding"
  | "tr_tech"
  | "tr_manufacturing"
  | "tr_retail"
  | "tr_holding";

export interface ExpansionInput {
  size: CompanySize;
  sector: Sector;
  jurisdiction: Jurisdiction;
}

export interface ExpansionResult {
  entity: EntityKey;
  /** Weeks from mandate to operational entity (banked, VAT-active) */
  timelineWeeks: [number, number];
  capital: { amount: number; currency: "EUR" | "TRY"; statutoryMinimum: number };
  checklist: ChecklistKey[];
  savings: { key: SavingsKey; range: [number, number] };
  /** Complexity score 1–5 used for the gauge */
  complexity: number;
}

const SIZE_WEIGHT: Record<CompanySize, number> = { micro: 0, small: 1, scale: 2 };

export function resolveEntity(input: ExpansionInput): EntityKey {
  if (input.jurisdiction === "italy") {
    return input.size === "scale" ? "spa" : "srl";
  }
  // Türkiye: holdings and 50+ headcount are structured as A.Ş.
  return input.size === "scale" || input.sector === "holding" ? "as" : "ltd";
}

export function computeExpansion(input: ExpansionInput): ExpansionResult {
  const entity = resolveEntity(input);
  const w = SIZE_WEIGHT[input.size];

  // ── Timeline ────────────────────────────────────────────────────────
  let low: number;
  let high: number;
  if (input.jurisdiction === "italy") {
    [low, high] = entity === "spa" ? [8, 12] : [3 + w, 5 + w * 1.5];
    const sectorAdd: Record<Sector, number> = { tech: 0, manufacturing: 2, retail: 2, holding: 1 };
    low += sectorAdd[input.sector];
    high += sectorAdd[input.sector] + (input.sector === "manufacturing" ? 1 : 0);
  } else {
    [low, high] = entity === "as" ? [5, 8] : [2 + w, 4 + w];
    const sectorAdd: Record<Sector, number> = { tech: 0, manufacturing: 3, retail: 1, holding: 1 };
    low += sectorAdd[input.sector];
    high += sectorAdd[input.sector] + (input.sector === "manufacturing" ? 1 : 0);
  }
  const timelineWeeks: [number, number] = [Math.round(low), Math.round(high)];

  // ── Statutory capital ───────────────────────────────────────────────
  const capital: ExpansionResult["capital"] =
    entity === "srl"
      ? { amount: 10_000, currency: "EUR", statutoryMinimum: 1 }
      : entity === "spa"
        ? { amount: 50_000, currency: "EUR", statutoryMinimum: 50_000 }
        : entity === "ltd"
          ? { amount: 50_000, currency: "TRY", statutoryMinimum: 50_000 }
          : { amount: 250_000, currency: "TRY", statutoryMinimum: 250_000 };

  // ── Compliance checklist ────────────────────────────────────────────
  const checklist: ChecklistKey[] = [];
  if (input.jurisdiction === "italy") {
    checklist.push("it_deed", "it_codice_fiscale", "it_vat", "it_pec_sdi", "it_bank_kyc", "it_inps_inail");
    if (input.sector === "tech") {
      checklist.push("it_patent_box", "it_impatriati");
      if (input.size !== "scale") checklist.push("it_startup_innovativa");
    }
    if (input.sector === "manufacturing") checklist.push("it_scia_production", "it_environmental", "it_transizione");
    if (input.sector === "retail") checklist.push("it_scia_commercial", "it_fiscal_pos", "it_consumer_code");
    if (input.sector === "holding") checklist.push("it_pex", "it_cfc", "it_transfer_pricing");
    if (input.size === "scale") checklist.push("it_collective_agreement");
  } else {
    checklist.push("tr_mersis", "tr_trade_registry", "tr_tax_office", "tr_bank_account", "tr_e_invoice", "tr_sgk");
    if (input.sector === "tech") checklist.push("tr_technopark", input.size === "scale" ? "tr_rd_center" : "tr_treaty_relief");
    if (input.sector === "manufacturing") checklist.push("tr_capacity_report", "tr_osb", "tr_atr_customs");
    if (input.sector === "retail") checklist.push("tr_workplace_license", "tr_etbis", "tr_atr_customs");
    if (input.sector === "holding") checklist.push("tr_dividend_wht", "tr_treaty_relief");
    if (input.size === "scale") checklist.push("tr_isg_physician");
  }

  // ── Savings model (indicative) ──────────────────────────────────────
  const savingsTable: Record<SavingsKey, [number, number]> = {
    it_tech: [20, 50],
    it_manufacturing: [5, 45],
    it_retail: [8, 15],
    it_holding: [90, 95],
    tr_tech: [15, 30],
    tr_manufacturing: [25, 40],
    tr_retail: [10, 20],
    tr_holding: [5, 10],
  };
  const savingsKey = `${input.jurisdiction === "italy" ? "it" : "tr"}_${input.sector}` as SavingsKey;

  // ── Complexity gauge ────────────────────────────────────────────────
  const sectorComplexity: Record<Sector, number> = { tech: 1, manufacturing: 2, retail: 1.5, holding: 2 };
  const complexity = Math.min(5, Math.max(1, Math.round(1 + w + sectorComplexity[input.sector] + (entity === "spa" || entity === "as" ? 0.5 : 0))));

  return {
    entity,
    timelineWeeks,
    capital,
    checklist,
    savings: { key: savingsKey, range: savingsTable[savingsKey] },
    complexity,
  };
}

export function formatCapital(amount: number, currency: "EUR" | "TRY", locale: string): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}
