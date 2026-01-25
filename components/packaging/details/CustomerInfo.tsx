// import { useTranslations } from 'next-intl';
// import { Phone } from 'lucide-react';

// export const CustomerInfo = () => {
//   const t = useTranslations('Packaging.details');
//   return (
//   <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-6">
//     <div>
//       <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t('sender')}</h3>
//       <p className="font-medium text-gray-900">John Doe</p>
//       <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//         <Phone className="w-3 h-3" /> +237 699 00 00 00
//       </div>
//       <p className="text-sm text-gray-500 mt-1">Douala, Cameroon</p>
//     </div>
//     <div className="text-right">
//       <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t('receiver')}</h3>
//       <p className="font-medium text-gray-900">Alice Smith</p>
//       <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 justify-end">
//         <Phone className="w-3 h-3" /> +237 677 11 11 11
//       </div>
//       <p className="text-sm text-gray-500 mt-1">Yaoundé, Cameroon</p>
//     </div>
//   </div>
// );
// }

import { User, Phone, Mail, MapPin as MapPinIcon } from 'lucide-react';

interface CustomerInfoProps {
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  className?: string;
}

export function CustomerInfo({ customer, className }: CustomerInfoProps) {
  return (
    <div className={className}>
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="mt-1 text-sm text-gray-900">{customer.name}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Phone className="h-5 w-5 text-gray-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <p className="mt-1 text-sm text-gray-900">{customer.phone}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="mt-1 text-sm text-gray-900 break-all">{customer.email}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <MapPinIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Delivery Address</p>
              <p className="mt-1 text-sm text-gray-900">{customer.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}