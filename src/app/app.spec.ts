// globals: true なのでインポート不要
describe('Basic Test', () => {
  it('should pass a simple test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should work with objects', () => {
    const obj = { name: 'ピカチュウ', type: 'でんき' };
    expect(obj.name).toBe('ピカチュウ');
  });
});
