// Mapper to help filter based on backend format
const paymentTypesMap = {
  'Wallet funding': 'C',
  'Money sent': 'D'
};

export const filterTransactions = ({
    transactions,
    filters,
    search = '',
  }) => {
    const searchTerm = search.toLowerCase().trim();
  
    return transactions.filter((transaction) => {
      const matchesStatus =
        !filters.statuses || transaction.status === filters.statuses;
  
      const matchesPaymentType =
        !filters.paymentTypes ||
        transaction.type === paymentTypesMap[filters.paymentTypes];
  
      const matchesSearch =
        !searchTerm ||
        (transaction?.reference?.toLowerCase().includes(searchTerm) ||
          transaction?.description?.toLowerCase().includes(searchTerm) ||
          String(transaction.amount).includes(searchTerm));
  
      return matchesStatus && matchesPaymentType && matchesSearch;
    });
  };
