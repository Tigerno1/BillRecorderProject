export const billListData = {
  pay: [
    {
      type: 'foods',
      name: 'Food & Dining',
      list: [
        { type: 'food', name: 'Meals' },
        { type: 'drinks', name: 'Drinks' },
        { type: 'dessert', name: 'Desserts & Snacks' },
      ],
    },
    {
      type: 'taxi',
      name: 'Transportation',
      list: [
        { type: 'taxi', name: 'Taxi / Ride-hailing' },
        { type: 'longdistance', name: 'Travel Tickets' },
      ],
    },
    {
      type: 'recreation',
      name: 'Entertainment',
      list: [
        { type: 'bodybuilding', name: 'Fitness' },
        { type: 'game', name: 'Games & Leisure' },
        { type: 'audio', name: 'Media & Audio' },
        { type: 'travel', name: 'Travel & Vacation' },
      ],
    },
    {
      type: 'daily',
      name: 'Daily Expenses',
      list: [
        { type: 'clothes', name: 'Clothing' },
        { type: 'bag', name: 'Shoes & Bags' },
        { type: 'book', name: 'Books & Learning' },
        { type: 'promote', name: 'Skill Improvement' },
        { type: 'home', name: 'Home Decoration' },
      ],
    },
    {
      type: 'other',
      name: 'Other Expenses',
      list: [
        { type: 'community', name: 'Community Fees' }
      ],
    },
  ],

  income: [
    {
      type: 'professional',
      name: 'Salary Income',
      list: [
        { type: 'salary', name: 'Salary' },
        { type: 'overtimepay', name: 'Overtime Pay' },
        { type: 'bonus', name: 'Bonus' },
      ],
    },
    {
      type: 'other',
      name: 'Other Income',
      list: [
        { type: 'financial', name: 'Investment Income' },
        { type: 'cashgift', name: 'Gift Money' },
      ],
    },
  ],
}