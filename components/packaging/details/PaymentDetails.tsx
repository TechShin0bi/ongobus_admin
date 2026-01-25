// import { useTranslations } from 'next-intl';

// export const PaymentDetails = () => {
//   const t = useTranslations('Packaging.details');
//   return (
//   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//     <h3 className="font-bold text-gray-900 mb-4">{t('paymentInfo')}</h3>
//     <div className="flex justify-between items-center mb-2">
//       <span className="text-sm text-gray-500">{t('shippingCost')}</span>
//       <span className="text-sm font-medium text-gray-900">4,500 XAF</span>
//     </div>
//     <div className="flex justify-between items-center mb-4">
//       <span className="text-sm text-gray-500">{t('insurance')}</span>
//       <span className="text-sm font-medium text-gray-900">1,000 XAF</span>
//     </div>
//     <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
//       <span className="font-bold text-gray-900">{t('totalPaid')}</span>
//       <span className="font-bold text-xl text-green-600">5,500 XAF</span>
//     </div>
//     <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold">
//       <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span> {t('paid')} - {t('cash')}
//     </div>
//   </div>
// );
// }


import { CreditCard, CheckCircle, XCircle } from 'lucide-react';

interface PaymentDetailsProps {
  payment: {
    amount: string;
    method: string;
    status: string;
    reference: string;
  };
  className?: string;
}

export function PaymentDetails({ payment, className }: PaymentDetailsProps) {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Information</h2>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-indigo-100">
              <CreditCard className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">{payment.amount}</p>
            </div>
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            payment.status === 'Paid' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {payment.status === 'Paid' ? (
              <CheckCircle className="h-4 w-4 mr-1.5" />
            ) : (
              <XCircle className="h-4 w-4 mr-1.5" />
            )}
            {payment.status}
          </div>
        </div>
      </div>

      <dl className="space-y-4">
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
          <dd className="text-sm text-gray-900">{payment.method}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Reference Number</dt>
          <dd className="text-sm text-indigo-600 font-medium">{payment.reference}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Date</dt>
          <dd className="text-sm text-gray-900">Jan 20, 2024</dd>
        </div>
      </dl>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Need help with your order?</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Contact Support
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Invoice
          </button>
        </div>
      </div>
    </div>
  );
}