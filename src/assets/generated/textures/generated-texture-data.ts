// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 8 }];

interface TxData {
  id: string;
  atlas: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

function txs<T>(tx: (data: TxData) => T) {
  return {
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 3301, y: 0, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 2979, y: 0, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3140, y: 0, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 3430, y: 0, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 2722, y: 0, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 2413, y: 0, width: 308, height: 208 }),
    },
    Lushious: {
      Chibi: {
        Body: tx({ id: "Lushious.Chibi.Body", atlas: 0, x: 0, y: 0, width: 2412, height: 150 }),
        Mic: tx({ id: "Lushious.Chibi.Mic", atlas: 0, x: 3301, y: 9, width: 40, height: 40 }),
      },
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
