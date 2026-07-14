import React from 'react';
import { ShieldCheck, BadgeCheck, CreditCard, Headphones, Ban } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: 'Verified Owners' },
  { icon: BadgeCheck, label: 'LivZZ Certified Properties' },
  { icon: CreditCard, label: 'Secure Payments' },
  { icon: Ban, label: 'No Brokerage' },
  { icon: Headphones, label: '24×7 Support' },
];

export default function TrustSignals() {
  return (
    <section className="bg-[#001F3F] rounded-3xl p-6 md:p-8 mt-8">
      <h3 className="text-white font-black text-lg mb-5">Why trust LivZZ?</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center gap-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFC107]/20 flex items-center justify-center">
              <Icon size={20} className="text-[#FFC107]" />
            </div>
            <span className="text-white/90 text-xs font-bold leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
