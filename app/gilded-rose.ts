const ITEMS_CASES = {
  AGED_BRIE: "Aged Brie",
  BACK_STAGE: "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
  CONJURED: "Conjured Mana Cake",
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  agedBrieValidation(item: Item){
    const itemQuantityLessThan50 = item.quality < 50;
    if(itemQuantityLessThan50){
      item.quality ++
    }
    if(item.sellIn > 0){
      item.sellIn --;
    }else if(item.sellIn < 0 && itemQuantityLessThan50){
      item.quality ++
    }
  }

  backStageValidation(item: Item){
    item.quality ++ ;
    const itemQuantityLessThan50 = item.quality < 50 ;
    if(itemQuantityLessThan50 && item.sellIn < 11){
      item.quality ++ ;
    }
    if(itemQuantityLessThan50 && item.sellIn < 6){
      item.quality ++ ;
    }
    if(item.sellIn > 0){
      item.sellIn --;
    }else{
      item.quality = 0;
    }
  }

  standardValidation(item: Item, degradeFactor:number){
    const qualityUpperThanZeroValidation: boolean = item.quality > 0;
    if(qualityUpperThanZeroValidation){
      item.quality = item.quality - (1 * degradeFactor);
    };
    if(item.sellIn > 0){
      item.sellIn --;
    }else if(item.sellIn < 0 && qualityUpperThanZeroValidation){
      item.quality = item.quality - (1 * degradeFactor);
    }
  }

  validateBySpecialCases(item: Item){
    switch (item.name) {
      case ITEMS_CASES.AGED_BRIE:
         this.agedBrieValidation(item);
        break;
      case ITEMS_CASES.BACK_STAGE:
        this.backStageValidation(item);
        break;
      case ITEMS_CASES.CONJURED:
        this.standardValidation(item, 2);
        break;
      case ITEMS_CASES.SULFURAS:
        break;
      default:
        this.standardValidation(item, 1);
        break;
    }
  }

  updateQuality() {
    for(const item of this.items){
      this.validateBySpecialCases(item);
    }
    return this.items;
  }
}
