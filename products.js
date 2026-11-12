// Menu and payment links. Edit this file to change products or prices.
// Prices are in shekels. Every item needs a unique id.

const PAY = {
  bit: "https://www.bitpay.co.il/app/me/81D1A46D-8660-A010-CD40-115736DCA9A6429D",
  paybox: "https://links.payboxapp.com/Pnh40kBlL4b",
};

const MENU = [
  { cat: "בירות", items: [
    { id: "corona", name: "קורונה", price: 12 },
    { id: "goldstar", name: "גולדסטאר", price: 12 },
  ]},
  { cat: "וויסקי", items: [
    { id: "jameson", name: "ג׳יימסון", price: 18 },
    { id: "jameson-chaser", name: "ג׳יימסון", desc: "צ׳ייסר", price: 12 },
  ]},
  { cat: "ערק", items: [
    { id: "arak", name: "ערק שלט", price: 12 },
  ]},
  { cat: "יין", items: [
    { id: "pinot", name: "יקב מדבר סדרה 22 פינו נואר 2024", price: 24 },
    { id: "midbar22", name: "יקב מדבר - סדרה 22", price: 18 },
  ]},
  { cat: "ג׳ין", items: [
    { id: "gordons", name: "גורדונס ג׳ין", price: 12 },
  ]},
  { cat: "קוקטיילים", items: [
    { id: "arak-mix", name: "ערק + תוספת", price: 12 },
    { id: "gin-tonic", name: "ג׳ין וטוניק", price: 18 },
  ]},
  { cat: "שתייה קלה", items: [
    { id: "water", name: "מים", price: 6 },
    { id: "prigat-grapefruit", name: "פריגת אשכוליות", price: 6 },
    { id: "prigat-limonana", name: "פריגת לימונענע", price: 6 },
    { id: "cola", name: "קולה פחית", price: 6 },
    { id: "zero", name: "זירו פחית", price: 6 },
    { id: "tonic", name: "מי טוניק", price: 6 },
  ]},
];
