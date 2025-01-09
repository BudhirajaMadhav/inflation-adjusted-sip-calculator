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


n = 10000
inflation_rate = 0.06
annual_interest_rate = 0.12
total_years = 30
yearly_investment_increase = 0.1

total_amount_invested = 0
total_amount_invested_inflation_adjusted = 0
total_returns = 0
total_returns_inflation_adjusted = 0

years_passed = 0
months_passed = 0

for i in range(total_years):
    for j in range(12):
        invested_amount = n
        total_amount_invested += invested_amount
        current_cost = n / ((1 + inflation_rate)**years_passed)
        total_amount_invested_inflation_adjusted += current_cost
        # value of n at the end.
        # to calculate this, we need to compound n for (total_years*12 - months_passed) months
        value_of_n_at_end = n * ((1 + annual_interest_rate/12)**(total_years*12 - months_passed))
        total_returns += value_of_n_at_end
        # print(value_of_n_at_end)
        inflation_adjusted_value_of_n_at_end = value_of_n_at_end / ((1 + inflation_rate)**total_years)
        total_returns_inflation_adjusted += inflation_adjusted_value_of_n_at_end

        months_passed += 1
    n += n*yearly_investment_increase
    years_passed += 1


print("Total amount invested: ", format_indian_currency(total_amount_invested))
print("Total amount invested (inflation adjusted): ", format_indian_currency(total_amount_invested_inflation_adjusted))
print("Total returns: ", format_indian_currency(total_returns))
print("Total returns (inflation adjusted): ", format_indian_currency(total_returns_inflation_adjusted))