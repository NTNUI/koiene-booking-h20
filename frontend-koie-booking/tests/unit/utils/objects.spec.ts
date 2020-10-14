import { renameKey, sortObjectByKey } from '@/utils/objects';

describe('util Function renameKey', () => {
  it('Renames key', () => {
    const inputObject = { key1: 'value1', key2: 'value2' };
    const inputKey = 'key1';
    const inputNewKey = 'key3';
    const output = renameKey(inputObject, inputKey, inputNewKey);
    const expectedOutput = { key3: 'value1', key2: 'value2' };
    expect(output).toEqual(expectedOutput);
  });
});

describe('util Function sortObjectByKey', () => {
  it('Sorts object by key', () => {
    const inputObject = { kadabra: 'value1', abra: 'value2', alakazam: 'value3' };
    const output = sortObjectByKey(inputObject);
    const expectedOutput = { abra: 'value2', alakazam: 'value3', kadabra: 'value1' };
    expect(output).toEqual(expectedOutput);
  });
});
