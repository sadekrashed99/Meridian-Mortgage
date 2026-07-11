import React, { useState, useEffect } from "react";
import { X, Calculator, HelpCircle, DollarSign, Percent, Calendar } from "lucide-react";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "repayments" | "borrowing" | "stamp-duty";
}

export default function CalculatorModal({ isOpen, onClose, initialTab = "repayments" }: CalculatorModalProps) {
  const [activeTab, setActiveTab] = useState<"repayments" | "borrowing" | "stamp-duty">(initialTab);

  // Sync initialTab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // --- REPAYMENTS CALCULATOR STATE ---
  const [propertyPrice, setPropertyPrice] = useState<number>(750000);
  const [deposit, setDeposit] = useState<number>(150000);
  const [interestRate, setInterestRate] = useState<number>(5.89);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [repaymentFrequency, setRepaymentFrequency] = useState<"monthly" | "fortnightly" | "weekly">("monthly");
  const [repaymentType, setRepaymentType] = useState<"pi" | "io">("pi"); // P&I vs Interest Only

  // Calculations
  const loanAmount = Math.max(0, propertyPrice - deposit);
  const [monthlyRepayment, setMonthlyRepayment] = useState<number>(0);
  const [frequencyRepayment, setFrequencyRepayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;

    let monthly = 0;
    let totalInt = 0;

    if (loanAmount > 0) {
      if (repaymentType === "pi") {
        if (r === 0) {
          monthly = loanAmount / n;
          totalInt = 0;
        } else {
          monthly = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
          totalInt = monthly * n - loanAmount;
        }
      } else {
        // Interest Only calculation
        monthly = loanAmount * (interestRate / 100 / 12);
        totalInt = monthly * n; // Assuming interest only for the full duration for simple estimates
      }
    }

    setMonthlyRepayment(monthly);
    setTotalInterest(totalInt);

    // Frequency conversion
    if (repaymentFrequency === "monthly") {
      setFrequencyRepayment(monthly);
    } else if (repaymentFrequency === "fortnightly") {
      setFrequencyRepayment((monthly * 12) / 26);
    } else {
      setFrequencyRepayment((monthly * 12) / 52);
    }
  }, [propertyPrice, deposit, interestRate, loanTerm, repaymentFrequency, repaymentType, loanAmount]);


  // --- BORROWING CAPACITY STATE ---
  const [applicationType, setApplicationType] = useState<"single" | "joint">("single");
  const [salary, setSalary] = useState<number>(95000);
  const [partnerSalary, setPartnerSalary] = useState<number>(80000);
  const [monthlyCommitments, setMonthlyCommitments] = useState<number>(400); // other loans/credit cards
  const [livingExpenses, setLivingExpenses] = useState<number>(2200);

  const [borrowingCapacity, setBorrowingCapacity] = useState<number>(0);

  useEffect(() => {
    // Simple borrowing power approximation based on net monthly disposable income and interest rate + buffer
    const grossIncome = applicationType === "single" ? salary : salary + partnerSalary;
    const monthlyNetIncome = (grossIncome * 0.72) / 12; // roughly 28% tax average
    const surplusIncome = monthlyNetIncome - livingExpenses - monthlyCommitments;

    // Standard assessment rate (interest rate + 3% APRA buffer)
    const assessmentRate = 8.89 / 100 / 12;
    const months = 30 * 12;

    let capacity = 0;
    if (surplusIncome > 0) {
      capacity = (surplusIncome * (Math.pow(1 + assessmentRate, months) - 1)) / (assessmentRate * Math.pow(1 + assessmentRate, months));
    }
    setBorrowingCapacity(Math.max(0, Math.round(capacity / 5000) * 5000));
  }, [applicationType, salary, partnerSalary, monthlyCommitments, livingExpenses]);


  // --- STAMP DUTY VICTORIA STATE ---
  const [sdPropertyPrice, setSdPropertyPrice] = useState<number>(650000);
  const [buyerType, setBuyerType] = useState<"owner" | "first-home" | "investor">("first-home");
  const [stampDuty, setStampDuty] = useState<number>(0);
  const [transferFee, setTransferFee] = useState<number>(1500);

  useEffect(() => {
    // Victoria (VIC) Stamp duty estimation
    // First Home Buyer concession:
    // Under 600,000 -> $0
    // Between 600,001 and 750,000 -> concessional sliding scale
    // Over 750,000 -> full rate
    // Owner Occupier rate is slightly cheaper than Investor rate. Let's approximate VIC rates:
    let duty = 0;
    const price = sdPropertyPrice;

    if (buyerType === "first-home" && price <= 600000) {
      duty = 0;
    } else if (buyerType === "first-home" && price > 600000 && price <= 750000) {
      // Sliding scale concession
      const fullDuty = calculateFullDutyVic(price, false);
      const discountRatio = (750000 - price) / 150000;
      duty = fullDuty * (1 - discountRatio);
    } else {
      const isInvestor = buyerType === "investor";
      duty = calculateFullDutyVic(price, isInvestor);
    }

    setStampDuty(Math.round(duty));

    // VIC transfer fee approximate sliding scale
    let fee = 150 + (price / 1000) * 2.5;
    setTransferFee(Math.round(Math.min(3700, Math.max(160, fee))));
  }, [sdPropertyPrice, buyerType]);

  const calculateFullDutyVic = (price: number, isInvestor: boolean) => {
    // Victoria standard stamp duty brackets
    // up to $25k: 1.4%
    // $25k - $130k: $350 + 2.4% of excess
    // $130k - $960k: $2870 + 6% of excess (investor slightly higher or same, let's use standard rate)
    // over $960k: 5.5% flat of total value
    let base = 0;
    if (price <= 25000) {
      return price * 0.014;
    } else if (price <= 130000) {
      return 350 + (price - 25000) * 0.024;
    } else if (price <= 960000) {
      base = 2870 + (price - 130000) * 0.06;
      if (isInvestor) base *= 1.1; // investor premium approx
      return base;
    } else {
      base = price * 0.055;
      if (isInvestor) base *= 1.05;
      return base;
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0
    }).format(val);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left pane: Inputs & Controls */}
        <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto max-h-[50vh] md:max-h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-brand-green">
              <Calculator className="h-6 w-6" />
              <h2 className="text-xl font-semibold font-sans text-brand-charcoal">Loan Calculators</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-brand-charcoal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Calculator Selector Tabs */}
          <div className="flex border-b border-gray-200 mb-6 gap-2">
            <button
              onClick={() => setActiveTab("repayments")}
              className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === "repayments"
                  ? "border-brand-green text-brand-green font-semibold"
                  : "border-transparent text-brand-graygreen hover:text-brand-charcoal"
              }`}
            >
              Loan Repayments
            </button>
            <button
              onClick={() => setActiveTab("borrowing")}
              className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === "borrowing"
                  ? "border-brand-green text-brand-green font-semibold"
                  : "border-transparent text-brand-graygreen hover:text-brand-charcoal"
              }`}
            >
              Borrowing Power
            </button>
            <button
              onClick={() => setActiveTab("stamp-duty")}
              className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === "stamp-duty"
                  ? "border-brand-green text-brand-green font-semibold"
                  : "border-transparent text-brand-graygreen hover:text-brand-charcoal"
              }`}
            >
              Stamp Duty (VIC)
            </button>
          </div>

          {/* --- REPAYMENTS TAB --- */}
          {activeTab === "repayments" && (
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-brand-charcoal">Property Price: <span className="font-bold">{formatCurrency(propertyPrice)}</span></label>
                </div>
                <input 
                  type="range" 
                  min={200000} 
                  max={2500000} 
                  step={20000}
                  value={propertyPrice} 
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$200k</span>
                  <span>$1.2M</span>
                  <span>$2.5M</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-brand-charcoal">Deposit Size: <span className="font-bold">{formatCurrency(deposit)}</span> ({Math.round((deposit / propertyPrice) * 100)}%)</label>
                </div>
                <input 
                  type="range" 
                  min={20000} 
                  max={Math.min(propertyPrice - 10000, 1000000)} 
                  step={10000}
                  value={deposit} 
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$20k</span>
                  <span>$500k</span>
                  <span>$1M</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-2">Interest Rate (%)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      step={0.01}
                      min={1}
                      max={15}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-green focus:border-brand-green text-sm text-brand-charcoal font-semibold"
                    />
                    <Percent className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-2">Loan Term (Years)</label>
                  <div className="relative">
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-green focus:border-brand-green text-sm text-brand-charcoal font-semibold appearance-none bg-white"
                    >
                      <option value={10}>10 Years</option>
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={25}>25 Years</option>
                      <option value={30}>30 Years</option>
                    </select>
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-2">Repayment Frequency</label>
                  <div className="flex bg-gray-100 p-1 rounded gap-1">
                    {(["weekly", "fortnightly", "monthly"] as const).map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setRepaymentFrequency(freq)}
                        className={`flex-1 text-center py-1.5 text-xs font-medium rounded capitalize transition-all ${
                          repaymentFrequency === freq
                            ? "bg-brand-green text-white shadow-sm"
                            : "text-brand-graygreen hover:text-brand-charcoal"
                        }`}
                      >
                        {freq.replace("ly", "")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-2">Repayment Type</label>
                  <div className="flex bg-gray-100 p-1 rounded gap-1">
                    <button
                      type="button"
                      onClick={() => setRepaymentType("pi")}
                      className={`flex-1 text-center py-1.5 text-xs font-medium rounded transition-all ${
                        repaymentType === "pi"
                          ? "bg-brand-green text-white shadow-sm"
                          : "text-brand-graygreen hover:text-brand-charcoal"
                      }`}
                    >
                      Principal & Int
                    </button>
                    <button
                      type="button"
                      onClick={() => setRepaymentType("io")}
                      className={`flex-1 text-center py-1.5 text-xs font-medium rounded transition-all ${
                        repaymentType === "io"
                          ? "bg-brand-green text-white shadow-sm"
                          : "text-brand-graygreen hover:text-brand-charcoal"
                      }`}
                    >
                      Interest Only
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- BORROWING CAPACITY TAB --- */}
          {activeTab === "borrowing" && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-2">Applicants</label>
                <div className="flex bg-gray-100 p-1 rounded gap-1 max-w-xs">
                  <button
                    type="button"
                    onClick={() => setApplicationType("single")}
                    className={`flex-1 text-center py-1.5 text-xs font-medium rounded transition-all ${
                      applicationType === "single"
                        ? "bg-brand-green text-white shadow-sm"
                        : "text-brand-graygreen hover:text-brand-charcoal"
                    }`}
                  >
                    Single Applicant
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplicationType("joint")}
                    className={`flex-1 text-center py-1.5 text-xs font-medium rounded transition-all ${
                      applicationType === "joint"
                        ? "bg-brand-green text-white shadow-sm"
                        : "text-brand-graygreen hover:text-brand-charcoal"
                    }`}
                  >
                    Joint Applicants
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-2">
                    {applicationType === "joint" ? "Applicant 1 Salary (Annual)" : "Your Salary (Annual)"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500 font-semibold text-sm">$</span>
                    <input 
                      type="number"
                      step={5000}
                      min={20000}
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-green focus:border-brand-green text-sm text-brand-charcoal font-semibold"
                    />
                  </div>
                </div>

                {applicationType === "joint" && (
                  <div>
                    <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-2">Applicant 2 Salary (Annual)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500 font-semibold text-sm">$</span>
                      <input 
                        type="number"
                        step={5000}
                        min={0}
                        value={partnerSalary}
                        onChange={(e) => setPartnerSalary(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-green focus:border-brand-green text-sm text-brand-charcoal font-semibold"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-brand-charcoal">Monthly Living Expenses</label>
                    <span className="text-xs font-semibold text-brand-green">{formatCurrency(livingExpenses)}/mo</span>
                  </div>
                  <input 
                    type="range" 
                    min={1000} 
                    max={8000} 
                    step={100}
                    value={livingExpenses} 
                    onChange={(e) => setLivingExpenses(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$1k</span>
                    <span>$4.5k</span>
                    <span>$8k</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-brand-charcoal">Other Monthly Commitments</label>
                    <span className="text-xs font-semibold text-brand-green">{formatCurrency(monthlyCommitments)}/mo</span>
                  </div>
                  <input 
                    type="range" 
                    min={0} 
                    max={4000} 
                    step={100}
                    value={monthlyCommitments} 
                    onChange={(e) => setMonthlyCommitments(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$0</span>
                    <span>$2k</span>
                    <span>$4k</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- STAMP DUTY TAB --- */}
          {activeTab === "stamp-duty" && (
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-brand-charcoal">Estimated Property Price: <span className="font-bold">{formatCurrency(sdPropertyPrice)}</span></label>
                </div>
                <input 
                  type="range" 
                  min={100000} 
                  max={2500000} 
                  step={20000}
                  value={sdPropertyPrice} 
                  onChange={(e) => setSdPropertyPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$100k</span>
                  <span>$1.3M</span>
                  <span>$2.5M</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-2">Buyer Status (Victoria rules)</label>
                <div className="flex flex-col sm:flex-row bg-gray-100 p-1 rounded gap-1">
                  <button
                    type="button"
                    onClick={() => setBuyerType("first-home")}
                    className={`flex-1 text-center py-2 text-xs font-medium rounded transition-all ${
                      buyerType === "first-home"
                        ? "bg-brand-green text-white shadow-sm"
                        : "text-brand-graygreen hover:text-brand-charcoal"
                    }`}
                  >
                    First Home Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuyerType("owner")}
                    className={`flex-1 text-center py-2 text-xs font-medium rounded transition-all ${
                      buyerType === "owner"
                        ? "bg-brand-green text-white shadow-sm"
                        : "text-brand-graygreen hover:text-brand-charcoal"
                    }`}
                  >
                    Owner Occupier
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuyerType("investor")}
                    className={`flex-1 text-center py-2 text-xs font-medium rounded transition-all ${
                      buyerType === "investor"
                        ? "bg-brand-green text-white shadow-sm"
                        : "text-brand-graygreen hover:text-brand-charcoal"
                    }`}
                  >
                    Property Investor
                  </button>
                </div>
                {buyerType === "first-home" && sdPropertyPrice <= 750000 && (
                  <p className="text-xs text-brand-green mt-2 font-medium bg-brand-neutral/80 p-2.5 rounded border border-brand-green/20">
                    🎉 You qualify for the Victorian First Home Buyer Stamp Duty exemption/concession! (Under $600k = $0 Duty, under $750k = heavily discounted).
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right pane: Results Breakdown (Green Background) */}
        <div className="w-full md:w-2/5 bg-brand-green text-white p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium text-brand-neutral mb-1 font-serif uppercase tracking-wider">Results Estimate</h3>
            <p className="text-xs text-brand-neutral/70 mb-6">Calculated based on current standard Melbourne rates.</p>

            {activeTab === "repayments" && (
              <div className="space-y-6">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-brand-neutral/60 mb-1">Loan Amount</span>
                  <span className="text-2xl font-bold font-serif">{formatCurrency(loanAmount)}</span>
                </div>

                <div>
                  <span className="block text-xs uppercase tracking-wider text-brand-neutral/60 mb-1">
                    {repaymentFrequency} Repayment
                  </span>
                  <span className="text-4xl font-extrabold font-serif text-brand-neutral">
                    {formatCurrency(frequencyRepayment)}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/20 grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-brand-neutral/60">Interest Paid</span>
                    <span className="text-sm font-semibold">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-brand-neutral/60">Total Paid</span>
                    <span className="text-sm font-semibold">{formatCurrency(loanAmount + totalInterest)}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "borrowing" && (
              <div className="space-y-6">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-brand-neutral/60 mb-1">Gross Annual Income</span>
                  <span className="text-2xl font-bold font-serif">
                    {formatCurrency(applicationType === "single" ? salary : salary + partnerSalary)}
                  </span>
                </div>

                <div>
                  <span className="block text-xs uppercase tracking-wider text-brand-neutral/60 mb-1">
                    Est. Borrowing Capacity
                  </span>
                  <span className="text-4xl font-extrabold font-serif text-brand-neutral">
                    {formatCurrency(borrowingCapacity)}
                  </span>
                  <p className="text-[11px] text-brand-neutral/70 mt-1 leading-relaxed">
                    This estimation includes an APRA-mandated 3.0% buffer for secure lending stress testing.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <span className="block text-[10px] uppercase tracking-wider text-brand-neutral/60 mb-1">Est. Property Value (with 20% Deposit)</span>
                  <span className="text-lg font-semibold">{formatCurrency(borrowingCapacity / 0.8)}</span>
                </div>
              </div>
            )}

            {activeTab === "stamp-duty" && (
              <div className="space-y-6">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-brand-neutral/60 mb-1">Property Value</span>
                  <span className="text-2xl font-bold font-serif">{formatCurrency(sdPropertyPrice)}</span>
                </div>

                <div>
                  <span className="block text-xs uppercase tracking-wider text-brand-neutral/60 mb-1">
                    Stamp Duty Fee (VIC)
                  </span>
                  <span className="text-4xl font-extrabold font-serif text-brand-neutral">
                    {formatCurrency(stampDuty)}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/20 space-y-2">
                  <div className="flex justify-between text-xs text-brand-neutral/80">
                    <span>Government Transfer Fee:</span>
                    <span className="font-semibold">{formatCurrency(transferFee)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-brand-neutral/80">
                    <span>Mortgage Registration:</span>
                    <span className="font-semibold">$198</span>
                  </div>
                  <div className="flex justify-between text-sm text-brand-neutral font-bold pt-2 border-t border-white/10">
                    <span>Total Government Costs:</span>
                    <span>{formatCurrency(stampDuty + transferFee + 198)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-[11px] text-brand-neutral/60 leading-relaxed mb-4">
              * Calculations are indicative only and do not constitute formal lending approval. Lender fees, Lenders Mortgage Insurance (LMI), and individual credit checks apply.
            </p>
            <button
              onClick={() => {
                onClose();
                // Trigger booking from parent
                const event = new CustomEvent("open-booking", { detail: { service: "finance" } });
                window.dispatchEvent(event);
              }}
              className="w-full bg-brand-gold hover:bg-yellow-600 text-brand-charcoal text-xs font-bold py-3 px-4 rounded text-center transition-all uppercase tracking-wider hover:scale-[1.02]"
            >
              Apply / Talk to Broker →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
