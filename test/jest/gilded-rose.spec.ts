import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

  it('should test when item has quality zero and sellIn zero', () => {
    const item: Item = new Item('foo', 0, 0);
    const items: Item[] = [];
    items.push(item);

    const gildedRose = new GildedRose(items);
    const itemsResponse = gildedRose.updateQuality();
    
    expect(itemsResponse[0].name).toBe('foo');
    expect(itemsResponse[0].quality).toBe(0);
  });

  it('should test when item decrease quality', () => {
    const item: Item = new Item("Elixir of the Mongoose", 5, 7);
    const items: Item[] = [];
    items.push(item);

    const gildedRose = new GildedRose(items);
    const itemsResponse = gildedRose.updateQuality();

    expect(itemsResponse[0].quality).toBe(6);
  });

  it('should test when item decrease quality by twice', () => {
    const item: Item = new Item("Elixir of the Mongoose", -1, 7);
    const items: Item[] = [];
    items.push(item);

    const gildedRose = new GildedRose(items);
    const itemsResponse = gildedRose.updateQuality();

    expect(itemsResponse[0].quality).toBe(5);
  });

  it('should test when item decrease quality by twice with conjured item', () => {
    const item: Item = new Item("Conjured Mana Cake", 6, 7);
    const items: Item[] = [];
    items.push(item);

    const gildedRose = new GildedRose(items);
    const itemsResponse = gildedRose.updateQuality();

    expect(itemsResponse[0].quality).toBe(5);
  });

  it('should test when item increase by 2 quality and backsatge passes item', () => {
    const item: Item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 48);
    const items: Item[] = [];
    items.push(item);

    const gildedRose = new GildedRose(items);
    const itemsResponse = gildedRose.updateQuality();
    
    expect(itemsResponse[0].quality).toBe(50);
  });

  it('should test when item increase by 3 quality and backsatge item with sellIn days less than five days', () => {
    const item: Item = new Item("Backstage passes to a TAFKAL80ETC concert", 4, 47);
    const items: Item[] = [];
    items.push(item);

    const gildedRose = new GildedRose(items);
    const itemsResponse = gildedRose.updateQuality();
    
    expect(itemsResponse[0].quality).toBe(50);
  });
  
  it('should test when item gets quality 0 when concert already passed', () => {
    const item: Item = new Item("Backstage passes to a TAFKAL80ETC concert", -1, 47);
    const items: Item[] = [];
    items.push(item);

    const gildedRose = new GildedRose(items);
    const itemsResponse = gildedRose.updateQuality();
    
    expect(itemsResponse[0].quality).toBe(0);
  });

  it('should test sulfuras case', () => {
    const item: Item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const items: Item[] = [];
    items.push(item);

    const gildedRose = new GildedRose(items);
    const itemsResponse = gildedRose.updateQuality();
    
    expect(itemsResponse[0].quality).toBe(80);
  });

  it('should test aged brise case when sellIn is upper than 0', () => {
    const item: Item = new Item("Aged Brie", 2, 0);
    const items: Item[] = [];
    items.push(item);

    const gildedRose = new GildedRose(items);
    const itemsResponse = gildedRose.updateQuality();
    
    expect(itemsResponse[0].quality).toBe(1);
    expect(itemsResponse[0].sellIn).toBe(1);
  });

  it('should test aged brise case when sellIn is lower than 0', () => {
    const item: Item = new Item("Aged Brie", -1, 0);
    const items: Item[] = [];
    items.push(item);

    const gildedRose = new GildedRose(items);
    const itemsResponse = gildedRose.updateQuality();
    
    expect(itemsResponse[0].quality).toBe(2);
  });

  
});
