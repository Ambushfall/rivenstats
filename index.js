let rivens = await fetchBrokenJson("https://www-static.warframe.com/repos/weeklyRivensPC.json");

async function fetchBrokenJson(url) {
  const response = await fetch(url);
  const text = await response.text();
//   sanitize brokne json
  const sanitized = text.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ') 
  .replace(/'/g, '"');
  console.log(sanitized);

  try {
    const data = JSON.parse(sanitized);
    return data;
  } catch (err) {
    console.error("Failed to parse JSON:", err);
  }
}

/**
 * itemType: 'Archgun Riven Mod',
    compatibility: null,                Unveiled || Weapon Name
    rerolled: false,                    Yes || No
    avg: 38.33,
    stddev: 29.53,
    min: 15,
    max: 80,
    pop: 1,
    median: 20
 */
new gridjs.Grid({
  columns: 
  [
    "Item Type", 
    "Compatibility", 
    "Rerolled", 
    "Average", 
    "Standard Deviation", 
    "Minimum", 
    "Maximum", 
    "Popularity", 
    "Median"
  ],
  data: rivens.sort((a, b) => b.pop - a.pop)
  .map(riven => 
    [
      riven.itemType, 
      riven.compatibility ? riven.compatibility : "Unveiled", 
      riven.rerolled ? "Yes" : "No",
      riven.avg,
      riven.stddev,
      riven.min,
      riven.max,
      riven.pop,
      riven.median
    ]),
  search: true,
  sort: true,
  pagination: true
}).render(document.getElementById("wrapper"));