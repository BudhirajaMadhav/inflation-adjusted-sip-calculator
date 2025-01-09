from num_to_words import num_to_word

n = 10000
inflation_rate = 0.06
annual_interest_rate = 0.12
total_years = 40
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


print("Total amount invested: ", (num_to_word(int(total_amount_invested), lang='en', separator=', ', combiner='-')))
print("Total returns: ", (num_to_word(int(total_returns), lang='en', separator=', ', combiner='-')))
print("Total amount invested (inflation adjusted): ", (num_to_word(int(total_amount_invested_inflation_adjusted), lang='en', separator=', ', combiner='-')))
print("Total returns (inflation adjusted): ", (num_to_word(int(total_returns_inflation_adjusted), lang='en', separator=', ', combiner='-')))