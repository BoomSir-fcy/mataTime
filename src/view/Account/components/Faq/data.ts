export interface RuleDataProps {
  period: number;
  exchnage: number;
  need: number;
  price: string;
  rate: number;
  total: number;
  month: number;
}


export const ruleDataList: RuleDataProps[] = [{
  period: 1,
  exchnage: 100000000000000,
  need: 500000,
  price: '0.00000000500',
  rate: 5,
  total: 5000000000000,
  month: 48
},
{
  period: 2,
  exchnage: 300000000000000,
  need: 2000000,
  price: '0.00000000667',
  rate: 8,
  total: 24000000000000,
  month: 36
},
{
  period: 3,
  exchnage: 600000000000000,
  need: 7500000,
  price: '0.00000001250',
  rate: 15,
  total: 90000000000000,
  month: 24
},
{
  period: 4,
  exchnage: 1000000000000000,
  need: 15000000,
  price: '0.00000001500',
  rate: 20,
  total: 200000000000000,
  month: 18
},
{
  period: 5,
  exchnage: 1500000000000000,
  need: 27000000,
  price: '0.00000001800',
  rate: 25,
  total: 375000000000000,
  month: 12
},
{
  period: 6,
  exchnage: 1500000000000000,
  need: 33000000,
  price: '0.00000002200',
  rate: 33,
  total: 495000000000000,
  month: 9
},
{
  period: 7,
  exchnage: 1000000000000000,
  need: 26000000,
  price: '0.00000002600',
  rate: 40,
  total: 400000000000000,
  month: 6
},
{
  period: 8,
  exchnage: 600000000000000,
  need: 21000000,
  price: '0.00000003500',
  rate: 50,
  total: 300000000000000,
  month: 3
},
{
  period: 9,
  exchnage: 300000000000000,
  need: 18000000,
  price: '0.00000006000',
  rate: 60,
  total: 180000000000000,
  month: 2
}];

const TOTAL = 1000000000000000000
export const chartData  = [
  { name: "Liquidity Mining", value: TOTAL * 0.15,  color: "rgba(36, 36, 36, 1)" },
  { name: "Airdrop", value: TOTAL * 0.050, color: "rgba(65, 65, 65, 1)"},
  { name: "Staking", value: TOTAL * 0.100, color: "rgba(105, 105, 105, 1)" },
  { name: "DSG Echange", value: TOTAL * 0.700, color: "rgba(13, 13, 13, 1)" },
];
