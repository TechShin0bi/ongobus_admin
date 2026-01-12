import { useTranslations } from 'next-intl';

export const PrintableReceipt = ({ data, signature }: { data: any, signature: string }) => {
  const t = useTranslations('Packaging.receipt');
  return (
    <div className="hidden print:block print:w-full p-8 bg-white text-black font-mono text-sm absolute top-0 left-0 z-[100]">
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-widest">{t('title')}</h1>
        <p className="text-sm mt-1">{t('cities')}</p>
      </div>

      <div className="flex justify-between mb-6">
        <div>
          <p className="font-bold text-xs uppercase text-gray-500">{t('date')}</p>
          <p>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xs uppercase text-gray-500">{t('waybill')}</p>
          <p className="text-xl font-bold">{data.id}</p>
        </div>
      </div>

      <div className="border border-black p-4 mb-6">
        <div className="flex justify-between items-center">
            <div className="w-1/2">
                <p className="font-bold text-xs uppercase text-gray-500">{t('sender')}</p>
                <p className="font-bold">{data.sender.name}</p>
                <p className="text-xs">{data.sender.location}</p>
                <p className="text-xs">{data.sender.phone}</p>
            </div>
            <div className="text-center px-4">➜</div>
            <div className="w-1/2 text-right">
                <p className="font-bold text-xs uppercase text-gray-500">{t('receiver')}</p>
                <p className="font-bold">{data.receiver.name}</p>
                <p className="text-xs">{data.receiver.location}</p>
                <p className="text-xs">{data.receiver.phone}</p>
            </div>
        </div>
      </div>

      <table className="w-full mb-6 text-left">
        <thead>
            <tr className="border-b border-black">
                <th className="py-2 uppercase text-xs">{t('description')}</th>
                <th className="py-2 text-right uppercase text-xs">{t('weight')}</th>
                <th className="py-2 text-right uppercase text-xs">{t('value')}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="py-2">{data.items}</td>
                <td className="py-2 text-right">{data.weight}</td>
                <td className="py-2 text-right">{data.value}</td>
            </tr>
        </tbody>
      </table>

      <div className="flex justify-end mb-12">
          <div className="w-1/2 text-right">
              <div className="flex justify-between mb-1">
                  <span>{t('shippingFee')}</span>
                  <span>{data.amountDue.toLocaleString()} XAF</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-black pt-2 mt-2">
                  <span>{t('totalPaid')}</span>
                  <span>{data.amountDue.toLocaleString()} XAF</span>
              </div>
              <p className="text-xs mt-1 uppercase">{t('payment')} {data.paymentStatus}</p>
          </div>
      </div>

      <div className="flex justify-between items-end mt-8 pt-8 border-t border-dashed border-gray-400">
          <div className="text-center w-1/3">
              <div className="h-16 mb-2 flex items-end justify-center">
                  <span className="font-script text-lg font-cursive">Agent. J</span>
              </div>
              <div className="border-t border-black pt-1 text-xs uppercase">{t('authSign')}</div>
          </div>
          <div className="text-center w-1/3">
              <div className="h-16 mb-2 flex items-center justify-center">
                  {signature && <img src={signature} alt="Client Signature" className="max-h-16" />}
              </div>
              <div className="border-t border-black pt-1 text-xs uppercase">{t('receiverSign')}</div>
          </div>
      </div>
      
      <div className="mt-12 text-center text-xs">
          <p>{t('thankYou')}</p>
      </div>
    </div>
  );
};