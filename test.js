async function test22() {
    const res = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
    const { Infogempa: { gempa } } = await res.json();

    const resultText = `
<b>Waktu</b>    : ${gempa.Tanggal} ${gempa.Jam}
<b>Besaran</b>  : ${gempa.Magnitude} SR
<b>Wilayah</b>  : ${gempa.Wilayah}
<b>Potensi</b>  : ${gempa.Potensi}
<b>Kedalaman</b>: ${gempa.Kedalaman}
        `;
    const imageUrl = `https://static.bmkg.go.id/${gempa.Shakemap}`;

    console.log(resultText, imageUrl);
}

test22();
