export const mockUser = {
  name: '王小明',
  phone: '0912345678',
  referrals: [
    { id: 1, name: '朋友Ａ', code: 'REF001' },
    { id: 2, name: '朋友Ｂ', code: 'REF002' },
    { id: 3, name: '朋友Ｃ', code: 'REF003' },
  ],
  spinsRemaining: 1,
  totalSlots: 10,
};

export const mockHistory = [
  { id: 1, date: '2026-04-28', result: '朋友Ａ', prize: '購物金 $500', won: true },
  { id: 2, date: '2026-04-25', result: '未中獎', prize: '—', won: false },
  { id: 3, date: '2026-04-20', result: '朋友Ｃ', prize: '購物金 $200', won: true },
];
