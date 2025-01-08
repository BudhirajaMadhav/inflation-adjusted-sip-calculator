def format_indian_currency(number):
    # Convert the number to string and split into integer and decimal parts
    str_number = str(number)
    parts = str_number.split('.')
    
    # Get the integer part
    integer_part = parts[0]
    
    # Format integer part with commas
    # First comma after 3 digits from right, then after every 2 digits
    result = ""
    length = len(integer_part)
    
    # Add digits from right to left
    for i, digit in enumerate(integer_part[::-1]):
        if i == 3:
            result = ',' + result
        elif i > 3 and (i - 3) % 2 == 0:
            result = ',' + result
        result = digit + result
    
    # Add decimal part if it exists
    if len(parts) > 1:
        result += '.' + parts[1]
    
    return result

def sip_calculator(sip_amount, annual_stepup, annual_return, years, inflation_rate):
    """
    Calculates the total corpus, current real value of total investment, and inflation-adjusted corpus.

    Parameters:
        sip_amount (float): Initial monthly SIP amount.
        annual_stepup (float): Annual step-up percentage (e.g., 10 for 10%).
        annual_return (float): Expected annual return in percentage (e.g., 12 for 12%).
        years (int): Investment duration in years.
        inflation_rate (float): Annual inflation rate in percentage (e.g., 6 for 6%).

    Returns:
        dict: Contains total corpus, real value of total investment, and inflation-adjusted corpus.
    """
    monthly_return = annual_return / 12 / 100  # Monthly return rate
    total_months = years * 12
    inflation_rate_decimal = inflation_rate / 100  # Convert inflation rate to decimal

    total_corpus = 0
    total_investment = 0
    real_value_investment = 0
    current_sip = sip_amount

    for year in range(1, years + 1):
        yearly_contribution = current_sip * 12
        total_investment += yearly_contribution

        # Adjust each year's contribution for inflation
        real_value_investment += yearly_contribution / ((1 + inflation_rate_decimal) ** (years - year))

        # Add the yearly contributions to the total corpus
        for month in range(12):
            total_corpus += current_sip * ((1 + monthly_return) ** (total_months - (12 * (year - 1) + month + 1)))

        # Step-up SIP amount annually
        current_sip *= (1 + annual_stepup / 100)

    # Calculate inflation-adjusted corpus
    inflation_factor = (1 + inflation_rate_decimal) ** years
    real_value_corpus = total_corpus / inflation_factor

    return {
        "total_investment": total_investment,
        "real_value_investment": real_value_investment,
        "total_corpus": total_corpus,
        "real_value_corpus": real_value_corpus,
    }

# Example Usage
sip_amount = 10000  # Initial SIP amount (₹)
annual_stepup = 10  # Annual step-up (%)
annual_return = 12  # Expected annual return (%)
years = 30  # Investment duration (years)
inflation_rate = 6  # Inflation rate (%)

result = sip_calculator(sip_amount, annual_stepup, annual_return, years, inflation_rate)

print("Total Investment: ₹", format_indian_currency(round(result["total_investment"], 2)))
print("Real Value of Total Investment (today's value): ₹", format_indian_currency(round(result["real_value_investment"], 2)))
print("Total Corpus: ₹", format_indian_currency(round(result["total_corpus"], 2)))
print("Real Value of Corpus (post-inflation): ₹", format_indian_currency(round(result["real_value_corpus"], 2)))
