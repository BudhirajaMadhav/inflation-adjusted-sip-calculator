export function formatIndianCurrency(number: number): string {
  const str_number = number.toFixed(2);
  const parts = str_number.split('.');
  const integer_part = parts[0];
  let result = "";
  const length = integer_part.length;

  for (let i = 0; i < length; i++) {
    if (i === 3) {
      result = ',' + result;
    } else if (i > 3 && (i - 3) % 2 === 0) {
      result = ',' + result;
    }
    result = integer_part[length - 1 - i] + result;
  }

  if (parts.length > 1) {
    result += '.' + parts[1];
  }

  return result;
}

export function sipCalculator(
  sip_amount: number,
  annual_stepup: number,
  annual_return: number,
  years: number,
  inflation_rate: number
) {
  const monthly_return = annual_return / 12 / 100;
  const total_months = years * 12;
  const inflation_rate_decimal = inflation_rate / 100;

  let total_corpus = 0;
  let total_investment = 0;
  let real_value_investment = 0;
  let current_sip = sip_amount;

  const yearlyData = [];

  for (let year = 1; year <= years; year++) {
    const yearly_contribution = current_sip * 12;
    total_investment += yearly_contribution;

    real_value_investment += yearly_contribution / Math.pow(1 + inflation_rate_decimal, years - year);

    for (let month = 0; month < 12; month++) {
      total_corpus += current_sip * Math.pow(1 + monthly_return, total_months - (12 * (year - 1) + month + 1));
    }

    const inflation_factor = Math.pow(1 + inflation_rate_decimal, year);
    const real_value_corpus = total_corpus / inflation_factor;

    yearlyData.push({
      year,
      totalInvestment: total_investment,
      totalCorpus: total_corpus,
      realValueCorpus: real_value_corpus,
    });

    current_sip *= (1 + annual_stepup / 100);
  }

  return {
    total_investment,
    real_value_investment,
    total_corpus,
    real_value_corpus: yearlyData[years - 1].realValueCorpus,
    yearlyData,
  };
}

