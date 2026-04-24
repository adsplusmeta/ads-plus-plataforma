// data.jsx — mock data & constants

const CAMPAIGNS_DATA = [
  { id:1, name:'Black Friday Q2',  status:'active',  investment:18400, results:294, cpr:62.60, trend:[30,45,40,60,55,70,85], trendDir:'up',   platform:'Meta',   startDate:'2024-04-01', budget:25000, objective:'Conversiones' },
  { id:2, name:'Retargeting IG',   status:'active',  investment:9820,  results:187, cpr:52.50, trend:[20,35,45,40,55,60,75], trendDir:'up',   platform:'Meta',   startDate:'2024-04-05', budget:15000, objective:'Tráfico' },
  { id:3, name:'Awareness Mayo',   status:'review',  investment:12100, results:142, cpr:85.20, trend:[60,50,45,40,35,30,28], trendDir:'down', platform:'Meta',   startDate:'2024-05-01', budget:20000, objective:'Alcance' },
  { id:4, name:'Lead Gen Pro',     status:'paused',  investment:5200,  results:98,  cpr:53.06, trend:[40,42,41,40,40,41,40], trendDir:'flat', platform:'Meta',   startDate:'2024-03-15', budget:10000, objective:'Conversiones' },
  { id:5, name:'Video Views Q2',   status:'active',  investment:2800,  results:102, cpr:27.45, trend:[15,25,30,40,45,55,65], trendDir:'up',   platform:'Meta',   startDate:'2024-04-20', budget:8000,  objective:'Alcance' },
  { id:6, name:'Stories Summer',   status:'active',  investment:4100,  results:211, cpr:19.43, trend:[10,18,28,35,50,60,72], trendDir:'up',   platform:'Meta',   startDate:'2024-05-10', budget:8000,  objective:'Engagement' },
  { id:7, name:'Catalog Retarget', status:'paused',  investment:3300,  results:67,  cpr:49.25, trend:[50,45,40,38,36,35,34], trendDir:'down', platform:'Meta',   startDate:'2024-03-20', budget:6000,  objective:'Ventas' },
];

const DAILY_INVESTMENT = [
  { date:'Abr 9',  value:1200 },{ date:'Abr 10', value:1650 },
  { date:'Abr 11', value:1420 },{ date:'Abr 12', value:2180 },
  { date:'Abr 13', value:1900 },{ date:'Abr 14', value:1720 },
  { date:'Abr 15', value:2300 },{ date:'Abr 16', value:2480 },
  { date:'Abr 17', value:1960 },{ date:'Abr 18', value:2820 },
  { date:'Abr 19', value:2220 },{ date:'Abr 20', value:2600 },
  { date:'Abr 21', value:2940 },{ date:'Abr 22', value:3180 },
];

const DONUT_DATA = [
  { name:'Conversiones', value:60, color:'#00B4D8' },
  { name:'Tráfico',      value:25, color:'#0077B6' },
  { name:'Alcance',      value:15, color:'#023E8A' },
];

const KPI_DATA = [
  { label:'Inversión Total',   value:'$48,320', change:'+12.4%', dir:'up',   icon:'dollar',  spark:[30,45,35,60,55,75,80] },
  { label:'Alcance',           value:'183K',    change:'+8.1%',  dir:'up',   icon:'users',   spark:[40,55,50,65,70,75,85] },
  { label:'CTR Promedio',      value:'3.84%',   change:'+0.6 pts',dir:'up',  icon:'click',   spark:[2.8,3.1,2.9,3.4,3.6,3.7,3.84] },
  { label:'Costo / Resultado', value:'$62.40',  change:'+$4.20', dir:'down', icon:'cost',    spark:[55,58,54,60,61,60,62.4] },
];

const REPORT_DATA = [
  { date:'Sem 1', investment:8200,  results:112 },
  { date:'Sem 2', investment:11400, results:156 },
  { date:'Sem 3', investment:13800, results:178 },
  { date:'Sem 4', investment:14920, results:177 },
];

const CAMPAIGN_COMPARE = [
  { name:'Black Friday', investment:18400, results:294 },
  { name:'Retargeting',  investment:9820,  results:187 },
  { name:'Awareness',    investment:12100, results:142 },
  { name:'Lead Gen',     investment:5200,  results:98  },
  { name:'Video Views',  investment:2800,  results:102 },
];

Object.assign(window, { CAMPAIGNS_DATA, DAILY_INVESTMENT, DONUT_DATA, KPI_DATA, REPORT_DATA, CAMPAIGN_COMPARE });
